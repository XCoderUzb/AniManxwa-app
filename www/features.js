/* AniManxwa feature layer. Loaded after app.js so it can extend the existing UI handlers. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const STORE = 'ax.feature.v1';
  const SUBSCRIBE_URL = 'https://telegram.me/AniManxwaBot?start=Obuna_Sotib_Olish';
  const readExtra = () => { try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch { return {}; } };
  const writeExtra = data => localStorage.setItem(STORE, JSON.stringify(data));
  const safe = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const eligible = () => (typeof adminOn === 'function' && adminOn()) || (typeof PREM !== 'undefined' && Number(PREM) > Date.now()) || Number((JSON.parse(localStorage.ax || '{}') || {}).prem || 0) > Date.now();
  const locked = chapter => !!chapter?.requiresPremium;
  let selectedFiles = [], outputUrl = '', pdfDoc = null, pdfPage = 1, busy = false;

  function showSubscribe() {
    if ($('#ax-subscribe')) return;
    document.body.insertAdjacentHTML('beforeend', `<div class="ax-dialog" id="ax-subscribe"><div class="ax-dialog-shade" data-ax-close></div><section class="ax-dialog-card"><div class="ax-lock">🔒</div><h2>Obuna talab qilinadi</h2><p>Ushbu Manhwani o'qish uchun Obuna talab qilinadi</p><a class="ax-sub-link" href="${SUBSCRIBE_URL}" target="_blank" rel="noopener noreferrer">Obuna</a><button class="ax-secondary" data-ax-close>Yopish</button></section></div>`);
  }
  function isChapterLocked(manga, chapter) { return locked(chapter) || (manga?.pay === 'Obuna' && !eligible()); }

  // Enforce chapter-level flags in the app before the original handler runs.
  const originalRead = act.read;
  if (typeof originalRead === 'function') act.read = async data => {
    const manga = (S.manga || []).find(item => String(item.id) === String(data.id));
    const chapter = manga && (manga.chapters || []).find(item => String(item.id) === String(data.c));
    if (chapter && isChapterLocked(manga, chapter) && !eligible()) return showSubscribe();
    // Legacy manga-wide paywall is retired; access is controlled per chapter from now on.
    if (!manga) return originalRead(data);
    const oldPay = manga.pay; manga.pay = 'Bepul';
    try { return await originalRead(data); } finally { manga.pay = oldPay; }
  };

  function addAccessField() {
    const number = $('#c_n');
    if (!number || $('#ax-chapter-access')) return;
    const form = $('#pl')?.parentElement;
    if (!form) return;
    const field = document.createElement('label');
    field.className = 'ax-field'; field.id = 'ax-chapter-access';
    field.innerHTML = '<span>Bobga kirish</span><select id="ax-chapter-paid"><option value="0">Bepul</option><option value="1">Obuna talab qilinadi 🔒</option></select>';
    form.insertBefore(field, $('#pl'));
  }
  function addEditAccessField() {
    const number = $('#e_n');
    if (!number || $('#ax-edit-chapter-access')) return;
    const form = $('#e_n')?.closest('.oc') || $('#e_n')?.parentElement?.parentElement?.parentElement;
    if (!form) return;
    const field = document.createElement('label');
    field.className = 'ax-field'; field.id = 'ax-edit-chapter-access';
    field.innerHTML = '<span>Bobga kirish</span><select id="ax-edit-chapter-paid"><option value="0">Bepul</option><option value="1">Obuna talab qilinadi 🔒</option></select>';
    form.insertBefore(field, $('#el') || $('#cs'));
  }
  const formWatcher = new MutationObserver(() => { addAccessField(); addEditAccessField(); });
  formWatcher.observe(document.body, { childList: true, subtree: true });

  // Add an explicit per-chapter access setting to the existing add/edit flows.
  if (typeof act.cform === 'function') {
    const old = act.cform;
    act.cform = data => { const result = old(data); setTimeout(addAccessField, 0); return result; };
  }
  if (typeof act.csave === 'function') {
    const old = act.csave;
    act.csave = async (...args) => {
      const mangaId = CM?.id, number = Number($('#c_n')?.value), title = $('#c_t')?.value?.trim() || '';
      const requiresPremium = $('#ax-chapter-paid')?.value === '1';
      const result = await old(...args);
      if (!mangaId || !Number.isFinite(number)) return result;
      const manga = (S.manga || []).find(item => String(item.id) === String(mangaId));
      const chapter = manga && [...(manga.chapters || [])].reverse().find(item => Number(item.num) === number && (!title || item.title === title));
      if (!chapter) return result;
      chapter.requiresPremium = requiresPremium;
      save();
      if (SRV) {
        try { await api(`/api/admin/manga/${mangaId}/chapter/${chapter.id}`, { method: 'PUT', body: { requiresPremium } }); await sync(); }
        catch (error) { toast('Bob saqlandi, obuna sozlamasi serverga yozilmadi: ' + error.message); }
      }
      return result;
    };
  }
  if (typeof act.cedit === 'function') {
    const old = act.cedit;
    act.cedit = async data => { const result = await old(data); setTimeout(() => {
      addEditAccessField();
      const manga = (S.manga || []).find(item => String(item.id) === String(data.id));
      const chapter = manga?.chapters?.find(item => String(item.id) === String(data.c));
      const selector = $('#ax-edit-chapter-paid'); if (selector) selector.value = chapter?.requiresPremium ? '1' : '0';
    }, 0); return result; };
  }
  if (typeof act.epsave === 'function') {
    const old = act.epsave;
    act.epsave = async (...args) => {
      const requiresPremium = $('#ax-edit-chapter-paid')?.value === '1', mid = EC?.mid, cid = EC?.cid;
      const result = await old(...args);
      if (mid && cid) {
        const manga = (S.manga || []).find(item => String(item.id) === String(mid));
        const chapter = manga?.chapters?.find(item => String(item.id) === String(cid));
        if (chapter) chapter.requiresPremium = requiresPremium;
        save();
        if (SRV) { try { await api(`/api/admin/manga/${mid}/chapter/${cid}`, { method: 'PUT', body: { requiresPremium } }); await sync(); } catch (error) { toast('Obuna sozlamasi serverga yozilmadi: ' + error.message); } }
      }
      return result;
    };
  }

  // Keep the selected age value explicit on save; do not silently fall back to Hamma.
  if (typeof act.msave === 'function') {
    const old = act.msave;
    act.msave = async (...args) => {
      const selected = $('.seg[data-k="age"] button.on')?.dataset.v;
      if (selected !== undefined && typeof FV !== 'undefined') FV.age = Number(selected);
      if (typeof FV !== 'undefined') FV.pay = 'Bepul';
      return old(...args);
    };
  }

  function makePdfNav() {
    const nav = $('#nav');
    if (!nav || $('[data-ax-pdf]')) return;
    const button = document.createElement('button'); button.className = 'ax-pdf-nav'; button.dataset.axPdf = '1';
    button.innerHTML = '<i>📄</i>PDF'; button.title = 'PDF o‘qish va yaratish'; nav.append(button);
  }
  function openPanel() {
    if ($('#ax-pdf-overlay')) return;
    const allowed = eligible();
    document.body.insertAdjacentHTML('beforeend', `<div class="ax-pdf-overlay" id="ax-pdf-overlay"><section class="ax-pdf-panel"><header><div><small>AniManxwa</small><h2>PDF o‘qish va yaratish</h2></div><button class="ax-x" data-ax-close aria-label="Yopish">×</button></header><p class="ax-muted">PDF faylini oching yoki rasmlardan PDF yarating. Fayllar qurilmangizda qayta ishlanadi.</p><div class="ax-pdf-actions"><label class="ax-primary">PDF / rasm tanlash<input id="ax-pdf-files" type="file" accept="application/pdf,.pdf,image/*" multiple></label><button class="ax-secondary" id="ax-pdf-create" ${allowed ? '' : 'disabled'}>PDF yaratish</button></div><div class="ax-muted" id="ax-pdf-note">${allowed ? 'PDF yaratish imkoniyati faol.' : 'PDF yaratish uchun admin yoki faol obuna kerak.'}</div><div id="ax-pdf-selection" class="ax-picked">Fayl tanlanmagan.</div><div id="ax-pdf-result" class="ax-result" hidden></div><div id="ax-pdf-reader" class="ax-reader" hidden><div class="ax-reader-bar"><b id="ax-pdf-page-label"></b><button class="ax-secondary" id="ax-pdf-prev">‹</button><button class="ax-secondary" id="ax-pdf-next">›</button></div><canvas id="ax-pdf-canvas"></canvas></div><div id="ax-pdf-ad"></div></section></div>`);
    $('#ax-pdf-files').addEventListener('change', selectFiles);
    $('#ax-pdf-create').addEventListener('click', () => generate(false));
    $('#ax-pdf-prev').addEventListener('click', () => drawPdfPage(-1));
    $('#ax-pdf-next').addEventListener('click', () => drawPdfPage(1));
    loadReaderAd();
  }
  async function loadReaderAd() {
    if (eligible()) return;
    try {
      const res = await fetch((SRV || 'https://animanxwa-server.onrender.com') + '/api/ads');
      if (!res.ok) return;
      const ads = await res.json(), ad = ads.find(item => item.kind === 'small');
      if (ad && $('#ax-pdf-ad')) $('#ax-pdf-ad').innerHTML = `<a class="ax-ad" href="${safe(ad.url || '#')}" target="_blank" rel="noopener"><img src="${safe(ad.src || '')}" alt=""><span><b>${safe(ad.title || 'Reklama')}</b><br>${safe(ad.text || '')}</span><small>AD</small></a>`;
    } catch { /* Optional when offline. */ }
  }
  async function selectFiles(event) {
    selectedFiles = Array.from(event.target.files || []); event.target.value = '';
    $('#ax-pdf-result').hidden = true; $('#ax-pdf-reader').hidden = true;
    $('#ax-pdf-selection').textContent = selectedFiles.map(file => `${file.name} (${(file.size / 1048576).toFixed(2)} MB)`).join(' · ') || 'Fayl tanlanmagan.';
    const pdf = selectedFiles.find(file => file.type === 'application/pdf' || /\.pdf$/i.test(file.name));
    if (!pdf) return;
    if (!window.pdfjsLib) { $('#ax-pdf-note').textContent = 'PDF o‘qish moduli yuklanmadi. Internetni tekshiring.'; return; }
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      pdfDoc = await pdfjsLib.getDocument({ data: await pdf.arrayBuffer() }).promise; pdfPage = 1;
      $('#ax-pdf-reader').hidden = false; await drawPdfPage(0);
    } catch (error) { $('#ax-pdf-note').textContent = 'PDF ochilmadi: ' + error.message; }
  }
  async function drawPdfPage(delta) {
    if (!pdfDoc) return;
    pdfPage = Math.max(1, Math.min(pdfDoc.numPages, pdfPage + delta));
    const page = await pdfDoc.getPage(pdfPage), unit = page.getViewport({ scale: 1 }), viewport = page.getViewport({ scale: Math.min(1.7, (innerWidth - 60) / unit.width) });
    const canvas = $('#ax-pdf-canvas'), context = canvas.getContext('2d'); canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    $('#ax-pdf-page-label').textContent = `Sahifa ${pdfPage} / ${pdfDoc.numPages}`;
  }
  const enc = text => new TextEncoder().encode(text);
  function join(parts) { const result = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0)); let offset = 0; for (const part of parts) { result.set(part, offset); offset += part.length; } return result; }
  async function sourceImages(compressed) {
    const result = selectedFiles.filter(file => file.type.startsWith('image/')).map(file => ({ file }));
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf' || /\.pdf$/i.test(file.name));
    for (const file of pdfFiles) {
      if (!window.pdfjsLib) throw new Error('PDF moduli yuklanmadi.');
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const documentPdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
      for (let index = 1; index <= documentPdf.numPages; index++) {
        $('#ax-pdf-note').textContent = `Siqishga tayyorlanmoqda: ${index}/${documentPdf.numPages}`;
        const page = await documentPdf.getPage(index), base = page.getViewport({ scale: 1 }), viewport = page.getViewport({ scale: Math.min(compressed ? 1.5 : 2, 2000 / base.width) });
        const canvas = document.createElement('canvas'); canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', compressed ? .55 : .82));
        if (!blob) throw new Error('PDF sahifasini qayta ishlash amalga oshmadi.'); result.push({ file: blob }); canvas.width = canvas.height = 0;
      }
      await documentPdf.destroy();
    }
    return result;
  }
  async function makeImagePdf(sources, compressed) {
    if (!sources.length) throw new Error('PDF yaratish uchun rasm yoki PDF tanlang.');
    const objects = [null, null], pageIds = [];
    for (const source of sources) {
      const imageUrl = URL.createObjectURL(source.file), image = new Image();
      try {
        await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error('Rasmni ochib bo‘lmadi: ' + source.file.name)); image.src = imageUrl; });
        const maxEdge = compressed ? 1300 : 2400, ratio = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio)); canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
        const context = canvas.getContext('2d'); context.fillStyle = '#fff'; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', compressed ? .52 : .84)); if (!blob) throw new Error('Rasm siqilmadi.');
        const imageBytes = new Uint8Array(await blob.arrayBuffer()), pageW = 595.28, pageH = 841.89;
        const scale = Math.min(pageW / canvas.width, pageH / canvas.height), width = canvas.width * scale, height = canvas.height * scale;
        const pageId = objects.length + 1, imageId = pageId + 1, contentId = pageId + 2;
        const stream = enc(`q\n${width.toFixed(2)} 0 0 ${height.toFixed(2)} ${((pageW-width)/2).toFixed(2)} ${((pageH-height)/2).toFixed(2)} cm\n/Im0 Do\nQ`);
        const pageObject = enc(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`);
        const imageObject = join([enc(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`), imageBytes, enc('\nendstream')]);
        const contentObject = join([enc(`<< /Length ${stream.length} >>\nstream\n`), stream, enc('\nendstream')]);
        objects.push(pageObject, imageObject, contentObject); pageIds.push(pageId); canvas.width = canvas.height = 0;
      } finally { URL.revokeObjectURL(imageUrl); }
    }
    objects[0] = enc('<< /Type /Catalog /Pages 2 0 R >>');
    objects[1] = enc(`<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
    const header = enc('%PDF-1.4\n'), chunks = [header], offsets = [0]; let offset = header.length;
    objects.forEach((object, index) => { offsets.push(offset); const part = join([enc(`${index + 1} 0 obj\n`), object, enc('\nendobj\n')]); chunks.push(part); offset += part.length; });
    const xref = offset; let table = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let index = 1; index < offsets.length; index++) table += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`;
    chunks.push(enc(`${table}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`));
    return new Blob(chunks, { type: 'application/pdf' });
  }
  const prettySize = size => size < 1048576 ? `${Math.round(size / 1024)} KB` : `${(size / 1048576).toFixed(2)} MB`;
  function showResult(blob, compressed) {
    const box = $('#ax-pdf-result'); box.hidden = false;
    box.innerHTML = `<b>✓ PDF tayyor</b><span>Fayl hajmi: ${prettySize(blob.size)}${compressed ? ' · siqilgan' : ''}</span><div><a id="ax-pdf-download" download="animanxwa.pdf">Yuklab olish</a><button id="ax-pdf-compress" type="button">PDF siqish</button></div>`;
    $('#ax-pdf-download').href = outputUrl;
    $('#ax-pdf-compress').onclick = () => generate(true);
  }
  async function generate(compressed) {
    if (busy) return;
    if (!eligible()) { $('#ax-pdf-note').textContent = 'PDF yaratish faqat admin va faol obunachilar uchun.'; return; }
    busy = true; const button = $('#ax-pdf-create'); button.disabled = true; button.textContent = compressed ? 'PDF siqilmoqda…' : 'PDF tayyorlanmoqda…';
    try {
      const sources = await sourceImages(compressed), blob = await makeImagePdf(sources, compressed);
      if (outputUrl) URL.revokeObjectURL(outputUrl); outputUrl = URL.createObjectURL(blob); showResult(blob, compressed);
      $('#ax-pdf-note').textContent = 'PDF tayyor. Yuklab olishingiz mumkin.';
    } catch (error) { $('#ax-pdf-note').textContent = error.message || 'PDF yaratishda xato.'; }
    finally { busy = false; button.disabled = !eligible(); button.textContent = 'PDF yaratish'; }
  }
  document.addEventListener('click', event => {
    if (event.target.closest('[data-ax-pdf]')) { event.preventDefault(); openPanel(); }
    if (event.target.closest('[data-ax-close]')) { $('#ax-pdf-overlay')?.remove(); $('#ax-subscribe')?.remove(); }
    const chapterButton = event.target.closest('.crb[data-a="read"]');
    if (chapterButton) {
      const manga = (S.manga || []).find(item => String(item.id) === String(chapterButton.dataset.id));
      const chapter = manga?.chapters?.find(item => String(item.id) === String(chapterButton.dataset.c));
      if (chapter && isChapterLocked(manga, chapter) && !eligible()) { event.preventDefault(); event.stopImmediatePropagation(); showSubscribe(); }
      else if (chapter && locked(chapter)) chapterButton.insertAdjacentHTML('beforeend', ' <span aria-label="Obunali bob">🔒</span>');
    }
  }, true);
  const navObserver = new MutationObserver(makePdfNav); navObserver.observe(document.body, { childList: true, subtree: true }); makePdfNav();

  // Centered coverflow with the next and previous covers peeking into view.
  function updateCarousel() {
    const carousel = $('#car'); if (!carousel) return;
    const cards = [...carousel.querySelectorAll('.ban')]; if (!cards.length) return;
    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    cards.forEach(card => {
      const middle = card.offsetLeft + card.offsetWidth / 2, distance = (middle - center) / Math.max(1, card.offsetWidth), amount = Math.min(1, Math.abs(distance));
      card.style.transform = `scale(${1 - amount * .15}) translateY(${amount * 9}px)`;
      card.style.opacity = String(1 - amount * .25); card.style.zIndex = String(10 - Math.round(amount * 5));
    });
  }
  document.addEventListener('scroll', event => { if (event.target?.id === 'car') requestAnimationFrame(updateCarousel); }, true);
  const carouselObserver = new MutationObserver(() => requestAnimationFrame(updateCarousel)); carouselObserver.observe(document.body, { childList: true, subtree: true });
})();
