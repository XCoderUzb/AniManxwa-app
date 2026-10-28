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
let S=JSON.parse(localStorage.ax||"null")||{uid:rid(),name:"Foydalanuvchi",avatar:"",saved:{},read:[],admins:[],baza:[],manga:seed(),bal:0,ok:0,lvl:0};
let TAB="home",Q="",TY="",GN="",ST=[],G=[],CV="",AV="",PG=[],CM=null;
const save=()=>{localStorage.ax=JSON.stringify(S)};
const adminOn=()=>S.ok&&Date.now()-S.ok<144e5&&S.admins.includes(S.uid);
const need=()=>{if(adminOn()){S.ok=Date.now();save();return true}S.ok=0;S.lvl=0;save();closeOv();render();toast("Admin sessiyasi tugadi");return false};
const isSaved=id=>Object.values(S.saved).some(a=>a.includes(id));
const isNew=m=>m.status=="Ongoing"&&m.chapters.some(c=>Date.now()-c.at<2592e5);
const toast=t=>{const e=$("#ts");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),2300)};
const cl=c=>(c.season?c.season+"-fasl ":"")+(c.vol?c.vol+"-jild ":"")+c.num+"-bob"+(c.title?" · "+E(c.title):"");
const badge=m=>`<span class="b ${m.pay=="Obuna"?"r":"g"}">${m.pay}</span>`;
const heart=m=>`<button class="h" data-a="heart" data-id="${m.id}">${isSaved(m.id)?"♥":"♡"}</button>`;
const card=m=>`<div data-a="open" data-id="${m.id}"><div class="p"><img src="${m.cover}" draggable="false">${badge(m)}${heart(m)}${isNew(m)?'<span class="n">YANGI BOB</span>':""}</div><div class="t">${E(m.title)}</div></div>`;
const sel=(id,a,v)=>`<select class="in" id="${id}">${a.map(o=>`<option ${o==v?"selected":""}>${o}</option>`).join("")}</select>`;
const toUrl=(f,w,h)=>new Promise(r=>{const i=new Image();i.onload=()=>{const c=document.createElement("canvas"),k=Math.min(1,w/i.width,h/i.height);c.width=i.width*k;c.height=i.height*k;c.getContext("2d").drawImage(i,0,0,c.width,c.height);r(c.toDataURL("image/jpeg",.8))};i.src=URL.createObjectURL(f)});

/* ---- oynalar (overlay) ---- */
function showOv(){const o=$("#o");o.hidden=!ST.length;o.innerHTML=ST.length?'<div class="ob"><button class="bk" data-a="back">‹ Orqaga</button></div><div class="oc">'+ST[ST.length-1]+'</div>':""}
const ov=h=>{ST.push(h);showOv()},closeOv=()=>{ST=[];showOv()};
act.back=()=>{ST.pop();showOv()};

