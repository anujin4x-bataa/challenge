/* ============================================================
   LOCK-IN 45 — v6 UX REDESIGN
   All logic preserved from v5. Only layout/rendering changed.
   ============================================================ */
const HABITS=[{id:'steps',name:'10,000 Steps',icon:'🚶',desc:'Walk or run 10k steps'},{id:'workout',name:'45 Min Workout',icon:'💪',desc:'45 min exercise',detail:true},{id:'water',name:'2–2.5L Water',icon:'💧',desc:'Stay hydrated'},{id:'sleep',name:'7–8h Sleep',icon:'😴',desc:'Quality rest',detail:true},{id:'no_sugar',name:'No Sugar',icon:'🚫',desc:'Zero added sugar'},{id:'no_noodles',name:'No Noodles',icon:'🍜',desc:'Clean eating'}];
const WTYPES=['Gym','Cardio','Calisthenics','HIIT','Yoga','Swimming','Running','Boxing','CrossFit','Sports','Stretching','Other'];
const DETOX_HABITS=[{id:'no_social',name:'No Social Media',icon:'📵',desc:'No Instagram, TikTok, Twitter'},{id:'no_junk',name:'No Junk Food',icon:'🚫',desc:'No chips, candy, fast food'},{id:'no_youtube',name:'No YouTube',icon:'📺',desc:'No mindless scrolling'}];
const ACHS=[{id:'d1',n:'Day One',i:'🎯',r:'d',v:1},{id:'s3',n:'3 Day',i:'🔥',r:'s',v:3},{id:'s7',n:'7 Day',i:'🔥',r:'s',v:7},{id:'s14',n:'14 Day',i:'⚡',r:'s',v:14},{id:'s21',n:'21 Day',i:'💎',r:'s',v:21},{id:'s30',n:'30 Day',i:'👑',r:'s',v:30},{id:'s45',n:'45 Day',i:'🏆',r:'s',v:45},{id:'pw',n:'Perfect Wk',i:'⭐',r:'pw',v:1},{id:'half',n:'Halfway',i:'🏔️',r:'d',v:23},{id:'done',n:'Complete',i:'🏆',r:'d',v:45},{id:'ph1',n:'First Photo',i:'📸',r:'ph',v:1},{id:'b5',n:'Body Track',i:'📏',r:'b',v:5}];
const COACH={m:["New day. Let's go.","Rise and grind.","Lock in. No distractions.","Discipline over motivation.","Build the person you want to become."],d:["PERFECT DAY. Elite.","All habits done. Locked in.","100%. This is discipline.","Every box checked. Champion."],p:["Not perfect, but you showed up.","Progress > perfection.","Bounce back tomorrow.","Partial beats zero. Keep going."],s:["🔥 {s} days! Unstoppable.","🔥 {s} day streak!","🔥 {s} days locked in."],ms:{7:"ONE WEEK. The hardest part is done.",14:"TWO WEEKS. This is a lifestyle.",21:"21 DAYS. Habit formed.",30:"30 DAYS. Different person.",45:"COMPLETE. Legendary."},e:["Your only competition is yesterday.","Hard choices, easy life.","Consistency > intensity.","Don't break the chain."]};
const MEAL_TYPES=['Breakfast','Lunch','Dinner','Snack'];
const TH=4,TD=45;

