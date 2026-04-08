/* PSYX-MANGA v3 | app.js */
'use strict';

// Masquage du loader
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.transition = "opacity 0.8s ease";
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 800);
    }
});

// Sécurité : si la page met trop de temps, on force la fermeture après 4s
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== "none") {
        loader.style.display = "none";
    }
}, 4000);


// ══════════════════════════════════════════
//  1. LOADER — tue immédiatement, sans dépendance
// ══════════════════════════════════════════
(function hideLoader() {
  function kill() {
    var el = document.getElementById('loader');
    if (el) el.classList.add('hide');
  }
  // Option A : DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () { setTimeout(kill, 1900); });
  // Option B : window.load
  window.addEventListener('load', function () { setTimeout(kill, 400); });
  // Option C : filet absolu, 3s max
  setTimeout(kill, 3000);
})();

// ══════════════════════════════════════════
//  2. DONNÉES
// ══════════════════════════════════════════
var CATALOG = [
  // ANIME
  { id:1,  title:'One Piece',           author:'Toei Animation',   type:'anime',  genre:'shonen', tags:['Aventure','Action','Comédie'],   ep:'1100+ ép', rating:9.8, views:'13M', malId:21,     c1:'#1a4080',c2:'#0d2550', isNew:true,  trend:true,
    synopsis:"Monkey D. Luffy rêve de devenir le Roi des Pirates. Avec son équipage il sillonne les mers à la recherche du One Piece, le trésor légendaire." },
  { id:2,  title:'Demon Slayer',         author:'ufotable',         type:'anime',  genre:'shonen', tags:['Action','Surnaturel','Drame'],    ep:'55 ép',    rating:9.2, views:'11M', malId:38000,  c1:'#2d1b4e',c2:'#1a0d2e', isNew:true,  trend:true,
    synopsis:"Tanjiro Kamado devient chasseur de démons pour sauver sa sœur Nezuko, transformée en démon après le massacre de leur famille." },
  { id:3,  title:'Attack on Titan',      author:'MAPPA',            type:'anime',  genre:'shonen', tags:['Action','Drame','Post-Apo'],      ep:'94 ép',    rating:9.7, views:'12M', malId:16498,  c1:'#2a2010',c2:'#1a1308', isNew:false, trend:true,
    synopsis:"L'humanité survit derrière d'immenses murs. Eren jure d'exterminer tous les Titans après la mort de sa mère." },
  { id:4,  title:'Jujutsu Kaisen',       author:'MAPPA',            type:'anime',  genre:'shonen', tags:['Action','Horreur','Surnaturel'],  ep:'47 ép',    rating:9.1, views:'9M',  malId:40748,  c1:'#1f1040',c2:'#120a28', isNew:true,  trend:true,
    synopsis:"Yuji Itadori avale un doigt maudit et intègre l'école des sorciers jujutsu pour combattre les esprits maudits." },
  { id:5,  title:'My Hero Academia',     author:'Bones',            type:'anime',  genre:'shonen', tags:['Superhéros','Action','École'],    ep:'138 ép',   rating:8.8, views:'8M',  malId:31964,  c1:'#1a1a40',c2:'#0d0d28', isNew:false, trend:false,
    synopsis:"Dans un monde de super-pouvoirs, Izuku Midoriya naît sans Alter mais rêve de devenir le plus grand héros." },
  { id:6,  title:'Dragon Ball Super',    author:'Toei Animation',   type:'anime',  genre:'shonen', tags:['Action','Combat','Aventure'],     ep:'131 ép',   rating:8.5, views:'10M', malId:30694,  c1:'#28180a',c2:'#1a0f05', isNew:false, trend:false,
    synopsis:"Suite de Dragon Ball Z. Goku affronte des adversaires divins dans un univers multi-dimensionnel." },

  // MANGA
  { id:10, title:'Berserk',              author:'Kentaro Miura',    type:'manga',  genre:'seinen', tags:['Dark Fantasy','Action','Drame'],  ep:'374 Ch',   rating:9.9, views:'7M',  malId:2,      c1:'#1f0a0a',c2:'#0f0505', isNew:false, trend:true,
    synopsis:"Guts, mercenaire armé d'une épée colossale, cherche à se venger de Griffith dans un monde médiéval sombre hanté par des démons." },
  { id:11, title:'Death Note',           author:'Tsugumi Ohba',     type:'manga',  genre:'shonen', tags:['Thriller','Psychologique'],       ep:'108 Ch',   rating:9.6, views:'9M',  malId:21,     c1:'#101020',c2:'#080810', isNew:false, trend:true,
    synopsis:"Light Yagami trouve un cahier qui tue quiconque dont le nom y est inscrit. Il veut créer un monde parfait face à un détective de génie." },
  { id:12, title:'Chainsaw Man',         author:'Tatsuki Fujimoto', type:'manga',  genre:'shonen', tags:['Action','Horreur','Comédie'],     ep:'168 Ch',   rating:9.4, views:'6M',  malId:116778, c1:'#4a1a1a',c2:'#2d0f0f', isNew:true,  trend:true,
    synopsis:"Denji fusionne avec son chien-démon Pochita et devient Chainsaw Man, un chasseur de démons mi-humain mi-tronçonneuse." },
  { id:13, title:'Fullmetal Alchemist',  author:'Hiromu Arakawa',   type:'manga',  genre:'shonen', tags:['Aventure','Action','Drame'],      ep:'108 Ch',   rating:9.7, views:'8M',  malId:25,     c1:'#2a1a00',c2:'#1a1000', isNew:false, trend:false,
    synopsis:"Les frères Elric cherchent la Pierre Philosophale pour retrouver leurs corps perdus lors d'une alchimie interdite." },
  { id:14, title:'Vinland Saga',         author:'Makoto Yukimura',  type:'manga',  genre:'seinen', tags:['Historique','Action','Drame'],    ep:'210 Ch',   rating:9.5, views:'5M',  malId:54491,  c1:'#1a2d1a',c2:'#0d1f0d', isNew:false, trend:false,
    synopsis:"Thorfinn, fils d'un grand Viking, cherche à venger la mort de son père dans une épopée entre guerre et rédemption." },
  { id:15, title:'Spy × Family',         author:'Tatsuya Endo',     type:'manga',  genre:'shonen', tags:['Comédie','Action','Famille'],     ep:'102 Ch',   rating:9.0, views:'5M',  malId:119161, c1:'#1a1a3a',c2:'#0f0f24', isNew:true,  trend:false,
    synopsis:"Un espion crée une fausse famille — une enfant télépathe et une assassine — sans que personne ne sache la vérité." },
  { id:16, title:'Naruto',               author:'Masashi Kishimoto',type:'manga',  genre:'shonen', tags:['Action','Aventure','Amitié'],     ep:'700 Ch',   rating:9.3, views:'13M', malId:11,     c1:'#2a1a00',c2:'#1a1000', isNew:false, trend:false,
    synopsis:"Naruto Uzumaki, rejeté de son village, rêve de devenir Hokage pour être reconnu de tous." },

  // MANHWA
  { id:20, title:'Solo Leveling',        author:'Chugong',          type:'manhwa', genre:'action', tags:['Action','Fantasy','OP Hero'],     ep:'179 Ch',   rating:9.6, views:'15M', malId:121496, c1:'#0a1020',c2:'#050810', isNew:false, trend:true,
    synopsis:"Sung Jinwoo, le chasseur le plus faible, découvre un système mystérieux qui lui permet de progresser sans limite." },
  { id:21, title:'Tower of God',         author:'SIU',              type:'manhwa', genre:'action', tags:['Fantasy','Aventure','Mystère'],   ep:'590 Ch',   rating:9.2, views:'8M',  malId:97655,  c1:'#0d1a2a',c2:'#080f1a', isNew:false, trend:true,
    synopsis:"Baam entre dans une tour mystérieuse pour retrouver son amie Rachel. Chaque étage cache de nouveaux défis." },
  { id:22, title:'Nano Machine',         author:'Geung-hyun Han',   type:'manhwa', genre:'action', tags:['Arts Martiaux','Sci-Fi'],         ep:'220 Ch',   rating:8.8, views:'5M',  malId:null,   c1:'#0a1a1a',c2:'#050f0f', isNew:true,  trend:false,
    synopsis:"Cheon Yeo-Woon reçoit une nano-machine du futur qui le propulse vers le sommet du monde martial." },

  // MANHUA
  { id:30, title:'Battle Through Heavens',author:'Tian Can Tu Dou', type:'manhua', genre:'action', tags:['Cultivation','Action','Fantasy'], ep:'500+ Ch',  rating:8.5, views:'6M',  malId:null,   c1:'#2a0a0a',c2:'#1a0505', isNew:false, trend:false,
    synopsis:"Xiao Yan, ancien génie devenu médiocre, reprend son entraînement grâce à un anneau contenant l'esprit de sa mère." },
  { id:31, title:'Soul Land',            author:'Tang Jia San Shao',type:'manhua', genre:'fantasy',tags:['Cultivation','Fantasy'],          ep:'800+ Ch',  rating:8.6, views:'5M',  malId:null,   c1:'#0a1a2a',c2:'#050f1a', isNew:true,  trend:false,
    synopsis:"Tang San se réincarne dans un monde de cultivation et gravit les échelons vers la puissance divine." },

  // SHŌJO
  { id:40, title:'Fruits Basket',        author:'Natsuki Takaya',   type:'manga',  genre:'shojo',  tags:['Romance','Drame','Comédie'],      ep:'136 Ch',   rating:9.1, views:'4M',  malId:239,    c1:'#2a0a1a',c2:'#1a0510', isNew:false, trend:false,
    synopsis:"Tôru Honda est recueillie par les Sôma, dont les membres se transforment en animaux du zodiaque chinois." },
  { id:41, title:'Ouran Host Club',      author:'Bisco Hatori',     type:'manga',  genre:'shojo',  tags:['Comédie','Romance','École'],      ep:'87 Ch',    rating:8.9, views:'3M',  malId:1553,   c1:'#2a200a',c2:'#1a1405', isNew:false, trend:false,
    synopsis:"Haruhi intègre par accident le Club des Hôtes d'Ouran et doit rembourser un vase cassé en devenant hôtesse." }
];