/* ---- asosiy tablar ---- */
function nav(){const T=[["home","🏠","Asosiy"],["search","🔍","Qidirish"]];if(adminOn())T.push(["add"]);T.push(["saved","❤","Saqlanganlar"],["prof","👤","Profil"]);
$("#nav").innerHTML=T.map(t=>t[0]=="add"?`<button class="plus" data-a="tab" data-t="add">+</button>`:`<button class="${TAB==t[0]?"on":""}" data-a="tab" data-t="${t[0]}"><i>${t[1]}</i>${t[2]}</button>`).join("")}
function render(){if(TAB=="add"&&!adminOn())TAB="home";$("#v").innerHTML=({home,search,add,saved,prof})[TAB]();nav()}
act.tab=d=>{TAB=d.t;render();const v=$("#v");v.classList.remove("fd");void v.offsetWidth;v.classList.add("fd")};
function home(){const t=[...S.manga].sort((a,b)=>b.reads-a.reads),bn=[...new Set([...t.slice(0,12),...S.manga.filter(isNew)])].slice(0,20);
return `<input class="q" placeholder="🔍 Manga qidirish..." readonly data-a="gos"><div class="car" id="car">${bn.map(m=>`<div class="ban" data-a="open" data-id="${m.id}" style="background-image:url('${m.cover}')"><div class="bt">${E(m.title)}</div>${badge(m)}${isNew(m)?'<span class="n">YANGI BOB</span>':""}</div>`).join("")}</div><h3>Eng ko'p o'qilganlar</h3><div class="gr">${t.map(card).join("")}</div>`}
act.gos=()=>{TAB="search";render();setTimeout(()=>$("#qi")&&$("#qi").focus(),60)};
const sres=()=>{const q=Q.toLowerCase();return S.manga.filter(m=>(!TY||m.type==TY)&&(!GN||m.genres.includes(GN))&&(m.title+" "+m.author+" "+m.tags.join(" ")).toLowerCase().includes(q))};
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
act.shx=d=>{const h=$("#sh"),id=+d.id;h.hidden=true;h.innerHTML="";document.querySelectorAll(`.h[data-id="${id}"]`).forEach(b=>{b.textContent=isSaved(id)?"♥":"♡"});if(!ST.length&&TAB=="saved")render()};
act.plk=d=>{const id=+d.id,l=S.saved[d.n];S.saved[d.n]=l.includes(id)?l.filter(x=>x!=id):[...l,id];save();sheet(id)};
act.plnew=d=>ask("Yangi playlist","",n=>{if(S.saved[n])return toast("Bunday playlist bor");S.saved[n]=[+d.id];save();sheet(+d.id)});
act.plnew0=()=>ask("Yangi playlist","",n=>{if(S.saved[n])return toast("Bunday playlist bor");S.saved[n]=[];save();render()});
act.plopen=d=>{const l=(S.saved[d.n]||[]).map(i=>S.manga.find(m=>m.id==i)).filter(Boolean);ov(`<div class="row"><h2>${E(d.n)}</h2><span><button data-a="plren" data-n="${E(d.n)}">✎</button><button data-a="pldel" data-n="${E(d.n)}">🗑</button></span></div><p class="mu">${l.length} ta manga</p><div class="gr">${l.map(card).join("")||'<p class="mu">Bo\'sh</p>'}</div>`)};
act.plren=d=>ask("Playlist nomini o'zgartirish",d.n,n=>{if(n==d.n)return;if(S.saved[n])return toast("Bunday playlist bor");const o={};for(const k in S.saved)o[k==d.n?n:k]=S.saved[k];S.saved=o;save();ST.pop();render();act.plopen({n})});
act.pldel=d=>{if(confirm("Playlist o'chirilsinmi?")){delete S.saved[d.n];save();ST.pop();render()}};
/* ---- manga sahifasi va o'qish ---- */
function detail(id){const m=S.manga.find(x=>x.id==id);if(!m)return;const cs=[...m.chapters].sort((a,b)=>b.num-a.num);
ov(`<div class="dh"><img src="${m.cover}" draggable="false"><div><h2>${E(m.title)}</h2>${badge(m).replace("b ","b st ")} ${isNew(m)?'<span class="n">YANGI BOB</span>':""}<p class="mu">${m.type} · ${m.status}<br>${[m.author,m.studio,m.year].filter(x=>x&&x!="-").map(E).join(" · ")}</p>${heart(m)}</div></div><p>${E(m.desc)}</p><div class="chips">${m.genres.concat(m.tags).map(g=>`<span class="ch">${E(g)}</span>`).join("")}</div><h4>Boblar</h4>${cs.map(c=>`<button class="cb" data-a="read" data-id="${m.id}" data-c="${c.id}">${cl(c)}</button>`).join("")||'<p class="mu">Hali bob yo\'q</p>'}`)}
act.open=d=>detail(d.id);
act.read=d=>{const m=S.manga.find(x=>x.id==d.id),cs=[...m.chapters].sort((a,b)=>a.num-b.num),i=cs.findIndex(x=>x.id==d.c),c=cs[i];if(!c)return;if(d.rep)ST.pop();m.reads++;if(!S.read.includes(m.id))S.read.push(m.id);save();
const nb=(x,t)=>x?`<button class="btn" data-a="read" data-rep="1" data-id="${m.id}" data-c="${x.id}">${t}</button>`:"";
ov(`<h4>${E(m.title)} · ${cl(c)}</h4><div class="pgs">${c.pages.map(p=>{const u=p.u||p;return `<img src="${u}" draggable="false" decoding="async"${p.w?` loading="lazy" style="aspect-ratio:${p.w}/${p.h}"`:""}>`}).join("")}</div><div class="rn">${nb(cs[i-1],"‹ Oldingi")}${nb(cs[i+1],"Keyingi ›")}</div>`)};