// === STORAGE ===
const L={g(k){try{return JSON.parse(localStorage.getItem('li_'+k))}catch{return null}},s(k,v){localStorage.setItem('li_'+k,JSON.stringify(v))},r(k){localStorage.removeItem('li_'+k)}};
const td=()=>new Date().toISOString().split('T')[0];
const fs=d=>new Date(d+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'});
const ff=d=>new Date(d+'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
const dB=(a,b)=>Math.floor((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/864e5);
const rF=a=>a[Math.floor(Math.random()*a.length)];
const dR=(s,n)=>{const d=[];const st=new Date(s+'T12:00:00');for(let i=0;i<n;i++){const x=new Date(st);x.setDate(x.getDate()+i);d.push(x.toISOString().split('T')[0])}return d};
const gCD=s=>Math.max(1,Math.min(dB(s,td())+1,TD));
const cS=h=>HABITS.filter(x=>h[x.id]).length/HABITS.length;
const dSt=s=>s>=TH/HABITS.length?'s':s>0?'p':'f';

function toast(m,i='✅'){const b=document.getElementById('tBox'),t=document.createElement('div');t.className='toast';t.innerHTML=`<span>${i}</span><span>${m}</span>`;b.appendChild(t);setTimeout(()=>t.remove(),4200)}
function celebrate(){const o=document.createElement('div');o.className='confetti';document.body.appendChild(o);const c=['#c8ff00','#a8d900','#ffc107','#00d4ff','#ff8c42'];for(let i=0;i<30;i++){const p=document.createElement('div');p.className='ptc';p.style.left=Math.random()*100+'%';p.style.top='-10px';p.style.background=c[Math.floor(Math.random()*c.length)];p.style.animationDelay=Math.random()*.5+'s';p.style.animationDuration=(1+Math.random())+'s';o.appendChild(p)}setTimeout(()=>o.remove(),2500)}

// === DATA LAYER (unchanged) ===
const gU=()=>L.g('user');const sU=u=>{L.s('user',u);return u};
function gH(d){const a=L.g('hab')||[];let r=a.find(h=>h.date===d);if(!r){r={date:d,rest:false,jnl:'',cs:0,detox:false};HABITS.forEach(h=>r[h.id]=false)}return r}
function sH(d,data){const a=L.g('hab')||[];data.cs=cS(data);data.ts=new Date().toISOString();const i=a.findIndex(h=>h.date===d);if(i>=0)a[i]={...a[i],...data,date:d};else a.push({...data,date:d,id:d});L.s('hab',a)}
const gAH=()=>L.g('hab')||[];
const gSl=d=>(L.g('slp')||[]).find(s=>s.date===d)||null;
function sSl(d,data){const a=L.g('slp')||[];const i=a.findIndex(s=>s.date===d);if(i>=0)a[i]={...data,date:d};else a.push({...data,date:d});L.s('slp',a)}
const gAS=()=>L.g('slp')||[];
const gWo=d=>(L.g('wo')||[]).find(w=>w.date===d)||null;
function sWo(d,data){const a=L.g('wo')||[];const i=a.findIndex(w=>w.date===d);if(i>=0)a[i]={...data,date:d};else a.push({...data,date:d});L.s('wo',a)}
const gAW=()=>L.g('wo')||[];
const gAB=()=>L.g('body')||[];
function sBE(d,data){const a=gAB();const i=a.findIndex(e=>e.date===d);if(i>=0)a[i]={...a[i],...data,date:d};else a.push({...data,date:d,id:d});L.s('body',a)}
const gAch=()=>L.g('ach')||[];
function uAch(def){const a=gAch();if(a.find(x=>x.id===def.id))return false;a.push({...def,du:td()});L.s('ach',a);return true}
function cStrk(u){const a=gAH();if(!a.length||!u)return{c:0,l:0};const dn=gCD(u.start_date);const dates=dR(u.start_date,dn);let t=0,l=0;const today=td();for(const d of dates){const rec=a.find(h=>h.date===d);const sc=rec?rec.cs:0;const rest=rec?rec.rest:false;if(sc>=TH/HABITS.length||rest){t++;l=Math.max(l,t)}else if(d<today){t=0}}return{c:t,l}}
function getDH(date){return L.g('detox_'+date)||{no_social:false,no_junk:false,no_youtube:false}}
function sDH(date,data){L.s('detox_'+date,data)}
function getReflection(date){return L.g('ref_'+date)||null}
function saveReflectionData(date,data){L.s('ref_'+date,data)}
function getNutSettings(){return L.g('nutset')||null}
function saveNutSettingsData(d){L.s('nutset',d)}
function getMeals(date){return(L.g('meals')||[]).filter(m=>m.date===date)}
function getAllMeals(){return L.g('meals')||[]}
function addMeal(meal){const a=L.g('meals')||[];meal.id=Date.now().toString(36);a.push(meal);L.s('meals',a)}
function delMeal(id){const a=(L.g('meals')||[]).filter(m=>m.id!==id);L.s('meals',a)}

// === RING HELPER ===
function setRing(id,pct){const el=document.getElementById(id);if(!el)return;const r=52,circ=2*Math.PI*r;el.style.strokeDasharray=circ;el.style.strokeDashoffset=circ-(circ*Math.min(pct,100)/100)}

// === COLLAPSIBLE INSIGHT ===
function toggleInsight(header){header.classList.toggle('open');const body=header.nextElementSibling;body.classList.toggle('open')}

// === THEME ===
function initTh(){const t=localStorage.getItem('li_th')||'dark';document.documentElement.setAttribute('data-theme',t);document.getElementById('thB').textContent=t==='dark'?'☀️':'🌙'}
function toggleTheme(){const c=document.documentElement.getAttribute('data-theme'),n=c==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);localStorage.setItem('li_th',n);document.getElementById('thB').textContent=n==='dark'?'☀️':'🌙';if(cPg==='pg-p')setTimeout(renderProg,100);if(cPg==='pg-b')setTimeout(renderBCh,100);if(cPg==='pg-n')setTimeout(renderCalChart,100)}

// === MODAL ===
function openM(id){document.getElementById(id).classList.add('on')}
function closeM(id){document.getElementById(id).classList.remove('on')}
document.querySelectorAll('.modal-bg').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('on')}));