var SHOP = [
  { id:'p1', type:'poster', title:'One Piece — Équipage',      emoji:'🏴‍☠️', bg:'linear-gradient(135deg,#1a4080,#0d2550)', a4:500, a3:800 },
  { id:'p2', type:'poster', title:'Attack on Titan — Recon',   emoji:'⚔️',  bg:'linear-gradient(135deg,#2a2010,#1a1308)', a4:500, a3:800 },
  { id:'p3', type:'poster', title:'Jujutsu Kaisen — Gojo',     emoji:'👁️', bg:'linear-gradient(135deg,#1f1040,#120a28)', a4:500, a3:800 },
  { id:'p4', type:'poster', title:'Demon Slayer — Tanjiro',    emoji:'🌊', bg:'linear-gradient(135deg,#2d1b4e,#1a0d2e)', a4:500, a3:800 },
  { id:'p5', type:'poster', title:'Berserk — Guts',            emoji:'🗡️', bg:'linear-gradient(135deg,#1f0a0a,#0f0505)', a4:600, a3:900 },
  { id:'p6', type:'poster', title:'Solo Leveling — Shadow',    emoji:'👤', bg:'linear-gradient(135deg,#0a1020,#050810)', a4:500, a3:800 },
  { id:'f1', type:'figure', title:'Luffy Figurine',            emoji:'👒', bg:'linear-gradient(135deg,#1a4080,#0d2550)', std:2500, prem:5000 },
  { id:'f2', type:'figure', title:'Gojo Satoru Figurine',      emoji:'🔵', bg:'linear-gradient(135deg,#1f1040,#120a28)', std:2500, prem:5000 },
  { id:'f3', type:'figure', title:'Tanjiro Figurine',          emoji:'💧', bg:'linear-gradient(135deg,#2d1b4e,#1a0d2e)', std:2500, prem:5000 },
  { id:'f4', type:'figure', title:'Guts Figurine',             emoji:'⚫', bg:'linear-gradient(135deg,#1f0a0a,#0f0505)', std:3000, prem:6000 }
];

