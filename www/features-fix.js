/* Follow-up refinements for chapter metadata, age saving, and carousel presentation. */
(() => {
  'use strict';
  const extra = () => { try { return JSON.parse(localStorage.getItem('ax.feature.v1') || '{}'); } catch { return {}; } };
  const eligible = () => (typeof adminOn === 'function' && adminOn()) || (typeof PREM !== 'undefined' && Number(PREM) > Date.now());
  const premiumUrl = 'https://telegram.me/AniManxwaBot?start=Obuna_Sotib_Olish';

  // Use the app's own current subscription state when a chapter fetch is rejected by the server.
  const oldFetch = window.fetch.bind(window);
  window.fetch = async (...args) => {
    const response = await oldFetch(...args);
    const requestUrl = String(args[0]?.url || args[0] || '');
    if (/\/api\/chapter\//.test(requestUrl) && response.status === 403) {
      let body = {}; try { body = await response.clone().json(); } catch {}
      if (body.subscribeUrl || /Obuna talab qilinadi/.test(body.error || '')) {
        document.body.insertAdjacentHTML('beforeend', `<div class="ax-dialog" id="ax-subscribe"><div class="ax-dialog-shade" data-ax-close></div><section class="ax-dialog-card"><div class="ax-lock">🔒</div><h2>Obuna talab qilinadi</h2><p>Ushbu Manhwani o'qish uchun Obuna talab qilinadi</p><a class="ax-sub-link" href="${premiumUrl}" target="_blank" rel="noopener noreferrer">Obuna</a><button class="ax-secondary" data-ax-close>Yopish</button></section></div>`);
      }
    }
    return response;
  };

  // Paint chapter badges whenever the chapter list is rendered/re-rendered.
  function decorateChapterRows() {
    const section = document.querySelector('#cl'); if (!section) return;
    const manga = (typeof S !== 'undefined' && S.manga || []).find(item => String(item.id) === String(typeof DM === 'undefined' ? '' : DM));
    if (!manga) return;
    section.querySelectorAll('.crb[data-c]').forEach(button => {
      const chapter = (manga.chapters || []).find(item => String(item.id) === String(button.dataset.c));
      if (!chapter || button.dataset.axDecorated) return;
      button.dataset.axDecorated = '1';
      if (chapter.requiresPremium) button.insertAdjacentHTML('beforeend', ' <span class="ax-lock-badge" aria-label="Obuna talab qilinadi">🔒</span>');
    });
  }
  const rowsObserver = new MutationObserver(decorateChapterRows);
  rowsObserver.observe(document.body, { childList: true, subtree: true });

  // Center the carousel on a cover and reveal neighboring covers (MangaLab-like coverflow).
  function styleCarousel() {
    if (!document.getElementById('ax-coverflow-style')) {
      const style = document.createElement('style'); style.id = 'ax-coverflow-style';
      style.textContent = `#car{gap:12px;padding:8px max(18px,calc((100vw - 460px)/2));scroll-padding-inline:calc((100vw - 240px)/2);align-items:center;perspective:900px}#car .ban{flex:0 0 min(240px,68vw);height:min(350px,48vh);aspect-ratio:2/3;background-position:center;background-size:cover;border:1px solid #444;border-radius:14px;overflow:hidden;scroll-snap-align:center;transform-origin:center;box-shadow:0 8px 26px #0009}#car .ban:after{background:linear-gradient(transparent 50%,#000e)}#car .ban .bt{font-size:14px;left:12px;right:10px;bottom:12px}#car .ban .b{z-index:2}@media(min-width:900px){#car{padding-left:calc(50% - 120px);padding-right:calc(50% - 120px)}#car .ban{flex-basis:240px;height:340px}}`;
      document.head.append(style);
    }
  }
  styleCarousel();
  new MutationObserver(styleCarousel).observe(document.body, { childList: true, subtree: true });
})();