// === NAV ===
let cPg='pg-d';const charts={};
document.querySelectorAll('.nav-tab').forEach(b=>{b.addEventListener('click',()=>{document.querySelectorAll('.nav-tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));b.classList.add('active');const pg=b.dataset.page;document.getElementById(pg).classList.add('active');cPg=pg;if(pg==='pg-d')renderD();if(pg==='pg-n')renderNut();if(pg==='pg-p')renderProg();if(pg==='pg-b')renderBody();if(pg==='pg-pr')renderProf();window.scrollTo(0,0)})});

// === SETUP ===
function doSetup(){const n=document.getElementById('s-name').value.trim(),d=document.getElementById('s-date').value;if(!n){toast('Enter name','⚠️');return}if(!d){toast('Pick date','⚠️');return}sU({id:'u1',name:n,start_date:d});document.getElementById('setup').classList.remove('on');initApp()}
document.getElementById('s-name').addEventListener('keypress',e=>{if(e.key==='Enter')doSetup()});
document.getElementById('s-date').value=td();

// === COACH ===
function getCoach(h){const d=HABITS.filter(x=>h[x.id]).length,sc=d/HABITS.length,u=gU(),st=cStrk(u);if(st.c>0&&COACH.ms[st.c])return COACH.ms[st.c];if(st.c>=3)return rF(COACH.s).replace('{s}',st.c);if(sc===1)return rF(COACH.d);if(d>0)return rF(COACH.p);return new Date().getHours()<12?rF(COACH.m):rF(COACH.e)}

// ==================== DASHBOARD ====================
let tH=null;
function renderD(){
  const u=gU();if(!u)return;
  tH=gH(td());
  const dn=gCD(u.start_date),st=cStrk(u),all=gAH();
  const cd=all.filter(h=>h.cs>=TH/HABITS.length).length;
  const tDone=HABITS.filter(h=>tH[h.id]).length;
  const tPct=Math.round(tDone/HABITS.length*100);
  const prog=Math.round(dn/TD*100);

  // Zone 1: Status
  document.getElementById('topBadge').textContent=`Day ${dn} / ${TD}`;
  document.getElementById('heroDay').textContent=dn;
  setRing('heroRingFill',prog);
  document.getElementById('hStreak').textContent=st.c;
  document.getElementById('hBest').textContent=st.l;
  document.getElementById('hToday').textContent=tPct+'%';

  // Daily score
  const score=calcDailyScore();
  const col=score>=80?'var(--acc)':score>=60?'#7dff7d':score>=40?'var(--yel)':'var(--red)';
  document.getElementById('dsVal').textContent=score;
  document.getElementById('dsVal').style.color=col;
  setRing('dsRingFill',score);
  const dsF=document.getElementById('dsRingFill');
  if(dsF)dsF.style.stroke=col;

  // Zone 2: Coach
  document.getElementById('coachMsg').textContent=getCoach(tH);

  // Zone 3: Toggles
  document.getElementById('restT').checked=tH.rest||false;
  document.getElementById('detoxT').checked=tH.detox||false;
  const dc=document.getElementById('detoxCard');
  if(tH.detox)dc.classList.add('detox-on');else dc.classList.remove('detox-on');

  // Zone 4: Habits
  const el=document.getElementById('habList');el.innerHTML='';
  HABITS.forEach(h=>{const done=tH[h.id]||false;const div=document.createElement('div');div.className=`habit ${done?'done':''}`;
    div.innerHTML=`<div class="hchk">${done?'✓':''}</div><div class="h-info"><div class="h-name">${h.icon} ${h.name}</div><div class="h-desc">${h.desc}</div></div>${done&&tH[h.id+'_t']?`<div class="h-meta">${tH[h.id+'_t']}</div>`:''}${h.detail?`<button class="h-detail" data-h="${h.id}">Log</button>`:''}`;
    div.addEventListener('click',e=>{if(e.target.classList.contains('h-detail'))return;toggleH(h.id)});
    if(h.detail)div.querySelector('.h-detail').addEventListener('click',e=>{e.stopPropagation();h.id==='sleep'?openSl():openWo()});
    el.appendChild(div);
  });

  // Detox habits if active
  if(tH.detox){
    const dh=getDH(td());
    DETOX_HABITS.forEach(h=>{
      const done=dh[h.id]||false;
      const div=document.createElement('div');
      div.className=`habit detox-h ${done?'done':''}`;
      div.innerHTML=`<div class="hchk">${done?'✓':''}</div><div class="h-info"><div class="h-name">${h.icon} ${h.name}</div><div class="h-desc">${h.desc}</div></div>`;
      div.addEventListener('click',()=>toggleDetoxH(h.id));
      el.appendChild(div);
    });
  }

  // Zone 5: Insights
  document.getElementById('jInput').value=tH.jnl||'';
  renderSlpC();renderWoC();
  renderHM('hm1',u);renderBdg('bd1');
  renderReflectionSummary();renderWeeklyReportCard();
  document.getElementById('achCount').textContent=`${gAch().length}/${ACHS.length}`;
  checkAch();
}

function toggleH(id){const nv=!tH[id];tH[id]=nv;if(nv)tH[id+'_t']=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});sH(td(),tH);renderD();if(HABITS.every(h=>tH[h.id])){toast('PERFECT DAY!','🎯');celebrate()}else if(nv){toast(`${HABITS.find(h=>h.id===id).icon} Done!`);if(id==='sleep'&&!gSl(td()))setTimeout(openSl,400);if(id==='workout'&&!gWo(td()))setTimeout(openWo,400)}}
function toggleRest(c){tH.rest=c;sH(td(),tH);renderD();if(c)toast('Rest day.','😴')}
function toggleDetox(c){tH.detox=c;sH(td(),tH);renderD();if(c)toast('🧠 Detox ON','🔴')}
function toggleDetoxH(id){const dh=getDH(td());dh[id]=!dh[id];sDH(td(),dh);renderD();if(dh[id])toast(`${DETOX_HABITS.find(h=>h.id===id).icon} Done!`)}
let jT;document.getElementById('jInput').addEventListener('input',e=>{clearTimeout(jT);jT=setTimeout(()=>{tH.jnl=e.target.value;sH(td(),tH)},800)});

// Daily score
function calcDailyScore(){const u=gU();if(!u)return 0;const h=gH(td()),sl=gSl(td()),wo=gWo(td()),meals=getMeals(td()),ref=getReflection(td());let s=0;HABITS.forEach(hab=>{if(h[hab.id])s+=10});if(h.detox){const dh=getDH(td());['no_social','no_junk','no_youtube'].forEach(x=>{if(dh[x])s+=5})}if(sl&&sl.sc)s+=Math.round(sl.sc/100*10);else if(h.sleep)s+=5;if(wo)s+=wo.dur>=45?5:wo.dur>=30?3:2;if(meals.length>0)s+=5;if(ref)s+=5;if(h.jnl&&h.jnl.length>10)s+=5;return Math.min(s,100)}

// Sleep
function openSl(){const x=gSl(td());document.getElementById('sl-sc').value=x?x.sc:'';document.getElementById('sl-dur').value=x?x.dur:'';document.getElementById('sl-q').value=x?x.q:'';document.getElementById('sl-deep').value=x?x.deep:'';document.getElementById('sl-rem').value=x?x.rem:'';document.getElementById('sl-light').value=x?x.light:'';document.getElementById('sl-notes').value=x?x.notes:'';openM('sleepM')}
function saveSleep(){const data={sc:parseInt(document.getElementById('sl-sc').value)||null,dur:document.getElementById('sl-dur').value.trim(),q:document.getElementById('sl-q').value,deep:document.getElementById('sl-deep').value.trim(),rem:document.getElementById('sl-rem').value.trim(),light:document.getElementById('sl-light').value.trim(),notes:document.getElementById('sl-notes').value.trim()};sSl(td(),data);closeM('sleepM');toast('😴 Sleep saved!');if(!tH.sleep){tH.sleep=true;tH.sleep_t=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});sH(td(),tH)}renderD()}

function renderSlpC(){const el=document.getElementById('slpCard');const d=gSl(td());if(!d||!d.sc){el.innerHTML='';return}
  el.innerHTML=`<div class="mini-sum"><span class="ms-icon">😴</span><span class="ms-text">${d.q||'Sleep'} · ${d.dur||''} ${d.deep?'· Deep '+d.deep:''}</span><span class="ms-val">${d.sc}/100</span></div>`}

// Workout
let selWT='';
function openWo(){const x=gWo(td());selWT=x?x.type:'';document.getElementById('wo-dur').value=x?x.dur:'';document.getElementById('wo-int').value=x?x.int:'';document.getElementById('wo-notes').value=x?x.notes:'';renderWT();openM('workM')}
function renderWT(){const el=document.getElementById('wtList');el.innerHTML='';WTYPES.forEach(t=>{const d=document.createElement('div');d.className=`wt ${t===selWT?'sel':''}`;d.textContent=t;d.addEventListener('click',()=>{selWT=t;renderWT()});el.appendChild(d)})}
function saveWorkout(){if(!selWT){toast('Pick type','⚠️');return}sWo(td(),{type:selWT,dur:parseInt(document.getElementById('wo-dur').value)||null,int:document.getElementById('wo-int').value,notes:document.getElementById('wo-notes').value.trim()});closeM('workM');toast('💪 Workout logged!');if(!tH.workout){tH.workout=true;tH.workout_t=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});sH(td(),tH)}renderD()}

