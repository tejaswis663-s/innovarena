/* ============================================================
   INNOVARENA — app.js  (Complete Prototype)
   ============================================================ */

/* ─── Global State ────────────────────────────────────────── */
const STATE = {
  screen: 'landing',
  player: {
    name: 'NOVADEV', avatar: '🎮', level: 27, rating: 1842, xp: 12480, rank: 384,
    wins: 8, projects: 43, arenas: 43, winRate: 68, innovScore: 94.2,
    streak: 3, country: 'BR', bestArena: 'FOREST', topTen: 21,
    ratingHistory: [1650,1680,1710,1695,1730,1762,1790,1810,1800,1842],
  },
  match: {
    arena: null, format: null, theme: null, attributes: [],
    playersFound: 0, maxPlayers: 30, timer: 3600,
    projectName: 'WildGuard', attributeStatus: [true,true,true,false,false],
    submitted: false, submittedPlayers: 23,
  },
  leaderboard: { tab: 'global' },
  history: [],
  nav: 'home',
  ide: {
    projectName: 'Untitled project',
    activeFile: 'index.html',
    files: { 'index.html': '', 'style.css': '', 'script.js': '' },
    dirtyFiles: [],
    loaded: false,
    messages: [{ role:'assistant', text:'Welcome to your workspace. Tell me what you want to build, or ask for help with an idea.' }],
  },
};

/* ─── Mock Data ───────────────────────────────────────────── */
const ARENAS = [
  { id:'forest',   emoji:'🌲', name:'FOREST',   diff:3, players:2431, theme:'Nature & ecosystems',  color:'#00ff88', bg:'#004d2a', desc:'Create solutions inspired by nature, wildlife and ecosystems.', attrs:['sustainability','wildlife','water'] },
  { id:'ocean',    emoji:'🌊', name:'OCEAN',    diff:3, players:1892, theme:'Aquatic worlds',        color:'#00f5ff', bg:'#003d5c', desc:'Dive into underwater experiences and ocean conservation.',       attrs:['depth','currents','marine'] },
  { id:'desert',   emoji:'🏜', name:'DESERT',   diff:4, players:1204, theme:'Arid survival',         color:'#ffd700', bg:'#5c3d00', desc:'Build experiences around survival, heat, and ancient mysteries.',attrs:['sand','heat','ruins'] },
  { id:'sky',      emoji:'☁️', name:'SKY',       diff:2, players:987,  theme:'Atmosphere & flight',   color:'#87ceeb', bg:'#003d5c', desc:'Explore the freedom of the skies and atmospheric wonders.',     attrs:['wind','clouds','altitude'] },
  { id:'city',     emoji:'🏙', name:'CITY',     diff:4, players:3102, theme:'Urban cyberpunk',        color:'#ff00ff', bg:'#3d0040', desc:'Create in the neon-lit streets of a futuristic metropolis.',   attrs:['neon','tech','urban'] },
  { id:'space',    emoji:'🚀', name:'SPACE',    diff:5, players:2789, theme:'Cosmic exploration',     color:'#a855f7', bg:'#1e0040', desc:'Venture into the cosmos with interstellar challenges.',          attrs:['gravity','stars','void'] },
  { id:'volcanic', emoji:'🌋', name:'VOLCANIC', diff:5, players:876,  theme:'Primal forces',          color:'#ff4500', bg:'#3d1100', desc:'Harness the raw power of volcanic landscapes and fire.',        attrs:['lava','pressure','eruption'] },
  { id:'arctic',   emoji:'❄️', name:'ARCTIC',   diff:3, players:654,  theme:'Frozen frontiers',       color:'#e0f7fa', bg:'#003d5c', desc:'Navigate the challenges of the frozen wilderness.',             attrs:['ice','aurora','survival'] },
  { id:'fantasy',  emoji:'🌌', name:'FANTASY',  diff:4, players:1543, theme:'Magical realms',         color:'#dda0dd', bg:'#3d0040', desc:'Build worlds where magic and technology converge.',             attrs:['magic','portals','ancient'] },
];

const FORMATS = [
  { id:'website', icon:'🌐', name:'WEBSITE',             desc:'Design and develop an interactive website.', diff:2 },
  { id:'game',    icon:'🎮', name:'GAME',                desc:'Create a playable game experience based on the arena challenge.', diff:4 },
  { id:'uiux',    icon:'🎨', name:'UI / UX DESIGN',     desc:'Craft a stunning interface or user experience.', diff:3 },
  { id:'mobile',  icon:'📱', name:'MOBILE APP',         desc:'Build a mobile-first application prototype.', diff:3 },
  { id:'webapp',  icon:'⚡', name:'WEB APP',            desc:'Create a fully functional web application.', diff:4 },
  { id:'xr',      icon:'🥽', name:'INTERACTIVE EXP',   desc:'Design immersive interactive experiences.', diff:5 },
  { id:'proto',   icon:'🔧', name:'PROTOTYPE',          desc:'Build a rapid concept prototype.', diff:2 },
  { id:'other',   icon:'💡', name:'OTHER',              desc:'Innovate in any creative format.', diff:1 },
];

const FOREST_THEMES = [
  { id:'wildlife',    name:'Wildlife Conservation',    desc:'Create a digital experience to protect endangered species.',     diff:3 },
  { id:'firewatch',   name:'Forest Fire Prevention',   desc:'Early warning and monitoring systems for forest fires.',         diff:4 },
  { id:'monitoring',  name:'Smart Forest Monitoring',  desc:'IoT and AI tools to track forest health in real time.',          diff:4 },
  { id:'ecotourism',  name:'Eco Tourism Platform',     desc:'Sustainable travel experiences that benefit local ecosystems.',   diff:2 },
  { id:'biodiversity',name:'Biodiversity Education',   desc:'Educational tools to teach about forest biodiversity.',          diff:2 },
];

const LEGEND_ATTRS = [
  { icon:'🌳', name:'TREE',   meaning:'Nature / Ecosystem',         xp:100 },
  { icon:'🦌', name:'DEER',   meaning:'Wildlife / Fauna',           xp:120 },
  { icon:'💧', name:'WATER',  meaning:'Resource Management',        xp:90  },
  { icon:'🔥', name:'FIRE',   meaning:'Threat / Emergency',         xp:130 },
  { icon:'📡', name:'SIGNAL', meaning:'Technology / Communication', xp:110 },
  { icon:'🟢', name:'GREEN',  meaning:'Sustainability',             xp:95  },
  { icon:'🌱', name:'SPROUT', meaning:'Growth / Renewal',           xp:80  },
];
const MANDATORY_ATTRS = LEGEND_ATTRS.slice(0,5);
const BONUS_ATTRS     = LEGEND_ATTRS.slice(5);

const GLOBAL_PLAYERS = [
  { rank:1,  name:'NOVA',       rating:2412, xp:89420, wins:42, projects:89,  innov:98.1, country:'🇯🇵' },
  { rank:2,  name:'PIXELFORGE', rating:2378, xp:81200, wins:38, projects:76,  innov:96.8, country:'🇰🇷' },
  { rank:3,  name:'CODEWAVE',   rating:2311, xp:74800, wins:35, projects:71,  innov:95.4, country:'🇩🇪' },
  { rank:4,  name:'VOIDMAKER',  rating:2284, xp:68100, wins:31, projects:65,  innov:94.7, country:'🇺🇸' },
  { rank:5,  name:'SYNTHEX',    rating:2241, xp:63500, wins:29, projects:60,  innov:93.2, country:'🇫🇷' },
  { rank:6,  name:'NEONRIFT',   rating:2198, xp:57800, wins:26, projects:55,  innov:92.1, country:'🇧🇷' },
  { rank:7,  name:'HEXABIT',    rating:2155, xp:52400, wins:23, projects:50,  innov:91.5, country:'🇮🇳' },
  { rank:8,  name:'QUBITDEV',   rating:2102, xp:48100, wins:21, projects:46,  innov:90.8, country:'🇨🇦' },
  { rank:9,  name:'PRISMCRAFT', rating:2088, xp:44200, wins:19, projects:42,  innov:90.1, country:'🇦🇺' },
  { rank:10, name:'DUALCORE',   rating:2041, xp:40700, wins:17, projects:39,  innov:89.3, country:'🇬🇧' },
  { rank:11, name:'ARCLIGHT',   rating:1998, xp:37200, wins:15, projects:35,  innov:88.6, country:'🇲🇽' },
  { rank:12, name:'BITSHIFT',   rating:1965, xp:34100, wins:14, projects:33,  innov:87.9, country:'🇸🇪' },
  { rank:13, name:'ZENFLOW',    rating:1932, xp:31500, wins:12, projects:30,  innov:87.1, country:'🇳🇱' },
  { rank:14, name:'COREVEX',    rating:1905, xp:29000, wins:11, projects:28,  innov:86.4, country:'🇵🇱' },
  { rank:15, name:'GLITCHLAB',  rating:1878, xp:26800, wins:10, projects:26,  innov:85.7, country:'🇧🇷' },
  { rank:384,name:'NOVADEV',    rating:1842, xp:12480, wins:8,  projects:43,  innov:94.2, country:'🇧🇷', isMe:true },
];

const MATCH_HISTORY = [
  { date:'2026-09-23', arena:'FOREST',   theme:'Wildlife Conservation', format:'GAME',    rank:7,  score:87.4, xp:620, ratingDelta:24 },
  { date:'2026-09-21', arena:'OCEAN',    theme:'Ocean Exploration',     format:'WEB APP', rank:3,  score:91.2, xp:890, ratingDelta:38 },
  { date:'2026-09-18', arena:'CITY',     theme:'Cyberpunk Interface',   format:'UI/UX',   rank:12, score:79.8, xp:340, ratingDelta:8  },
  { date:'2026-09-15', arena:'SPACE',    theme:'Cosmic Navigation',     format:'GAME',    rank:5,  score:89.6, xp:740, ratingDelta:31 },
  { date:'2026-09-11', arena:'DESERT',   theme:'Survival System',       format:'WEBSITE', rank:1,  score:97.1, xp:1200,ratingDelta:65 },
  { date:'2026-09-07', arena:'SKY',      theme:'Flight Simulation',     format:'WEB APP', rank:9,  score:82.3, xp:490, ratingDelta:15 },
  { date:'2026-09-03', arena:'ARCTIC',   theme:'Polar Research',        format:'GAME',    rank:4,  score:90.1, xp:810, ratingDelta:34 },
];

const ACHIEVEMENTS = [
  { icon:'🏆', name:'FIRST ARENA',      desc:'Complete your first arena.',           unlocked:true  },
  { icon:'⚡', name:'SPEED BUILDER',    desc:'Submit with 20+ minutes remaining.',   unlocked:true  },
  { icon:'🌟', name:'LEGEND MASTER',    desc:'Use 100 legend attributes.',           unlocked:true  },
  { icon:'🎨', name:'CREATIVE MIND',    desc:'Achieve 95+ creativity score.',        unlocked:false },
  { icon:'🌍', name:'GLOBAL CONTENDER', desc:'Reach rating 2000.',                   unlocked:false },
  { icon:'🔥', name:'TEN ARENAS',       desc:'Complete 10 arenas.',                  unlocked:true  },
  { icon:'💎', name:'PERFECT ATTRIB',   desc:'Use every mandatory attribute.',       unlocked:true  },
  { icon:'🏅', name:'TOP 3 FINISH',     desc:'Finish in the top 3.',                 unlocked:true  },
  { icon:'🚀', name:'ARENA CHAMPION',   desc:'Win an arena.',                        unlocked:false },
  { icon:'🌈', name:'ALL ARENAS',       desc:'Compete in all 9 arenas.',             unlocked:false },
  { icon:'🤖', name:'AI WHISPERER',     desc:'Get 10 AI-assist detections.',         unlocked:true  },
  { icon:'⭐', name:'INNOVATOR',        desc:'Score 90+ innovation 5 times.',        unlocked:false },
];

const PROJECTS = [
  { name:'WildGuard',     creator:'NOVADEV',    arena:'FOREST', theme:'Wildlife Conservation', score:87.4, likes:342, preview:'🦌' },
  { name:'OceanPulse',    creator:'NOVA',       arena:'OCEAN',  theme:'Ocean Exploration',     score:91.2, likes:512, preview:'🌊' },
  { name:'NeonCity',      creator:'PIXELFORGE', arena:'CITY',   theme:'Cyberpunk Interface',   score:96.1, likes:891, preview:'🏙' },
  { name:'StarMapper',    creator:'CODEWAVE',   arena:'SPACE',  theme:'Cosmic Navigation',     score:93.4, likes:674, preview:'🚀' },
  { name:'DesertSurvivor',creator:'SYNTHEX',    arena:'DESERT', theme:'Survival System',       score:89.7, likes:421, preview:'🏜' },
  { name:'SkyDancer',     creator:'NEONRIFT',   arena:'SKY',    theme:'Flight Simulation',     score:85.3, likes:287, preview:'☁️' },
];

const ARENA_PROGRESSION = [
  { id:'forest',   emoji:'🌲', name:'FOREST',   unlocked:true,  completed:true,  rank:'#7' },
  { id:'ocean',    emoji:'🌊', name:'OCEAN',    unlocked:true,  completed:true,  rank:'#3' },
  { id:'desert',   emoji:'🏜', name:'DESERT',   unlocked:true,  completed:false, rank:null },
  { id:'city',     emoji:'🏙', name:'CITY',     unlocked:true,  completed:false, rank:null },
  { id:'sky',      emoji:'☁️', name:'SKY',       unlocked:false, completed:false, rank:null },
  { id:'space',    emoji:'🚀', name:'SPACE',    unlocked:false, completed:false, rank:null },
  { id:'volcanic', emoji:'🌋', name:'VOLCANIC', unlocked:false, completed:false, rank:null },
  { id:'arctic',   emoji:'❄️', name:'ARCTIC',   unlocked:false, completed:false, rank:null },
  { id:'fantasy',  emoji:'🌌', name:'FANTASY',  unlocked:false, completed:false, rank:null },
];