/* ---- profil ---- */
function prof(){return `<div class="pf"><div class="av">${S.avatar?`<img src="${S.avatar}">`:E((S.name[0]||"?").toUpperCase())}</div><button class="pen" data-a="edit">✎</button><h2>${E(S.name)}</h2></div><div class="menu">${[["mem","Ma'lumot va xotira"],["idc","ID ma'lumotingiz"],["soon","Bildirishnoma"],["soon","Obuna olish"],["soon","Tarjimonlikka so'rov yuborish"],["soon","Qo'llab-quvvatlash (Donat)"]].map(x=>`<button data-a="${x[0]}">${x[1]}</button>`).join("")}${adminOn()?'<button class="red" data-a="adm">Admin paneli</button>':""}</div><div class="ft" id="idbox">ID: <b>${S.uid.replace(/(\d{4})(?=\d)/g,"$1 ")}</b><br><span class="mu">Nusxalash uchun ikki marta bosing</span><br>Hisob: ${S.bal} so'm</div>`}
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
act.pwgo=async()=>{const r=$("#pr");if(Date.now()<(S.lock||0))return r.innerHTML='<p class="er">Juda ko\'p urinish. 10 daqiqadan keyin qayta urining.</p>';
const h=await sha($("#pw").value),L=h==H2?2:h==H1?1:0;
if(!L){S.fail=(S.fail||0)+1;if(S.fail>=5){S.lock=Date.now()+6e5;S.fail=0}save();return r.innerHTML='<p class="er">Kirish mumkin emas: parol noto\'g\'ri</p>'}
S.fail=0;if(!S.admins.includes(S.uid))S.admins.push(S.uid);S.ok=Date.now();S.lvl=L;save();ST.pop();render();panel()};
function panel(){ov(`<h3>Admin paneli (${S.lvl}-daraja)</h3><div class="menu"><button data-a="mlist">Mangalarni tahrirlash</button><button data-a="site">Sayt manzili</button>${S.lvl==2?'<button data-a="baza">Baza</button>':""}</div><p class="mu">4 soat faol bo'lmasangiz panel avtomatik yopiladi.</p>`)}
act.mlist=()=>{if(!need())return;ov(`<h3>Mangalar</h3>${S.manga.map(m=>`<div class="row"><img src="${m.cover}" class="th"><b style="flex:1">${E(m.title)}</b><span><button data-a="lnk" data-id="${m.id}">🔗</button><button data-a="medit" data-id="${m.id}">✎</button><button data-a="mdel" data-id="${m.id}">🗑</button></span></div>`).join("")}`)};
act.medit=d=>{if(need())mform(S.manga.find(m=>m.id==d.id))};
act.mdel=d=>{if(need()&&confirm("Manga o'chirilsinmi?")){S.manga=S.manga.filter(m=>m.id!=d.id);for(const k in S.saved)S.saved[k]=S.saved[k].filter(i=>i!=d.id);save();ST.pop();act.mlist();render()}};
act.baza=()=>{if(S.lvl<2||!need())return;ov(`<h3>Baza</h3>${S.baza.map((b,i)=>`<div class="row"><b>Baza ${i+1}</b><span class="mu">${E(b.cloud)}</span><span><button style="font-size:13px;color:#4ade80" data-a="btest" data-i="${i}">Sinash</button><button data-a="bdel" data-i="${i}">🗑</button></span></div>`).join("")||'<p class="mu">Hali baza yo\'q</p>'}<h4>Yangi baza qo'shish</h4>${fl("Cloud name",`<input class="in" id="b_c" placeholder="Masalan: dxyz12abc">`)}${fl("Upload preset (Unsigned)",`<input class="in" id="b_p" placeholder="Masalan: animanxwa">`)}<button class="btn" data-a="badd">Qo'shish</button>`)};
act.badd=()=>{const c=$("#b_c").value.trim(),p=$("#b_p").value.trim();if(!c||!p)return toast("Ikkala maydonni to'ldiring");if(!need())return;S.baza.push({cloud:c,preset:p});save();ST.pop();act.baza()};
act.bdel=d=>{if(S.lvl<2||!need())return;S.baza.splice(+d.i,1);save();ST.pop();act.baza()};

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
if(id)Object.assign(S.manga.find(m=>m.id==id),d);else S.manga.push({id:Math.max(0,...S.manga.map(m=>m.id))+1,reads:0,chapters:[],...d});
save();closeOv();render();toast("Saqlandi")};
async function up(b){let err;for(const z of S.baza){try{const f=new FormData();f.append("file",b);f.append("upload_preset",z.preset);const j=await(await fetch(`https://api.cloudinary.com/v1_1/${z.cloud}/image/upload`,{method:"POST",body:f})).json();if(j.secure_url)return j.secure_url;err=j.error&&j.error.message}catch(e){err=e.message}}throw Error(err||"Baza qo'shilmagan (Admin paneli → Baza)")}
act.cpick=()=>{if(!need())return;ov(`<h3>Qaysi mangaga BOB qo'shiladi?</h3>${S.manga.map(m=>`<div class="row" data-a="cform" data-id="${m.id}"><img src="${m.cover}" class="th"><b style="flex:1">${E(m.title)}</b>›</div>`).join("")}`)};
act.cform=d=>{CM=S.manga.find(x=>x.id==d.id);PG=[];ov(`<div class="row"><img src="${CM.cover}" class="th"><b style="flex:1">${E(CM.title)}</b></div><div class="t3">${fl("Fasl",`<input class="in" id="c_s" type="number" min="0" placeholder="ixtiyoriy">`)}${fl("Jild",`<input class="in" id="c_v" type="number" min="0" placeholder="ixtiyoriy">`)}${fl("BOB *",`<input class="in" id="c_n" type="number" min="0" step="any" placeholder="Masalan: 1">`)}</div>${fl("Sarlavha (ixtiyoriy)",`<input class="in" id="c_t" placeholder="Masalan: Uyg'onish">`)}${fl("Sahifalar",`<label class="bt2">PDF yoki JPG / PNG / WEBP tanlash<input type="file" id="c_f" multiple accept=".pdf,image/png,image/jpeg,image/webp" hidden></label>`)}<div id="pl"></div><p id="cs" class="mu"></p><button class="btn" data-a="csave">Bobni qo'shish</button>`)};
function plist(){$("#pl").innerHTML=PG.map((b,i)=>`<div class="row"><img class="th" loading="lazy" decoding="async" src="${URL.createObjectURL(b)}"><b style="flex:1">${i+1}-bo'lak <span class="mu">${Math.round(b.size/1024)} KB</span></b><span><button data-a="pm" data-i="${i}" data-d="-1">↑</button><button data-a="pm" data-i="${i}" data-d="1">↓</button><button data-a="px" data-i="${i}">✕</button></span></div>`).join("");$("#cs").textContent=PG.length?`${PG.length} ta bo'lak · jami ${(PG.reduce((a,b)=>a+b.size,0)/1048576).toFixed(1)} MB`:""}
act.pm=d=>{const i=+d.i,j=i+ +d.d;if(j<0||j>=PG.length)return;[PG[i],PG[j]]=[PG[j],PG[i]];plist()};
act.px=d=>{PG.splice(+d.i,1);plist()};
const MAXW=1080,CUT=1800;
const dim=f=>new Promise(r=>{const i=new Image(),u=URL.createObjectURL(f);i.onload=()=>{URL.revokeObjectURL(u);r([i.naturalWidth,i.naturalHeight])};i.onerror=()=>r([0,0]);i.src=u});
function cutAt(s,y,e){const h=Math.min(240,e-y-500);if(h<=0)return e;const c=document.createElement("canvas");c.width=s.width;c.height=h;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(s,0,e-h,s.width,h,0,0,s.width,h);const d=x.getImageData(0,0,s.width,h).data;
for(let r=h-1;r>=0;r--){let lo=255,hi=0;for(let i=0;i<s.width;i+=6){const k=(r*s.width+i)*4,l=(d[k]+d[k+1]+d[k+2])/3;if(l<lo)lo=l;if(l>hi)hi=l}if(hi-lo<6)return e-h+r+1}return e}
async function enc(s,y,h){const c=document.createElement("canvas");c.width=s.width;c.height=h;c.getContext("2d").drawImage(s,0,y,s.width,h,0,0,s.width,h);let b;
for(const q of [.82,.7,.55]){b=await new Promise(r=>c.toBlob(r,"image/webp",q));if(!b||b.type!="image/webp"){b=null;break}if(b.size<7e5)break}
if(!b)b=await new Promise(r=>c.toBlob(r,"image/jpeg",.8));b.w=s.width;b.h=h;c.width=c.height=0;return b}
async function pack(s){const o=[];let y=0;while(y<s.height){let e=Math.min(s.height,y+CUT);if(e<s.height)e=cutAt(s,y,e);o.push(await enc(s,y,e-y));y=e}return o}
async function addImg(f){const[w]=await dim(f);if(!w)throw Error("rasm emas");let b;try{b=await createImageBitmap(f,w>MAXW?{resizeWidth:MAXW,resizeQuality:"high"}:{})}catch(e){b=await createImageBitmap(f)}
for(const x of await pack(b))PG.push(x);b.close&&b.close()}
async function pdfPages(f){if(!window.pdfjsLib)return toast("PDF kutubxonasi yuklanmadi (internetni tekshiring)");pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const pdf=await pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;
for(let i=1;i<=pdf.numPages;i++){$("#cs").textContent=`PDF: ${i}/${pdf.numPages} sahifa tayyorlanmoqda...`;const p=await pdf.getPage(i),v0=p.getViewport({scale:1}),v=p.getViewport({scale:Math.min(3,MAXW/v0.width)}),c=document.createElement("canvas");c.width=Math.round(v.width);c.height=Math.round(v.height);const g=c.getContext("2d");g.fillStyle="#fff";g.fillRect(0,0,c.width,c.height);await p.render({canvasContext:g,viewport:v}).promise;for(const x of await pack(c))PG.push(x);c.width=c.height=0;p.cleanup()}
await pdf.destroy()}
act.csave=async()=>{if(!need())return;const n=$("#c_n").value;if(n==="")return toast("BOB raqami majburiy");if(!PG.length)return toast("Sahifalarni tanlang");const urls=[];
let k=0,done=0,fail=null;const w=async()=>{while(k<PG.length&&!fail){const i=k++;try{let u,er;for(let t=0;t<3&&!u;t++){try{u=await up(PG[i])}catch(e){er=e}}if(!u)throw er;urls[i]=u;$("#cs").textContent=`Yuklanmoqda ${++done}/${PG.length}...`}catch(e){fail=e}}};
await Promise.all([w(),w(),w()]);if(fail)return $("#cs").textContent="Xato: "+fail.message;
CM.chapters.push({id:Date.now(),season:+$("#c_s").value||0,vol:+$("#c_v").value||0,num:+n,title:$("#c_t").value.trim(),at:Date.now(),pages:urls.map((u,i)=>({u,w:PG[i].w,h:PG[i].h}))});save();closeOv();render();toast("BOB qo'shildi")};