function renderWoC(){const el=document.getElementById('woCard');const d=gWo(td());if(!d){el.innerHTML='';return}
  el.innerHTML=`<div class="mini-sum"><span class="ms-icon">💪</span><span class="ms-text">${d.type||'Workout'} ${d.int?'· '+d.int:''} ${d.dur?'· '+d.dur+'m':''}</span><span class="ms-val">${d.type?'✓':''}</span></div>`}

// Reflection
let refEnergy=0;
function openReflection(){const x=getReflection(td());document.getElementById('ref-good').value=x?x.good:'';document.getElementById('ref-improve').value=x?x.improve:'';refEnergy=x?x.energy:0;renderEnergyStars();openM('reflectM')}
function renderEnergyStars(){const el=document.getElementById('energyStars');el.innerHTML='';for(let i=1;i<=5;i++){const s=document.createElement('span');s.className=`star ${i<=refEnergy?'on':''}`;s.textContent='⭐';s.addEventListener('click',()=>{refEnergy=i;renderEnergyStars()});el.appendChild(s)}}
function saveReflection(){const data={good:document.getElementById('ref-good').value.trim(),improve:document.getElementById('ref-improve').value.trim(),energy:refEnergy};if(!data.good&&!data.improve&&!refEnergy){toast('Fill at least one','⚠️');return}saveReflectionData(td(),data);closeM('reflectM');toast('🌙 Reflection saved!');renderD()}

function renderReflectionSummary(){const el=document.getElementById('reflectSummary');const ref=getReflection(td());const btn=document.getElementById('reflectBtn');if(!ref){el.style.display='none';btn.style.display='';return}el.style.display='';btn.style.display='none';
  let stars='';for(let i=0;i<ref.energy;i++)stars+='⭐';
  el.innerHTML=`<div class="reflect-done"><div class="rd-q">Did well:</div><div>${ref.good||'—'}</div><div class="rd-q">Will improve:</div><div>${ref.improve||'—'}</div>${ref.energy?`<div class="rd-q">Energy: ${stars}</div>`:''}<button class="btn btn-s btn-sm" onclick="openReflection()" style="margin-top:8px">Edit</button></div>`}

// Morning greeting
function showMorningGreeting(){const u=gU();if(!u)return;if(localStorage.getItem('li_lastgreet')===td())return;const hr=new Date().getHours();let g='Good morning';if(hr>=12&&hr<17)g='Good afternoon';if(hr>=17)g='Good evening';document.getElementById('grName').textContent=u.name;document.querySelector('.gr-hello').textContent=g;document.getElementById('grDay').textContent=`Day ${gCD(u.start_date)} of your Lock-In`;document.getElementById('grMsg').textContent=rF(["Let's win today.","Make today count.","Stay locked in.","Execute relentlessly.","No excuses."]);document.getElementById('greetOv').classList.add('on')}
function dismissGreeting(){document.getElementById('greetOv').classList.remove('on');localStorage.setItem('li_lastgreet',td())}

// Weekly report
function checkWeeklyReport(){const u=gU();if(!u)return;const dn=gCD(u.start_date);if(dn%7!==0||dn<7)return;if(localStorage.getItem('li_lastreport')===td())return;setTimeout(()=>showWeeklyReport(dn),1500)}
function showWeeklyReport(dayNum){const u=gU();const wn=Math.floor(dayNum/7);const all=gAH();const dates=dR(u.start_date,dayNum);const wd=dates.slice(dayNum-7,dayNum);let hc=0,tt=0,pf=0;const hCounts={};HABITS.forEach(h=>hCounts[h.id]=0);wd.forEach(d=>{const rec=all.find(h=>h.date===d);if(rec){const done=HABITS.filter(h=>rec[h.id]).length;hc+=done;tt+=HABITS.length;if(rec.cs===1)pf++;HABITS.forEach(h=>{if(rec[h.id])hCounts[h.id]++})}else tt+=HABITS.length});const rate=tt>0?Math.round(hc/tt*100):0;const sorted=Object.entries(hCounts).sort((a,b)=>b[1]-a[1]);const str=HABITS.find(h=>h.id===sorted[0][0]);const weak=HABITS.find(h=>h.id===sorted[sorted.length-1][0]);let tE=0,eC=0;wd.forEach(d=>{const r=getReflection(d);if(r&&r.energy){tE+=r.energy;eC++}});const aE=eC>0?(tE/eC).toFixed(1):'—';const st=cStrk(u);
  document.getElementById('weekReportContent').innerHTML=`<div style="text-align:center;margin-bottom:14px"><div style="font-size:1.8rem;margin-bottom:4px">📊</div><div style="font-size:.6rem;color:var(--t3);font-weight:700;text-transform:uppercase;letter-spacing:1px">Week ${wn}</div><div style="font-family:var(--fm);font-size:2rem;font-weight:700;color:var(--acc);margin:6px 0">${rate}%</div><div style="font-size:.75rem;color:var(--t2)">completion</div></div><div class="wr-grid"><div class="wr-item"><div class="wi-label">Habits</div><div class="wi-val">${hc}/${tt}</div></div><div class="wr-item"><div class="wi-label">Perfect</div><div class="wi-val">${pf}/7</div></div><div class="wr-item"><div class="wi-label">Strongest</div><div class="wi-val">${str?str.icon:''}</div><div class="wi-text">${str?str.name:'—'}</div></div><div class="wr-item"><div class="wi-label">Needs Work</div><div class="wi-val">${weak?weak.icon:''}</div><div class="wi-text">${weak?weak.name:'—'}</div></div><div class="wr-item"><div class="wi-label">Streak</div><div class="wi-val">🔥 ${st.c}</div></div><div class="wr-item"><div class="wi-label">Energy</div><div class="wi-val">${aE} ⭐</div></div></div>`;
  openM('weekReportM');localStorage.setItem('li_lastreport',td())}