var ADMIN_PWD = 'psyx2025admin';

// ══════════════════════════════════════════
//  3. STATE
// ══════════════════════════════════════════
var state = {
  type:'all', genre:'all', search:'', sort:'pop',
  user: null, coins:0, cart:[], page:1,
  readerManga:null, readerChap:0
};

var coverCache = {};
var PAGES = 20;

// ══════════════════════════════════════════
//  4. INIT
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function () {
  loadPersistedState();
  renderTrend();
  renderMain();
  renderShop();
  bindEvents();
  fetchCovers();
});

// ══════════════════════════════════════════
//  5. PERSIST
// ══════════════════════════════════════════
function loadPersistedState() {
  try {
    var u = localStorage.getItem('psyx_user');
    if (u) state.user = JSON.parse(u);
    state.coins = parseInt(localStorage.getItem('psyx_coins') || '0');
    state.cart  = JSON.parse(localStorage.getItem('psyx_cart')  || '[]');
  } catch(e) {}
  updateAuthUI();
  updateCoinUI();
  updateCartBadge();
  if (state.user) renderHistory();
}
function saveCart()  { localStorage.setItem('psyx_cart',  JSON.stringify(state.cart));  }
function saveCoins() { localStorage.setItem('psyx_coins', state.coins); }

// ══════════════════════════════════════════
//  6. COVERS (Jikan — best-effort)
// ══════════════════════════════════════════
function fetchCovers() {
  var items = CATALOG.filter(function(m){ return m.malId; });
  items.forEach(function(m, i) {
    setTimeout(function(){ fetchOneCover(m); }, i * 400);
  });
}
function fetchOneCover(manga) {
  if (coverCache[manga.malId]) return;
  var ep = manga.type === 'anime' ? 'anime' : 'manga';
  fetch('https://api.jikan.moe/v4/' + ep + '/' + manga.malId)
    .then(function(r){ return r.json(); })
    .then(function(d){
      var url = d.data && d.data.images && d.data.images.jpg && (d.data.images.jpg.large_image_url || d.data.images.jpg.image_url);
      if (!url) return;
      coverCache[manga.malId] = url;
      document.querySelectorAll('[data-mid="' + manga.malId + '"]').forEach(function(el){
        replacePlaceholder(el, url, manga);
      });
    })
    .catch(function(){});
}
function replacePlaceholder(el, url, manga) {
  var img = document.createElement('img');
  img.className = 'card-img';
  img.src = url;
  img.alt = manga.title;
  img.loading = 'lazy';
  img.onerror = function(){ /* keep placeholder */ };
  el.parentNode.replaceChild(img, el);
}

