"use strict";
/* AniManxwa - kompyuter qo'shimchasi. app.js DAN KEYIN yuklanadi (mobil kod o'zgarmaydi).
   app.js dagi act, S, ST, TAB, render, dl, $ ga to'g'ridan-to'g'ri murojaat qiladi. */

/* ---- orqaga (Esc) ---- */
function deskBack(){
  const np=$("#np");if(np)return act.nx({t:np.dataset.t});
  const dg=$(".dg");if(dg)return dg.remove();
  const sh=$("#sh");if(sh&&!sh.hidden)return act.shx({});
  if(ST.length)return act.back();
  if(TAB!="home"){TAB="home";render()}
}

/* ---- klaviatura ---- */
document.addEventListener("keydown",e=>{
  const t=e.target,typing=t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName);
  if(e.key==="Escape"){
    if(typing&&!(t.closest&&t.closest(".dg"))){t.blur();return}
    e.preventDefault();deskBack();return;
  }
  if(typing||e.ctrlKey||e.metaKey||e.altKey)return;
  const g=$("#pgs"),o=$("#o");
  if(!g||o.hidden)return; /* quyidagilar faqat o'qish oynasida */
  const hz=g.classList.contains("hz"),rtl=g.classList.contains("r"),k=e.key;
  const nx=$(".rf button:last-child"),pv=$(".rf button:nth-last-child(2)");
  const go=b=>{if(b&&!b.disabled)b.click()};
  if(k==="]"){e.preventDefault();return go(nx)}
  if(k==="["){e.preventDefault();return go(pv)}
  if(hz){
    const w=g.clientWidth||600,sg=rtl?-1:1;
    if(k==="ArrowRight"){e.preventDefault();g.scrollBy({left:w,behavior:"smooth"})}
    else if(k==="ArrowLeft"){e.preventDefault();g.scrollBy({left:-w,behavior:"smooth"})}
    else if(k===" "){e.preventDefault();g.scrollBy({left:(e.shiftKey?-1:1)*sg*w,behavior:"smooth"})}
  }else{
    const h=o.clientHeight;
    if(k==="ArrowDown"||k==="j"){e.preventDefault();o.scrollBy({top:130})}
    else if(k==="ArrowUp"||k==="k"){e.preventDefault();o.scrollBy({top:-130})}
    else if(k===" "||k==="PageDown"){e.preventDefault();o.scrollBy({top:(e.shiftKey&&k===" "?-1:1)*h*.85})}
    else if(k==="PageUp"){e.preventDefault();o.scrollBy({top:-h*.85})}
    else if(k==="Home"){e.preventDefault();o.scrollTo({top:0})}
    else if(k==="End"){e.preventDefault();o.scrollTo({top:o.scrollHeight})}
    else if(k==="ArrowRight"){e.preventDefault();go(nx)}
    else if(k==="ArrowLeft"){e.preventDefault();go(pv)}
  }
});

/* ---- havola: sayt/#/manhwa/nom/3 (yoki 404.html orqali sayt/manhwa/nom/3) ---- */
function deskRoute(){
  const h=location.hash;
  if(/^#\/[a-z]/i.test(h)){
    const u="animanxwa://"+h.slice(2);
    history.replaceState(null,"",location.pathname+location.search);
    dl(u);
  }
}
window.addEventListener("hashchange",deskRoute);
deskRoute();

/* ---- "ilova" sifatida o'rnatish (Chrome/Edge) ---- */
if("serviceWorker" in navigator&&location.protocol==="https:"){
  navigator.serviceWorker.register("sw.js").catch(()=>{});
}