function renderWeeklyReportCard(){const u=gU();if(!u)return;const el=document.getElementById('weeklyReportCard');const dn=gCD(u.start_date);const wn=Math.floor(dn/7);if(wn<1){el.style.display='none';return}el.style.display='';el.innerHTML=`<button class="btn btn-s btn-sm btn-full" onclick="showWeeklyReport(${wn*7})" style="margin-bottom:12px">📊 Week ${wn} Report</button>`}

// Heatmap & Badges
function renderHM(id,u){const g=document.getElementById(id);if(!g)return;const a=gAH(),dates=dR(u.start_date,TD),t=td();g.innerHTML='';dates.forEach((d,i)=>{const rec=a.find(h=>h.date===d);const sc=rec?rec.cs:0;const rest=rec?rec.rest:false;const fu=d>t;const c=document.createElement('div');let cls='';if(fu)cls='fu';else if(rest)cls='s';else if(rec)cls=dSt(sc);c.className=`hc ${cls} ${d===t?'td':''}`;c.textContent=i+1;c.title=`Day ${i+1} · ${fs(d)}`;g.appendChild(c)})}
function renderBdg(id){const g=document.getElementById(id);if(!g)return;const u=gAch();g.innerHTML='';ACHS.forEach(d=>{const a=u.find(x=>x.id===d.id);const c=document.createElement('div');c.className=`bdg ${a?'on':'off'}`;c.innerHTML=`<div class="bdg-icon">${d.i}</div><div class="bdg-name">${d.n}</div><div class="bdg-date">${a?fs(a.du):'—'}</div>`;g.appendChild(c)})}
function checkAch(){const u=gU();if(!u)return;const st=cStrk(u),a=gAH(),b=gAB(),ph=b.filter(x=>x.purl);const cd=a.filter(h=>h.cs>=TH/HABITS.length).length;let pw=0;const dates=dR(u.start_date,gCD(u.start_date));for(let i=0;i+6<dates.length;i+=7){if(dates.slice(i,i+7).every(d=>{const h=a.find(r=>r.date===d);return h&&h.cs===1}))pw++}ACHS.forEach(def=>{let ok=false;if(def.r==='s')ok=st.c>=def.v||st.l>=def.v;if(def.r==='d')ok=cd>=def.v;if(def.r==='pw')ok=pw>=def.v;if(def.r==='ph')ok=ph.length>=def.v;if(def.r==='b')ok=b.length>=def.v;if(ok&&uAch(def)){toast(`🏆 ${def.n}!`);celebrate()}})}

// ==================== PROGRESS ====================
function renderProg(){const u=gU();if(!u)return;const a=gAH(),st=cStrk(u),dn=gCD(u.start_date);const cd=a.filter(h=>h.cs>=TH/HABITS.length).length,pf=a.filter(h=>h.cs===1).length;const tp=(dn-1)*HABITS.length,tDn=a.reduce((s,h)=>s+HABITS.filter(hb=>h[hb.id]).length,0);const rate=tp>0?Math.round(tDn/tp*100):0;
  document.getElementById('pStats').innerHTML=`<div class="stat-card"><div class="s-val">${rate}%</div><div class="s-label">Rate</div></div><div class="stat-card"><div class="s-val">${cd}</div><div class="s-label">Success</div></div><div class="stat-card"><div class="s-val">${pf}</div><div class="s-label">Perfect</div></div><div class="stat-card"><div class="s-val">🔥${st.c}</div><div class="s-label">Streak</div></div><div class="stat-card"><div class="s-val">${st.l}</div><div class="s-label">Best</div></div>`;
  renderHM('hm2',u);Object.keys(charts).forEach(k=>{charts[k].destroy();delete charts[k]});const dates=dR(u.start_date,dn),cc=chC();
  const wks=[];for(let i=0;i<dates.length;i+=7){const wd=dates.slice(i,Math.min(i+7,dates.length));let ts=0,dc=0;wd.forEach(d=>{const r=a.find(h=>h.date===d);if(r){ts+=r.cs;dc++}});wks.push({l:`W${Math.floor(i/7)+1}`,s:dc>0?Math.round(ts/dc*100):0})}
  charts.wk=new Chart(document.getElementById('wkChart'),{type:'bar',data:{labels:wks.map(w=>w.l),datasets:[{data:wks.map(w=>w.s),backgroundColor:wks.map(w=>w.s>=80?cc.g+'99':w.s>=50?cc.y+'99':cc.r+'99'),borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,max:100,grid:{color:cc.grid},ticks:{color:cc.t,callback:v=>v+'%'}},x:{grid:{display:false},ticks:{color:cc.t}}}}});
  const hS=HABITS.map(h=>{const c=a.filter(r=>r[h.id]).length;return{n:h.icon+' '+h.name,r:a.length?Math.round(c/a.length*100):0}});
  charts.hb=new Chart(document.getElementById('hbChart'),{type:'bar',data:{labels:hS.map(h=>h.n),datasets:[{data:hS.map(h=>h.r),backgroundColor:cc.g+'77',borderRadius:8,borderSkipped:false}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{beginAtZero:true,max:100,grid:{color:cc.grid},ticks:{color:cc.t,callback:v=>v+'%'}},y:{grid:{display:false},ticks:{color:cc.t,font:{size:10}}}}}});
  const sc=dates.map(d=>{const r=a.find(h=>h.date===d);return r?Math.round(r.cs*100):null});
  charts.ds=new Chart(document.getElementById('dsChart'),{type:'line',data:{labels:dates.map((_,i)=>`D${i+1}`),datasets:[{data:sc,borderColor:cc.g,backgroundColor:cc.g+'22',fill:true,tension:.4,pointRadius:3,spanGaps:false,pointBackgroundColor:sc.map(s=>s===null?'transparent':s>=67?cc.g:s>=33?cc.y:cc.r)}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,max:100,grid:{color:cc.grid},ticks:{color:cc.t,callback:v=>v+'%'}},x:{grid:{display:false},ticks:{color:cc.t,maxTicksLimit:12}}}}});
  const slp=gAS().sort((a,b)=>a.date.localeCompare(b.date));const slpC=document.getElementById('slpChC');
  if(slp.length>=1){slpC.style.display='';charts.slp=new Chart(document.getElementById('slpCh'),{type:'line',data:{labels:slp.map(s=>fs(s.date)),datasets:[{data:slp.map(s=>s.sc||null),borderColor:'#a855f7',backgroundColor:'#a855f722',fill:true,tension:.4,pointRadius:4,pointBackgroundColor:slp.map(s=>!s.sc?'transparent':s.sc>=85?'#c8ff00':s.sc>=70?'#7dff7d':s.sc>=50?'#ffc107':'#ff4757')}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{min:0,max:100,grid:{color:cc.grid},ticks:{color:cc.t}},x:{grid:{display:false},ticks:{color:cc.t}}}}})}else slpC.style.display='none'}