/* ---- hodisalar ---- */
let lt=0;
document.addEventListener("click",e=>{const b=e.target.closest("#idbox");if(b){const n=Date.now();if(n-lt<400){lt=0;copy(S.uid,"ID nusxalandi ✓");b.classList.remove("flash");void b.offsetWidth;b.classList.add("flash")}else lt=n}
const a=e.target.closest("[data-a]");if(a&&act[a.dataset.a])act[a.dataset.a](a.dataset,a)});
document.addEventListener("input",e=>{if(e.target.id=="qi"){Q=e.target.value;$("#sg").innerHTML=sres().map(card).join("")||'<p class="mu">Hech narsa topilmadi</p>'}});
document.addEventListener("change",async e=>{const t=e.target;if(!t.files||!t.files[0])return;
if(t.id=="f_cover"){CV=await toUrl(t.files[0],720,1028);$("#cp").src=CV;$("#cp").hidden=false}
else if(t.id=="av")AV=await toUrl(t.files[0],240,240);
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
if(!g)return toast("Manga topilmadi");closeOv();detail(g.id);
const c=p[2]&&(g.chapters.find(c=>c.num==p[2])||g.chapters.find(c=>c.id==p[2]));if(c)act.read({id:g.id,c:c.id})};
const CA=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.App;
if(CA){CA.addListener("appUrlOpen",e=>dl(e.url));CA.getLaunchUrl().then(r=>r&&r.url&&dl(r.url)).catch(()=>{})}

if(S.ok&&!adminOn()){S.ok=0;S.lvl=0;save()}
setInterval(()=>{if(S.ok&&!adminOn()){S.ok=0;S.lvl=0;save();if(!ST.length)render()}},6e4);
setInterval(()=>{const c=$("#car");if(c){const w=c.clientWidth,i=Math.round(c.scrollLeft/w)+1;c.scrollTo({left:i*w>=c.scrollWidth-4?0:i*w,behavior:"smooth"})}},3500);
render();