// ══════════════════════════════════════════
//  7. CARD
// ══════════════════════════════════════════
function makeCard(manga) {
  var div = document.createElement('div');
  div.className = 'card';
  div.onclick = function(){ openDetail(manga); };

  var coverHtml;
  if (coverCache[manga.malId]) {
    coverHtml = '<img class="card-img" src="' + coverCache[manga.malId] + '" alt="' + manga.title + '" loading="lazy"/>';
  } else {
    coverHtml = '<div class="card-ph" data-mid="' + manga.malId + '" style="background:linear-gradient(135deg,' + manga.c1 + ',' + manga.c2 + ')">' + manga.title + '</div>';
  }

  var typeLbl = {anime:'🎬',manga:'📖',manhwa:'🇰🇷',manhua:'🇨🇳'}[manga.type] || '';
  var newBadge = manga.isNew ? '<div class="card-new">NEW</div>' : '';

  div.innerHTML = newBadge +
    '<div class="card-type">' + typeLbl + ' ' + manga.type.toUpperCase() + '</div>' +
    coverHtml +
    '<div class="card-hover">' +
      '<div class="card-hover-tags">' + manga.tags.slice(0,2).map(function(t){ return '<span class="card-tag">'+t+'</span>'; }).join('') + '</div>' +
      '<div class="card-hover-btns">' +
        '<button class="card-btn read" onclick="event.stopPropagation();startReader(' + manga.id + ')">▶ LIRE</button>' +
        '<button class="card-btn buy" onclick="event.stopPropagation();openDetail(CATALOG.find(function(m){return m.id===' + manga.id + ';}),true)">🛒 COMMANDER</button>' +
      '</div>' +
    '</div>' +
    '<div class="card-body">' +
      '<div class="card-name">' + manga.title + '</div>' +
      '<div class="card-meta"><span class="card-genre">' + manga.genre.toUpperCase() + '</span><span class="card-ep">' + manga.ep + '</span></div>' +
    '</div>';

  return div;
}

// ══════════════════════════════════════════
//  8. RENDER
// ══════════════════════════════════════════
function getFiltered() {
  var list = CATALOG.slice();
  if (state.type  !== 'all') list = list.filter(function(m){ return m.type === state.type; });
  if (state.genre !== 'all') list = list.filter(function(m){ return m.genre === state.genre || m.tags.map(function(t){ return t.toLowerCase(); }).indexOf(state.genre) !== -1; });
  if (state.search) {
    var q = state.search.toLowerCase();
    list = list.filter(function(m){ return m.title.toLowerCase().indexOf(q) !== -1 || m.author.toLowerCase().indexOf(q) !== -1; });
  }
  if (state.sort === 'new')  { list = list.filter(function(m){ return m.isNew; }).concat(list.filter(function(m){ return !m.isNew; })); }
  else if (state.sort === 'az')  { list.sort(function(a,b){ return a.title.localeCompare(b.title); }); }
  else if (state.sort === 'top') { list.sort(function(a,b){ return b.rating - a.rating; }); }
  else                           { list.sort(function(a,b){ return parseFloat(b.views) - parseFloat(a.views) || 0; }); }
  return list;
}
function renderTrend() {
  var g = document.getElementById('gridTrend');
  g.innerHTML = '';
  CATALOG.filter(function(m){ return m.trend; }).forEach(function(m){ g.appendChild(makeCard(m)); });
}
function renderMain() {
  var g  = document.getElementById('gridMain');
  var em = document.getElementById('emptyMsg');
  g.innerHTML = '';
  var list = getFiltered();
  em.classList.toggle('hidden', list.length > 0);
  list.forEach(function(m){ g.appendChild(makeCard(m)); });
}
function renderHistory() {
  if (!state.user) return;
  var hist = [];
  try { hist = JSON.parse(localStorage.getItem('psyx_hist') || '[]'); } catch(e){}
  var sec  = document.getElementById('secHist');
  var grid = document.getElementById('gridHist');
  sec.classList.toggle('hidden', hist.length === 0);
  grid.innerHTML = '';
  hist.map(function(id){ return CATALOG.find(function(m){ return m.id === id; }); }).filter(Boolean).forEach(function(m){ grid.appendChild(makeCard(m)); });
}
function addHistory(manga) {
  if (!state.user) return;
  var hist = [];
  try { hist = JSON.parse(localStorage.getItem('psyx_hist') || '[]'); } catch(e){}
  hist = [manga.id].concat(hist.filter(function(id){ return id !== manga.id; })).slice(0,12);
  localStorage.setItem('psyx_hist', JSON.stringify(hist));
  renderHistory();
}

// ══════════════════════════════════════════
//  9. SHOP
// ══════════════════════════════════════════
function renderShop() {
  var g = document.getElementById('shopGrid');
  g.innerHTML = '';
  SHOP.forEach(function(item){
    var div = document.createElement('div');
    div.className = 'shop-card';
    var rows;
    if (item.type === 'poster') {
      rows = makeShopRow('🖼 Poster A4', item.a4, item.id + '-a4', item.title + ' — Poster A4', item.a4) +
             makeShopRow('🖼 Poster A3', item.a3, item.id + '-a3', item.title + ' — Poster A3', item.a3);
    } else {
      rows = makeShopRow('🗿 Figurine Standard',  item.std,  item.id + '-std',  item.title + ' — Figurine Std',   item.std) +
             makeShopRow('⭐ Figurine Premium',   item.prem, item.id + '-prem', item.title + ' — Figurine Prem',  item.prem);
    }
    div.innerHTML =
      '<div class="shop-img" style="background:' + item.bg + '"><span>' + item.emoji + '</span></div>' +
      '<div class="shop-body">' +
        '<div class="shop-name">' + item.title + '</div>' +
        '<div class="shop-sub">' + (item.type==='poster'?'Poster':'Figurine') + ' · Livraison 24h 🇭🇹</div>' +
        '<div class="shop-rows">' + rows + '</div>' +
      '</div>';
    g.appendChild(div);
  });
}
function makeShopRow(label, price, cartId, name, cartPrice) {
  return '<div class="shop-row">' +
    '<span class="shop-label">' + label + '</span>' +
    '<span class="shop-price">' + price + ' HTG</span>' +
    '<button class="shop-add" onclick="addToCart(\'' + cartId + '\',\'' + name + '\',\'' + label + '\',' + cartPrice + ')">+🛒</button>' +
  '</div>';
}