function chC(){const dk=document.documentElement.getAttribute('data-theme')!=='light';return{g:dk?'#c8ff00':'#6d8a00',y:'#ffc107',r:'#ff4757',t:dk?'#555':'#999',grid:dk?'#1c1c1c44':'#ddd3'}}

// ==================== BODY ====================
function renderBody(){renderBCh();renderBE();renderPh();renderBS();document.getElementById('bD').value=td()}
function renderBCh(){if(charts.bc){charts.bc.destroy();delete charts.bc}const e=[...gAB()].sort((a,b)=>a.date.localeCompare(b.date));const c=document.getElementById('bChC');if(e.length<1){c.style.display='none';return}c.style.display='';const cc=chC();const ds=[];if(e.some(x=>x.weight))ds.push({label:'Weight',data:e.map(x=>x.weight||null),borderColor:cc.g,backgroundColor:cc.g+'22',fill:true,tension:.4,pointRadius:4,yAxisID:'y'});if(e.some(x=>x.waist))ds.push({label:'Waist',data:e.map(x=>x.waist||null),borderColor:'#00d4ff',tension:.4,pointRadius:4,yAxisID:'y1'});charts.bc=new Chart(document.getElementById('bCh'),{type:'line',data:{labels:e.map(x=>fs(x.date)),datasets:ds},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{labels:{color:cc.t,usePointStyle:true}}},scales:{y:{position:'left',grid:{color:cc.grid},ticks:{color:cc.t}},y1:{position:'right',grid:{display:false},ticks:{color:cc.t}},x:{grid:{display:false},ticks:{color:cc.t}}}}})}
function renderBE(){const el=document.getElementById('bEntr');const e=[...gAB()].sort((a,b)=>b.date.localeCompare(a.date));if(!e.length){el.innerHTML='<div class="card-t">History</div><p style="color:var(--t3);text-align:center;padding:14px;font-size:.82rem">No data yet.</p>';return}let h='<div class="card-t">History</div><table class="tbl"><thead><tr><th>Date</th><th class="r">Weight</th><th class="r">Waist</th><th class="r">Fat%</th></tr></thead><tbody>';e.forEach(x=>{h+=`<tr><td>${fs(x.date)}</td><td class="r" style="color:var(--acc)">${x.weight?x.weight+'kg':'—'}</td><td class="r">${x.waist?x.waist+'cm':'—'}</td><td class="r">${x.body_fat?x.body_fat+'%':'—'}</td></tr>`});h+='</tbody></table>';el.innerHTML=h}
function renderBS(){const el=document.getElementById('bSum');const e=[...gAB()].sort((a,b)=>a.date.localeCompare(b.date));if(e.length<2){el.innerHTML='';return}const f=e[0],l=e[e.length-1];let h='<div class="stats-row" style="margin-bottom:14px">';if(f.weight&&l.weight){const ch=(l.weight-f.weight).toFixed(1);h+=`<div class="stat-card"><div class="s-val" style="font-size:1.1rem">${f.weight}</div><div class="s-label">Start kg</div></div><div class="stat-card"><div class="s-val" style="font-size:1.1rem">${l.weight}</div><div class="s-label">Now kg</div></div><div class="stat-card"><div class="s-val" style="font-size:1.1rem;color:${parseFloat(ch)<=0?'var(--acc)':'var(--red)'}">${parseFloat(ch)>0?'+':''}${ch}</div><div class="s-label">Change</div></div>`}h+='</div>';el.innerHTML=h}
function saveBody(){const d=document.getElementById('bD').value||td(),w=parseFloat(document.getElementById('bW').value)||null,wa=parseFloat(document.getElementById('bWa').value)||null,f=parseFloat(document.getElementById('bF').value)||null;if(!w&&!wa&&!f){toast('Enter data','⚠️');return}const ex=gAB().find(e=>e.date===d);sBE(d,{weight:w,waist:wa,body_fat:f,purl:ex?ex.purl:null});toast('📏 Saved!');['bW','bWa','bF'].forEach(id=>document.getElementById(id).value='');renderBody();checkAch()}
function handlePhoto(inp){const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=e=>{const d=document.getElementById('bD').value||td();const ex=gAB().find(x=>x.date===d)||{};sBE(d,{weight:ex.weight||null,waist:ex.waist||null,body_fat:ex.body_fat||null,purl:e.target.result});toast('📸 Saved!');renderPh();checkAch()};r.readAsDataURL(f)}
function renderPh(){const g=document.getElementById('phG');const wp=gAB().filter(e=>e.purl).sort((a,b)=>a.date.localeCompare(b.date));if(!wp.length){g.innerHTML='<p style="color:var(--t3);text-align:center;grid-column:1/-1;padding:12px;font-size:.78rem">No photos yet.</p>';return}g.innerHTML='';wp.forEach(e=>{const c=document.createElement('div');c.className='photo-c';c.innerHTML=`<img src="${e.purl}" loading="lazy"><div class="pd">${fs(e.date)}</div>`;g.appendChild(c)})}