/* ─── Particles Engine ────────────────────────────────────── */
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function initParticles() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  const count = Math.min(80, Math.floor(window.innerWidth / 16));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      size: Math.random() * 2 + .5,
      alpha: Math.random() * .5 + .1,
      color: ['#a855f7','#00f5ff','#00ff88','#ec4899'][Math.floor(Math.random()*4)],
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  // Draw connections
  particles.forEach((a, i) => {
    particles.slice(i+1).forEach(b => {
      const dx = a.x-b.x, dy = a.y-b.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = '#a855f7';
        ctx.globalAlpha = (1 - dist/120) * .08;
        ctx.lineWidth = .5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
  });
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', initParticles);
initParticles();
animateParticles();

/* ─── Notifications ───────────────────────────────────────── */
const NOTIFS = [
  { icon:'⚡', title:'Rating Updated', msg:'You gained +24 rating!', color:'#a855f7' },
  { icon:'🏆', title:'Achievement', msg:'You unlocked Forest Specialist!', color:'#ffd700' },
  { icon:'📡', title:'New Arena', msg:'VOLCANIC Arena is now open.', color:'#ff4500' },
  { icon:'🎯', title:'Challenge', msg:'New Weekly Challenge available.', color:'#00f5ff' },
];
let notifIdx = 0;

function showNotification(icon, title, msg, color='#a855f7') {
  const container = document.getElementById('notifications-container');
  const el = document.createElement('div');
  el.className = 'notif';
  el.innerHTML = `
    <div style="font-size:1.4rem;flex-shrink:0">${icon}</div>
    <div>
      <div style="font-family:var(--font-title);font-size:.7rem;letter-spacing:.1em;color:${color};margin-bottom:.15rem">${title}</div>
      <div style="font-size:.8rem;color:rgba(255,255,255,.7)">${msg}</div>
    </div>
    <button onclick="this.parentElement.remove()" style="margin-left:auto;background:none;border:none;color:rgba(255,255,255,.4);cursor:pointer;font-size:1rem;flex-shrink:0">✕</button>
  `;
  el.style.borderLeftColor = color;
  container.appendChild(el);
  el.addEventListener('click', ()=>{ el.style.animation='slideOutRight .3s ease forwards'; setTimeout(()=>el.remove(),300); });
  setTimeout(()=>{ if(el.parentElement){ el.style.animation='slideOutRight .3s ease forwards'; setTimeout(()=>el.remove(),300); } }, 5000);
}

// Cycle notifications
setTimeout(()=> { const n=NOTIFS[0]; showNotification(n.icon,n.title,n.msg,n.color); }, 2000);
setTimeout(()=> { const n=NOTIFS[1]; showNotification(n.icon,n.title,n.msg,n.color); }, 8000);
setTimeout(()=> { const n=NOTIFS[2]; showNotification(n.icon,n.title,n.msg,n.color); }, 14000);

/* ─── Timer Logic ─────────────────────────────────────────── */
let timerInterval = null;
let ideTourIndex = -1;
const IDE_TOUR_STEPS = [
  { selector:'.ide-chat-compose', title:'Ask the AI co-pilot', text:'Type a prompt here to get ideas, plan a screen, or ask for help with your project.' },
  { selector:'.ide-sidebar-left', title:'Find your project files', text:'Choose a file here to open it. You can also create additional files from this panel.' },
  { selector:'#code-editor', title:'Build your project', text:'Write or edit your code in this workspace. Your selected file appears in the tab above it.' },
  { selector:'.arena-ide-topbar > div:last-child', title:'Save, run, preview, and submit', text:'Save your work, run it, open a preview, ask for AI assistance, or submit your finished project from these buttons.' },
  { selector:'.ide-sidebar-right > div:nth-child(2)', title:'Track the challenge', text:'Check your required attributes and progress here, then review the project requirements below.' },
];

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    if (STATE.match.timer > 0) {
      STATE.match.timer--;
      updateTimerDisplay();
    }
  }, 1000);
}
function stopTimer() { clearInterval(timerInterval); }
function updateTimerDisplay() {
  const el = document.getElementById('arena-timer');
  if (!el) return;
  const s = STATE.match.timer;
  const m = Math.floor(s/60), sec = s%60;
  el.textContent = `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  el.className = 'font-orbitron font-black text-3xl ';
  if (s <= 60)        el.className += 'timer-critical';
  else if (s <= 300)  el.className += 'timer-urgent';
  else if (s <= 900)  el.className += 'timer-warning';
  else                el.className += 'timer-normal';
}

/* ─── Router ──────────────────────────────────────────────── */
function navigateTo(screen, data={}) {
  if (timerInterval && screen !== 'arena') stopTimer();
  Object.assign(STATE, data);
  STATE.screen = screen;
  render();
  window.scrollTo({top:0, behavior:'smooth'});
}

/* ─── RENDER ──────────────────────────────────────────────── */
function render() {
  const app = document.getElementById('app');
  switch(STATE.screen) {
    case 'landing':        app.innerHTML = renderLanding();       break;
    case 'dashboard':      app.innerHTML = renderDashboard();     initDashboard(); break;
    case 'arenas':         app.innerHTML = renderArenas();        break;
    case 'format':         app.innerHTML = renderFormat();        initFormat(); break;
    case 'matchmaking':    app.innerHTML = renderMatchmaking();   initMatchmaking(); break;
    case 'challenge-intro':app.innerHTML = renderChallengeIntro();initChallengeIntro(); break;
    case 'theme-select':   app.innerHTML = renderThemeSelect();   break;
    case 'legend':         app.innerHTML = renderLegend();        break;
    case 'briefing':       app.innerHTML = renderBriefing();      break;
    case 'arena':          app.innerHTML = renderArenaIDE();      initArenaIDE(); break;
    case 'submit-wait':    app.innerHTML = renderSubmitWait();    initSubmitWait(); break;
    case 'evaluation':     app.innerHTML = renderEvaluation();    initEvaluation(); break;
    case 'results':        app.innerHTML = renderResults();       initResults(); break;
    case 'leaderboard':    app.innerHTML = renderLeaderboard();   break;
    case 'history':        app.innerHTML = renderHistory();       break;
    case 'profile':        app.innerHTML = renderProfile();       initProfile(); break;
    case 'achievements':   app.innerHTML = renderAchievements();  break;
    case 'progression':    app.innerHTML = renderProgression();   break;
    case 'community':      app.innerHTML = renderCommunity();     break;
    default:               app.innerHTML = renderLanding();
  }
  attachNavHandlers();
}

/* ─── NAVIGATION BAR ─────────────────────────────────────── */
function renderNav(active='home') {
  const links = [
    { id:'home',        label:'HOME',        screen:'dashboard'   },
    { id:'arenas',      label:'ARENAS',      screen:'arenas'      },
    { id:'compete',     label:'COMPETE',     screen:'arenas'      },
    { id:'leaderboard', label:'LEADERBOARD', screen:'leaderboard' },
    { id:'history',     label:'HISTORY',     screen:'history'     },
    { id:'profile',     label:'PROFILE',     screen:'profile'     },
  ];
  return `
  <nav class="glass-dark sticky top-0 z-40 flex items-center justify-between px-6 py-3 border-b border-white/5">
    <div class="flex items-center gap-3 cursor-pointer" onclick="navigateTo('dashboard')">
      <div style="width:32px;height:32px;background:linear-gradient(135deg,#a855f7,#00f5ff);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.9rem">⚡</div>
      <span class="font-orbitron font-black text-sm tracking-widest" style="background:linear-gradient(135deg,#a855f7,#00f5ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">INNOVARENA</span>
    </div>
    <div class="flex items-center gap-1">
      ${links.map(l=>`<span class="nav-link ${active===l.id?'active':''}" onclick="navigateTo('${l.screen}')">${l.label}</span>`).join('')}
    </div>
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2 glass px-3 py-1.5 rounded-lg cursor-pointer hover:border-cyan-500/40 transition-all" onclick="navigateTo('profile')">
        <span style="font-size:1.1rem">${STATE.player.avatar}</span>
        <div>
          <div class="font-orbitron text-xs text-white/90">${STATE.player.name}</div>
          <div class="font-mono text-xs" style="color:var(--c-cyan)">LVL ${STATE.player.level} · #${STATE.player.rank}</div>
        </div>
      </div>
      <button class="btn-ghost text-xs px-3 py-1.5" onclick="navigateTo('arenas')">▶ ENTER</button>
    </div>
  </nav>`;
}

function attachNavHandlers() {}

/* ─── SCREEN: LANDING ─────────────────────────────────────── */
function renderLanding() {
  return `
  <div class="min-h-screen flex flex-col relative overflow-hidden" style="background:radial-gradient(ellipse at 50% 0%,rgba(168,85,247,.2) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(0,245,255,.1) 0%,transparent 50%),#020408">
    <div class="hero-grid absolute inset-0 opacity-40 pointer-events-none"></div>
    <div class="scan-line"></div>

    <!-- Header -->
    <header class="flex items-center justify-between px-8 py-5 relative z-10">
      <div class="flex items-center gap-3">
        <div class="anim-float" style="width:44px;height:44px;background:linear-gradient(135deg,#a855f7,#00f5ff);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;box-shadow:0 0 20px rgba(168,85,247,.5)">⚡</div>
        <span class="font-orbitron font-black text-xl tracking-widest" style="background:linear-gradient(135deg,#a855f7,#00f5ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">INNOVARENA</span>
      </div>
      <div class="flex gap-3">
        <button class="btn-ghost" onclick="navigateTo('leaderboard')">LEADERBOARD</button>
        <button class="btn-outline" onclick="navigateTo('dashboard')">ENTER ARENA</button>
      </div>
    </header>

    <!-- Hero -->
    <main class="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 relative z-10">
      <div class="anim-fadeInUp" style="animation-delay:.1s">
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 text-xs font-mono" style="color:var(--c-green);border-color:rgba(0,255,136,.2)">
          <span class="w-2 h-2 rounded-full bg-green-400" style="animation:timerPulse 1.5s infinite"></span>
          10,842 CREATORS ACTIVE WORLDWIDE
        </div>
      </div>

      <h1 class="font-orbitron font-black anim-fadeInUp" style="font-size:clamp(3rem,8vw,7rem);line-height:1;animation-delay:.2s;background:linear-gradient(135deg,#fff 0%,#a855f7 40%,#00f5ff 70%,#fff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:none">
        INNOV<span style="-webkit-text-fill-color:#00f5ff;text-shadow:0 0 40px #00f5ff">ARENA</span>
      </h1>

      <p class="font-orbitron text-xl md:text-2xl tracking-widest mt-4 anim-fadeInUp" style="color:rgba(255,255,255,.7);animation-delay:.35s">
        BUILD. <span style="color:var(--c-purple)">COMPETE.</span> INNOVATE.
      </p>

      <p class="mt-6 text-lg max-w-xl mx-auto anim-fadeInUp" style="color:rgba(255,255,255,.5);animation-delay:.5s">
        Where creators from around the world compete through ideas.<br/>30 creators. One challenge. Infinite possibilities.
      </p>

      <div class="flex flex-wrap items-center justify-center gap-4 mt-10 anim-fadeInUp" style="animation-delay:.65s">
        <button class="btn-primary text-sm px-8 py-4" onclick="navigateTo('dashboard')">
          <span>⚡ ENTER ARENA</span>
        </button>
        <button class="btn-outline text-sm px-8 py-4" onclick="navigateTo('leaderboard')">
          <span>🏆 LEADERBOARD</span>
        </button>
        <button class="btn-ghost text-sm px-8 py-4" onclick="showHowItWorks()">
          <span>ℹ HOW IT WORKS</span>
        </button>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl w-full mx-auto anim-fadeInUp" style="animation-delay:.8s">
        ${[['10,842','Players'],['2,391','Arenas'],['48','Countries'],['126,500','Projects']].map(([v,l])=>`
        <div class="stat-card">
          <div class="font-orbitron font-black text-2xl" style="background:linear-gradient(135deg,#a855f7,#00f5ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${v}</div>
          <div class="text-xs text-white/50 mt-1 tracking-widest uppercase">${l}</div>
        </div>`).join('')}
      </div>
    </main>

    <!-- Arena preview strip -->
    <div class="relative z-10 pb-16 px-6">
      <p class="text-center text-xs font-orbitron tracking-widest text-white/30 mb-4">AVAILABLE ARENAS</p>
      <div class="flex justify-center gap-3 flex-wrap">
        ${ARENAS.map(a=>`
        <div onclick="navigateTo('dashboard')" class="flex items-center gap-2 glass px-4 py-2 rounded-full cursor-pointer transition-all hover:scale-105" style="border-color:${a.color}30;transition:all .3s">
          <span>${a.emoji}</span>
          <span class="font-orbitron text-xs font-semibold" style="color:${a.color}">${a.name}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function showHowItWorks() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box max-w-lg">
      <div class="font-orbitron font-black text-xl mb-6 text-center" style="color:var(--c-cyan)">HOW IT WORKS</div>
      ${[
        ['1','SELECT ARENA','Choose from 9 unique arenas, each with its own visual theme and challenge type.'],
        ['2','MATCHMAKING','Get matched with up to 29 other creators from around the world.'],
        ['3','CHALLENGE','Receive a theme and LEGEND ATTRIBUTES you must incorporate into your project.'],
        ['4','BUILD','Use the built-in IDE to create your project in a timed session.'],
        ['5','COMPETE','Submit your creation and let the AI evaluate all projects simultaneously.'],
        ['6','RANK','Earn XP, rating points, and climb the global leaderboard.'],
      ].map(([n,t,d])=>`
      <div class="flex gap-3 mb-4">
        <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-orbitron font-bold text-xs" style="background:linear-gradient(135deg,#a855f7,#00f5ff)">${n}</div>
        <div><div class="font-orbitron text-sm font-semibold mb-1">${t}</div><div class="text-sm text-white/60">${d}</div></div>
      </div>`).join('')}
      <button class="btn-primary w-full mt-2" onclick="this.closest('.modal-overlay').remove();navigateTo('dashboard')"><span>⚡ START COMPETING</span></button>
      <button class="btn-ghost w-full mt-2" onclick="this.closest('.modal-overlay').remove()"><span>Close</span></button>
    </div>`;
  document.body.appendChild(overlay);
}

/* ─── SCREEN: DASHBOARD ───────────────────────────────────── */
function renderDashboard() {
  const p = STATE.player;
  return `
  ${renderNav('home')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-7xl mx-auto">

      <!-- Player Hero Card -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-2 glass-card p-6 anim-fadeInUp anim-glow-border">
          <div class="flex items-start gap-5">
            <div class="relative">
              <div class="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                   style="background:linear-gradient(135deg,rgba(168,85,247,.3),rgba(0,245,255,.2));border:2px solid rgba(168,85,247,.5)">
                ${p.avatar}
              </div>
              <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                   style="background:linear-gradient(135deg,#a855f7,#00f5ff)">▶</div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-1 flex-wrap">
                <span class="font-orbitron font-black text-2xl">${p.name}</span>
                <span class="glass px-2 py-0.5 rounded text-xs font-mono" style="color:var(--c-green)">🟢 ONLINE</span>
              </div>
              <div class="flex items-center gap-4 flex-wrap mb-3">
                <span class="font-orbitron text-xs" style="color:var(--c-purple)">LEVEL ${p.level}</span>
                <span class="font-mono text-xs text-white/40">·</span>
                <span class="font-orbitron text-xs" style="color:var(--c-cyan)">RATING ${p.rating}</span>
                <span class="font-mono text-xs text-white/40">·</span>
                <span class="font-orbitron text-xs" style="color:var(--c-yellow)">GLOBAL #${p.rank}</span>
              </div>
              <div class="xp-bar w-full mb-1" style="max-width:300px"><div class="xp-fill" style="width:${(p.xp%1000)/10}%"></div></div>
              <div class="text-xs text-white/40 font-mono">${p.xp.toLocaleString()} XP · ${1000-(p.xp%1000)} to next level</div>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-white/5">
            ${[['WINS',p.wins,'🏆','#ffd700'],['ARENAS',p.arenas,'⚔','#a855f7'],['WIN RATE',p.winRate+'%','📈','#00ff88'],['TOP 10',p.topTen,'⭐','#00f5ff']].map(([l,v,ic,c])=>`
            <div class="text-center">
              <div class="text-lg mb-0.5">${ic}</div>
              <div class="font-orbitron font-black text-lg" style="color:${c}">${v}</div>
              <div class="text-xs text-white/40 uppercase tracking-wider">${l}</div>
            </div>`).join('')}
          </div>
        </div>

        <!-- Quick stats -->
        <div class="flex flex-col gap-4 anim-fadeInUp" style="animation-delay:.1s">
          <div class="glass-card p-5 text-center" style="border-color:rgba(0,255,136,.3)">
            <div class="text-2xl mb-1">🔥</div>
            <div class="font-orbitron font-black text-3xl" style="color:var(--c-green)">${p.streak}</div>
            <div class="text-xs text-white/50 tracking-widest uppercase mt-1">Current Streak</div>
          </div>
          <div class="glass-card p-5 text-center" style="border-color:rgba(168,85,247,.3)">
            <div class="text-2xl mb-1">💎</div>
            <div class="font-orbitron font-black text-3xl" style="color:var(--c-purple)">${p.innovScore}</div>
            <div class="text-xs text-white/50 tracking-widest uppercase mt-1">Innovation Score</div>
          </div>
          <div class="glass-card p-5 text-center" style="border-color:rgba(0,245,255,.3)">
            <div class="text-2xl mb-1">🏆</div>
            <div class="font-orbitron font-black text-sm" style="color:var(--c-cyan)">${p.bestArena}</div>
            <div class="text-xs text-white/50 tracking-widest uppercase mt-1">Best Arena</div>
          </div>
        </div>
      </div>

      <!-- ENTER MATCHMAKING card -->
      <div class="glass-card p-8 mb-8 text-center anim-fadeInUp" style="animation-delay:.2s;background:linear-gradient(135deg,rgba(168,85,247,.08),rgba(0,245,255,.05));border-color:rgba(0,245,255,.3)">
        <div class="font-orbitron text-xs tracking-widest text-white/40 mb-2">NEXT CHALLENGE AWAITS</div>
        <h2 class="font-orbitron font-black text-3xl mb-3">READY FOR YOUR NEXT ARENA?</h2>
        <p class="text-white/50 mb-8 max-w-md mx-auto">30 creators. One challenge. Prove your creativity against the world.</p>
        <button class="btn-primary text-base px-12 py-4" onclick="navigateTo('arenas')">
          <span>⚔ ENTER MATCHMAKING</span>
        </button>
        <div class="flex justify-center gap-8 mt-6 text-xs text-white/30 font-mono">
          <span>AVG WAIT: 00:08</span>
          <span>·</span>
          <span>PLAYERS ONLINE: 2,841</span>
          <span>·</span>
          <span>ACTIVE ARENAS: 47</span>
        </div>
      </div>

      <!-- Bottom row -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Recent Performance -->
        <div class="glass-card p-5 anim-fadeInUp" style="animation-delay:.3s">
          <div class="flex items-center justify-between mb-4">
            <span class="font-orbitron text-xs tracking-widest text-white/60">RECENT PERFORMANCE</span>
            <button class="text-xs text-white/30 hover:text-white/60" onclick="navigateTo('history')">SEE ALL →</button>
          </div>
          ${MATCH_HISTORY.slice(0,3).map(m=>`
          <div class="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                 style="background:rgba(168,85,247,.15)">
              ${ARENAS.find(a=>a.name===m.arena)?.emoji||'⚔'}
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-orbitron text-xs font-semibold truncate">${m.arena}</div>
              <div class="text-xs text-white/40">${m.theme}</div>
            </div>
            <div class="text-right flex-shrink-0">
              <div class="font-orbitron text-xs font-bold" style="color:${m.rank<=3?'var(--c-yellow)':m.rank<=10?'var(--c-green)':'var(--c-cyan)'}">#${m.rank}</div>
              <div class="text-xs" style="color:var(--c-green)">+${m.xp} XP</div>
            </div>
          </div>`).join('')}
        </div>

        <!-- Top Arenas -->
        <div class="glass-card p-5 anim-fadeInUp" style="animation-delay:.4s">
          <div class="font-orbitron text-xs tracking-widest text-white/60 mb-4">POPULAR ARENAS NOW</div>
          ${ARENAS.slice(0,4).map(a=>`
          <div class="flex items-center gap-3 py-2 cursor-pointer hover:bg-white/5 rounded px-2 transition-all" onclick="navigateTo('arenas')">
            <span class="text-lg">${a.emoji}</span>
            <div class="flex-1">
              <div class="font-orbitron text-xs font-semibold" style="color:${a.color}">${a.name}</div>
              <div class="text-xs text-white/40">${a.players.toLocaleString()} players</div>
            </div>
            <div class="flex">${'★'.repeat(a.diff)}${'☆'.repeat(5-a.diff)}</div>
          </div>`).join('')}
        </div>

        <!-- Quick Actions -->
        <div class="glass-card p-5 anim-fadeInUp" style="animation-delay:.5s">
          <div class="font-orbitron text-xs tracking-widest text-white/60 mb-4">QUICK ACTIONS</div>
          <div class="flex flex-col gap-2">
            ${[
              ['🏆','LEADERBOARD','See global rankings','leaderboard'],
              ['👤','PROFILE','View your stats','profile'],
              ['📜','HISTORY','Match history','history'],
              ['🗺','PROGRESSION','Arena progression map','progression'],
              ['🌍','COMMUNITY','Discover creators','community'],
              ['🏅','ACHIEVEMENTS','View badges','achievements'],
            ].map(([i,n,d,s])=>`
            <button class="btn-ghost text-left flex items-center gap-3 w-full" onclick="navigateTo('${s}')">
              <span>${i}</span><span><div class="text-xs font-semibold">${n}</div><div class="text-xs text-white/30">${d}</div></span>
            </button>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function initDashboard() {
  setTimeout(()=> showNotification('🎯','Daily Challenge','Daily challenge resets in 4 hours!','#00f5ff'), 1000);
}

/* ─── SCREEN: ARENAS ──────────────────────────────────────── */
function renderArenas() {
  return `
  ${renderNav('arenas')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-10 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">SELECT YOUR BATTLEGROUND</div>
        <h1 class="font-orbitron font-black text-4xl mb-2">CHOOSE YOUR <span style="color:var(--c-cyan)">ARENA</span></h1>
        <p class="text-white/50">Each arena has a unique theme, challenge set, and player community.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${ARENAS.map((a,i)=>`
        <div class="arena-card anim-fadeInUp" style="animation-delay:${i*.07}s;border-color:${a.color}25"
             id="arena-${a.id}" onclick="selectArena('${a.id}')">
          <div class="p-6 pb-4 h-full flex flex-col" style="background:linear-gradient(135deg,rgba(10,22,40,.95) 0%,rgba(10,22,40,.85) 100%)">
            <!-- Top -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="text-4xl mb-2">${a.emoji}</div>
                <div class="font-orbitron font-black text-xl" style="color:${a.color}">${a.name}</div>
                <div class="text-xs text-white/50 mt-0.5">${a.theme}</div>
              </div>
              <div class="text-right">
                <div class="glass px-2 py-1 rounded text-xs font-mono" style="color:${a.color};border-color:${a.color}30">
                  ${a.players.toLocaleString()} ONLINE
                </div>
              </div>
            </div>
            <!-- Desc -->
            <p class="text-sm text-white/60 flex-1 mb-4">${a.desc}</p>
            <!-- Difficulty -->
            <div class="flex items-center justify-between mt-auto">
              <div class="flex items-center gap-1">
                <span class="text-xs text-white/40 mr-1">DIFF</span>
                ${[1,2,3,4,5].map(s=>`<span style="color:${s<=a.diff?a.color:'rgba(255,255,255,.15)'};font-size:.75rem">★</span>`).join('')}
              </div>
              <button class="font-orbitron text-xs px-4 py-2 rounded-lg transition-all"
                      style="background:${a.color}20;color:${a.color};border:1px solid ${a.color}40">
                ENTER →
              </button>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function selectArena(id) {
  STATE.match.arena = ARENAS.find(a=>a.id===id);
  navigateTo('format');
}

/* ─── SCREEN: FORMAT SELECT ───────────────────────────────── */
function renderFormat() {
  const a = STATE.match.arena;
  return `
  ${renderNav('compete')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-10 anim-fadeInUp">
        <div class="flex items-center justify-center gap-2 mb-4">
          <span class="text-2xl">${a.emoji}</span>
          <span class="font-orbitron text-xs tracking-widest px-3 py-1 rounded-full" style="color:${a.color};background:${a.color}15;border:1px solid ${a.color}30">${a.name} ARENA</span>
        </div>
        <h1 class="font-orbitron font-black text-4xl mb-2">SELECT YOUR <span style="color:${a.color}">BATTLE FORMAT</span></h1>
        <p class="text-white/50">Choose the type of creation you will build in this arena.</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4" id="format-grid">
        ${FORMATS.map((f,i)=>`
        <div class="glass-card p-5 text-center cursor-pointer transition-all anim-fadeInUp format-card"
             style="animation-delay:${i*.06}s" id="fmt-${f.id}" data-id="${f.id}"
             onclick="selectFormat('${f.id}')">
          <div class="text-3xl mb-3">${f.icon}</div>
          <div class="font-orbitron font-bold text-xs mb-2">${f.name}</div>
          <p class="text-xs text-white/50 mb-3">${f.desc}</p>
          <div class="flex justify-center gap-0.5">${[1,2,3,4,5].map(s=>`<span style="font-size:.6rem;color:${s<=f.diff?a.color:'rgba(255,255,255,.15)'}">★</span>`).join('')}</div>
        </div>`).join('')}
      </div>
      <div class="flex justify-between mt-8 anim-fadeInUp" style="animation-delay:.5s">
        <button class="btn-ghost" onclick="navigateTo('arenas')">← BACK</button>
        <button class="btn-primary" id="format-next-btn" style="opacity:.3;pointer-events:none" onclick="proceedToMatchmaking()">
          <span>ENTER MATCHMAKING →</span>
        </button>
      </div>
    </div>
  </div>`;
}

function initFormat() {
  STATE.match.format = null;
}

function selectFormat(id) {
  STATE.match.format = FORMATS.find(f=>f.id===id);
  document.querySelectorAll('.format-card').forEach(el=>{
    const isSelected = el.dataset.id === id;
    const a = STATE.match.arena;
    el.style.borderColor = isSelected ? a.color : 'rgba(168,85,247,.25)';
    el.style.background   = isSelected ? `${a.color}15` : 'rgba(10,22,40,.7)';
    el.style.boxShadow    = isSelected ? `0 0 20px ${a.color}30` : '';
  });
  const btn = document.getElementById('format-next-btn');
  btn.style.opacity = '1';
  btn.style.pointerEvents = 'auto';
}

function proceedToMatchmaking() {
  if (!STATE.match.format) return;
  STATE.match.playersFound = 1;
  STATE.match.timer = 3600;
  navigateTo('matchmaking');
}

/* ─── SCREEN: MATCHMAKING ─────────────────────────────────── */
function renderMatchmaking() {
  const a = STATE.match.arena, f = STATE.match.format;
  const slots = Array.from({length:30},(_,i)=>i);
  return `
  ${renderNav('compete')}
  <div class="min-h-screen bg-gradient-arena flex flex-col items-center justify-center px-4 py-8">
    <div class="max-w-3xl w-full mx-auto text-center">
      <div class="anim-fadeInUp mb-8">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">MATCHMAKING</div>
        <h1 class="font-orbitron font-black text-4xl mb-2" style="color:var(--c-cyan)">SEARCHING FOR CREATORS...</h1>
        <div class="flex items-center justify-center gap-6 text-xs font-mono text-white/50 mt-3 flex-wrap gap-3">
          <span>ARENA: <span style="color:${a.color}">${a.name}</span></span>
          <span>·</span>
          <span>FORMAT: <span style="color:var(--c-purple)">${f.name}</span></span>
        </div>
      </div>

      <!-- Ring -->
      <div class="flex justify-center mb-8">
        <div class="mm-ring">
          <div class="text-center">
            <div class="font-orbitron font-black text-3xl" style="color:var(--c-cyan)" id="mm-count">${STATE.match.playersFound}</div>
            <div class="font-mono text-xs text-white/40">/ 30</div>
          </div>
        </div>
      </div>

      <!-- Progress -->
      <div class="mb-6">
        <div class="flex justify-between text-xs font-mono text-white/40 mb-2">
          <span>PLAYERS FOUND</span>
          <span id="mm-time">00:08</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" id="mm-progress" style="width:${(STATE.match.playersFound/30)*100}%"></div></div>
      </div>

      <!-- Player slots -->
      <div class="grid grid-cols-6 md:grid-cols-10 gap-2 mb-8" id="mm-slots">
        ${slots.map(i=>`
        <div class="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono transition-all border"
             id="slot-${i}" style="${i<STATE.match.playersFound?`background:${a.color}20;border-color:${a.color}50;color:${a.color}`:'background:rgba(255,255,255,.03);border-color:rgba(255,255,255,.08);color:rgba(255,255,255,.2)'}">
          ${i<STATE.match.playersFound?'✓':'·'}
        </div>`).join('')}
      </div>

      <div class="anim-fadeInUp" style="animation-delay:.3s">
        <button class="btn-ghost" onclick="navigateTo('format')">CANCEL</button>
      </div>
    </div>
  </div>`;
}

function initMatchmaking() {
  const a = STATE.match.arena;
  let found = STATE.match.playersFound;
  const interval = setInterval(()=>{
    if (found >= 30) {
      clearInterval(interval);
      STATE.match.playersFound = 30;
      setTimeout(()=>{
        navigateTo('challenge-intro');
      }, 1200);
      return;
    }
    const add = Math.floor(Math.random()*3)+1;
    found = Math.min(30, found + add);
    STATE.match.playersFound = found;
    const countEl = document.getElementById('mm-count');
    const progEl  = document.getElementById('mm-progress');
    if (countEl) countEl.textContent = found;
    if (progEl)  progEl.style.width  = `${(found/30)*100}%`;
    for (let i=0; i<30; i++) {
      const slot = document.getElementById(`slot-${i}`);
      if (!slot) continue;
      if (i < found) {
        slot.style.background    = `${a.color}20`;
        slot.style.borderColor   = `${a.color}50`;
        slot.style.color         = a.color;
        slot.textContent         = '✓';
      }
    }
    if (found === 30) {
      const h1 = document.querySelector('h1');
      if (h1) { h1.textContent = 'ARENA FOUND'; h1.style.color = a.color; }
      showNotification('⚔','Arena Found!',`${a.name} arena is ready!`, a.color);
    }
  }, 400);
}

/* ─── SCREEN: CHALLENGE INTRO ────────────────────────────── */
function renderChallengeIntro() {
  const a = STATE.match.arena, f = STATE.match.format;
  return `
  <div class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
       style="background:radial-gradient(ellipse at center,${a.color}18 0%,#020408 70%)">
    <div class="hero-grid absolute inset-0 opacity-20 pointer-events-none"></div>

    <!-- Cinematic text -->
    <div class="text-center z-10 anim-scaleIn px-6">
      <div class="font-orbitron text-xs tracking-widest text-white/30 mb-6 anim-fadeInUp">ARENA LOCKED · CREATORS MATCHED</div>
      <div class="font-orbitron font-black mb-4" style="font-size:clamp(3rem,8vw,6rem);color:${a.color};text-shadow:0 0 60px ${a.color}">
        ${a.emoji} ${a.name}
      </div>
      <div class="font-orbitron text-2xl text-white/70 mb-2">ARENA</div>
      <div class="flex items-center justify-center gap-8 my-8 flex-wrap">
        <div class="text-center">
          <div class="font-orbitron font-black text-4xl" style="color:var(--c-cyan)">30</div>
          <div class="text-xs text-white/40 mt-1">CREATORS</div>
        </div>
        <div class="font-orbitron text-3xl text-white/20">·</div>
        <div class="text-center">
          <div class="font-orbitron font-black text-4xl" style="color:var(--c-purple)">1</div>
          <div class="text-xs text-white/40 mt-1">CHALLENGE</div>
        </div>
        <div class="font-orbitron text-3xl text-white/20">·</div>
        <div class="text-center">
          <div class="font-orbitron font-black text-4xl" style="color:var(--c-yellow)">1</div>
          <div class="text-xs text-white/40 mt-1">WINNER</div>
        </div>
      </div>

      <div class="glass-card p-8 max-w-xl mx-auto mb-8" style="border-color:${a.color}40">
        <div class="font-orbitron text-xs tracking-widest text-white/40 mb-4">YOUR CHALLENGE</div>
        <p class="text-xl font-semibold leading-relaxed mb-6">
          "Create a digital experience that helps humans understand and protect <span style="color:${a.color}">endangered wildlife</span>."
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${[['TIME LIMIT','60 MIN','⏱','var(--c-yellow)'],['PLAYERS','30','👥','var(--c-cyan)'],['FORMAT',f.name.split('/')[0].trim(),'⚡','var(--c-purple)'],['DIFFICULTY','HARD','💀','#ff4500']].map(([l,v,i,c])=>`
          <div class="text-center glass p-3 rounded-lg">
            <div class="text-lg mb-1">${i}</div>
            <div class="font-orbitron font-bold text-sm" style="color:${c}">${v}</div>
            <div class="text-xs text-white/40">${l}</div>
          </div>`).join('')}
        </div>
      </div>

      <button class="btn-primary text-base px-12 py-4" onclick="navigateTo('theme-select')">
        <span>⚡ ACCEPT CHALLENGE</span>
      </button>
    </div>
  </div>`;
}

function initChallengeIntro() {}

/* ─── SCREEN: THEME SELECT ────────────────────────────────── */
function renderThemeSelect() {
  const a = STATE.match.arena;
  return `
  ${renderNav('compete')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-10 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">STEP 1 OF 2</div>
        <h1 class="font-orbitron font-black text-4xl mb-2">SELECT YOUR <span style="color:${a.color}">THEME</span></h1>
        <p class="text-white/50">Choose the specific theme you will focus on during this arena session.</p>
      </div>

      <div class="flex flex-col gap-4" id="theme-grid">
        ${FOREST_THEMES.map((t,i)=>`
        <div class="glass-card p-5 cursor-pointer theme-card anim-fadeInUp" data-id="${t.id}"
             style="animation-delay:${i*.08}s" onclick="selectTheme('${t.id}')">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="font-orbitron font-bold text-base mb-1">${t.name}</div>
              <p class="text-sm text-white/60">${t.desc}</p>
            </div>
            <div class="ml-4 flex-shrink-0">
              <div class="flex gap-0.5 mb-1">${[1,2,3,4,5].map(s=>`<span style="font-size:.65rem;color:${s<=t.diff?a.color:'rgba(255,255,255,.15)'}">★</span>`).join('')}</div>
              <div class="text-xs text-white/30 text-right">DIFF ${t.diff}/5</div>
            </div>
          </div>
        </div>`).join('')}
      </div>

      <div class="flex justify-between mt-8">
        <button class="btn-ghost" onclick="navigateTo('challenge-intro')">← BACK</button>
        <button class="btn-primary" id="theme-next-btn" style="opacity:.3;pointer-events:none" onclick="navigateTo('legend')">
          <span>LOCK THEME →</span>
        </button>
      </div>
    </div>
  </div>`;
}

function selectTheme(id) {
  STATE.match.theme = FOREST_THEMES.find(t=>t.id===id);
  const a = STATE.match.arena;
  document.querySelectorAll('.theme-card').forEach(el=>{
    const sel = el.dataset.id === id;
    el.style.borderColor = sel ? a.color : 'rgba(168,85,247,.25)';
    el.style.background  = sel ? `${a.color}12` : 'rgba(10,22,40,.7)';
    el.style.boxShadow   = sel ? `0 0 20px ${a.color}25` : '';
  });
  const btn = document.getElementById('theme-next-btn');
  btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
}

/* ─── SCREEN: LEGEND ATTRIBUTES ──────────────────────────── */
function renderLegend() {
  const a = STATE.match.arena;
  return `
  ${renderNav('compete')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-10 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">STEP 2 OF 2</div>
        <h1 class="font-orbitron font-black text-4xl mb-2">YOUR <span style="color:var(--c-yellow)">LEGEND ATTRIBUTES</span></h1>
        <p class="text-white/50">You MUST incorporate these elements into your final creation to maximize your XP.</p>
      </div>

      <!-- Mandatory -->
      <div class="glass-card p-6 mb-6 anim-fadeInUp" style="border-color:rgba(255,215,0,.3)">
        <div class="flex items-center justify-between mb-5">
          <div class="font-orbitron text-sm font-bold" style="color:var(--c-yellow)">⚡ MANDATORY ATTRIBUTES</div>
          <div class="glass px-3 py-1 rounded-full text-xs font-mono" style="color:var(--c-yellow)">5 REQUIRED</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${MANDATORY_ATTRS.map((attr,i)=>`
          <div class="flex items-center gap-4 glass p-4 rounded-xl anim-fadeInUp" style="animation-delay:${i*.1}s;border-color:rgba(255,215,0,.15)">
            <div class="text-3xl">${attr.icon}</div>
            <div class="flex-1">
              <div class="font-orbitron font-bold text-sm">${attr.name}</div>
              <div class="text-xs text-white/50">${attr.meaning}</div>
            </div>
            <div class="text-xs font-mono" style="color:var(--c-green)">+${attr.xp} XP</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Bonus -->
      <div class="glass-card p-6 mb-6 anim-fadeInUp" style="animation-delay:.3s;border-color:rgba(0,245,255,.2)">
        <div class="flex items-center justify-between mb-5">
          <div class="font-orbitron text-sm font-bold" style="color:var(--c-cyan)">✨ BONUS ATTRIBUTES</div>
          <div class="glass px-3 py-1 rounded-full text-xs font-mono" style="color:var(--c-cyan)">2 OPTIONAL</div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${BONUS_ATTRS.map((attr,i)=>`
          <div class="flex items-center gap-4 glass p-4 rounded-xl" style="border-color:rgba(0,245,255,.12)">
            <div class="text-3xl">${attr.icon}</div>
            <div class="flex-1">
              <div class="font-orbitron font-bold text-sm">${attr.name}</div>
              <div class="text-xs text-white/50">${attr.meaning}</div>
            </div>
            <div class="text-xs font-mono" style="color:var(--c-cyan)">+${attr.xp} XP</div>
          </div>`).join('')}
        </div>
      </div>

      <div class="glass-card p-4 mb-8 anim-fadeInUp text-center" style="animation-delay:.4s;border-color:rgba(255,215,0,.2);background:rgba(255,215,0,.05)">
        <div class="font-orbitron text-xs text-white/60">USE ALL MANDATORY ATTRIBUTES TO MAXIMIZE YOUR XP</div>
        <div class="font-orbitron font-black text-xl mt-1" style="color:var(--c-yellow)">MAX LEGEND BONUS: +650 XP</div>
      </div>

      <div class="flex justify-between anim-fadeInUp" style="animation-delay:.5s">
        <button class="btn-ghost" onclick="navigateTo('theme-select')">← BACK</button>
        <button class="btn-primary" onclick="navigateTo('briefing')"><span>REVIEW BRIEFING →</span></button>
      </div>
    </div>
  </div>`;
}

/* ─── SCREEN: BRIEFING ────────────────────────────────────── */
function renderBriefing() {
  const a = STATE.match.arena, f = STATE.match.format, t = STATE.match.theme || FOREST_THEMES[0];
  return `
  ${renderNav('compete')}
  <div class="min-h-screen bg-gradient-arena flex items-center justify-center px-4 py-8">
    <div class="max-w-xl w-full mx-auto">
      <div class="text-center mb-8 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">FINAL BRIEFING</div>
        <h1 class="font-orbitron font-black text-4xl">READY TO <span style="color:${a.color}">BATTLE?</span></h1>
      </div>

      <div class="glass-card p-8 anim-scaleIn" style="border-color:${a.color}40">
        ${[
          ['ARENA',        `${a.emoji} ${a.name}`,      a.color    ],
          ['FORMAT',       f.icon+' '+f.name,           'var(--c-purple)'],
          ['THEME',        t.name,                      'var(--c-cyan)'  ],
          ['TIME LIMIT',   '60:00',                     'var(--c-yellow)'],
          ['MANDATORY',    '5 ATTRIBUTES',              '#ffd700'        ],
          ['BONUS',        '2 ATTRIBUTES',              'var(--c-cyan)'  ],
          ['PLAYERS',      '30 CREATORS',               'var(--c-green)' ],
          ['EVALUATION',   'AI + SYSTEM ANALYSIS',      'var(--c-pink)'  ],
        ].map(([l,v,c])=>`
        <div class="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
          <span class="font-mono text-xs text-white/40 uppercase tracking-wider">${l}</span>
          <span class="font-orbitron text-sm font-semibold" style="color:${c}">${v}</span>
        </div>`).join('')}

        <button class="btn-primary w-full mt-8 text-base py-4" onclick="enterArena()">
          <span>⚔ ENTER DEVELOPMENT ARENA</span>
        </button>
        <p class="text-center text-xs text-white/30 mt-3">A quick IDE guide appears before your timer starts.</p>
      </div>
    </div>
  </div>`;
}

function enterArena() {
  STATE.match.timer = 3600;
  STATE.match.submitted = false;
  STATE.match.attributeStatus = [true, true, true, false, false];
  navigateTo('arena');
}

/* ─── SCREEN: ARENA IDE ───────────────────────────────────── */
function loadSavedIDEProject() {
  if (STATE.ide.loaded) return;
  STATE.ide.loaded = true;
  try {
    const saved = JSON.parse(localStorage.getItem('novaarena-project') || 'null');
    if (saved?.files && typeof saved.files === 'object') Object.assign(STATE.ide.files, saved.files);
    if (saved?.projectName) STATE.ide.projectName = saved.projectName;
  } catch (error) { /* Ignore unavailable or invalid local project data. */ }
}

function renderArenaIDE() {
  loadSavedIDEProject();
  const a = STATE.match.arena;
  const files = Object.keys(STATE.ide.files);
  const s = STATE.match.timer;
  const m2 = Math.floor(s/60), s2 = s%60;
  const tStr = `${String(m2).padStart(2,'0')}:${String(s2).padStart(2,'0')}`;
  const tClass = s<=60?'timer-critical':s<=300?'timer-urgent':s<=900?'timer-warning':'timer-normal';

  return `
  <div class="arena-ide">
    <!-- IDE Top Bar -->
    <div class="arena-ide-topbar glass-dark flex items-center justify-between px-4 border-b border-white/5">
      <div class="flex items-center gap-4">
        <span class="font-orbitron font-black text-sm cursor-pointer" style="color:${a.color}" onclick="navigateTo('dashboard')">${a.emoji} ${a.name}</span>
        <span class="text-white/20">|</span>
        <input class="ide-project-name" aria-label="Project name" value="${escapeHTML(STATE.ide.projectName)}" oninput="STATE.ide.projectName=this.value" />
      </div>
      <div class="flex items-center gap-3">
        <div class="font-orbitron font-black text-2xl ${tClass}" id="arena-timer">${tStr}</div>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-ghost text-xs px-2 py-1" aria-label="Save project" title="Save project" onclick="saveProject()">💾 <span>SAVE</span></button>
        <button class="btn-ghost text-xs px-2 py-1" aria-label="Run project" title="Run project" onclick="runProject()">▶ <span>RUN</span></button>
        <button class="btn-ghost text-xs px-2 py-1" aria-label="Open preview" title="Open preview" onclick="openPreview()">🖥 <span>PREVIEW</span></button>
        <button class="btn-ghost text-xs px-2 py-1" aria-label="Ask AI co-pilot" title="Ask AI co-pilot" onclick="aiAssist()">🤖 <span>AI ASSIST</span></button>
        <button class="btn-danger text-xs px-3 py-1" aria-label="Submit project" title="Submit project" onclick="showSubmitModal()">🚀 <span>SUBMIT</span></button>
      </div>
    </div>

    <!-- IDE Body -->
    <div class="arena-ide-grid">
      <!-- Left Sidebar: File Tree -->
      <div class="ide-sidebar-left p-3 flex flex-col gap-1">
        <div class="font-mono text-xs text-white/30 uppercase tracking-widest px-2 py-1 mb-1">EXPLORER</div>
        <div class="file-tree-item file-tree-folder"><span>⌄</span><span>PROJECT</span></div>
        ${files.map(name=>`
        <button class="file-tree-item ${STATE.ide.activeFile===name?'active':''}" data-ide-file="${name}" onclick="selectIDEFile('${name}')">
          <span>${name.endsWith('.html')?'◈':name.endsWith('.css')?'▧':'⌘'}</span><span>${name}</span>
          ${STATE.ide.dirtyFiles.includes(name)?'<span class="ml-auto ide-unsaved-dot" aria-label="Unsaved changes"></span>':''}
        </button>`).join('')}
        <button class="ide-add-file" onclick="createIDEFile()">＋ New file</button>
        <div class="ide-explorer-note">Your project files stay in this browser when saved.</div>
      </div>

      <!-- Center: Code Editor -->
      <div class="ide-editor" id="code-editor">
        <!-- Tab bar -->
        <div class="ide-tabs" role="tablist" aria-label="Project files">
          ${files.map(name=>`
          <button class="ide-tab ${STATE.ide.activeFile===name?'active':''}" data-ide-file="${name}" role="tab" aria-selected="${STATE.ide.activeFile===name}" onclick="selectIDEFile('${name}')">
            <span>${name}</span>${STATE.ide.dirtyFiles.includes(name)?'<span class="ide-unsaved-dot" aria-label="Unsaved changes"></span>':''}
          </button>`).join('')}
          <span class="ide-editor-label">INNOVARENA STUDIO</span>
        </div>
        <div class="ide-editor-workspace">
          <div class="ide-line-numbers" id="ide-line-numbers" aria-hidden="true">1</div>
          <textarea id="ide-code-input" class="ide-code-input" aria-label="Code editor" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" placeholder="Start with a blank canvas. Describe an idea to the co-pilot or write your code here...">${escapeHTML(STATE.ide.files[STATE.ide.activeFile] || '')}</textarea>
        </div>
        <!-- Terminal -->
        <div class="ide-terminal">
          <div class="ide-terminal-tabs"><span>OUTPUT</span><span>CONSOLE</span><span>PROBLEMS</span></div>
          <div id="ide-output" class="ide-output"><span class="ide-output-prompt">$</span> Your workspace is ready. Run your project to see it here.</div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="ide-sidebar-right ide-tools-panel flex flex-col overflow-auto">
        <!-- AI Assistant -->
        <div class="ide-chat-panel">
          <div class="ide-chat-heading">
            <div class="ide-chat-avatar">✳</div>
            <div><div class="ide-chat-title">BUILD WITH AI</div><div class="ide-chat-status"><span></span> LOCAL PREVIEW</div></div>
            <button class="ide-icon-button" title="Clear chat" aria-label="Clear chat" onclick="clearIDEChat()">⌫</button>
          </div>
          <div id="ide-chat-messages" class="ide-chat-messages" aria-live="polite">
            ${STATE.ide.messages.map(msg=>`<div class="ide-chat-message ${msg.role}"><span class="ide-message-label">${msg.role==='user'?'YOU':'CO-PILOT'}</span><div>${escapeHTML(msg.text)}</div></div>`).join('')}
          </div>
          <div class="ide-chat-prompts">
            <button onclick="useIDEPrompt('Give me three ideas for this challenge')">IDEAS</button>
            <button onclick="useIDEPrompt('Help me plan the first screen')">PLAN A SCREEN</button>
            <button onclick="useIDEPrompt('How do I preview my project?')">PREVIEW HELP</button>
          </div>
          <div class="ide-chat-compose">
            <textarea id="ai-input" rows="2" aria-label="Message the co-pilot" placeholder="Describe what you want to build..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendAiMsg()}"></textarea>
            <button onclick="sendAiMsg()" title="Send message" aria-label="Send message">↑</button>
          </div>
          <div class="ide-chat-disclaimer">Prototype helper · connect an AI model for generated code</div>
        </div>

        <!-- Legend Tracker -->
        <div class="p-3 border-b border-white/5">
          <div class="font-orbitron text-xs font-bold mb-3" style="color:var(--c-yellow)">⚡ LEGEND PROGRESS</div>
          <div id="legend-tracker" class="space-y-2">
            ${MANDATORY_ATTRS.map((attr,i)=>`
            <div class="flex items-center gap-2 p-2 rounded-lg text-xs transition-all legend-attr" id="attr-${i}"
                 style="${STATE.match.attributeStatus[i]?'background:rgba(0,255,136,.08);border:1px solid rgba(0,255,136,.25)':'background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08)'}">
              <span>${attr.icon}</span>
              <span class="font-orbitron font-semibold flex-1" style="color:${STATE.match.attributeStatus[i]?'var(--c-green)':'rgba(255,255,255,.4)'}">${attr.name}</span>
              <span style="color:${STATE.match.attributeStatus[i]?'var(--c-green)':'rgba(255,255,255,.2)'}">${STATE.match.attributeStatus[i]?'✓':'○'}</span>
            </div>`).join('')}
          </div>
          <div class="mt-2 font-mono text-xs text-right" style="color:var(--c-green)">
            +${STATE.match.attributeStatus.filter(Boolean).length * 100} XP EARNED
          </div>
        </div>

        <!-- Requirements -->
        <div class="p-3">
          <div class="font-orbitron text-xs font-bold mb-3 text-white/60">📋 REQUIREMENTS</div>
          <div class="space-y-1 text-xs text-white/50">
            <div class="flex gap-2"><span style="color:var(--c-green)">✓</span><span>Wildlife theme incorporated</span></div>
            <div class="flex gap-2"><span style="color:var(--c-green)">✓</span><span>Interactive element present</span></div>
            <div class="flex gap-2"><span style="color:var(--c-yellow)">○</span><span>Emergency/threat system</span></div>
            <div class="flex gap-2"><span style="color:var(--c-yellow)">○</span><span>Communication feature</span></div>
            <div class="flex gap-2"><span style="color:var(--c-green)">✓</span><span>Nature ecosystem present</span></div>
          </div>
          <div class="mt-4 progress-bar">
            <div class="progress-fill" style="width:60%"></div>
          </div>
          <div class="text-xs font-mono text-white/30 mt-1 text-right">60% COMPLETE</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Submit Modal (hidden) -->
  <div id="submit-modal" class="modal-overlay" style="display:none">
    <div class="modal-box">
      <div class="font-orbitron font-black text-xl mb-6 text-center" style="color:var(--c-cyan)">SUBMIT YOUR CREATION?</div>
      ${[
        ['Project', STATE.ide.projectName || 'Untitled project'],
        ['Format',  STATE.match.format?.name || 'GAME'],
        ['Arena',   STATE.match.arena?.name || 'FOREST'],
        ['Attributes',`${STATE.match.attributeStatus.filter(Boolean).length} / 5`],
        ['Completion',`${Math.round(STATE.match.attributeStatus.filter(Boolean).length / 5 * 100)}%`],
        ['Time Remaining','Remaining'],
      ].map(([l,v])=>`
      <div class="flex justify-between py-2 border-b border-white/5">
        <span class="text-xs text-white/40 font-mono">${l}</span>
        <span class="font-orbitron text-xs font-semibold text-white">${v}</span>
      </div>`).join('')}
      <div class="flex gap-3 mt-6">
        <button class="btn-ghost flex-1" onclick="document.getElementById('submit-modal').style.display='none'">CANCEL</button>
        <button class="btn-danger flex-1" onclick="finalSubmit()"><span>🚀 FINAL SUBMISSION</span></button>
      </div>
    </div>
  </div>

  <!-- Preview Modal (hidden) -->
  <div id="preview-modal" class="modal-overlay" style="display:none">
    <div style="background:rgba(10,22,40,.98);border:1px solid rgba(0,245,255,.3);border-radius:1.25rem;width:90%;max-width:900px;max-height:90vh;overflow:auto">
      <div class="flex items-center justify-between p-4 border-b border-white/5">
        <div class="font-orbitron text-sm" style="color:var(--c-cyan)">🖥 LIVE PREVIEW — ${escapeHTML(STATE.ide.projectName)}</div>
        <div class="flex gap-2">
          <button class="btn-ghost text-xs px-2 py-1">DESKTOP</button>
          <button class="btn-ghost text-xs px-2 py-1">TABLET</button>
          <button class="btn-ghost text-xs px-2 py-1">MOBILE</button>
          <button class="btn-ghost text-xs px-2 py-1" onclick="document.getElementById('preview-modal').style.display='none'">✕ CLOSE</button>
        </div>
      </div>
      <iframe id="ide-preview-frame" class="ide-preview-frame" title="Live project preview" sandbox="allow-scripts"></iframe>
    </div>
  </div>`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
}

function initArenaIDE() {
  updateTimerDisplay();
  const editor = document.getElementById('ide-code-input');
  const projectName = document.querySelector('.ide-project-name');
  if (editor) {
    editor.value = STATE.ide.files[STATE.ide.activeFile] || '';
    editor.addEventListener('input', handleIDEEdit);
    editor.addEventListener('scroll', syncLineNumberScroll);
    updateLineNumbers();
  }
  if (projectName) projectName.value = STATE.ide.projectName;
  const chat = document.getElementById('ide-chat-messages');
  if (chat) chat.scrollTop = chat.scrollHeight;
  startIDETour();
  // Simulate attribute detection after 5s
  setTimeout(()=>{
    if (STATE.screen !== 'arena') return;
    STATE.match.attributeStatus[3] = true;
    const el = document.getElementById('attr-3');
    if (el) {
      el.style.background = 'rgba(0,255,136,.08)';
      el.style.border = '1px solid rgba(0,255,136,.25)';
      el.querySelector('span:nth-child(2)').style.color = 'var(--c-green)';
      el.querySelector('span:last-child').style.color = 'var(--c-green)';
      el.querySelector('span:last-child').textContent = '✓';
    }
    showNotification('🔥','Attribute Detected','FIRE — Threat/Emergency detected in your code!','#ffd700');
  }, 5000);
}

function startIDETour() {
  let tourSeen = false;
  try { tourSeen = localStorage.getItem('novaarena-ide-tour-complete') === 'true'; } catch (error) { /* Continue without saved browser preferences. */ }
  if (tourSeen) {
    startTimer();
    return;
  }
  ideTourIndex = 0;
  renderIDETourStep();
}

function renderIDETourStep() {
  const existingTour = document.getElementById('ide-tour');
  if (existingTour) existingTour.remove();
  if (ideTourIndex < 0 || ideTourIndex >= IDE_TOUR_STEPS.length) {
    finishIDETour();
    return;
  }

  const step = IDE_TOUR_STEPS[ideTourIndex];
  const target = document.querySelector(step.selector);
  if (!target) {
    ideTourIndex++;
    renderIDETourStep();
    return;
  }

  const rect = target.getBoundingClientRect();
  const padding = 8;
  const left = Math.max(0, rect.left - padding);
  const top = Math.max(0, rect.top - padding);
  const right = Math.min(window.innerWidth, rect.right + padding);
  const bottom = Math.min(window.innerHeight, rect.bottom + padding);
  const tour = document.createElement('div');
  tour.id = 'ide-tour';
  tour.className = 'ide-tour';
  tour.innerHTML = `
    <div class="ide-tour-shade" style="top:0;left:0;right:0;height:${top}px"></div>
    <div class="ide-tour-shade" style="top:${bottom}px;left:0;right:0;bottom:0"></div>
    <div class="ide-tour-shade" style="top:${top}px;left:0;width:${left}px;height:${bottom-top}px"></div>
    <div class="ide-tour-shade" style="top:${top}px;left:${right}px;right:0;height:${bottom-top}px"></div>
    <div class="ide-tour-highlight" style="top:${top}px;left:${left}px;width:${right-left}px;height:${bottom-top}px"></div>
    <section class="ide-tour-popover" role="dialog" aria-modal="true" aria-labelledby="ide-tour-title" style="--tour-left:${Math.max(16, Math.min(rect.left, window.innerWidth - 356))}px;--tour-top:${bottom + 190 < window.innerHeight ? bottom + 14 : Math.max(16, top - 190)}px">
      <div class="ide-tour-progress">IDE GUIDE · ${ideTourIndex + 1} / ${IDE_TOUR_STEPS.length}</div>
      <h2 id="ide-tour-title">${step.title}</h2>
      <p>${step.text}</p>
      <div class="ide-tour-actions">
        <button class="ide-tour-skip" onclick="finishIDETour()">SKIP GUIDE</button>
        <div>
          ${ideTourIndex ? '<button class="ide-tour-back" onclick="stepIDETour(-1)">BACK</button>' : ''}
          <button class="ide-tour-next" onclick="stepIDETour(1)">${ideTourIndex === IDE_TOUR_STEPS.length - 1 ? 'START TIMER' : 'NEXT'}</button>
        </div>
      </div>
    </section>`;
  document.getElementById('app').appendChild(tour);
  const nextButton = tour.querySelector('.ide-tour-next');
  if (nextButton) nextButton.focus();
}

function stepIDETour(direction) {
  ideTourIndex += direction;
  renderIDETourStep();
}

function finishIDETour() {
  const tour = document.getElementById('ide-tour');
  if (tour) tour.remove();
  ideTourIndex = -1;
  try { localStorage.setItem('novaarena-ide-tour-complete', 'true'); } catch (error) { /* The tour can still be completed without browser storage. */ }
  startTimer();
}

function updateLineNumbers() {
  const editor = document.getElementById('ide-code-input');
  const numbers = document.getElementById('ide-line-numbers');
  if (!editor || !numbers) return;
  numbers.textContent = Array.from({length:Math.max(1, editor.value.split('\n').length)},(_,i)=>i+1).join('\n');
}
function syncLineNumberScroll() {
  const editor = document.getElementById('ide-code-input');
  const numbers = document.getElementById('ide-line-numbers');
  if (editor && numbers) numbers.scrollTop = editor.scrollTop;
}
function handleIDEEdit() {
  const editor = document.getElementById('ide-code-input');
  if (!editor) return;
  STATE.ide.files[STATE.ide.activeFile] = editor.value;
  if (!STATE.ide.dirtyFiles.includes(STATE.ide.activeFile)) STATE.ide.dirtyFiles.push(STATE.ide.activeFile);
  updateIDEFileIndicator(STATE.ide.activeFile, true);
  updateLineNumbers();
}
function updateIDEFileIndicator(name, dirty) {
  document.querySelectorAll('[data-ide-file]').forEach(fileTab=>{
    if (fileTab.dataset.ideFile !== name) return;
    let dot = fileTab.querySelector('.ide-unsaved-dot');
    if (dirty && !dot) {
      dot = document.createElement('span');
      dot.className = 'ide-unsaved-dot';
      dot.setAttribute('aria-label', 'Unsaved changes');
      fileTab.appendChild(dot);
    } else if (!dirty && dot) dot.remove();
  });
}
function selectIDEFile(name) {
  handleIDEEdit();
  STATE.ide.activeFile = name;
  const editor = document.getElementById('ide-code-input');
  if (editor) { editor.value = STATE.ide.files[name] || ''; editor.focus(); }
  document.querySelectorAll('[data-ide-file]').forEach(tab=>{
    const active = tab.dataset.ideFile === name;
    tab.classList.toggle('active', active);
    if (tab.getAttribute('role') === 'tab') tab.setAttribute('aria-selected', String(active));
  });
  updateLineNumbers();
}
function createIDEFile() {
  const name = window.prompt('New file name (for example, app.js):');
  if (!name) return;
  const cleanName = name.trim();
  if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(cleanName) || Object.prototype.hasOwnProperty.call(STATE.ide.files, cleanName)) {
    showNotification('⚠','File not added','Use a simple file name with an extension, and avoid duplicates.','#ffd700');
    return;
  }
  STATE.ide.files[cleanName] = '';
  const explorer = document.querySelector('.ide-sidebar-left');
  const addButton = document.querySelector('.ide-add-file');
  const fileButton = document.createElement('button');
  fileButton.className = 'file-tree-item';
  fileButton.dataset.ideFile = cleanName;
  fileButton.innerHTML = `<span>${cleanName.endsWith('.css')?'▧':cleanName.endsWith('.html')?'◈':'⌘'}</span>`;
  const fileLabel = document.createElement('span');
  fileLabel.textContent = cleanName;
  fileButton.appendChild(fileLabel);
  fileButton.addEventListener('click', ()=>selectIDEFile(cleanName));
  explorer.insertBefore(fileButton, addButton);
  const tab = document.createElement('button');
  tab.className = 'ide-tab';
  tab.dataset.ideFile = cleanName;
  tab.setAttribute('role','tab');
  tab.setAttribute('aria-selected','false');
  tab.textContent = cleanName;
  tab.addEventListener('click', ()=>selectIDEFile(cleanName));
  document.querySelector('.ide-editor-label').before(tab);
  selectIDEFile(cleanName);
}
function saveProject() {
  handleIDEEdit();
  try {
    localStorage.setItem('novaarena-project', JSON.stringify({projectName:STATE.ide.projectName, files:STATE.ide.files}));
    STATE.ide.dirtyFiles = [];
    document.querySelectorAll('.ide-unsaved-dot').forEach(dot=>dot.remove());
    showNotification('💾','Saved','Your project is saved in this browser.','#00ff88');
  } catch (error) { showNotification('⚠','Could not save','Browser storage is unavailable.','#ffd700'); }
}
function composeIDEPreview() {
  const files = STATE.ide.files;
  let html = files['index.html'] || '';
  const styles = (files['style.css'] || '').replace(/<\/style/gi,'<\\/style');
  const script = (files['script.js'] || '').replace(/<\/script/gi,'<\\/script');
  if (!html.trim()) return '<!doctype html><html><body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#f3f6f7;color:#50616a;font:16px sans-serif">Your preview will appear here when you add HTML.</body></html>';
  const styleTag = `<style>${styles}</style>`;
  const scriptTag = `<script>${script}<\/script>`;
  html = /<\/head>/i.test(html) ? html.replace(/<\/head>/i, `${styleTag}</head>`) : `${styleTag}${html}`;
  return /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${scriptTag}</body>`) : `${html}${scriptTag}`;
}
function runProject() {
  handleIDEEdit();
  const output = document.getElementById('ide-output');
  if (output) output.textContent = 'Preview updated from your project files.';
  const frame = document.getElementById('ide-preview-frame');
  if (frame) frame.srcdoc = composeIDEPreview();
  showNotification('▶','Preview updated','Your project is ready to preview.','#00f5ff');
}
function openPreview() {
  const frame = document.getElementById('ide-preview-frame');
  if (frame) frame.srcdoc = composeIDEPreview();
  document.getElementById('preview-modal').style.display='flex';
}
function aiAssist() {
  const input = document.getElementById('ai-input');
  if (input) { input.value = 'Review my project and suggest the next improvement'; sendAiMsg(); }
}
function showSubmitModal() { document.getElementById('submit-modal').style.display='flex'; }
function appendIDEMessage(role, text) {
  STATE.ide.messages.push({role, text});
  const list = document.getElementById('ide-chat-messages');
  if (!list) return;
  const message = document.createElement('div');
  message.className = `ide-chat-message ${role}`;
  const label = document.createElement('span');
  label.className = 'ide-message-label';
  label.textContent = role === 'user' ? 'YOU' : 'CO-PILOT';
  const body = document.createElement('div');
  body.textContent = text;
  message.append(label, body);
  list.appendChild(message);
  list.scrollTop = list.scrollHeight;
}
function getIDEHelperReply(prompt) {
  const text = prompt.toLowerCase();
  const challenge = STATE.match.theme?.name || STATE.match.theme || STATE.match.arena?.theme || 'your challenge';
  if (/idea|brainstorm|concept/.test(text)) return `For ${challenge}, start with one clear player goal, one meaningful choice, and immediate feedback. What should the player be able to do first?`;
  if (/plan|screen|layout|design/.test(text)) return 'Plan the first screen around one primary action: a short title, one sentence of context, and a prominent button. Add secondary details only after that action is obvious.';
  if (/preview|run|test/.test(text)) return 'Write your markup in index.html, styles in style.css, and interactions in script.js. Choose RUN or PREVIEW to see the files together in the sandbox.';
  if (/save|persist/.test(text)) return 'Choose SAVE in the top bar to keep your project in this browser. Your current edits remain available while this arena is open.';
  if (/review|improve|feedback/.test(text)) return 'A useful next pass: make the main action obvious, check that every control responds, and test the layout at a narrow screen width. I can give targeted feedback once a model is connected.';
  return `I can help you shape ${challenge}: split the idea into a first screen, one core interaction, and a clear success state. This prototype assistant is not connected to a language model yet, so it cannot generate or edit code for you.`;
}
function useIDEPrompt(prompt) {
  const input = document.getElementById('ai-input');
  if (input) { input.value = prompt; sendAiMsg(); }
}
function clearIDEChat() {
  STATE.ide.messages = [{role:'assistant', text:'Chat cleared. Tell me what you want to build, or ask for help with an idea.'}];
  const list = document.getElementById('ide-chat-messages');
  if (list) list.innerHTML = '';
  appendIDEMessage('assistant', STATE.ide.messages[0].text);
}
function sendAiMsg() {
  const inp = document.getElementById('ai-input');
  if (!inp || !inp.value.trim()) return;
  const prompt = inp.value.trim();
  inp.value = '';
  appendIDEMessage('user', prompt);
  appendIDEMessage('assistant', getIDEHelperReply(prompt));
}
function finalSubmit() {
  stopTimer();
  STATE.match.submitted = true;
  STATE.match.submittedPlayers = 23;
  navigateTo('submit-wait');
}

/* ─── SCREEN: SUBMIT WAIT ─────────────────────────────────── */
function renderSubmitWait() {
  const a = STATE.match.arena;
  return `
  ${renderNav('compete')}
  <div class="min-h-screen bg-gradient-arena flex flex-col items-center justify-center px-4 py-8">
    <div class="max-w-3xl w-full mx-auto text-center">
      <div class="anim-fadeInUp mb-4">
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-mono mb-6" style="color:var(--c-green);border-color:rgba(0,255,136,.3)">
          <span class="w-2 h-2 rounded-full bg-green-400" style="animation:timerPulse 1s infinite"></span>
          PROJECT LOCKED
        </div>
        <h1 class="font-orbitron font-black text-4xl mb-3" style="color:var(--c-cyan)">WAITING FOR CREATORS...</h1>
        <p class="text-white/50 mb-2">Your creation has been submitted to the arena.</p>
      </div>

      <div class="glass-card p-6 mb-6 anim-scaleIn">
        <div class="flex justify-between text-sm font-mono text-white/40 mb-3">
          <span>PROJECTS SUBMITTED</span>
          <span id="submit-count">${STATE.match.submittedPlayers} / 30</span>
        </div>
        <div class="progress-bar mb-4"><div class="progress-fill" id="submit-progress" style="width:${(STATE.match.submittedPlayers/30)*100}%"></div></div>

        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2" id="submit-slots">
          ${Array.from({length:30},(_,i)=>`
          <div class="glass px-2 py-2 rounded-lg text-center" id="ps-${i}"
               style="${i<STATE.match.submittedPlayers?'border-color:rgba(0,255,136,.3);color:var(--c-green)':'border-color:rgba(255,255,255,.05);color:rgba(255,255,255,.2)'}">
            <div class="text-xs font-mono">${i===6?'YOU':'P'+String(i+1).padStart(2,'0')}</div>
            <div class="text-xs mt-0.5">${i<STATE.match.submittedPlayers?'✓':'···'}</div>
          </div>`).join('')}
        </div>
      </div>

      <div class="font-mono text-xs text-white/30 anim-fadeInUp">
        Evaluation begins when all creators submit or time expires.
      </div>
    </div>
  </div>`;
}

function initSubmitWait() {
  let submitted = STATE.match.submittedPlayers;
  const interval = setInterval(()=>{
    if (submitted >= 30) {
      clearInterval(interval);
      setTimeout(()=> navigateTo('evaluation'), 1000);
      return;
    }
    submitted = Math.min(30, submitted + Math.floor(Math.random()*2)+1);
    STATE.match.submittedPlayers = submitted;
    const countEl = document.getElementById('submit-count');
    const progEl  = document.getElementById('submit-progress');
    if (countEl) countEl.textContent = `${submitted} / 30`;
    if (progEl)  progEl.style.width = `${(submitted/30)*100}%`;
    for (let i=0; i<30; i++) {
      const slot = document.getElementById(`ps-${i}`);
      if (slot && i < submitted) {
        slot.style.borderColor = 'rgba(0,255,136,.3)';
        slot.style.color = 'var(--c-green)';
        slot.querySelector('div:last-child').textContent = '✓';
      }
    }
    if (submitted >= 30) {
      const h1 = document.querySelector('h1');
      if (h1) { h1.textContent = 'ALL CREATIONS SUBMITTED'; h1.style.color = 'var(--c-green)'; }
      showNotification('⚡','All Submitted!','Evaluation begins now!','#00ff88');
    }
  }, 500);
}

/* ─── SCREEN: EVALUATION ──────────────────────────────────── */
function renderEvaluation() {
  const a = STATE.match.arena;
  const categories = [
    { name:'INNOVATION',        color:'#a855f7', score:96 },
    { name:'CREATIVITY',        color:'#00f5ff', score:93 },
    { name:'ORIGINALITY',       color:'#00ff88', score:88 },
    { name:'USABILITY',         color:'#ffd700', score:85 },
    { name:'FEASIBILITY',       color:'#ff6b35', score:82 },
    { name:'TECH EXECUTION',    color:'#ec4899', score:91 },
    { name:'DESIGN',            color:'#00f5ff', score:89 },
    { name:'PROBLEM SOLVING',   color:'#a855f7', score:87 },
    { name:'ARENA RELEVANCE',   color:'#00ff88', score:94 },
    { name:'LEGEND USAGE',      color:'#ffd700', score:80 },
  ];
  return `
  ${renderNav('compete')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-8 anim-fadeInUp">
        <div class="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs font-mono mb-6" style="color:var(--c-purple);border-color:rgba(168,85,247,.3)">
          <span class="w-2 h-2 rounded-full" style="background:var(--c-purple);animation:timerPulse .5s infinite"></span>
          AI EVALUATION IN PROGRESS
        </div>
        <h1 class="font-orbitron font-black text-4xl mb-2" style="color:var(--c-cyan)">ANALYZING CREATIONS...</h1>
        <p class="text-white/50">30 projects being evaluated simultaneously across 10 dimensions.</p>
      </div>

      <div class="glass-card p-8 anim-scaleIn">
        <div class="flex items-center justify-between mb-6">
          <div class="font-orbitron text-xs tracking-widest text-white/40">EVALUATING: WILDGUARD</div>
          <div class="font-mono text-xs" style="color:var(--c-green)" id="eval-pct">0%</div>
        </div>
        <div class="space-y-4" id="eval-bars">
          ${categories.map((c,i)=>`
          <div class="eval-bar-wrap">
            <div class="eval-bar-label">${c.name}</div>
            <div class="eval-bar">
              <div class="eval-fill" id="eval-${i}" style="width:0%;background:linear-gradient(90deg,${c.color}88,${c.color})"></div>
            </div>
            <div class="eval-score" id="eval-score-${i}" style="color:${c.color}">—</div>
          </div>`).join('')}
        </div>
        <div class="mt-6 pt-4 border-t border-white/5 text-center">
          <div class="font-mono text-xs text-white/30 mb-2">OVERALL SCORE</div>
          <div class="font-orbitron font-black text-4xl" style="color:var(--c-cyan)" id="overall-score">—</div>
        </div>
      </div>

      <div class="mt-6 glass-card p-4 anim-fadeInUp" style="animation-delay:.3s">
        <div class="font-mono text-xs text-white/40 mb-2">PROJECTS EVALUATED</div>
        <div class="progress-bar"><div class="progress-fill" id="eval-projects" style="width:0%"></div></div>
        <div class="text-xs font-mono text-white/30 mt-1 text-right" id="eval-proj-count">0 / 30</div>
      </div>
    </div>
  </div>`;
}

function initEvaluation() {
  const categories = [96,93,88,85,82,91,89,87,94,80];
  const delays = categories.map((_,i)=> i * 350 + 200);
  delays.forEach((delay, i)=> {
    setTimeout(()=>{
      const bar = document.getElementById(`eval-${i}`);
      const score = document.getElementById(`eval-score-${i}`);
      if (bar) bar.style.width = `${categories[i]}%`;
      if (score) score.textContent = categories[i];
      const pct = document.getElementById('eval-pct');
      if (pct) pct.textContent = Math.round(((i+1)/categories.length)*100)+'%';
    }, delay);
  });
  // Overall score
  const totalDelay = delays[delays.length-1] + 500;
  setTimeout(()=>{
    const overall = document.getElementById('overall-score');
    if (overall) { overall.textContent = '87.4'; overall.style.textShadow = '0 0 30px var(--c-cyan)'; }
  }, totalDelay);
  // Project progress
  let proj = 0;
  const projInt = setInterval(()=>{
    proj = Math.min(30, proj + Math.floor(Math.random()*3)+1);
    const el = document.getElementById('eval-projects');
    const ct = document.getElementById('eval-proj-count');
    if (el) el.style.width = `${(proj/30)*100}%`;
    if (ct) ct.textContent = `${proj} / 30`;
    if (proj >= 30) {
      clearInterval(projInt);
      setTimeout(()=> navigateTo('results'), 1500);
    }
  }, 300);
}

/* ─── SCREEN: RESULTS ─────────────────────────────────────── */
function renderResults() {
  const a = STATE.match.arena;
  const results = [
    { rank:1,  name:'NOVA',       project:'EcoSentinel',  score:97.2, innov:98, creat:96, tech:97, legendXp:650 },
    { rank:2,  name:'PIXELFORGE', project:'ForestGuard',  score:94.8, innov:95, creat:94, tech:95, legendXp:600 },
    { rank:3,  name:'CODEWAVE',   project:'WildWatch',    score:92.1, innov:93, creat:91, tech:92, legendXp:580 },
    { rank:4,  name:'VOIDMAKER',  project:'EcoTrack',     score:90.3, innov:91, creat:90, tech:89, legendXp:540 },
    { rank:5,  name:'SYNTHEX',    project:'NatureNet',    score:89.7, innov:90, creat:89, tech:90, legendXp:520 },
    { rank:6,  name:'NEONRIFT',   project:'BioAlert',     score:88.1, innov:88, creat:88, tech:87, legendXp:500 },
    { rank:7,  name:'NOVADEV',    project:'WildGuard',    score:87.4, innov:89, creat:87, tech:86, legendXp:480, isMe:true },
    { rank:8,  name:'HEXABIT',    project:'FaunaMap',     score:85.9, innov:86, creat:85, tech:86, legendXp:460 },
    { rank:9,  name:'QUBITDEV',   project:'EcoSense',     score:84.2, innov:84, creat:84, tech:83, legendXp:440 },
    { rank:10, name:'PRISMCRAFT', project:'GreenPulse',   score:82.7, innov:83, creat:82, tech:82, legendXp:420 },
  ];
  const myResult = results.find(r=>r.isMe);
  const medals = ['🥇','🥈','🥉'];

  return `
  ${renderNav('compete')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-10 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">${a.emoji} ${a.name} ARENA — RESULTS</div>
        <h1 class="font-orbitron font-black text-5xl mb-2" style="color:var(--c-yellow)">ARENA RESULTS</h1>
        <p class="text-white/50">Wildlife Conservation · 30 Creators · AI Evaluated</p>
      </div>

      <!-- Podium top 3 -->
      <div class="grid grid-cols-3 gap-4 mb-8 anim-scaleIn">
        ${results.slice(0,3).map((r,i)=>`
        <div class="glass-card p-6 text-center podium-${i+1} ${i===1?'order-first':''}">
          <div class="text-3xl mb-2">${medals[i]}</div>
          <div class="text-xs font-mono text-white/40 mb-1">#${r.rank}</div>
          <div class="font-orbitron font-black text-lg mb-1">${r.name}</div>
          <div class="text-xs text-white/60 mb-3 italic">"${r.project}"</div>
          <div class="font-orbitron font-black text-2xl" style="color:var(--c-yellow)">${r.score}</div>
          <div class="text-xs text-white/40 mt-1">SCORE</div>
          <div class="flex justify-center gap-4 mt-3 text-xs font-mono">
            <span style="color:var(--c-purple)">INN ${r.innov}</span>
            <span style="color:var(--c-cyan)">CRE ${r.creat}</span>
            <span style="color:var(--c-green)">TCH ${r.tech}</span>
          </div>
        </div>`).join('')}
      </div>

      <!-- Full leaderboard -->
      <div class="glass-card p-6 mb-8 anim-fadeInUp" style="animation-delay:.2s">
        <div class="font-orbitron text-xs tracking-widest text-white/40 mb-4">FULL RANKINGS</div>
        <div class="space-y-2">
          ${results.map(r=>`
          <div class="lb-row ${r.isMe?'me':''}" style="grid-template-columns:2rem 1fr auto auto auto">
            <div class="font-orbitron text-xs font-bold ${r.rank<=3?'':'text-white/50'}" style="${r.rank===1?'color:var(--c-yellow)':r.rank===2?'color:#c0c0c0':r.rank===3?'color:#cd7f32':''}">#${r.rank}</div>
            <div>
              <div class="font-orbitron text-sm font-semibold ${r.isMe?'':'text-white/90'}" style="${r.isMe?'color:var(--c-cyan)':''}">${r.name} ${r.isMe?'(YOU)':''}</div>
              <div class="text-xs text-white/40 italic">"${r.project}"</div>
            </div>
            <div class="font-orbitron text-sm font-bold text-right" style="color:var(--c-yellow)">${r.score}</div>
            <div class="text-xs font-mono text-right" style="color:var(--c-green)">+${r.legendXp} XP</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Personal Result -->
      <div class="glass-card p-8 anim-fadeInUp mb-6" style="animation-delay:.3s;border-color:rgba(0,245,255,.4);background:linear-gradient(135deg,rgba(0,245,255,.05),rgba(168,85,247,.05))">
        <div class="font-orbitron text-xs tracking-widest text-white/40 mb-4 text-center">YOUR RESULT</div>
        <div class="text-center mb-6">
          <div class="font-orbitron font-black text-5xl mb-1" style="color:var(--c-cyan)">RANK #7</div>
          <div class="text-white/40 text-sm">out of 30 creators</div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          ${[
            ['PROJECT SCORE','87.4','var(--c-yellow)'],
            ['XP EARNED','+620','var(--c-green)'],
            ['RATING +Δ','+24','var(--c-purple)'],
            ['LEGEND BONUS','+150','var(--c-cyan)'],
          ].map(([l,v,c])=>`
          <div class="stat-card">
            <div class="font-orbitron font-black text-2xl" style="color:${c}">${v}</div>
            <div class="text-xs text-white/40 mt-1">${l}</div>
          </div>`).join('')}
        </div>
        <div class="flex flex-wrap gap-2 justify-center mb-6">
          ${['✓ Challenge Completed','✓ 3/5 Attributes Used','✓ Top 10 Finish'].map(a=>`
          <div class="glass px-3 py-1.5 rounded-full text-xs font-mono" style="color:var(--c-green);border-color:rgba(0,255,136,.3)">${a}</div>`).join('')}
        </div>
        <div class="flex gap-3 justify-center">
          <button class="btn-ghost" onclick="openPreview()">👁 VIEW PROJECT</button>
          <button class="btn-primary" onclick="navigateTo('leaderboard')"><span>🏆 GLOBAL LEADERBOARD</span></button>
          <button class="btn-outline" onclick="navigateTo('arenas')"><span>⚔ NEXT ARENA</span></button>
        </div>
      </div>
    </div>
  </div>`;
}

function initResults() {
  STATE.player.xp     += 620;
  STATE.player.rating += 24;
  MATCH_HISTORY.unshift({ date:'2026-09-24', arena:'FOREST', theme:'Wildlife Conservation', format:'GAME', rank:7, score:87.4, xp:620, ratingDelta:24 });
  showNotification('⚡','Rating Updated',`+24 rating! Now ${STATE.player.rating}.`,'#a855f7');
  showNotification('🏆','XP Earned',`+620 XP. Total: ${STATE.player.xp.toLocaleString()}.`,'#ffd700');
}

/* ─── SCREEN: LEADERBOARD ─────────────────────────────────── */
function renderLeaderboard() {
  const tab = STATE.leaderboard.tab;
  const tabs = ['global','country','friends','arena','weekly','monthly'];
  const cols = 'grid-template-columns:2.5rem 1fr 5rem 5rem 4rem 5rem 5rem';
  return `
  ${renderNav('leaderboard')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-8 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">HALL OF CHAMPIONS</div>
        <h1 class="font-orbitron font-black text-4xl mb-2">GLOBAL <span style="color:var(--c-yellow)">CREATORS</span></h1>
        <p class="text-white/50">Top creators ranked by arena performance and innovation.</p>
      </div>

      <!-- Tabs -->
      <div class="flex gap-2 flex-wrap justify-center mb-6 anim-fadeInUp" style="animation-delay:.1s">
        ${tabs.map(t=>`<button class="tab ${tab===t?'active':''}" onclick="selectLbTab('${t}')">${t.toUpperCase()}</button>`).join('')}
      </div>

      <div class="glass-card p-4 anim-fadeInUp" style="animation-delay:.2s">
        <!-- Header -->
        <div class="lb-row mb-2 text-xs font-mono text-white/30 uppercase tracking-wider" style="${cols}">
          <span>RANK</span><span>PLAYER</span><span class="text-right">RATING</span><span class="text-right">XP</span>
          <span class="text-right">WINS</span><span class="text-right">PROJECTS</span><span class="text-right">INNOV</span>
        </div>
        ${GLOBAL_PLAYERS.slice(0,15).map(p=>`
        <div class="lb-row ${p.isMe?'me':''}" style="${cols}" onclick="${p.isMe?`navigateTo('profile')`:`showPlayerProfile('${p.name}')`}">
          <div class="${p.rank<=3?'font-black':'font-semibold'} font-orbitron text-sm" style="${p.rank===1?'color:var(--c-yellow)':p.rank===2?'color:#c0c0c0':p.rank===3?'color:#cd7f32':'color:rgba(255,255,255,.5)'}">
            ${p.rank<=3?['🥇','🥈','🥉'][p.rank-1]:'#'+p.rank}
          </div>
          <div class="flex items-center gap-2">
            <span style="font-size:1.1rem">${p.country}</span>
            <div>
              <div class="font-orbitron text-sm font-semibold ${p.isMe?'':'text-white/90'}" style="${p.isMe?'color:var(--c-cyan)':''}">${p.name} ${p.isMe?'(YOU)':''}</div>
            </div>
          </div>
          <div class="font-orbitron font-bold text-sm text-right" style="color:var(--c-purple)">${p.rating}</div>
          <div class="font-mono text-xs text-right text-white/60">${(p.xp/1000).toFixed(1)}k</div>
          <div class="font-mono text-xs text-right" style="color:var(--c-yellow)">${p.wins}</div>
          <div class="font-mono text-xs text-right text-white/60">${p.projects}</div>
          <div class="font-orbitron text-xs text-right font-bold" style="color:var(--c-green)">${p.innov}</div>
        </div>`).join('')}
        <!-- Player's rank separator -->
        ${!GLOBAL_PLAYERS.slice(0,15).find(p=>p.isMe)?`
        <div class="border-t border-dashed border-white/10 my-2"></div>
        ${GLOBAL_PLAYERS.filter(p=>p.isMe).map(p=>`
        <div class="lb-row me" style="${cols}">
          <div class="font-semibold font-orbitron text-sm text-white/50">#${p.rank}</div>
          <div class="flex items-center gap-2">
            <span style="font-size:1.1rem">${p.country}</span>
            <div class="font-orbitron text-sm font-semibold" style="color:var(--c-cyan)">${p.name} (YOU)</div>
          </div>
          <div class="font-orbitron font-bold text-sm text-right" style="color:var(--c-purple)">${p.rating}</div>
          <div class="font-mono text-xs text-right text-white/60">${(p.xp/1000).toFixed(1)}k</div>
          <div class="font-mono text-xs text-right" style="color:var(--c-yellow)">${p.wins}</div>
          <div class="font-mono text-xs text-right text-white/60">${p.projects}</div>
          <div class="font-orbitron text-xs text-right font-bold" style="color:var(--c-green)">${p.innov}</div>
        </div>`).join('')}`:''}
      </div>
    </div>
  </div>`;
}

function selectLbTab(t) {
  STATE.leaderboard.tab = t;
  document.getElementById('app').innerHTML = renderLeaderboard();
  attachNavHandlers();
}

function showPlayerProfile(name) {
  showNotification('👤','Player Profile',`Viewing ${name}'s profile.`,'#00f5ff');
}

/* ─── SCREEN: HISTORY ─────────────────────────────────────── */
function renderHistory() {
  return `
  ${renderNav('history')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">BATTLE ARCHIVES</div>
        <h1 class="font-orbitron font-black text-4xl mb-2">MATCH <span style="color:var(--c-cyan)">HISTORY</span></h1>
        <p class="text-white/50">Your complete arena battle record.</p>
      </div>

      <div class="flex flex-col gap-4">
        ${MATCH_HISTORY.map((m,i)=>{
          const a = ARENAS.find(ar=>ar.name===m.arena)||ARENAS[0];
          return `
        <div class="glass-card p-5 anim-fadeInUp cursor-pointer" style="animation-delay:${i*.07}s;border-color:${a.color}20"
             onclick="showMatchDetail(${i})">
          <div class="flex items-center gap-4 flex-wrap">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                 style="background:${a.color}15;border:1px solid ${a.color}30">${a.emoji}</div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <span class="font-orbitron font-bold text-sm" style="color:${a.color}">${m.arena}</span>
                <span class="glass px-2 py-0.5 rounded text-xs font-mono text-white/50">${m.format}</span>
              </div>
              <div class="text-sm text-white/60 truncate">${m.theme}</div>
              <div class="text-xs text-white/30 font-mono mt-0.5">${m.date}</div>
            </div>
            <div class="flex items-center gap-6 flex-wrap text-right">
              <div>
                <div class="font-orbitron font-black text-lg" style="color:${m.rank<=3?'var(--c-yellow)':m.rank<=10?'var(--c-green)':'var(--c-cyan)'}">
                  #${m.rank}<span class="text-xs text-white/30">/30</span>
                </div>
                <div class="text-xs text-white/40">RANK</div>
              </div>
              <div>
                <div class="font-orbitron font-bold text-sm">${m.score}</div>
                <div class="text-xs text-white/40">SCORE</div>
              </div>
              <div>
                <div class="font-mono text-sm" style="color:var(--c-green)">+${m.xp} XP</div>
                <div class="font-mono text-xs" style="color:var(--c-purple)">+${m.ratingDelta} ⬆</div>
              </div>
            </div>
          </div>
        </div>`}).join('')}
      </div>
    </div>
  </div>`;
}

function showMatchDetail(idx) {
  const m = MATCH_HISTORY[idx];
  const a = ARENAS.find(ar=>ar.name===m.arena)||ARENAS[0];
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="flex items-center gap-3 mb-6">
        <span class="text-3xl">${a.emoji}</span>
        <div>
          <div class="font-orbitron font-bold" style="color:${a.color}">${m.arena} ARENA</div>
          <div class="text-xs text-white/40 font-mono">${m.date}</div>
        </div>
      </div>
      ${[['Theme',m.theme],['Format',m.format],['Rank','#'+m.rank+' / 30'],['Score',m.score],['XP Earned','+'+m.xp],['Rating Change','+'+m.ratingDelta]].map(([l,v])=>`
      <div class="flex justify-between py-2 border-b border-white/5">
        <span class="text-xs text-white/40">${l}</span>
        <span class="font-orbitron text-xs font-semibold">${v}</span>
      </div>`).join('')}
      <button class="btn-ghost w-full mt-4" onclick="this.closest('.modal-overlay').remove()">CLOSE</button>
    </div>`;
  document.body.appendChild(overlay);
}

/* ─── SCREEN: PROFILE ─────────────────────────────────────── */
function renderProfile() {
  const p = STATE.player;
  return `
  ${renderNav('profile')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Hero -->
      <div class="glass-card p-8 mb-6 anim-fadeInUp" style="background:linear-gradient(135deg,rgba(168,85,247,.08),rgba(0,245,255,.05))">
        <div class="flex items-start gap-6 flex-wrap">
          <div class="relative">
            <div class="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl"
                 style="background:linear-gradient(135deg,rgba(168,85,247,.3),rgba(0,245,255,.2));border:2px solid rgba(168,85,247,.5)">
              ${p.avatar}
            </div>
            <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 glass px-3 py-0.5 rounded-full text-xs font-orbitron font-bold whitespace-nowrap"
                 style="color:var(--c-yellow)">LVL ${p.level}</div>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-1 flex-wrap">
              <h1 class="font-orbitron font-black text-3xl">${p.name}</h1>
              <span class="text-xl">🇧🇷</span>
              <span class="glass px-2 py-0.5 rounded text-xs font-mono" style="color:var(--c-green)">🟢 ONLINE</span>
            </div>
            <div class="flex gap-4 flex-wrap mb-4">
              <div><span class="font-orbitron font-black text-lg" style="color:var(--c-purple)">${p.rating}</span><span class="text-xs text-white/40 ml-1">RATING</span></div>
              <div><span class="font-orbitron font-black text-lg" style="color:var(--c-yellow)">#{p.rank}</span><span class="text-xs text-white/40 ml-1">GLOBAL</span></div>
              <div><span class="font-orbitron font-black text-lg" style="color:var(--c-cyan)">${p.xp.toLocaleString()}</span><span class="text-xs text-white/40 ml-1">XP</span></div>
            </div>
            <div class="xp-bar mb-1" style="max-width:300px"><div class="xp-fill" style="width:${(p.xp%1000)/10}%"></div></div>
            <div class="text-xs font-mono text-white/40">${p.xp.toLocaleString()} / ${Math.ceil(p.xp/1000)*1000} XP</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Stats -->
        <div class="md:col-span-2">
          <div class="grid grid-cols-3 gap-4 mb-6 anim-fadeInUp" style="animation-delay:.1s">
            ${[
              ['WINS',p.wins,'🏆','var(--c-yellow)'],
              ['TOP 10',p.topTen,'⭐','var(--c-cyan)'],
              ['ARENAS',p.arenas,'⚔','var(--c-purple)'],
              ['WIN RATE',p.winRate+'%','📈','var(--c-green)'],
              ['STREAK',p.streak,'🔥','var(--c-orange)'],
              ['INNOV',p.innovScore,'💡','var(--c-pink)'],
            ].map(([l,v,i,c])=>`
            <div class="stat-card">
              <div class="text-xl mb-1">${i}</div>
              <div class="font-orbitron font-black text-xl" style="color:${c}">${v}</div>
              <div class="text-xs text-white/40 mt-0.5 uppercase tracking-wider">${l}</div>
            </div>`).join('')}
          </div>

          <!-- Rating chart (SVG) -->
          <div class="glass-card p-5 mb-6 anim-fadeInUp" style="animation-delay:.2s">
            <div class="font-orbitron text-xs tracking-widest text-white/40 mb-4">RATING PROGRESSION</div>
            <svg viewBox="0 0 400 100" class="w-full" style="height:100px" id="rating-chart">
              <defs>
                <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#a855f7" stop-opacity=".6"/>
                  <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <!-- Recent matches -->
          <div class="glass-card p-5 anim-fadeInUp" style="animation-delay:.3s">
            <div class="flex justify-between items-center mb-4">
              <div class="font-orbitron text-xs tracking-widest text-white/40">RECENT MATCHES</div>
              <button class="text-xs text-white/30 hover:text-white/60" onclick="navigateTo('history')">SEE ALL →</button>
            </div>
            ${MATCH_HISTORY.slice(0,4).map(m=>{
              const a2 = ARENAS.find(ar=>ar.name===m.arena)||ARENAS[0];
              return `<div class="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <span class="text-xl">${a2.emoji}</span>
                <div class="flex-1"><div class="font-orbitron text-xs font-semibold" style="color:${a2.color}">${m.arena}</div><div class="text-xs text-white/40">${m.theme}</div></div>
                <div class="text-right"><div class="font-orbitron text-sm font-bold" style="color:${m.rank<=3?'var(--c-yellow)':'var(--c-cyan)'}">#${m.rank}</div><div class="text-xs" style="color:var(--c-green)">+${m.xp} XP</div></div>
              </div>`;}).join('')}
          </div>
        </div>

        <!-- Right col -->
        <div class="flex flex-col gap-4 anim-fadeInUp" style="animation-delay:.2s">
          <!-- Achievements preview -->
          <div class="glass-card p-5">
            <div class="flex justify-between items-center mb-4">
              <div class="font-orbitron text-xs tracking-widest text-white/40">ACHIEVEMENTS</div>
              <button class="text-xs text-white/30 hover:text-white/60" onclick="navigateTo('achievements')">SEE ALL →</button>
            </div>
            <div class="grid grid-cols-4 gap-2">
              ${ACHIEVEMENTS.slice(0,8).map(a=>`
              <div class="text-center">
                <div class="badge-icon ${a.unlocked?'':'locked'}" style="width:2.5rem;height:2.5rem;margin:0 auto .25rem;font-size:1rem">${a.icon}</div>
                <div class="text-xs text-white/30 truncate">${a.name.split(' ')[0]}</div>
              </div>`).join('')}
            </div>
          </div>
          <!-- Favorite formats -->
          <div class="glass-card p-5">
            <div class="font-orbitron text-xs tracking-widest text-white/40 mb-4">FAVORITE FORMATS</div>
            ${[['GAME','🎮',60],['WEB APP','⚡',25],['UI/UX','🎨',15]].map(([n,i,pct])=>`
            <div class="mb-3">
              <div class="flex justify-between text-xs mb-1">
                <span>${i} ${n}</span><span class="text-white/40">${pct}%</span>
              </div>
              <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function initProfile() {
  // Draw rating chart
  setTimeout(()=>{
    const svg = document.getElementById('rating-chart');
    if (!svg) return;
    const h = STATE.player.ratingHistory;
    const min = Math.min(...h)-50, max = Math.max(...h)+50;
    const pts = h.map((v,i)=>[i*(400/(h.length-1)), 100-((v-min)/(max-min))*90]);
    const pathD = pts.map((p,i)=>`${i===0?'M':'L'} ${p[0]} ${p[1]}`).join(' ');
    const areaD = `${pathD} L ${pts[pts.length-1][0]} 100 L 0 100 Z`;
    svg.innerHTML = `
      <defs>
        <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#a855f7" stop-opacity=".6"/>
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#chartGrad)" />
      <path d="${pathD}" fill="none" stroke="#a855f7" stroke-width="2" />
      ${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#00f5ff" />`).join('')}
    `;
  }, 100);
}

/* ─── SCREEN: ACHIEVEMENTS ────────────────────────────────── */
function renderAchievements() {
  return `
  ${renderNav('profile')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">HALL OF FAME</div>
        <h1 class="font-orbitron font-black text-4xl mb-2">ACHIEVEMENTS</h1>
        <p class="text-white/50">${ACHIEVEMENTS.filter(a=>a.unlocked).length} / ${ACHIEVEMENTS.length} unlocked</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        ${ACHIEVEMENTS.map((a,i)=>`
        <div class="glass-card p-5 text-center anim-fadeInUp ${a.unlocked?'':'opacity-60'}" style="animation-delay:${i*.05}s;${a.unlocked?'border-color:rgba(255,215,0,.3)':''}">
          <div class="badge-icon ${a.unlocked?'':'locked'} mx-auto mb-3">${a.icon}</div>
          <div class="font-orbitron font-bold text-xs mb-1" style="${a.unlocked?'color:var(--c-yellow)':''}">${a.name}</div>
          <div class="text-xs text-white/40">${a.desc}</div>
          ${a.unlocked?`<div class="mt-2 text-xs font-mono" style="color:var(--c-green)">✓ UNLOCKED</div>`:`<div class="mt-2 text-xs font-mono text-white/20">🔒 LOCKED</div>`}
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ─── SCREEN: PROGRESSION ─────────────────────────────────── */
function renderProgression() {
  return `
  ${renderNav('profile')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-xl mx-auto">
      <div class="text-center mb-10 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">CAMPAIGN MAP</div>
        <h1 class="font-orbitron font-black text-4xl mb-2">ARENA <span style="color:var(--c-purple)">PROGRESSION</span></h1>
        <p class="text-white/50">Complete arenas to unlock the next challenge.</p>
      </div>
      <div class="flex flex-col items-center gap-0 relative">
        <div class="absolute left-1/2 top-0 bottom-0 w-0.5" style="background:linear-gradient(to bottom,var(--c-green),rgba(255,255,255,.05));transform:translateX(-50%)"></div>
        ${ARENA_PROGRESSION.map((a,i)=>{
          const aData = ARENAS.find(ar=>ar.id===a.id)||ARENAS[0];
          return `
        <div class="relative z-10 w-full flex ${i%2===0?'justify-start pr-1/2':'justify-end pl-1/2'} mb-6 anim-fadeInUp" style="animation-delay:${i*.1}s">
          <div class="glass-card p-4 max-w-xs cursor-pointer transition-all ${!a.unlocked?'opacity-40':''}" 
               style="${a.completed?`border-color:${aData.color}40`:a.unlocked?'border-color:rgba(168,85,247,.3)':'border-color:rgba(255,255,255,.05)'}"
               onclick="${a.unlocked?`selectArena('${a.id}')`:``}">
            <div class="flex items-center gap-3">
              <div class="text-3xl">${a.emoji}</div>
              <div>
                <div class="font-orbitron font-bold text-sm" style="color:${a.completed?aData.color:a.unlocked?'#fff':'rgba(255,255,255,.3)'}">${a.name}</div>
                <div class="text-xs text-white/40">
                  ${a.completed?`COMPLETED · ${a.rank}`:a.unlocked?'AVAILABLE':'🔒 LOCKED'}
                </div>
              </div>
              <div class="ml-auto text-lg">${a.completed?'✅':a.unlocked?'▶':'🔒'}</div>
            </div>
          </div>
        </div>`}).join('')}
      </div>
    </div>
  </div>`;
}

/* ─── SCREEN: COMMUNITY ───────────────────────────────────── */
function renderCommunity() {
  return `
  ${renderNav('home')}
  <div class="min-h-screen bg-gradient-arena px-4 py-8">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8 anim-fadeInUp">
        <div class="font-mono text-xs tracking-widest text-white/30 mb-2">CREATOR SHOWCASE</div>
        <h1 class="font-orbitron font-black text-4xl mb-2">COMMUNITY <span style="color:var(--c-cyan)">ARENA</span></h1>
        <p class="text-white/50">Discover top creations from the global arena community.</p>
      </div>

      <!-- Featured -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${PROJECTS.map((proj,i)=>{
          const a2 = ARENAS.find(ar=>ar.name===proj.arena)||ARENAS[0];
          return `
        <div class="glass-card overflow-hidden anim-fadeInUp cursor-pointer" style="animation-delay:${i*.08}s;border-color:${a2.color}25"
             onclick="showNotification('👁','Project',\`Viewing ${proj.name} by ${proj.creator}\`,\`${a2.color}\`)">
          <!-- Preview area -->
          <div style="height:140px;background:linear-gradient(135deg,${a2.color}15,rgba(10,22,40,.9));display:flex;align-items:center;justify-content:center;font-size:4rem;border-bottom:1px solid ${a2.color}20">
            ${proj.preview}
          </div>
          <div class="p-4">
            <div class="flex items-start justify-between mb-2">
              <div>
                <div class="font-orbitron font-bold text-sm mb-0.5">${proj.name}</div>
                <div class="text-xs text-white/40">by ${proj.creator}</div>
              </div>
              <div class="glass px-2 py-0.5 rounded text-xs font-orbitron" style="color:${a2.color};border-color:${a2.color}30">${proj.arena}</div>
            </div>
            <div class="text-xs text-white/50 mb-3">${proj.theme}</div>
            <div class="flex items-center justify-between">
              <div class="font-orbitron font-bold text-lg" style="color:var(--c-yellow)">${proj.score}</div>
              <div class="flex items-center gap-1 text-xs text-white/40">
                <span>♥</span><span>${proj.likes}</span>
              </div>
            </div>
          </div>
        </div>`}).join('')}
      </div>
    </div>
  </div>`;
}

/* ─── Bootstrap ───────────────────────────────────────────── */
render();