// ══════════════════════════════════════════
//  10. CART
// ══════════════════════════════════════════
function addToCart(id, name, sub, price) {
  var ex = state.cart.find(function(c){ return c.id === id; });
  if (ex) { ex.qty++; } else { state.cart.push({id:id,name:name,sub:sub,price:price,qty:1}); }
  saveCart();
  updateCartBadge();
  toast('🛒 ' + name + ' ajouté !', 'ok');
}
function removeFromCart(id) {
  state.cart = state.cart.filter(function(c){ return c.id !== id; });
  saveCart();
  updateCartBadge();
  renderCartModal();
}
function updateCartBadge() {
  var total = state.cart.reduce(function(s,c){ return s + c.qty; }, 0);
  var badge = document.getElementById('cartBadge');
  badge.textContent = total;
  badge.classList.toggle('hidden', total === 0);
}
function renderCartModal() {
  var list = document.getElementById('cartList');
  var tot  = document.getElementById('cartTotal');
  if (state.cart.length === 0) {
    list.innerHTML = '<div class="cart-empty">⛩ Panier vide.</div>';
    tot.innerHTML = '';
    return;
  }
  list.innerHTML = state.cart.map(function(c){
    return '<div class="cart-item">' +
      '<div class="cart-info"><div class="cart-name">' + c.name + '</div><div class="cart-sub">' + c.sub + ' ×' + c.qty + '</div></div>' +
      '<div class="cart-price">' + (c.price * c.qty).toLocaleString() + ' HTG</div>' +
      '<button class="cart-rm" onclick="removeFromCart(\'' + c.id + '\')">🗑</button>' +
    '</div>';
  }).join('');
  var sum = state.cart.reduce(function(s,c){ return s + c.price * c.qty; }, 0);
  tot.innerHTML = 'TOTAL : <b>' + sum.toLocaleString() + ' HTG</b>';
}

// ══════════════════════════════════════════
//  11. READER
// ══════════════════════════════════════════
function startReader(mangaId, chap) {
  var manga = CATALOG.find(function(m){ return m.id === mangaId; });
  if (!manga) return;
  closeModal('mDetail');
  state.readerManga = manga;
  var maxEp = parseInt(manga.ep) || 20;
  state.readerChap = chap || maxEp;
  state.page = 1;
  document.getElementById('rdTitle').textContent = manga.title;
  document.getElementById('rdChap').textContent = (manga.type === 'anime' ? 'Épisode' : 'Chapitre') + ' ' + state.readerChap;
  renderReaderPage();
  openModal('mReader');
  addCoins(2);
}
function renderReaderPage() {
  var wrap = document.getElementById('rdPage');
  wrap.innerHTML = '<div class="rd-page-inner">' +
    '<div class="rd-page-num">' + state.page + '</div>' +
    '<div class="rd-page-label">PAGE ' + state.page + ' / ' + PAGES + '</div>' +
    '<div class="rd-page-note">📄 Contenu en cours d\'intégration</div>' +
  '</div>';
  document.getElementById('rdInfo').textContent = 'Page ' + state.page + ' / ' + PAGES;
  document.getElementById('rdPrev').disabled = state.page <= 1;
  document.getElementById('rdNext').disabled = state.page >= PAGES;
}