// ==================== NUTRITION ====================
let selMealType='Lunch';let currentFoodPhoto=null;
function calcTDEE(w,h,age,act,goal){return Math.round((10*w+6.25*h-5*age+5)*act)+parseInt(goal)}
function saveNutSettings(){const w=parseFloat(document.getElementById('ns-w').value),h=parseFloat(document.getElementById('ns-h').value),age=parseInt(document.getElementById('ns-age').value),act=document.getElementById('ns-act').value,goal=document.getElementById('ns-goal').value;if(!w||!h||!age){toast('Fill all','⚠️');return}const cal=calcTDEE(w,h,age,parseFloat(act),goal);saveNutSettingsData({w,h,age,act:parseFloat(act),goal:parseInt(goal),cal,protein:Math.round(cal*.30/4),carbs:Math.round(cal*.40/4),fat:Math.round(cal*.30/9)});toast(`🎯 ${cal} kcal/day`);renderNut()}
function renderNut(){const ns=getNutSettings();document.getElementById('nutDate').textContent=fs(td());document.getElementById('bodySetup').style.display=ns?'none':'';if(!ns){const b=gAB();if(b.length){const l=[...b].sort((a,b)=>b.date.localeCompare(a.date))[0];if(l.weight)document.getElementById('ns-w').value=l.weight}}const meals=getMeals(td());const tC=meals.reduce((s,m)=>s+(m.cal||0),0),tP=meals.reduce((s,m)=>s+(m.protein||0),0),tCa=meals.reduce((s,m)=>s+(m.carbs||0),0),tF=meals.reduce((s,m)=>s+(m.fat||0),0);const gC=ns?ns.cal:2000,gP=ns?ns.protein:150,gCa=ns?ns.carbs:200,gF=ns?ns.fat:67;
  document.getElementById('calTotal').textContent=tC;document.getElementById('calGoalLabel').textContent=`/ ${gC} kcal`;setRing('calRingFill',Math.min(tC/gC*100,100));
  document.getElementById('mbP').style.width=Math.min(tP/gP*100,100)+'%';document.getElementById('mbC').style.width=Math.min(tCa/gCa*100,100)+'%';document.getElementById('mbF').style.width=Math.min(tF/gF*100,100)+'%';
  document.getElementById('mvP').textContent=`${tP}/${gP}g`;document.getElementById('mvC').textContent=`${tCa}/${gCa}g`;document.getElementById('mvF').textContent=`${tF}/${gF}g`;
  const ml=document.getElementById('mealsList');if(!meals.length){ml.innerHTML='<div class="card"><p style="color:var(--t3);text-align:center;padding:16px;font-size:.82rem">No meals yet. Scan or add one!</p></div>'}else{let h='';MEAL_TYPES.forEach(type=>{const tm=meals.filter(m=>m.type===type);if(!tm.length)return;h+=`<div style="font-size:.55rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t3);margin:10px 0 4px;padding-left:2px">${type}</div>`;tm.forEach(m=>{h+=`<div class="meal-card">${m.photo?`<img src="${m.photo}">`:''}<div class="mc-info"><div class="mc-name">${m.name||'Meal'}</div><div class="mc-macros"><span style="color:#ff6b6b">P${m.protein||0}</span><span style="color:#ffd43b">C${m.carbs||0}</span><span style="color:#69db7c">F${m.fat||0}</span></div></div><div class="mc-cal">${m.cal||0}</div><button class="mc-del" onclick="deleteMeal('${m.id}')">✕</button></div>`})});ml.innerHTML=h}renderCalChart()}
