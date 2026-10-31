"use strict";
const $=(s,e=document)=>e.querySelector(s),act={};
document.body.insertAdjacentHTML("beforeend",`<div id="sp"><div class="wd"><b class="f">A</b>${[..."niManxw"].map((c,i)=>`<span class="mi${i>1?" m":""}" style="--i:${i}">${c}</span>`).join("")}<span class="l"><b class="up">A</b><b class="lo">a</b></span></div></div>`);
setTimeout(()=>{const x=document.getElementById("sp");x&&x.remove()},3000);
const H1="43ce4e22fdc2538fe7c94f4d61d559d62f7849164bfef97493ab74f05d31fe93",H2="b1343a7a42a7919658db5bd928d9655813636d0e4ccbc9200a479e3ce6921f05",HC="3358df839d57cbd194b4c7e2ae67b293d2dd8420fdaa811de6bcce5a31cb4539",TYPES=["Manga","Manhwa","Manhua","Novella"],
GENRES=["Harakat","Ramantika","Fantaziya","Komedia","Horror","Drama","Ilmiy-Fantastika","Sarguzasht","Sirli","Hayotdan parcha","Sport","Psixologik","G'ayratabiiy","O'zga dunyo"];
const E=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const sha=async t=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)))].map(b=>b.toString(16).padStart(2,"0")).join("");
const rid=()=>[...crypto.getRandomValues(new Uint8Array(23))].map(b=>b%10).join("").replace(/^0/,"7");
const art=(t,i)=>"data:image/svg+xml,"+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="768" height="1097"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+(i*47%360)+',70%,38%)"/><stop offset="1" stop-color="#0b0b0c"/></linearGradient></defs><rect width="768" height="1097" fill="url(#g)"/><text x="384" y="548" fill="#fff" font-size="56" font-family="sans-serif" text-anchor="middle">'+E(t)+'</text></svg>');
function seed(){return [["Qora Qilich","Manhwa","Obuna","Ongoing",980,["Harakat","Fantaziya"]],["Oy Soyasi","Manga","Bepul","Tugallangan",760,["Drama","Sirli"]],["Yurak Sadosi","Manhua","Obuna","Ongoing",640,["Ramantika"]],["Shahar Qorovuli","Manhwa","Bepul","Ongoing",520,["Harakat","Sport"]],["Sirli Orol","Novella","Bepul","Tugallangan",410,["Sarguzasht"]],["Kechki Maktab","Manga","Obuna","Ongoing",300,["Komedia","Hayotdan parcha"]]]
.map((a,i)=>({id:i+1,title:a[0],type:a[1],pay:a[2],status:a[3],reads:a[4],genres:a[5],desc:"Namuna ma'lumot. Admin paneldan tahrirlang yoki o'chiring.",author:"-",studio:"-",year:2024,vols:0,seasons:0,tags:[],cover:art(a[0],i+1),
chapters:[1,2,3].map(n=>({id:n,vol:0,season:0,num:n,title:"",at:i%2?0:Date.now(),pages:[art(a[0]+" - "+n+"-bob",i+n),art(a[0]+" - "+n+"-bob (2)",i+n+3)]}))}))}
const API="__API__",SRV=API.startsWith("http")?API.replace(/\/+$/,""):"";
let S=JSON.parse(localStorage.ax||"null")||{uid:rid(),name:"Foydalanuvchi",avatar:"",saved:{},read:[],admins:[],baza:[],manga:SRV?[]:seed(),bal:0,ok:0,lvl:0};
let TAB="home",Q="",TY="",GN="",ST=[],G=[],CV="",AV="",PG=[],CM=null;
const save=()=>{localStorage.ax=JSON.stringify(S)};
let SYNC=false;const PGC={};
async function api(p,o={}){const h={"Content-Type":"application/json"};if(S.tok)h.Authorization="Bearer "+S.tok;let r;
try{r=await fetch(SRV+p,{method:o.method||"GET",headers:h,body:o.body?JSON.stringify(o.body):undefined})}catch(e){throw Error("Internet yoki server ishlamayapti")}
const j=await r.json().catch(()=>({}));if(r.status==401&&S.tok){S.tok="";S.ok=0;S.lvl=0;save();render();throw Error("Sessiya tugadi, qayta kiring")}if(!r.ok)throw Error(j.error||"Xato "+r.status);return j}
const loadBaza=async()=>{S.baza=(await api("/api/admin/baza")).list;save()};
async function sync(){if(!SRV)return;SYNC=true;try{S.manga=await api("/api/manga");save()}catch(e){}SYNC=false;render();pushDev();pollN()}
const adminOn=()=>S.ok&&Date.now()-S.ok<144e5&&S.admins.includes(S.uid);
const need=()=>{if(adminOn()){S.ok=Date.now();save();return true}S.ok=0;S.lvl=0;S.tok="";save();closeOv();render();toast("Admin sessiyasi tugadi");return false};
const isSaved=id=>Object.values(S.saved).some(a=>a.includes(id));
const isNew=m=>m.status=="Ongoing"&&m.chapters.some(c=>Date.now()-c.at<2592e5);
const toast=t=>{const e=$("#ts");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),2300)};
const cl=c=>(c.season?c.season+"-fasl ":"")+(c.vol?c.vol+"-jild ":"")+c.num+"-bob"+(c.title?" · "+E(c.title):"");
const badge=m=>`<span class="b ${m.pay=="Obuna"?"r":"g"}">${m.pay}</span>`;
const heart=m=>`<button class="h" data-a="heart" data-id="${m.id}">${isSaved(m.id)?"♥":"♡"}</button>`;
const card=m=>`<div data-a="open" data-id="${m.id}"><div class="p"><img src="${m.cover}" draggable="false">${badge(m)}${heart(m)}${isNew(m)?'<span class="n">YANGI BOB</span>':""}</div><div class="t">${E(m.title)}</div><div class="mt">★ ${rt(m)} · ${m.chapters.length} bob</div></div>`;
const sel=(id,a,v)=>`<select class="in" id="${id}">${a.map(o=>`<option ${o==v?"selected":""}>${o}</option>`).join("")}</select>`;
const toUrl=(f,w,h,crop)=>new Promise(r=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas");if(crop){const k=Math.max(w/i.width,h/i.height),sw=w/k,sh=h/k;c.width=w;c.height=h;c.getContext("2d").drawImage(i,(i.width-sw)/2,(i.height-sh)/2,sw,sh,0,0,w,h)}else{const k=Math.min(1,w/i.width,h/i.height);c.width=i.width*k;c.height=i.height*k;c.getContext("2d").drawImage(i,0,0,c.width,c.height)}r(c.toDataURL("image/jpeg",.85))};i.src=URL.createObjectURL(f)});

/* ---- oynalar (overlay) ---- */
function showOv(){const o=$("#o"),t=ST[ST.length-1]||"";o.hidden=!ST.length;o.innerHTML=!ST.length?"":t.startsWith("<!--rd-->")?'<div class="oc rdc">'+t+'</div>':'<div class="ob"><button class="bk" data-a="back">‹ Orqaga</button></div><div class="oc">'+t+'</div>'}
const ov=h=>{ST.push(h);showOv()},closeOv=()=>{ST=[];showOv()};
act.back=()=>{ST.pop();showOv()};

/* ---- asosiy tablar ---- */
function nav(){const T=[["home","🏠","Asosiy"],["search","🔍","Qidirish"]];if(adminOn())T.push(["add"]);T.push(["saved","❤","Saqlanganlar"],["prof","👤","Profil"]);
$("#nav").innerHTML=T.map(t=>t[0]=="add"?`<button class="plus" data-a="tab" data-t="add">+</button>`:`<button class="${TAB==t[0]?"on":""}" data-a="tab" data-t="${t[0]}"><i>${t[1]}</i>${t[2]}</button>`).join("")}
function render(){if(TAB=="add"&&!adminOn())TAB="home";$("#v").innerHTML=({home,search,add,saved,prof})[TAB]();nav()}
act.tab=d=>{TAB=d.t;render();const v=$("#v");v.classList.remove("fd");void v.offsetWidth;v.classList.add("fd")};
function home(){if(!S.manga.length)return `<p class="mu" style="margin-top:60px;text-align:center">${SYNC?"Yuklanmoqda...<br>Server uyg'onayotgan bo'lsa 1 daqiqagacha kutish mumkin.":"Hozircha manga yo'q."}</p>`;const t=[...S.manga].sort((a,b)=>b.reads-a.reads),bn=[...new Set([...t.slice(0,12),...S.manga.filter(isNew)])].slice(0,20);
return `<input class="q" placeholder="🔍 Manga qidirish..." readonly data-a="gos"><div class="car" id="car">${bn.map(m=>`<div class="ban" data-a="open" data-id="${m.id}" style="background-image:url('${m.cover}')"><div class="bt">${E(m.title)}</div>${badge(m)}${isNew(m)?'<span class="n">YANGI BOB</span>':""}</div>`).join("")}</div><h3>Mangalar</h3><div class="gr">${byId(S.manga).map(card).join("")}</div>`}
act.gos=()=>{TAB="search";render();setTimeout(()=>$("#qi")&&$("#qi").focus(),60)};
const sres=()=>{const q=Q.toLowerCase();return byId(S.manga.filter(m=>(!TY||m.type==TY)&&(!GN||m.genres.includes(GN))&&(m.title+" "+m.author+" "+m.tags.join(" ")).toLowerCase().includes(q)))};
const chip=(a,v,on)=>`<span class="ch ${on?"on":""}" data-a="${a}" data-v="${E(v)}">${E(v)}</span>`;
function search(){return `<input class="q" id="qi" value="${E(Q)}" placeholder="Nom yoki muallif bo'yicha qidiring"><div class="chips">${TYPES.map(t=>chip("ty",t,TY==t)).join("")}</div><div class="chips">${GENRES.map(g=>chip("gn",g,GN==g)).join("")}</div><div class="gr" id="sg">${sres().map(card).join("")||'<p class="mu">Hech narsa topilmadi</p>'}</div>`}
act.ty=d=>{TY=TY==d.v?"":d.v;render()};act.gn=d=>{GN=GN==d.v?"":d.v;render()};
const cov=k=>{const l=(S.saved[k]||[]).map(i=>S.manga.find(m=>m.id==i)).filter(Boolean).slice(0,4);return `<div class="cv${l.length==1?" c1":""}">${l.map(m=>`<img src="${m.cover}" draggable="false">`).join("")||"<i>♥</i>"}</div>`};
const copy=async(t,msg)=>{try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();document.execCommand("copy");a.remove()}toast(msg||"Nusxalandi ✓")};
function burst(el){const r=el.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;for(let i=0;i<8;i++){const s=document.createElement("span"),g=i*.785;s.className="fx";s.textContent="♥";s.style.cssText=`left:${x}px;top:${y}px;--x:${Math.cos(g)*38}px;--y:${Math.sin(g)*38}px`;document.body.appendChild(s);setTimeout(()=>s.remove(),750)}}
function ask(t,v,cb,ph){const d=document.createElement("div");d.className="dg";d.innerHTML=`<div class="bd"></div><div class="dp"><h4>${t}</h4><input class="in" maxlength="120" placeholder="${ph||"Playlist nomi"}" value="${E(v)}"><div class="two"><button class="bt2">Bekor</button><button class="btn">Saqlash</button></div></div>`;document.body.appendChild(d);const i=$("input",d),x=()=>d.remove();setTimeout(()=>i.focus(),50);$(".bd",d).onclick=$(".bt2",d).onclick=x;$(".btn",d).onclick=()=>{const n=i.value.trim();if(n){x();cb(n)}}}
function sheet(id){let s=$("#sh");if(!s){s=document.createElement("div");s.id="sh";document.body.appendChild(s)}s.hidden=false;
s.innerHTML=`<div class="bd" data-a="shx" data-id="${id}"></div><div class="sp"><div class="gp"></div><h4>Playlistga saqlash</h4>${Object.keys(S.saved).map(k=>`<div class="pr" data-a="plk" data-id="${id}" data-n="${E(k)}">${cov(k)}<div class="pn"><b>${E(k)}</b><span class="mu">${S.saved[k].length} ta</span></div><span class="ck">${S.saved[k].includes(id)?"✓":""}</span></div>`).join("")}<button class="btn" data-a="plnew" data-id="${id}">+ Yangi playlist</button></div>`}
function saved(){const k=Object.keys(S.saved);return `<h3>Saqlanganlar</h3><div class="pg">${k.map(n=>`<div class="pl" data-a="plopen" data-n="${E(n)}">${cov(n)}<b>${E(n)}</b><span class="mu">${S.saved[n].length} ta manga</span></div>`).join("")}<div class="pl add" data-a="plnew0"><div class="cv"><i>+</i></div><b>Yangi playlist</b></div></div>${k.length?"":'<p class="mu">Hali hech narsa saqlanmagan. Manga ustidagi ♡ ni bosing.</p>'}`}
act.heart=(d,a)=>{const id=+d.id;if(!isSaved(id)){const k=Object.keys(S.saved)[0]||"Saqlanganlar";(S.saved[k]=S.saved[k]||[]).push(id);save();a.textContent="♥";a.classList.add("pop");setTimeout(()=>a.classList.remove("pop"),450);burst(a)}sheet(id)};
act.shx=d=>{const h=$("#sh"),id=+d.id;h.hidden=true;h.innerHTML="";pushDev();document.querySelectorAll(`.h[data-id="${id}"]`).forEach(b=>{b.textContent=isSaved(id)?"♥":"♡"});if(!ST.length&&TAB=="saved")render()};
act.plk=d=>{const id=+d.id,l=S.saved[d.n];S.saved[d.n]=l.includes(id)?l.filter(x=>x!=id):[...l,id];save();sheet(id)};
act.plnew=d=>ask("Yangi playlist","",n=>{if(S.saved[n])return toast("Bunday playlist bor");S.saved[n]=[+d.id];save();sheet(+d.id)});
act.plnew0=()=>ask("Yangi playlist","",n=>{if(S.saved[n])return toast("Bunday playlist bor");S.saved[n]=[];save();render()});
act.plopen=d=>{const l=(S.saved[d.n]||[]).map(i=>S.manga.find(m=>m.id==i)).filter(Boolean);ov(`<div class="row"><h2>${E(d.n)}</h2><span><button data-a="plren" data-n="${E(d.n)}">✎</button><button data-a="pldel" data-n="${E(d.n)}">🗑</button></span></div><p class="mu">${l.length} ta manga</p><div class="gr">${l.map(card).join("")||'<p class="mu">Bo\'sh</p>'}</div>`)};
act.plren=d=>ask("Playlist nomini o'zgartirish",d.n,n=>{if(n==d.n)return;if(S.saved[n])return toast("Bunday playlist bor");const o={};for(const k in S.saved)o[k==d.n?n:k]=S.saved[k];S.saved=o;save();ST.pop();render();act.plopen({n})});
act.pldel=d=>{if(confirm("Playlist o'chirilsinmi?")){delete S.saved[d.n];save();pushDev();ST.pop();render()}};
/* ---- manga sahifasi va o'qish ---- */
function detail(id){const m=S.manga.find(x=>x.id==id);if(!m)return;DM=m.id;
const sim=S.manga.filter(x=>x.id!=m.id).map(x=>[x,x.genres.filter(g=>m.genres.includes(g)).length]).filter(o=>o[1]).sort((a,b)=>b[1]-a[1]||(b[0].reads||0)-(a[0].reads||0)).slice(0,6).map(o=>o[0]),my=(S.rate||{})[m.id]||0;
ov(`<div class="dh"><img src="${m.cover}" draggable="false"><div><h2>${E(m.title)}</h2>${badge(m).replace("b ","b st ")} ${isNew(m)?'<span class="n">YANGI BOB</span>':""}<p class="mu">${m.type} · ${m.status}<br>${[m.author,m.studio,m.year].filter(x=>x&&x!="-").map(E).join(" · ")}</p><p class="rtg">★ ${rt(m)} <span class="mu">(${m.rc||0})</span> · ${m.chapters.length} bob · 👁 ${m.reads||0}</p>${heart(m)}</div></div><p>${E(m.desc)}</p><div class="chips">${m.genres.concat(m.tags).map(g=>`<span class="ch">${E(g)}</span>`).join("")}</div><div class="stars" id="stars">Baholang: ${[1,2,3,4,5].map(n=>`<span class="${my>=n?"on":""}" data-a="rate" data-id="${m.id}" data-v="${n}">★</span>`).join("")}</div><div class="row"><h4 style="margin:0">Boblar <span class="mu">${m.chapters.length}</span></h4><button class="srt" id="cs2" data-a="csrt">${S.csort=="asc"?"▲ 1→9":"▼ 9→1"}</button></div><input class="q" id="cq" placeholder="Bob qidirish..."><div id="cl">${crows(m,"")}</div>${sim.length?`<h4>Bunga o'xshash asarlar</h4><div class="gr">${sim.map(card).join("")}</div>`:""}`)}
act.open=d=>detail(d.id);
act.read=async d=>{const m=S.manga.find(x=>x.id==d.id);if(!m)return;const cs=[...m.chapters].sort((a,b)=>a.num-b.num),i=cs.findIndex(x=>x.id==d.c),c=cs[i];if(!c)return;
let pg=c.pages||PGC[c.id];if(!pg){toast("Yuklanmoqda...");try{pg=PGC[c.id]=(await api("/api/chapter/"+m.id+"/"+c.id)).pages}catch(e){return toast("Bobni yuklab bo'lmadi: "+e.message)}}
if(d.rep)ST.pop();
if(!d.nr){m.reads=(m.reads||0)+1;c.views=(c.views||0)+1;if(SRV)api("/api/read/"+m.id+"/"+c.id,{method:"POST"}).catch(()=>{});if(!S.read.includes(m.id))S.read.push(m.id);save()}
const hz=S.dir=="l"||S.dir=="r",lk=(S.likes||{})[c.id],pv=cs[i-1],nx=cs[i+1],ar=(x,t)=>x?`<button data-a="read" data-rep="1" data-id="${m.id}" data-c="${x.id}">${t}</button>`:`<button disabled>${t}</button>`;
ov(`<!--rd--><div class="rb"><button data-a="back">‹</button><div class="rtt"><b>${E(m.title)} · ${cl(c)}</b><small id="rp">1/${pg.length} · 0%</small></div><button data-a="rlist" data-id="${m.id}" data-c="${c.id}">☰</button><button data-a="rset" data-id="${m.id}" data-c="${c.id}">⚙</button><div class="rbar"><i id="rpb"></i></div></div><div class="pgs${hz?" hz "+S.dir:""}" id="pgs">${pg.map(p=>{const u=p.u||p;return `<img src="${u}" draggable="false" decoding="async"${p.w?` loading="lazy" style="aspect-ratio:${p.w}/${p.h}"`:""}>`}).join("")}</div><div class="rf"><button class="lk${lk?" on":""}" data-a="rlike" data-id="${m.id}" data-c="${c.id}">${lk?"♥":"♡"} <span id="lc">${c.likes||0}</span></button><span style="flex:1"></span>${ar(pv,"‹")}${ar(nx,"›")}</div>`);
trk(pg.length,hz)};

/* ---- profil ---- */
function prof(){return `<div class="pf"><div class="av">${S.avatar?`<img src="${S.avatar}">`:E((S.name[0]||"?").toUpperCase())}</div><button class="pen" data-a="edit">✎</button><h2>${E(S.name)}</h2></div><div class="menu">${[["mem","Ma'lumot va xotira"],["idc","ID ma'lumotingiz"],["nlist","Bildirishnoma"+(UB()?` <span class="bdg">${UB()}</span>`:"")],["soon","Obuna olish"],["soon","Tarjimonlikka so'rov yuborish"],["soon","Qo'llab-quvvatlash (Donat)"],["ord","Ilova buyurtma berish"]].map(x=>`<button data-a="${x[0]}">${x[1]}</button>`).join("")}${adminOn()?'<button class="red" data-a="adm">Admin paneli</button>':""}</div><div class="ft" id="idbox">ID: <b>${S.uid.replace(/(\d{4})(?=\d)/g,"$1 ")}</b><br><span class="mu">Nusxalash uchun ikki marta bosing</span><br>Hisob: ${S.bal} so'm<br><span class="mu">Versiya: ${VER||"-"} · Server: ${SRV?"ulangan":"yo'q"}</span></div>`}
act.soon=()=>toast("Tez orada");
act.edit=()=>{AV=S.avatar;ov(`<h3>Profilni tahrirlash</h3><label class="bt2">Rasm tanlash<input type="file" accept="image/*" id="av" hidden></label>${fl("Ismingiz",`<input class="in" id="nm" value="${E(S.name)}" placeholder="Masalan: Ali">`)}<button class="btn" data-a="psave">Saqlash</button>`)};
act.psave=()=>{S.name=$("#nm").value.trim()||S.name;S.avatar=AV;save();closeOv();render()};
act.mem=()=>ov(`<h3>Ma'lumot va xotira</h3><button class="btn" data-a="clr">Keshni tozalash</button>`);
act.clr=async()=>{try{for(const k of await caches.keys())await caches.delete(k)}catch(e){}toast("Kesh tozalandi")};
act.idc=()=>ov(`<h3>ID ma'lumotingiz</h3><input class="in" id="idi" placeholder="ID raqamingizni kiriting" inputmode="numeric"><button class="btn" data-a="idgo">Tekshirish</button><div id="idr"></div>`);
act.idgo=async()=>{const v=$("#idi").value.replace(/\s/g,""),r=$("#idr");
if(await sha(v)==HC){ST.pop();return gate()}
if(v==S.uid){const L=S.read.map(id=>(S.manga.find(m=>m.id==id)||{}).title).filter(Boolean);return r.innerHTML=`<p>Siz ${L.length} ta manga o'qigansiz.</p>${L.map(t=>`<div class="ch">${E(t)}</div>`).join("")}`}
r.innerHTML=/^\d{15,30}$/.test(v)?'<p class="er">🚫 Ushbu ID raqam sizga tegishli emas</p>':'<p class="er">ID raqamingizni to\'g\'ri kiriting</p>'};

/* ---- admin paneli ---- */
function gate(){ov(`<h3>Admin kirish</h3><input class="in" id="pw" type="password" placeholder="Parol" autocomplete="off"><button class="btn" data-a="pwgo">Kirish</button><div id="pr"></div>`)}
act.adm=()=>{if(!adminOn())return toast("Kirish mumkin emas, siz admin emassiz");S.lvl?panel():gate()};
const pwLocal=async()=>{const r=$("#pr");if(Date.now()<(S.lock||0))return r.innerHTML='<p class="er">Juda ko\'p urinish. 10 daqiqadan keyin qayta urining.</p>';
const h=await sha($("#pw").value),L=h==H2?2:h==H1?1:0;
if(!L){S.fail=(S.fail||0)+1;if(S.fail>=5){S.lock=Date.now()+6e5;S.fail=0}save();return r.innerHTML='<p class="er">Kirish mumkin emas: parol noto\'g\'ri</p>'}
S.fail=0;if(!S.admins.includes(S.uid))S.admins.push(S.uid);S.ok=Date.now();S.lvl=L;save();ST.pop();render();panel()};
act.pwgo=async()=>{if(!SRV)return pwLocal();const r=$("#pr");try{const j=await api("/api/auth",{method:"POST",body:{password:$("#pw").value}});S.tok=j.token;S.lvl=j.lvl;if(!S.admins.includes(S.uid))S.admins.push(S.uid);S.ok=Date.now();save();await loadBaza().catch(()=>{});ST.pop();render();panel()}catch(e){r.innerHTML=`<p class="er">${E(e.message)}</p>`}};
function panel(){ov(`<h3>Admin paneli (${S.lvl}-daraja)</h3><div class="menu"><button data-a="mlist">Mangalarni tahrirlash</button><button data-a="site">Sayt manzili</button><button data-a="nsend">Bildirishnoma yuborish</button>${S.lvl==2?'<button data-a="baza">Baza</button><button data-a="ver">Ilova versiyasi</button>':""}</div><p class="mu">4 soat faol bo'lmasangiz panel avtomatik yopiladi.</p>`)}
act.mlist=()=>{if(!need())return;ov(`<h3>Mangalar</h3>${S.manga.map(m=>`<div class="row"><img src="${m.cover}" class="th"><b style="flex:1">${E(m.title)}</b><span><button data-a="clist" data-id="${m.id}">📑</button><button data-a="lnk" data-id="${m.id}">🔗</button><button data-a="medit" data-id="${m.id}">✎</button><button data-a="mdel" data-id="${m.id}">🗑</button></span></div>`).join("")}`)};
act.medit=d=>{if(need())mform(S.manga.find(m=>m.id==d.id))};
act.mdel=async d=>{if(need()&&confirm("Manga o'chirilsinmi?")){if(SRV){try{await api("/api/admin/manga/"+d.id,{method:"DELETE"});await sync()}catch(e){return toast("Xato: "+e.message)}}else S.manga=S.manga.filter(m=>m.id!=d.id);for(const k in S.saved)S.saved[k]=S.saved[k].filter(i=>i!=d.id);save();ST.pop();act.mlist();render()}};
act.baza=async()=>{if(S.lvl<2||!need())return;if(SRV){try{await loadBaza()}catch(e){return toast(e.message)}}ov(`<h3>Baza</h3>${S.baza.map((b,i)=>`<div class="row"><b>Baza ${i+1}</b><span class="mu">${E(b.cloud)}</span><span><button style="font-size:13px;color:#4ade80" data-a="btest" data-i="${i}">Sinash</button><button data-a="bdel" data-i="${i}">🗑</button></span></div>`).join("")||'<p class="mu">Hali baza yo\'q</p>'}<h4>Yangi baza qo'shish</h4>${fl("Cloud name",`<input class="in" id="b_c" placeholder="Masalan: dxyz12abc">`)}${fl("Upload preset (Unsigned)",`<input class="in" id="b_p" placeholder="Masalan: animanxwa">`)}<button class="btn" data-a="badd">Qo'shish</button>`)};
act.badd=async()=>{const c=$("#b_c").value.trim(),p=$("#b_p").value.trim();if(!c||!p)return toast("Ikkala maydonni to'ldiring");if(!need())return;if(SRV){try{await api("/api/admin/baza",{method:"POST",body:{cloud:c,preset:p}});await loadBaza()}catch(e){return toast(e.message)}}else{S.baza.push({cloud:c,preset:p});save()}ST.pop();act.baza()};
act.bdel=async d=>{if(S.lvl<2||!need())return;if(SRV){try{await api("/api/admin/baza/"+(+d.i),{method:"DELETE"});await loadBaza()}catch(e){return toast(e.message)}}else{S.baza.splice(+d.i,1);save()}ST.pop();act.baza()};

/* ---- "+" : manga va bob qo'shish ---- */
function add(){return `<h3>Qo'shish</h3><button class="big" data-a="mform0">Manga qo'shish</button><button class="big" data-a="cpick">BOB qo'shish</button>`}
act.mform0=()=>need()&&mform();
const gchips=()=>[...new Set([...GENRES,...G])].map(g=>chip("gtog",g,G.includes(g))).join("");
act.gtog=d=>{G=G.includes(d.v)?G.filter(x=>x!=d.v):[...G,d.v];$("#gc").innerHTML=gchips()};
act.gadd=()=>{const v=$("#gx").value.trim();if(v&&!G.includes(v))G.push(v);$("#gx").value="";$("#gc").innerHTML=gchips()};
let FV={};
const TY2=[["Manga","🇯🇵","Yaponiya"],["Manhwa","🇰🇷","Koreya"],["Manhua","🇨🇳","Xitoy"],["Novella","📖","Roman"]].map(x=>[x[0],`<i>${x[1]}</i><b>${x[0]}</b><small>${x[2]}</small>`]);
const fl=(t,h)=>`<div class="fl"><span class="lb">${t}</span>${h}</div>`;
const seg=(k,o,c="")=>`<div class="seg ${c}" data-k="${k}">${o.map(x=>`<button type="button" class="${x[0]}${FV[k]==x[0]?" on":""}" data-a="seg" data-k="${k}" data-v="${x[0]}">${x[1]}</button>`).join("")}</div>`;
act.seg=d=>{FV[d.k]=d.v;document.querySelectorAll(`.seg[data-k="${d.k}"] button`).forEach(b=>b.classList.toggle("on",b.dataset.v==d.v))};
const vv=x=>x&&x!="-"?E(x):"";
function mform(m){const d=m||{title:"",desc:"",author:"",studio:"",genres:[],tags:[],type:"Manga",status:"Ongoing",pay:"Bepul",vols:0,seasons:0,year:new Date().getFullYear(),cover:""};G=[...d.genres];CV=d.cover;FV={type:d.type,status:d.status,pay:d.pay};
ov(`<h3>${m?"Mangani tahrirlash":"Manga qo'shish"}</h3><div id="mf" data-id="${m?m.id:""}">
${fl("Nomi *",`<input class="in" id="f_title" placeholder="Masalan: Soya ovchisi" value="${vv(d.title)}">`)}
${fl("Tavsif",`<textarea class="in" id="f_desc" placeholder="Manga haqida qisqacha yozing...">${E(d.desc)}</textarea>`)}
<div class="two">${fl("Muallif",`<input class="in" id="f_author" placeholder="Masalan: Chugong" value="${vv(d.author)}">`)}${fl("Studiya",`<input class="in" id="f_studio" placeholder="Masalan: Studio Dragon" value="${vv(d.studio)}">`)}</div>
${fl("Chiqqan yili",`<input class="in" id="f_year" type="number" placeholder="2024" value="${d.year||""}">`)}
${fl("Turi",seg("type",TY2,"ty"))}
${fl("Holat",seg("status",[["Ongoing","⏳ Ongoing"],["Tugallangan","✅ Tugallangan"]]))}
${fl("To'lov",seg("pay",[["Obuna","Obuna"],["Bepul","Bepul"]]))}
<div class="two">${fl("Jildlar soni (0 = yo'q)",`<input class="in" id="f_vols" type="number" min="0" value="${d.vols}">`)}${fl("Fasllar soni (0 = yo'q)",`<input class="in" id="f_seasons" type="number" min="0" value="${d.seasons}">`)}</div>
${fl("Janrlar (bir nechtasini tanlang)",`<div class="chips" id="gc">${gchips()}</div><div class="two"><input class="in" id="gx" placeholder="Boshqa janr (o'zingiz yozing)"><button class="bt2" data-a="gadd">Qo'shish</button></div>`)}
${fl("Teglar (vergul bilan, ixtiyoriy)",`<input class="in" id="f_tags" placeholder="Masalan: qilich, sehr, qasos" value="${E(d.tags.join(", "))}">`)}
${fl("Muqova rasmi (7:10)",`<label class="bt2">Rasm tanlash<input type="file" accept="image/*" id="f_cover" hidden></label><br><img id="cp" class="pv" src="${CV}" ${CV?"":"hidden"}>`)}
<button class="btn" data-a="msave">${m?"Saqlash":"Manga qo'shish"}</button></div>`)}
act.msave=async()=>{if(!need())return;const g=i=>$("#f_"+i).value.trim(),id=$("#mf").dataset.id;if(!g("title"))return toast("Nomini yozing");
let cv=CV;if(cv.startsWith("data:image/jpeg")&&S.baza.length){try{cv=await up(await(await fetch(cv)).blob())}catch(e){toast("Muqova bazaga yuklanmadi: "+e.message)}}
const d={title:g("title"),desc:g("desc"),author:g("author"),studio:g("studio"),year:+g("year")||0,type:FV.type,status:FV.status,pay:FV.pay,vols:+g("vols")||0,seasons:+g("seasons")||0,genres:G,tags:g("tags").split(",").map(s=>s.trim()).filter(Boolean),cover:cv||art(g("title"),3)};
if(SRV){try{await api(id?"/api/admin/manga/"+id:"/api/admin/manga",{method:id?"PUT":"POST",body:d});await sync()}catch(e){return toast("Xato: "+e.message)}}else if(id)Object.assign(S.manga.find(m=>m.id==id),d);else S.manga.push({id:Math.max(0,...S.manga.map(m=>m.id))+1,reads:0,chapters:[],...d});
save();closeOv();render();toast("Saqlandi")};
async function up(b){let err;for(const z of S.baza){try{const f=new FormData();f.append("file",b);f.append("upload_preset",z.preset);const j=await(await fetch(`https://api.cloudinary.com/v1_1/${z.cloud}/image/upload`,{method:"POST",body:f})).json();if(j.secure_url)return j.secure_url;err=j.error&&j.error.message}catch(e){err=e.message}}throw Error(err||"Baza qo'shilmagan (Admin paneli → Baza)")}
act.cpick=()=>{if(!need())return;ov(`<h3>Qaysi mangaga BOB qo'shiladi?</h3>${S.manga.map(m=>`<div class="row" data-a="cform" data-id="${m.id}"><img src="${m.cover}" class="th"><b style="flex:1">${E(m.title)}</b>›</div>`).join("")}`)};
act.cform=d=>{CM=S.manga.find(x=>x.id==d.id);PG=[];ov(`<div class="row"><img src="${CM.cover}" class="th"><b style="flex:1">${E(CM.title)}</b></div><div class="t3">${fl("Fasl",`<input class="in" id="c_s" type="number" min="0" placeholder="ixtiyoriy">`)}${fl("Jild",`<input class="in" id="c_v" type="number" min="0" placeholder="ixtiyoriy">`)}${fl("BOB *",`<input class="in" id="c_n" type="number" min="0" step="any" placeholder="Masalan: 1">`)}</div>${fl("Sarlavha (ixtiyoriy)",`<input class="in" id="c_t" placeholder="Masalan: Uyg'onish">`)}${fl("Sahifalar",`<label class="bt2">PDF yoki JPG / PNG / WEBP tanlash<input type="file" id="c_f" multiple accept=".pdf,image/png,image/jpeg,image/webp" hidden></label>`)}<div id="pl"></div><p id="cs" class="mu"></p><button class="btn" data-a="csave">Bobni qo'shish</button>`)};
function plist(){$("#pl").innerHTML=PG.map((b,i)=>`<div class="row"><img class="th" loading="lazy" decoding="async" src="${URL.createObjectURL(b)}"><b style="flex:1">${i+1}-bo'lak <span class="mu">${Math.round(b.size/1024)} KB</span></b><span><button data-a="pm" data-i="${i}" data-d="-1">↑</button><button data-a="pm" data-i="${i}" data-d="1">↓</button><button data-a="px" data-i="${i}">✕</button></span></div>`).join("");$("#cs").textContent=PG.length?`${PG.length} ta bo'lak · jami ${(PG.reduce((a,b)=>a+b.size,0)/1048576).toFixed(1)} MB`:""}
act.pm=d=>{const i=+d.i,j=i+ +d.d;if(j<0||j>=PG.length)return;[PG[i],PG[j]]=[PG[j],PG[i]];plist()};
act.px=d=>{PG.splice(+d.i,1);plist()};
const MAXW=1080,CUT=1800,CH=()=>CM&&CM.type=="Manga"?15000:CUT;
const dim=f=>new Promise(r=>{const i=new Image(),u=URL.createObjectURL(f);i.onload=()=>{URL.revokeObjectURL(u);r([i.naturalWidth,i.naturalHeight])};i.onerror=()=>r([0,0]);i.src=u});
function cutAt(s,y,e){const h=Math.min(240,e-y-500);if(h<=0)return e;const c=document.createElement("canvas");c.width=s.width;c.height=h;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(s,0,e-h,s.width,h,0,0,s.width,h);const d=x.getImageData(0,0,s.width,h).data;
for(let r=h-1;r>=0;r--){let lo=255,hi=0;for(let i=0;i<s.width;i+=6){const k=(r*s.width+i)*4,l=(d[k]+d[k+1]+d[k+2])/3;if(l<lo)lo=l;if(l>hi)hi=l}if(hi-lo<6)return e-h+r+1}return e}
async function enc(s,y,h){const c=document.createElement("canvas");c.width=s.width;c.height=h;c.getContext("2d").drawImage(s,0,y,s.width,h,0,0,s.width,h);let b;
for(const q of [.82,.7,.55]){b=await new Promise(r=>c.toBlob(r,"image/webp",q));if(!b||b.type!="image/webp"){b=null;break}if(b.size<7e5)break}
if(!b)b=await new Promise(r=>c.toBlob(r,"image/jpeg",.8));b.w=s.width;b.h=h;c.width=c.height=0;return b}
async function pack(s){const o=[];let y=0;while(y<s.height){let e=Math.min(s.height,y+CH());if(e<s.height)e=cutAt(s,y,e);o.push(await enc(s,y,e-y));y=e}return o}
async function addImg(f){const[w]=await dim(f);if(!w)throw Error("rasm emas");let b;try{b=await createImageBitmap(f,w>MAXW?{resizeWidth:MAXW,resizeQuality:"high"}:{})}catch(e){b=await createImageBitmap(f)}
for(const x of await pack(b))PG.push(x);b.close&&b.close()}
async function pdfPages(f){if(!window.pdfjsLib)return toast("PDF kutubxonasi yuklanmadi (internetni tekshiring)");pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;
for(let i=1;i<=pdf.numPages;i++){$("#cs").textContent=`PDF: ${i}/${pdf.numPages} sahifa tayyorlanmoqda...`;const p=await pdf.getPage(i),v0=p.getViewport({scale:1}),v=p.getViewport({scale:Math.min(3,MAXW/v0.width)}),c=document.createElement("canvas");c.width=Math.round(v.width);c.height=Math.round(v.height);const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);await p.render({canvasContext:g,viewport:v}).promise;for(const x of await pack(c))PG.push(x);c.width=c.height=0;p.cleanup()}
await pdf.destroy()}
act.csave=async()=>{if(!need())return;const n=$("#c_n").value;if(n==="")return toast("BOB raqami majburiy");if(!PG.length)return toast("Sahifalarni tanlang");const urls=[];
let k=0,done=0,fail=null;const w=async()=>{while(k<PG.length&&!fail){const i=k++;try{let u,er;for(let t=0;t<3&&!u;t++){try{u=await up(PG[i])}catch(e){er=e}}if(!u)throw er;urls[i]=u;$("#cs").textContent=`Yuklanmoqda ${++done}/${PG.length}...`}catch(e){fail=e}}};
await Promise.all([w(),w(),w()]);if(fail)return $("#cs").textContent="Xato: "+fail.message;
const ch={season:+$("#c_s").value||0,vol:+$("#c_v").value||0,num:+n,title:$("#c_t").value.trim(),pages:urls.map((u,i)=>({u,w:PG[i].w,h:PG[i].h}))};
if(SRV){try{$("#cs").textContent="Saqlanmoqda...";await api("/api/admin/manga/"+CM.id+"/chapter",{method:"POST",body:ch});await sync()}catch(e){return $("#cs").textContent="Xato: "+e.message}}else CM.chapters.push({id:Date.now(),at:Date.now(),...ch});
save();closeOv();render();toast("BOB qo'shildi")};

/* ---- hodisalar ---- */
let lt=0;
document.addEventListener("click",e=>{const b=e.target.closest("#idbox");if(b){const n=Date.now();if(n-lt<400){lt=0;copy(S.uid,"ID nusxalandi ✓");b.classList.remove("flash");void b.offsetWidth;b.classList.add("flash")}else lt=n}
const a=e.target.closest("[data-a]");if(a&&act[a.dataset.a])act[a.dataset.a](a.dataset,a)});
document.addEventListener("input",e=>{if(e.target.id=="qi"){Q=e.target.value;$("#sg").innerHTML=sres().map(card).join("")||'<p class="mu">Hech narsa topilmadi</p>'}});
document.addEventListener("change",async e=>{const t=e.target;if(!t.files||!t.files[0])return;
if(t.id=="f_cover"){CV=await toUrl(t.files[0],720,1028,true);$("#cp").src=CV;$("#cp").hidden=false}
else if(t.id=="av")AV=await toUrl(t.files[0],240,240);
else if(t.id=="n_i"){NI=await toUrl(t.files[0],1000,1000);const p=$("#np2");p.src=NI;p.hidden=false}
else if(t.id=="e_f"){const L=[...t.files];t.value="";PG=[];for(const f of L){try{if(/pdf/i.test(f.type+f.name))await pdfPages(f);else await addImg(f)}catch(e){toast("Faylni o'qib bo'lmadi: "+f.name)}}EP.push(...PG.map(b=>({b,w:b.w,h:b.h})));PG=[];$("#cs").textContent="";eplist()}
else if(t.classList&&t.classList.contains("e_r")){const i=+t.dataset.i;PG=[];try{await addImg(t.files[0])}catch(e){toast("Rasmni o'qib bo'lmadi")}EP.splice(i,1,...PG.map(b=>({b,w:b.w,h:b.h})));PG=[];t.value="";eplist()}
else if(t.id=="c_f"){const L=[...t.files];t.value="";for(let i=0;i<L.length;i++){const f=L[i];$("#cs").textContent=`Tayyorlanmoqda: fayl ${i+1}/${L.length}...`;try{if(/pdf/i.test(f.type+f.name))await pdfPages(f);else await addImg(f)}catch(e){toast("Faylni o'qib bo'lmadi: "+f.name)}plist()}}});
document.addEventListener("contextmenu",e=>{if(!/INPUT|TEXTAREA/.test(e.target.tagName))e.preventDefault()});
document.addEventListener("dragstart",e=>e.preventDefault());

/* ---- ilova havolasi: animanxwa://manhwa/{id}/{bobId} ---- */
const slug=t=>String(t).toLowerCase().replace(/[ʻ'’‘`]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
act.lnk=d=>{if(!need())return;const m=S.manga.find(x=>x.id==d.id),pre=S.site?S.site.replace(/\/+$/,"")+"/":"animanxwa://",b=pre+m.type.toLowerCase()+"/"+(slug(m.title)||m.id);
const L=(t,u)=>`<div class="row" data-a="cpy" data-u="${E(u)}"><span><b>${t}</b><br><span class="mu" style="word-break:break-all">${E(u)}</span></span><span>⧉</span></div>`;
ov(`<h3>Havolalar</h3><p class="mu">Bosib nusxalang.${S.site?"":" Sayt manzili kiritilmagan, shuning uchun ilova havolalari ko'rsatilmoqda."}</p>${L("Manga sahifasi",b)}${[...m.chapters].sort((a,c)=>a.num-c.num).map(c=>L(c.num+"-bob",b+"/"+c.num)).join("")}`)};
act.cpy=d=>copy(d.u,"Havola nusxalandi ✓");
act.site=()=>{if(need())ask("Sayt manzili",S.site||"",u=>{S.site=u.replace(/\/+$/,"");save();toast("Saqlandi ✓")},"https://....github.io/...")};
act.btest=async d=>{const z=S.baza[+d.i];toast("Sinalmoqda...");try{const f=new FormData();f.append("file","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGN4KKsHAAMPAS39S+cAAAAAAElFTkSuQmCC");f.append("upload_preset",z.preset);const j=await(await fetch(`https://api.cloudinary.com/v1_1/${z.cloud}/image/upload`,{method:"POST",body:f})).json();toast(j.secure_url?"Baza ishlayapti ✓":"Xato: "+(j.error&&j.error.message))}catch(e){toast("Xato: "+e.message)}};
const dl=u=>{const p=String(u||"").replace(/^[a-z][\w+.-]*:\/\//i,"").split(/[?#]/)[0].split("/").filter(Boolean).map(x=>decodeURIComponent(x).toLowerCase());
if(!/^(manga|manhwa|manhua|novella)$/.test(p[0]||"")||!p[1])return;
const g=S.manga.find(m=>m.type.toLowerCase()==p[0]&&slug(m.title)==p[1])||S.manga.find(m=>slug(m.title)==p[1])||S.manga.find(m=>m.id==p[1]);
if(!g){if(SRV&&!dl.t){dl.t=1;return sync().then(()=>{dl(u);dl.t=0})}return toast("Manga topilmadi")}closeOv();detail(g.id);
const c=p[2]&&(g.chapters.find(c=>c.num==p[2])||g.chapters.find(c=>c.id==p[2]));if(c)act.read({id:g.id,c:c.id})};
const CA=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.App;
/* ---- tartiblash, orqaga tugmasi, majburiy yangilash, bildirishnoma, o'qish yo'nalishi ---- */
const byId=l=>[...l].sort((a,b)=>(b.reads||0)-(a.reads||0)||b.id-a.id);
act.srt=()=>{S.sort=S.sort=="desc"?"asc":"desc";save();render()};
act.ord=()=>window.open("https://telegram.me/Shadow_Sxi","_blank");
const UB=()=>NL.filter(n=>n.at>(S.nseen||0)).length;
function onBack(){
if(UPD)return CA.exitApp();
const np=$("#np");if(np)return act.nx({t:np.dataset.t});
const dg=$(".dg");if(dg)return dg.remove();
const sh=$("#sh");if(sh&&!sh.hidden)return act.shx({});
if(ST.length)return act.back();
if(TAB!="home"){TAB="home";return render()}
if(Date.now()-bk<2500)return CA.exitApp();
bk=Date.now();sync();toast("Yangilandi ✓ Chiqish uchun yana bosing")}
async function chk(){if(!SRV||!BUILD)return;try{const v=await api("/api/version");if(v.min&&BUILD<v.min)upd(v.url)}catch(e){}}
function upd(u){if($("#up"))return;UPD=1;document.body.insertAdjacentHTML("beforeend",`<div id="up"><div class="uc"><div class="ui">⚠</div><h2>Yangi versiya chiqdi</h2><p>Ilovadan foydalanishni davom ettirish uchun uni yangilang.</p></div><button class="ub" data-a="ugo" data-u="${E(u||"")}">Yangilash</button></div>`)}
act.ugo=d=>window.open(d.u||"https://t.me/AniManxwaAppNews","_blank");
act.ver=async()=>{if(S.lvl<2||!need())return;let v={min:0,url:""};try{v=await api("/api/version")}catch(e){}
ov(`<h3>Ilova versiyasi</h3><p class="mu">Hozirgi o'rnatilgan: ${VER||"-"}</p>${fl("Minimal versiya raqami (qavs ichidagi son)",`<input class="in" id="v_m" type="number" value="${v.min||""}" placeholder="Masalan: 60">`)}<p class="mu">Bundan kichik versiyali ilovalar ishlamaydi va yangilashni talab qiladi.</p>${fl("Yuklab olish havolasi",`<input class="in" id="v_u" value="${E(v.url)}" placeholder="https://t.me/...">`)}<button class="btn" data-a="vsave">Saqlash</button>`)};
act.vsave=async()=>{if(!need())return;try{await api("/api/admin/version",{method:"POST",body:{min:+$("#v_m").value||0,url:$("#v_u").value.trim()}});toast("Saqlandi ✓");ST.pop();showOv()}catch(e){toast(e.message)}};
act.rset=d=>{let s=$("#sh");if(!s){s=document.createElement("div");s.id="sh";document.body.appendChild(s)}s.hidden=false;
s.innerHTML=`<div class="bd" data-a="shx"></div><div class="sp"><div class="gp"></div><h4>O'qish yo'nalishi</h4>${[["v","⬇ Tepadan pastga"],["l","➡ Chapdan o'ngga"],["r","⬅ O'ngdan chapga"]].map(x=>`<div class="pr" data-a="rdir" data-v="${x[0]}" data-id="${d.id}" data-c="${d.c}"><div class="pn"><b>${x[1]}</b></div><span class="ck">${(S.dir||"v")==x[0]?"✓":""}</span></div>`).join("")}</div>`};
act.rdir=d=>{S.dir=d.v;save();act.shx({});act.read({id:d.id,c:d.c,rep:1,nr:1})};
const nhtml=n=>n.kind=="chap"?`<div class="nt">${E(n.title)}</div><div class="mu">${E(n.type)}</div><p>${E(n.type)}ni yangi bobi chiqdi</p><p class="nn">${n.num}-bob chiqdi ✓</p><button class="btn" data-a="nread" data-m="${n.mid}" data-n="${n.num}" data-t="${n.at}">⌬ O'QISH ⌬</button>`
:`${n.image?`<img class="ni" src="${E(n.image)}" draggable="false">`:""}<div class="nt">${E(n.title)}</div><p>${E(n.body)}</p>${n.btn?`<button class="btn" data-a="nurl" data-u="${E(n.btn.u)}" data-t="${n.at}">${E(n.btn.t)}</button>`:""}`;
function popN(){if($("#np")||UPD)return;const n=NL.filter(x=>x.at>(S.nseen||0)).sort((a,b)=>a.at-b.at)[0];if(n)document.body.insertAdjacentHTML("beforeend",`<div class="dg" id="np" data-t="${n.at}"><div class="bd" data-a="nx" data-t="${n.at}"></div><div class="dp nc">${nhtml(n)}<button class="bt2" data-a="nx" data-t="${n.at}" style="margin-top:10px">Yopish</button></div></div>`)}
async function pollN(q){if(!SRV)return;try{NL=await api("/api/notif?uid="+S.uid);if(!S.nseen){S.nseen=NL.length?Math.max(...NL.map(n=>n.at)):1;save()}if(!q)popN();if(TAB=="prof"&&!ST.length)render()}catch(e){}}
function pushDev(){if(!SRV)return;api("/api/dev",{method:"POST",body:{uid:S.uid,saved:[...new Set(Object.values(S.saved).flat())]}}).catch(()=>{})}
act.nx=d=>{S.nseen=Math.max(S.nseen||0,+d.t||0);save();const e=$("#np");e&&e.remove();popN();if(TAB=="prof"&&!ST.length)render()};
act.nread=d=>{act.nx(d);const g=S.manga.find(x=>x.id==d.m);if(!g)return toast("Manga topilmadi");const c=g.chapters.find(x=>x.num==d.n);closeOv();detail(g.id);if(c)act.read({id:g.id,c:c.id})};
act.nurl=d=>{act.nx(d);/^animanxwa:/i.test(d.u)?dl(d.u):window.open(d.u,"_blank")};
act.nlist=async()=>{await pollN(true);S.nseen=Math.max(S.nseen||0,...NL.map(n=>n.at));save();ov(`<h3>Bildirishnoma</h3>${NL.length?NL.map(n=>`<div class="nc2">${nhtml(n)}<div class="mu" style="margin-top:8px;font-size:12px">${new Date(n.at).toLocaleString()}</div></div>`).join(""):'<p class="mu">Hozircha bildirishnoma yo\'q.</p>'}`)};
act.nsend=()=>{if(!need())return;NI="";ov(`<h3>Bildirishnoma yuborish</h3>${fl("Sarlavha",`<input class="in" id="n_t" maxlength="120" placeholder="Masalan: Yangi manhwa qo'shildi!">`)}${fl("Matn",`<textarea class="in" id="n_b" maxlength="1000" placeholder="Xabar matni..."></textarea>`)}${fl("Rasm (ixtiyoriy)",`<label class="bt2">Rasm tanlash<input type="file" accept="image/*" id="n_i" hidden></label><br><img id="np2" class="pv" hidden>`)}<div class="two">${fl("Tugma matni",`<input class="in" id="n_bt" placeholder="Masalan: Ko'rish">`)}${fl("Tugma havolasi",`<input class="in" id="n_bu" placeholder="https://...">`)}</div><button class="btn" data-a="nsendgo">Yuborish</button><p id="ns" class="mu"></p>`)};
act.nsendgo=async()=>{if(!need())return;const b={title:$("#n_t").value.trim(),body:$("#n_b").value.trim(),btnText:$("#n_bt").value.trim(),btnUrl:$("#n_bu").value.trim()};if(!b.title&&!b.body)return toast("Sarlavha yoki matn yozing");const s=$("#ns");s.textContent="Yuborilmoqda...";try{if(NI)b.image=await up(await(await fetch(NI)).blob());await api("/api/admin/notify",{method:"POST",body:b});closeOv();toast("Yuborildi ✓")}catch(e){s.textContent="Xato: "+e.message}};
/* ---- uslub: reyting, ko'rilgan, o'xshash asarlar, bob tahriri, o'qish paneli ---- */
const fmtD=t=>{const d=new Date(t||0);return String(d.getDate()).padStart(2,"0")+"."+String(d.getMonth()+1).padStart(2,"0")+"."+String(d.getFullYear()).slice(2)};
const rt=m=>m.rating?m.rating.toFixed(1):"-";
function crows(m,q){q=(q||"").trim().toLowerCase();let cs=[...m.chapters].sort((a,b)=>S.csort=="asc"?a.num-b.num:b.num-a.num);if(q)cs=cs.filter(c=>cl(c).toLowerCase().includes(q)||String(c.num).includes(q));
return cs.map(c=>`<button class="cb cr" data-a="read" data-id="${m.id}" data-c="${c.id}"><b>${cl(c)}</b><span class="mu">👁 ${c.views||0} · ${fmtD(c.at)}</span></button>`).join("")||'<p class="mu">Bob topilmadi</p>'}
document.addEventListener("input",e=>{if(e.target.id=="cq"){const m=S.manga.find(x=>x.id==DM);if(m)$("#cl").innerHTML=crows(m,e.target.value)}});
act.csrt=()=>{S.csort=S.csort=="asc"?"desc":"asc";save();const m=S.manga.find(x=>x.id==DM);$("#cl").innerHTML=crows(m,$("#cq").value);$("#cs2").textContent=S.csort=="asc"?"▲ 1→9":"▼ 9→1"};
act.rate=d=>{S.rate=S.rate||{};S.rate[d.id]=+d.v;save();document.querySelectorAll("#stars span").forEach((s,i)=>s.classList.toggle("on",i<+d.v));if(SRV)api("/api/rate/"+d.id,{method:"POST",body:{uid:S.uid,v:+d.v*2}}).then(()=>sync()).catch(()=>{});toast("Bahoyingiz: "+d.v*2+"/10 ✓")};
function trk(n,hz){const o=$("#o"),g=$("#pgs");if(!g)return;const f=()=>{const p=$("#rp"),b=$("#rpb");if(!p)return;let i=0,pc=0;
if(hz){i=Math.round(Math.abs(g.scrollLeft)/(g.clientWidth||1));pc=Math.round(i/Math.max(1,n-1)*100)}
else{pc=Math.min(100,Math.round(o.scrollTop/Math.max(1,o.scrollHeight-o.clientHeight)*100));const y=o.scrollTop+o.clientHeight/3,k=g.children;for(i=0;i<k.length;i++)if(k[i].offsetTop+k[i].offsetHeight>y)break}
p.textContent=Math.min(n,i+1)+"/"+n+" · "+pc+"%";b.style.width=pc+"%"};(hz?g:o).onscroll=f}
act.rlike=d=>{const m=S.manga.find(x=>x.id==d.id),c=m&&m.chapters.find(x=>x.id==d.c);if(!c)return;S.likes=S.likes||{};const on=!S.likes[c.id];S.likes[c.id]=on;c.likes=Math.max(0,(c.likes||0)+(on?1:-1));save();const b=document.querySelector(".lk");if(b){b.classList.toggle("on",on);b.innerHTML=(on?"♥":"♡")+' <span id="lc">'+c.likes+'</span>'}if(SRV)api("/api/like/"+m.id+"/"+c.id,{method:"POST",body:{d:on?1:-1}}).catch(()=>{})};
act.rlist=d=>{const m=S.manga.find(x=>x.id==d.id);let s=$("#sh");if(!s){s=document.createElement("div");s.id="sh";document.body.appendChild(s)}s.hidden=false;
s.innerHTML=`<div class="bd" data-a="shx"></div><div class="sp"><div class="gp"></div><h4>Boblar</h4>${[...m.chapters].sort((a,b)=>a.num-b.num).map(c=>`<div class="pr" data-a="rgo" data-id="${m.id}" data-c="${c.id}"><div class="pn"><b>${cl(c)}</b></div><span class="ck">${c.id==d.c?"●":""}</span></div>`).join("")}</div>`};
act.rgo=d=>{act.shx({});act.read({id:d.id,c:d.c,rep:1,nr:1})};
const thm=u=>String(u).includes("/upload/")?u.replace("/upload/","/upload/w_100,q_auto/"):u;
act.clist=d=>{if(!need())return;const m=S.manga.find(x=>x.id==d.id);ov(`<h3>${E(m.title)} — boblar</h3>${[...m.chapters].sort((a,b)=>a.num-b.num).map(c=>`<div class="row"><b style="flex:1">${cl(c)}</b><span><button data-a="cedit" data-id="${m.id}" data-c="${c.id}">✎</button><button data-a="cdel" data-id="${m.id}" data-c="${c.id}">🗑</button></span></div>`).join("")||'<p class="mu">Bob yo\'q</p>'}`)};
act.cdel=async d=>{if(need()&&confirm("Bob o'chirilsinmi?")){try{await api("/api/admin/manga/"+d.id+"/chapter/"+d.c,{method:"DELETE"});await sync();ST.pop();act.clist({id:d.id})}catch(e){toast(e.message)}}};
function eplist(){$("#el").innerHTML=EP.map((x,i)=>`<div class="row"><img class="th" loading="lazy" src="${x.b?URL.createObjectURL(x.b):E(thm(x.u))}"><b style="flex:1">${i+1}-bo'lak${x.b?' <span class="mu">(yangi)</span>':""}</b><span><button data-a="epm" data-i="${i}" data-d="-1">↑</button><button data-a="epm" data-i="${i}" data-d="1">↓</button><label class="lb2">↻<input type="file" class="e_r" data-i="${i}" accept="image/*" hidden></label><button data-a="epx" data-i="${i}">✕</button></span></div>`).join("")}
act.epm=d=>{const i=+d.i,j=i+ +d.d;if(j<0||j>=EP.length)return;[EP[i],EP[j]]=[EP[j],EP[i]];eplist()};
act.epx=d=>{EP.splice(+d.i,1);eplist()};
act.cedit=async d=>{if(!SRV)return toast("Server kerak");if(!need())return;const m=S.manga.find(x=>x.id==d.id),c=m.chapters.find(x=>x.id==d.c);toast("Yuklanmoqda...");let pg;try{pg=(await api("/api/chapter/"+m.id+"/"+c.id)).pages}catch(e){return toast(e.message)}
CM=m;EC={mid:m.id,cid:c.id};EP=pg.map(p=>typeof p=="string"?{u:p}:{u:p.u,w:p.w,h:p.h});
ov(`<h3>${E(m.title)} — bobni tahrirlash</h3><div class="t3">${fl("Fasl",`<input class="in" id="e_s" type="number" min="0" value="${c.season||0}">`)}${fl("Jild",`<input class="in" id="e_v" type="number" min="0" value="${c.vol||0}">`)}${fl("BOB *",`<input class="in" id="e_n" type="number" min="0" step="any" value="${c.num}">`)}</div>${fl("Sarlavha",`<input class="in" id="e_t" value="${E(c.title||"")}">`)}${fl("Sahifalar",`<label class="bt2">+ Sahifa qo'shish (PDF yoki rasm)<input type="file" id="e_f" multiple accept=".pdf,image/png,image/jpeg,image/webp" hidden></label>`)}<div id="el"></div><p id="cs" class="mu"></p><button class="btn" data-a="epsave">Saqlash</button>`);eplist()};
act.epsave=async()=>{if(!need())return;const n=$("#e_n").value;if(n==="")return toast("BOB raqami majburiy");if(!EP.length)return toast("Kamida bitta sahifa bo'lsin");
const s=$("#cs"),tot=EP.filter(x=>x.b).length;let k=0,done=0,fail=null;
const w=async()=>{while(k<EP.length&&!fail){const x=EP[k++];if(!x.b)continue;try{let u,er;for(let t=0;t<3&&!u;t++){try{u=await up(x.b)}catch(e){er=e}}if(!u)throw er;x.u=u;delete x.b;s.textContent="Yuklanmoqda "+(++done)+"/"+tot+"..."}catch(e){fail=e}}};
await Promise.all([w(),w(),w()]);if(fail)return s.textContent="Xato: "+fail.message;
try{s.textContent="Saqlanmoqda...";await api("/api/admin/manga/"+EC.mid+"/chapter/"+EC.cid,{method:"PUT",body:{num:+n,vol:+$("#e_v").value||0,season:+$("#e_s").value||0,title:$("#e_t").value.trim(),pages:EP.map(x=>({u:x.u,w:x.w,h:x.h}))}});delete PGC[EC.cid];await sync();closeOv();toast("Saqlandi ✓")}catch(e){s.textContent="Xato: "+e.message}};
let VER="",BUILD=0,UPD=0,bk=0,NL=[],NI="",DM=0,EP=[],EC=null;
if(CA){CA.addListener("backButton",onBack);CA.addListener("appUrlOpen",e=>dl(e.url));CA.getLaunchUrl().then(r=>r&&r.url&&dl(r.url)).catch(()=>{});CA.getInfo().then(i=>{BUILD=+i.build;chk();VER=i.version+" ("+i.build+")";if(TAB=="prof"&&!ST.length)render()}).catch(()=>{})}

if(S.ok&&!adminOn()){S.ok=0;S.lvl=0;save()}
setInterval(()=>{if(S.ok&&!adminOn()){S.ok=0;S.lvl=0;save();if(!ST.length)render()}},6e4);
setInterval(()=>{const c=$("#car");if(c){const w=c.clientWidth,i=Math.round(c.scrollLeft/w)+1;c.scrollTo({left:i*w>=c.scrollWidth-4?0:i*w,behavior:"smooth"})}},3500);
render();sync();document.addEventListener("visibilitychange",()=>{if(!document.hidden){sync();chk()}});setInterval(()=>{if(!document.hidden)pollN()},12e4);