// ══════════════════════════════════════════
//  12. DETAIL
// ══════════════════════════════════════════
function openDetail(manga, shopFocus) {
  addHistory(manga);
  var coverHtml;
  if (coverCache[manga.malId]) {
    coverHtml = '<img src="' + coverCache[manga.malId] + '" alt="' + manga.title + '" style="width:100%;height:100%;object-fit:cover"/>';
  } else {
    coverHtml = '<div class="card-ph" style="background:linear-gradient(135deg,' + manga.c1 + ',' + manga.c2 + ');height:100%">' + manga.title + '</div>';
  }
  var maxEp = parseInt(manga.ep) || 20;
  var chapHtml = Array.from({length:Math.min(10,maxEp)}, function(_,i){
    var n = maxEp - i;
    var age = i===0 ? "Aujourd'hui" : i===1 ? 'Il y a 3j' : 'Il y a ' + (i*6) + 'j';
    return '<div class="chap-item" onclick="startReader(' + manga.id + ',' + n + ')">' +
      '<span class="chap-num">' + (manga.type==='anime'?'Épisode':'Chapitre') + ' ' + n + '</span>' +
      (i<2?'<span class="chap-new">NEW</span>':'') +
      '<span class="chap-date">' + age + '</span>' +
    '</div>';
  }).join('');

  document.getElementById('detailBody').innerHTML =
    '<div class="det-top">' +
      '<div class="det-cover">' + coverHtml + '</div>' +
      '<div class="det-meta">' +
        '<div class="det-title">' + manga.title + '</div>' +
        '<div class="det-author">par ' + manga.author + '</div>' +
        '<div class="det-tags">' + manga.tags.map(function(t){ return '<span class="det-tag">'+t+'</span>'; }).join('') + '<span class="det-tag">' + manga.genre.toUpperCase() + '</span></div>' +
        '<div class="det-stats">' +
          '<div><div class="det-stat-v">' + manga.rating + '</div><div class="det-stat-l">NOTE</div></div>' +
          '<div><div class="det-stat-v">' + manga.ep + '</div><div class="det-stat-l">ÉPISODES</div></div>' +
          '<div><div class="det-stat-v">' + manga.views + '</div><div class="det-stat-l">VUES</div></div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="det-synopsis">' + manga.synopsis + '</div>' +
    '<div class="det-acts">' +
      '<button class="btn-primary" onclick="startReader(' + manga.id + ')">▶ LIRE / VOIR</button>' +
      '<button class="btn-sec" onclick="closeModal(\'mDetail\');document.getElementById(\'boutique\').scrollIntoView({behavior:\'smooth\'})">🛍 Boutique</button>' +
    '</div>' +
    '<div class="det-shop">' +
      '<div class="det-shop-title">🇭🇹 COMMANDER — LIVRAISON PORT-AU-PRINCE 24H</div>' +
      '<div class="shop-rows">' +
        makeShopRow('🖼 Poster A4', 500, manga.id+'-pa4', manga.title+' — Poster A4', 500) +
        makeShopRow('🖼 Poster A3', 800, manga.id+'-pa3', manga.title+' — Poster A3', 800) +
        makeShopRow('🗿 Figurine Standard', 2500, manga.id+'-fstd', manga.title+' — Figurine Std', 2500) +
        makeShopRow('⭐ Figurine Premium', 5000, manga.id+'-fprem', manga.title+' — Figurine Prem', 5000) +
      '</div>' +
    '</div>' +
    '<div class="det-chaps"><h3>' + (manga.type==='anime'?'ÉPISODES RÉCENTS':'CHAPITRES RÉCENTS') + '</h3>' +
      '<div class="chap-list">' + chapHtml + '</div>' +
    '</div>';

  openModal('mDetail');
  if (shopFocus) {
    setTimeout(function(){
      var el = document.querySelector('.det-shop');
      if (el) el.scrollIntoView({behavior:'smooth',block:'nearest'});
    }, 100);
  }
}

// ══════════════════════════════════════════
//  13. COINS
// ══════════════════════════════════════════
function addCoins(n) {
  state.coins += n;
  saveCoins();
  updateCoinUI();
}
function updateCoinUI() {
  document.getElementById('coinCount').textContent = state.coins;
}

// ══════════════════════════════════════════
//  14. AUTH
// ══════════════════════════════════════════
function updateAuthUI() {
  var loggedIn = !!state.user;
  document.getElementById('btnAuth').classList.toggle('hidden', loggedIn);
  document.getElementById('userBox').classList.toggle('hidden', !loggedIn);
  if (state.user) document.getElementById('userName').textContent = state.user.username;
}

// ══════════════════════════════════════════
//  15. ADMIN
// ══════════════════════════════════════════
function renderAdmin() {
  var panel = document.getElementById('adminPanel');
  var gate  = document.getElementById('adminGate');
  gate.classList.add('hidden');
  panel.classList.remove('hidden');

  var users   = [];
  var orders  = [];
  try { users  = Object.keys(JSON.parse(localStorage.getItem('psyx_users')  || '{}')); } catch(e){}
  try { orders = JSON.parse(localStorage.getItem('psyx_orders') || '[]'); } catch(e){}

  // Stats
  var stats = '<div class="admin-stat">' +
    '<div class="astat"><div class="astat-v">' + users.length + '</div><div class="astat-l">USERS</div></div>' +
    '<div class="astat"><div class="astat-v">' + orders.length + '</div><div class="astat-l">COMMANDES</div></div>' +
    '<div class="astat"><div class="astat-v">' + CATALOG.length + '</div><div class="astat-l">TITRES</div></div>' +
  '</div>';

  // Users panel
  var uPanel = document.getElementById('aUsers');
  uPanel.innerHTML = stats +
    (users.length === 0
      ? '<p class="no-data">Aucun utilisateur inscrit.</p>'
      : '<table><tr><th>#</th><th>Pseudo</th></tr>' +
        users.map(function(u,i){ return '<tr><td>'+(i+1)+'</td><td>'+u+'</td></tr>'; }).join('') +
        '</table>');

  // Orders panel
  var oPanel = document.getElementById('aOrders');
  oPanel.innerHTML = orders.length === 0
    ? '<p class="no-data">Aucune commande enregistrée.</p>'
    : '<table><tr><th>Date</th><th>Nom</th><th>Tel</th><th>Paiement</th><th>Total</th></tr>' +
      orders.map(function(o){
        return '<tr><td>' + o.date + '</td><td>' + o.name + '</td><td>' + o.phone + '</td><td>' + o.pay + '</td><td>' + o.total + ' HTG</td></tr>';
      }).join('') + '</table>';

  // Catalog panel
  var cPanel = document.getElementById('aCatalog');
  cPanel.innerHTML =
    '<table><tr><th>ID</th><th>Titre</th><th>Type</th><th>Genre</th><th>Note</th></tr>' +
    CATALOG.map(function(m){
      return '<tr><td>' + m.id + '</td><td>' + m.title + '</td><td>' + m.type + '</td><td>' + m.genre + '</td><td>' + m.rating + '</td></tr>';
    }).join('') + '</table>';
}