function renderCalChart(){if(charts.calCh){charts.calCh.destroy();delete charts.calCh}const am=getAllMeals();if(am.length<1){document.getElementById('calChartCard').style.display='none';return}document.getElementById('calChartCard').style.display='';const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);days.push(d.toISOString().split('T')[0])}const ns=getNutSettings();const gC=ns?ns.cal:2000;const cc=chC();const data=days.map(d=>am.filter(m=>m.date===d).reduce((s,m)=>s+(m.cal||0),0));charts.calCh=new Chart(document.getElementById('calChart'),{type:'bar',data:{labels:days.map(d=>fs(d)),datasets:[{data,backgroundColor:data.map(v=>v>gC*1.1?'#ff475799':v>=gC*.8?cc.g+'99':'#ffc10799'),borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,grid:{color:cc.grid},ticks:{color:cc.t}},x:{grid:{display:false},ticks:{color:cc.t}}}}})}
function deleteMeal(id){delMeal(id);renderNut();toast('Deleted','🗑️')}
function openFoodScan(){currentFoodPhoto=null;document.getElementById('foodPreview').style.display='none';document.getElementById('foodUpZone').style.display='';document.getElementById('aiLoading').style.display='none';document.getElementById('aiResult').style.display='none';document.getElementById('foodPhIn').value='';openM('foodScanM')}
function openManualFood(){currentFoodPhoto=null;document.getElementById('foodPreview').style.display='none';document.getElementById('foodUpZone').style.display='none';document.getElementById('aiLoading').style.display='none';document.getElementById('aiResult').style.display='';['fd-name','fd-cal','fd-p','fd-c','fd-f','fd-notes'].forEach(id=>document.getElementById(id).value='');selMealType='Lunch';renderFoodMealTypes();openM('foodScanM')}
function renderFoodMealTypes(){const el=document.getElementById('fdMealType');el.innerHTML='';MEAL_TYPES.forEach(t=>{const b=document.createElement('button');b.className=`meal-type-btn ${t===selMealType?'sel':''}`;b.textContent=t;b.addEventListener('click',()=>{selMealType=t;renderFoodMealTypes()});el.appendChild(b)})}
function handleFoodPhoto(input){const file=input.files[0];if(!file)return;const reader=new FileReader();reader.onload=async e=>{currentFoodPhoto=e.target.result;document.getElementById('foodPreview').src=currentFoodPhoto;document.getElementById('foodPreview').style.display='';document.getElementById('foodUpZone').style.display='none';document.getElementById('aiLoading').style.display='flex';document.getElementById('aiResult').style.display='none';try{const b64=currentFoodPhoto.split(',')[1];const mt=currentFoodPhoto.split(';')[0].split(':')[1];const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:mt,data:b64}},{type:'text',text:'Analyze this food photo. Respond ONLY with JSON (no markdown): {"name":"food name","calories":number,"protein":number,"carbs":number,"fat":number,"meal_type":"Breakfast|Lunch|Dinner|Snack","has_sugar":true/false,"notes":"brief description"}'}]}]})});const data=await resp.json();const text=data.content.map(i=>i.text||'').join('');const result=JSON.parse(text.replace(/```json|```/g,'').trim());document.getElementById('fd-name').value=result.name||'';document.getElementById('fd-cal').value=result.calories||'';document.getElementById('fd-p').value=result.protein||'';document.getElementById('fd-c').value=result.carbs||'';document.getElementById('fd-f').value=result.fat||'';document.getElementById('fd-notes').value=result.notes||'';selMealType=result.meal_type||'Lunch';renderFoodMealTypes();if(result.has_sugar)toast('⚠️ Sugar detected!','🚫');document.getElementById('aiLoading').style.display='none';document.getElementById('aiResult').style.display='';toast('🤖 Analyzed!')}catch(err){console.error(err);document.getElementById('aiLoading').style.display='none';document.getElementById('aiResult').style.display='';selMealType='Lunch';renderFoodMealTypes();toast('Enter manually','⚠️')}};reader.readAsDataURL(file)}
function saveFoodEntry(){const n=document.getElementById('fd-name').value.trim(),cal=parseInt(document.getElementById('fd-cal').value)||0;if(!n&&!cal){toast('Enter info','⚠️');return}addMeal({date:td(),name:n||'Meal',type:selMealType,cal,protein:parseInt(document.getElementById('fd-p').value)||0,carbs:parseInt(document.getElementById('fd-c').value)||0,fat:parseInt(document.getElementById('fd-f').value)||0,notes:document.getElementById('fd-notes').value.trim(),photo:currentFoodPhoto||null,time:new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})});closeM('foodScanM');toast('🍽️ Saved!');renderNut()}

// ==================== PROFILE ====================
function renderProf(){const u=gU();if(!u)return;const dn=gCD(u.start_date),st=cStrk(u),rem=Math.max(0,TD-dn);document.getElementById('prName').textContent=u.name;document.getElementById('prDay').textContent=`Day ${dn}/${TD} · ${ff(u.start_date)}`;document.getElementById('prStats').innerHTML=`<div class="stat-card"><div class="s-val">🔥${st.c}</div><div class="s-label">Streak</div></div><div class="stat-card"><div class="s-val">${st.l}</div><div class="s-label">Best</div></div><div class="stat-card"><div class="s-val">${rem}</div><div class="s-label">Left</div></div>`;document.getElementById('eName').value=u.name;document.getElementById('eDate').value=u.start_date;renderBdg('bd2')}
function saveProf(){const n=document.getElementById('eName').value.trim(),d=document.getElementById('eDate').value;if(!n){toast('Name?','⚠️');return}const u=gU();u.name=n;u.start_date=d;sU(u);toast('✅ Saved!');renderProf();document.getElementById('topBadge').textContent=`Day ${gCD(d)} / ${TD}`}
function resetAll(){if(!confirm('Delete ALL data?'))return;if(!confirm('PERMANENT. Sure?'))return;['user','hab','body','ach','slp','wo','meals','nutset','scores'].forEach(k=>L.r(k));for(let i=localStorage.length-1;i>=0;i--){const k=localStorage.key(i);if(k&&(k.startsWith('li_ref_')||k.startsWith('li_detox_')))localStorage.removeItem(k)}localStorage.removeItem('li_lastgreet');localStorage.removeItem('li_lastreport');location.reload()}
function exportCSV(){const h=gAH(),sl=gAS(),w=gAW();let csv='date,steps,workout,water,sleep,no_sugar,no_noodles,score,rest,sleep_score,sleep_dur,deep,rem,wo_type,wo_dur,wo_int,journal\n';h.forEach(r=>{const s=sl.find(x=>x.date===r.date)||{};const wo=w.find(x=>x.date===r.date)||{};csv+=`${r.date},${r.steps||0},${r.workout||0},${r.water||0},${r.sleep||0},${r.no_sugar||0},${r.no_noodles||0},${r.cs||0},${r.rest||0},${s.sc||''},${s.dur||''},${s.deep||''},${s.rem||''},${wo.type||''},${wo.dur||''},${wo.int||''},"${(r.jnl||'').replace(/"/g,'""')}"\n`});const b=new Blob([csv],{type:'text/csv'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='lockin45.csv';a.click();toast('📊 Exported!')}
function reqNotifs(){if(!('Notification' in window)){toast("Not supported",'⚠️');return}Notification.requestPermission().then(r=>{if(r==='granted')toast('🔔 Enabled!');else toast('Blocked','⚠️')})}

function initApp(){initTh();const u=gU();if(!u){document.getElementById('setup').classList.add('on');return}document.getElementById('topBadge').textContent=`Day ${gCD(u.start_date)} / ${TD}`;showMorningGreeting();renderD();checkWeeklyReport()}
initApp();