// ══════════════════════════════════════════
//  16. MODAL HELPERS
// ══════════════════════════════════════════
function openModal(id)  { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden');    }

// ══════════════════════════════════════════
//  17. TOAST
// ══════════════════════════════════════════
function toast(msg, type) {
  var el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast' + (type ? ' ' + type : '');
  el.classList.remove('hidden');
  clearTimeout(el._t);
  el._t = setTimeout(function(){ el.classList.add('hidden'); }, 3000);
}

// ══════════════════════════════════════════
//  18. EVENTS
// ══════════════════════════════════════════
function bindEvents() {

  // Hamburger
  document.getElementById('btnHam').addEventListener('click', function(){
    document.getElementById('mobNav').classList.toggle('hidden');
  });

  // Search
  function doSearch(val) {
    state.search = val;
    document.getElementById('searchInput').value = val;
    document.getElementById('searchMob').value   = val;
    renderMain();
  }
  document.getElementById('searchInput').addEventListener('input', function(){ doSearch(this.value); });
  document.getElementById('searchMob').addEventListener('input', function(){ doSearch(this.value); });

  // Type tabs
  document.querySelectorAll('.tab').forEach(function(btn){
    btn.addEventListener('click', function(){
      var t = this.getAttribute('data-type');
      if (t === 'hentai') { openModal('mAdult'); return; }
      document.querySelectorAll('.tab').forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      state.type = t;
      renderMain();
    }.bind(btn));
  });

  // Genre pills
  document.querySelectorAll('.g').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.g').forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      state.genre = this.getAttribute('data-g');
      renderMain();
    }.bind(btn));
  });

  // Sort
  document.getElementById('sortBy').addEventListener('change', function(){
    state.sort = this.value;
    renderMain();
  });

  // Cart
  document.getElementById('btnCart').addEventListener('click', function(){
    renderCartModal();
    openModal('mCart');
  });

  // Auth open
  document.getElementById('btnAuth').addEventListener('click', function(){ openModal('mAuth'); });

  // Auth tabs
  document.querySelectorAll('.mtab').forEach(function(btn){
    btn.addEventListener('click', function(){
      var tab = this.getAttribute('data-tab');
      document.querySelectorAll('.mtab').forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      document.getElementById('tLogin').classList.toggle('hidden', tab !== 'tLogin');
      document.getElementById('tReg').classList.toggle('hidden', tab !== 'tReg');
    }.bind(btn));
  });

  // Login
  document.getElementById('btnLogin').addEventListener('click', function(){
    var u = document.getElementById('lUser').value.trim();
    var p = document.getElementById('lPass').value;
    if (!u || !p) { toast('⚠️ Remplis tous les champs.'); return; }
    var users = {};
    try { users = JSON.parse(localStorage.getItem('psyx_users') || '{}'); } catch(e){}
    if (!users[u] || users[u] !== p) { toast('❌ Pseudo ou mot de passe incorrect.'); return; }
    state.user = {username:u};
    localStorage.setItem('psyx_user', JSON.stringify(state.user));
    closeModal('mAuth');
    updateAuthUI();
    renderHistory();
    toast('🔴 Bienvenue, ' + u + ' !', 'ok');
  });

  // Register
  document.getElementById('btnReg').addEventListener('click', function(){
    var u = document.getElementById('rUser').value.trim();
    var p = document.getElementById('rPass').value;
    if (!u || !p) { toast('⚠️ Remplis tous les champs.'); return; }
    if (u.length < 3) { toast('⚠️ Pseudo trop court (min 3).'); return; }
    if (p.length < 6) { toast('⚠️ Mot de passe trop court (min 6).'); return; }
    var users = {};
    try { users = JSON.parse(localStorage.getItem('psyx_users') || '{}'); } catch(e){}
    if (users[u]) { toast('❌ Ce pseudo est déjà pris.'); return; }
    users[u] = p;
    localStorage.setItem('psyx_users', JSON.stringify(users));
    state.user = {username:u};
    localStorage.setItem('psyx_user', JSON.stringify(state.user));
    state.coins = 50; saveCoins(); updateCoinUI();
    closeModal('mAuth');
    updateAuthUI();
    toast('🎉 Bienvenue, ' + u + ' ! +50 🪙', 'ok');
  });

  // Logout
  document.getElementById('btnLogout').addEventListener('click', function(){
    state.user = null;
    localStorage.removeItem('psyx_user');
    updateAuthUI();
    document.getElementById('secHist').classList.add('hidden');
    toast('👋 Déconnecté.');
  });

  // Reader nav
  document.getElementById('rdPrev').addEventListener('click', function(){
    if (state.page > 1) { state.page--; renderReaderPage(); }
  });
  document.getElementById('rdNext').addEventListener('click', function(){
    if (state.page < PAGES) { state.page++; renderReaderPage(); }
  });

  // Checkout
  document.getElementById('btnCheckout').addEventListener('click', function(){
    if (!state.cart.length) { toast('⚠️ Panier vide.'); return; }
    closeModal('mCart');
    openModal('mOrder');
  });

  // Order → WhatsApp
  document.getElementById('btnOrder').addEventListener('click', function(){
    var name  = document.getElementById('oName').value.trim();
    var phone = document.getElementById('oPhone').value.trim();
    var addr  = document.getElementById('oAddr').value.trim();
    var pay   = (document.querySelector('input[name="pay"]:checked') || {}).value || 'Non précisé';
    if (!name || !phone || !addr) { toast('⚠️ Remplis tous les champs.'); return; }
    var total = state.cart.reduce(function(s,c){ return s + c.price*c.qty; }, 0);
    var items = state.cart.map(function(c){ return '• ' + c.name + ' ×' + c.qty + ' = ' + (c.price*c.qty).toLocaleString() + ' HTG'; }).join('\n');
    var msg = '*COMMANDE PSYX-MANGA* 🔴⚫\n\n' +
      '👤 *Nom :* ' + name + '\n📱 *WhatsApp :* ' + phone + '\n📍 *Adresse :* ' + addr + '\n💳 *Paiement :* ' + pay +
      '\n\n🛒 *Articles :*\n' + items + '\n\n💰 *Total : ' + total.toLocaleString() + ' HTG*\n\n🚀 _Livraison Port-au-Prince 24h_\n_"Lire n\'est que beauté"_ ✨';
    // Save order
    var orders = [];
    try { orders = JSON.parse(localStorage.getItem('psyx_orders') || '[]'); } catch(e){}
    orders.push({date:new Date().toLocaleDateString('fr'),name:name,phone:phone,pay:pay,total:total.toLocaleString()});
    localStorage.setItem('psyx_orders', JSON.stringify(orders));
    window.open('https://wa.me/50935144295?text=' + encodeURIComponent(msg), '_blank');
    state.cart = []; saveCart(); updateCartBadge();
    closeModal('mOrder');
    toast('📱 Commande envoyée ! 🎉', 'ok');
  });

  // Contact form
  document.getElementById('btnContact').addEventListener('click', function(){
    var name = document.getElementById('cName').value.trim();
    var msg  = document.getElementById('cMsg').value.trim();
    if (!name || !msg) { toast('⚠️ Remplis au moins ton nom et ton message.'); return; }
    var phone = document.getElementById('cPhone').value.trim();
    var text = '*Message Psyx-Manga* 🔴\n\n👤 ' + name + '\n📱 ' + (phone||'—') + '\n\n💬 ' + msg;
    window.open('https://wa.me/50935144295?text=' + encodeURIComponent(text), '_blank');
    document.getElementById('cName').value = '';
    document.getElementById('cPhone').value = '';
    document.getElementById('cMsg').value = '';
    toast('📱 Message envoyé !', 'ok');
  });

  // Admin login
  document.getElementById('btnAdminLogin').addEventListener('click', function(){
    if (document.getElementById('adminPass').value === ADMIN_PWD) {
      renderAdmin();
    } else {
      toast('❌ Mot de passe admin incorrect.');
    }
  });

  // Admin tabs
  document.querySelectorAll('.atab').forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = this.getAttribute('data-panel');
      document.querySelectorAll('.atab').forEach(function(b){ b.classList.remove('active'); });
      this.classList.add('active');
      document.querySelectorAll('.apanel').forEach(function(p){ p.classList.add('hidden'); });
      document.getElementById(target).classList.remove('hidden');
    }.bind(btn));
  });

  // Close buttons (data-close)
  document.querySelectorAll('[data-close]').forEach(function(btn){
    btn.addEventListener('click', function(){
      closeModal(this.getAttribute('data-close'));
    }.bind(btn));
  });

  // Click outside modal to close
  document.querySelectorAll('.overlay').forEach(function(overlay){
    overlay.addEventListener('click', function(e){
      if (e.target === this) {
        var id = this.id;
        if (id !== 'mReader') closeModal(id); // reader needs explicit close
      }
    });
  });

  // Keyboard ESC
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Escape') return;
    ['mAuth','mDetail','mCart','mOrder','mAdmin','mAdult','mReader'].forEach(function(id){
      document.getElementById(id).classList.add('hidden');
    });
  });

  // Reader keyboard arrows
  document.addEventListener('keydown', function(e){
    if (document.getElementById('mReader').classList.contains('hidden')) return;
    if (e.key === 'ArrowRight' && state.page < PAGES) { state.page++; renderReaderPage(); }
    if (e.key === 'ArrowLeft'  && state.page > 1)     { state.page--; renderReaderPage(); }
  });

  // Logo → home
  document.querySelector('.nav-logo').addEventListener('click', function(){
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

// ══════════════════════════════════════════
//  expose pour inline onclick
// ══════════════════════════════════════════
window.openDetail  = openDetail;
window.startReader = startReader;
window.addToCart   = addToCart;
window.removeFromCart = removeFromCart;
window.closeModal  = closeModal;
window.openModal   = openModal;
window.CATALOG     = CATALOG;
