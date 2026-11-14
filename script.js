const $ = (s) => document.querySelector(s);
/* ===== شاشة البداية =====
   1) تنتظر اكتمال التحميل أولا (لودينج)
   2) كلمة أسواق تظهر حرفا حرفا  3) الأغصان  4) الأوراق  5) الشنط  6) السلة وهي تهتز  7) الدوائر
   ثم تدخل بك للرئيسية. كل المدد في الجدول ST بالمللي ثانية. */
(function () {
  const sp = $("#splash");
  if (!sp) return;
  const R = $("#spRect"),
    B = [4400, 4075, 3170, 2700, 2470, 1400], // حدود الحروف: أ ← س ← و ← ا ← ق
    START = 500, // تأخير بداية الكلمة بعد التحميل
    WIPE = 320, // زمن ظهور كل حرف
    HOLD = 200, // وقفة بين الحروف
    NAME_END = START + 5 * (WIPE + HOLD),
    ST = [
      ["s-br", NAME_END + 150], // الأغصان
      ["s-lf", NAME_END + 1000], // الأوراق
      ["s-bg", NAME_END + 2400], // الشنط
      ["s-bk", NAME_END + 3200], // السلة وتهتز
      ["s-st", NAME_END + 4200], // الدوائر
    ],
    END = NAME_END + 5900; // وقت الدخول للرئيسية
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const X = (t) => {
    t -= START;
    if (t <= 0) return B[0];
    const i = Math.floor(t / (WIPE + HOLD));
    if (i >= 5) return B[5];
    const r = t - i * (WIPE + HOLD),
      k = r >= WIPE ? 1 : 1 - Math.pow(1 - r / WIPE, 2);
    return B[i] + (B[i + 1] - B[i]) * k;
  };
  const leave = () => {
    sp.classList.add("out");
    setTimeout(() => sp.remove(), 900);
  };
  let started = false;
  const begin = () => {
    if (started) return;
    started = true;
    if (calm) {
      R.setAttribute("x", B[5]);
      ST.forEach((s) => sp.classList.add(s[0]));
      return setTimeout(leave, 1200);
    }
    const t0 = performance.now();
    (function tick(now) {
      const t = now - t0;
      R.setAttribute("x", X(t));
      if (t < NAME_END) requestAnimationFrame(tick);
    })(t0);
    ST.forEach((s) => setTimeout(() => sp.classList.add(s[0]), s[1]));
    setTimeout(leave, END);
  };
  // قبل كل شيء: انتظر اكتمال التحميل ثم ابدأ
  if (document.readyState == "complete") begin();
  else addEventListener("load", begin);
  setTimeout(begin, 8000); // أمان: إن تأخر التحميل جدا ابدأ على أي حال
})();
/* ===== شعار الهيدر: الأوراق تظهر وتختفي كل 5 ثوان ===== */
(function () {
  const hl = document.querySelector("header .hl");
  if (!hl || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  setInterval(() => hl.classList.toggle("lv"), 5000);
})();
const P = {
  chat: '<path d="M21 12a8.5 8.5 0 01-12.6 7.4L3 21l1.7-5.2A8.5 8.5 0 1121 12z"/>',
  home: '<path d="M3 11l9-8 9 8v10H3z"/>',
  bag: '<path d="M6 7h12l1 14H5zM9 7a3 3 0 016 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  cart: '<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h3l3 12h11l2-8H6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
  moon: '<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>',
  spark: '<path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z"/>',
  heart: '<path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6C19 16.4 12 21 12 21z"/>',
  wa: '<path d="M21 12a8.5 8.5 0 01-12.6 7.4L3 21l1.7-5.2A8.5 8.5 0 1121 12z"/><path d="M9 8.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8a3.5 3.5 0 01-1.9-1.9l.8-.8-1-2z"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
};
const ic = (n) =>
  `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
const E = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const fm = (n) => Number(n).toLocaleString("en-US") + " ر.ي";
const DR = [
  "الشيخ عثمان",
  "دار سعد",
  "المنصورة",
  "البريقة",
  "خور مكسر",
  "كريتر",
  "المعلا",
  "التواهي",
];
const MKS = [
  [
    "سوق الذهب",
    "سوق عدن الدولي",
    "سوق شمسان مول",
    "سوق مسجد النور",
    "سوق الهاشمي",
    "سوق الشرماني",
  ],
  ["سوق الدار"],
  ["سوق خليفة"],
  ["سوق البريقة", "سوق انماء القديمة"],
  ["سوق المطار"],
  ["سوق السيلة", "سوق الطويل"],
  ["سوق العقبة", "شارع الرئيسي"],
  ["سوق التواهي"],
];
const MK = MKS.flatMap((l, d) => l.map((n) => ({ n, d })));
const TY = [
  "أدوات تجميل",
  "الإلكترونيات",
  "عبايات",
  "ملابس رجالي",
  "ملابس نسائي",
  "دروع ويلات",
  "ملابس أطفال",
  "أحذية رجالية",
  "أحذية نسائية",
  "ألعاب",
  "كهربائيات",
  "شنط نسائية",
  "مكتبة",
];
const TE = [
  "💄",
  "💻",
  "🧕",
  "👔",
  "👗",
  "🏆",
  "🧒",
  "👞",
  "👠",
  "🎮",
  "🔌",
  "👜",
  "📚",
];
const FEE = 3000;
const OWNER = "967779992985",
  WA = "967779992985";
let S = {
  role: "guest",
  user: {},
  accs: [], // الحسابات المسجلة (محلات وزبائن)
  cart: [],
  lk: {}, // الإعجابات: { رقم المنتج: [أرقام الحسابات] }
  rt: {}, // التقييمات: { رقم المنتج: { رقم الحساب: عدد النجوم } }
  cm: {}, // التعليقات: { رقم المنتج: [تعليقات] }
  sold: {}, // عدد مرات الشراء لكل منتج
  view: "home",
  arg: null,
  q: "",
  ss: [], // تأتي من قاعدة البيانات
  ps: [],
};
try {
  const x = JSON.parse(localStorage.getItem("aswaq2"));
  if (x) {
    const lss = x.lss || [],
      lps = x.lps || [];
    delete x.ps;
    delete x.ss;
    delete x.lss;
    delete x.lps;
    Object.assign(S, x, { view: "home", arg: null, q: "" });
    S.ss = lss;
    S.ps = lps;
  }
} catch (e) {}
/* ===== المظهر: رسمي / فاتح / داكن ===== */
const THEMES = [
  ["official", "رسمي", "spark", "#0A1B33"],
  ["light", "فاتح", "sun", "#F7F3EA"],
  ["dark", "داكن", "moon", "#08090C"],
];
let TH = "official";
try {
  TH = localStorage.getItem("aswaq-theme") || "official";
} catch (e) {}
if (!THEMES.some((t) => t[0] == TH)) TH = "official";
function applyTheme() {
  document.documentElement.dataset.theme = TH;
  const t = THEMES.find((x) => x[0] == TH);
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.content = t[3];
  const b = $("#th");
  if (b) {
    b.innerHTML = ic(t[2]);
    b.setAttribute("aria-label", "المظهر الحالي: " + t[1]);
  }
}
function setTheme(v) {
  TH = v;
  try {
    localStorage.setItem("aswaq-theme", v);
  } catch (e) {}
  applyTheme();
  if (S.view == "set") render();
}
let FRESH = true;

/* ===== إضاءة تتبع اللمس/المؤشر + تموّج الأزرار ===== */
document.addEventListener(
  "pointermove",
  (e) => {
    const el = e.target.closest && e.target.closest(".pc,.st,.mk,.tp,.card,.ty button,.hero");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  },
  { passive: true },
);
document.addEventListener("pointerdown", (e) => {
  const b = e.target.closest && e.target.closest(".b,.qa,.tab,.chips button");
  if (!b) return;
  const r = b.getBoundingClientRect(),
    s = Math.max(r.width, r.height) * 2,
    d = document.createElement("i");
  d.className = "rp";
  d.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.appendChild(d);
  setTimeout(() => d.remove(), 650);
});

/* ===== الاتصال بقاعدة البيانات (Supabase) ===== */
const SB_URL = "https://ijrnqqnxhrowxzubdfhw.supabase.co";
const SB_KEY = "sb_publishable_D9R-iqAwkQd19eSNdNB7ZA_GsZ0W7UB"; // مفتاح عام: آمن في الواجهة. لا تضع هنا أي مفتاح سري أبدا.
let CAT = "loading",
  CAT_ERR = "";
async function sbGet(path) {
  const r = await fetch(SB_URL + "/rest/v1/" + path, {
    headers: { apikey: SB_KEY },
  });
  if (!r.ok) throw new Error("HTTP " + r.status);
  return r.json();
}
// رقم ثابت مشتق من معرّف قاعدة البيانات (uuid) حتى تبقى بقية الواجهة تعمل بالأرقام كما هي
const hid = (u) => parseInt(String(u).replace(/-/g, "").slice(0, 12), 16);
async function loadCatalog() {
  CAT = "loading";
  CAT_ERR = "";
  try {
    const [st, pr] = await Promise.all([
      sbGet(
        "stores?select=id,name,category,market,area,lat,lng,created_at&status=eq.verified&order=created_at.asc",
      ),
      sbGet(
        "products?select=id,store_id,name,description,price,image_thumb,created_at&in_stock=eq.true&order=created_at.desc",
      ),
    ]);
    const ls = S.ss.filter((x) => x.local),
      lp = S.ps.filter((x) => x.local);
    const sid = {};
    S.ss = st
      .map((s) => {
        const id = hid(s.id);
        sid[s.id] = id;
        return {
          id,
          uuid: s.id,
          n: s.name,
          t: s.category || "",
          m: MK.findIndex((m) => m.n == s.market),
          mt: s.market || "",
          d: s.area || "",
          loc: s.lat != null && s.lng != null ? s.lat + "," + s.lng : "",
          ts: Date.parse(s.created_at) || 0,
        };
      })
      .concat(ls);
    S.ps = pr
      .filter((p) => sid[p.store_id] != null)
      .map((p) => ({
        id: hid(p.id),
        uuid: p.id,
        n: p.name,
        d: p.description || "",
        s: sid[p.store_id],
        p: p.price,
        img: /^https:\/\//.test(p.image_thumb || "") ? p.image_thumb : "",
        ts: Date.parse(p.created_at) || 0,
      }))
      .concat(lp);
    S.cart = S.cart.filter((c) => S.ps.some((p) => p.id == c.id));
    CAT = "ok";
  } catch (e) {
    CAT = "error";
    CAT_ERR = String((e && e.message) || e);
  }
  if (["home", "markets", "stores", "types", "bytype", "product", "cart", "pay", "search"].includes(S.view)) {
    FRESH = true;
    render();
  }
}
const emp = (msg) =>
  CAT == "loading"
    ? '<div class="em">جاري التحميل...</div>'
    : CAT == "error"
      ? `<div class="em">تعذّر الاتصال بالخادم (${E(CAT_ERR)})<button class="b" onclick="loadCatalog()">إعادة المحاولة</button></div>`
      : `<div class="em">${msg}</div>`;

const sq0 = () => ({ m: "p", q: "", so: "new", mk: "", ty: "", mn: "", mx: "", of: false });
let IMG = "",
  LOC = "",
  PM = "",
  PG = "",
  RM = "n", // تبويب التسجيل: n = حساب جديد، o = لدي حساب من قبل
  CT = "c", // تبويب سلتي: c = السلة، f = المفضلة
  SQ = sq0(); // حالة صفحة البحث
const save = () => {
  try {
    if (S.role != "guest" && S.user.aid) {
      const i = S.accs.findIndex((a) => a.aid == S.user.aid);
      if (i >= 0) S.accs[i] = { ...S.accs[i], ...S.user };
    }
    localStorage.setItem(
      "aswaq2",
      JSON.stringify({
        role: S.role,
        user: S.user,
        accs: S.accs,
        cart: S.cart,
        lps: S.ps.filter((p) => p.local),
        lss: S.ss.filter((x) => x.local),
        lk: S.lk,
        rt: S.rt,
        cm: S.cm,
        sold: S.sold,
        orders: S.orders,
        rets: S.rets,
        tk: S.tk,
        al: S.al,
        nt: S.nt,
      }),
    );
  } catch (e) {}
};
const T = (m) => {
  const t = $("#t");
  t.textContent = m;
  t.style.display = "block";
  clearTimeout(T.h);
  T.h = setTimeout(() => (t.style.display = "none"), 2600);
};
const sh = () => window.open("https://www.shein.com", "_blank", "noopener");
const sto = (id) => S.ss.find((s) => s.id == id) || { n: "متجر" };
const pic = (o, c) =>
  `<div class="pic ${c || ""}" style="background:hsl(${(o.id * 47) % 360} 45% 50%/.18)">${o.img ? `<img src="${E(o.img)}" alt="" onerror="this.remove()">` : ""}</div>`;
const uid = () => S.user.aid || S.user.ph || "g";
const liked = (id) => S.role != "guest" && (S.lk[id] || []).includes(uid());
const BW = ["", "مرة واحدة", "مرتين", "ثلاث مرات", "أربع مرات", "خمس مرات", "ست مرات", "سبع مرات", "ثماني مرات", "تسع مرات", "عشر مرات"];
const bt = (n) => (n < 1 ? "لم يُشترَ بعد" : "تم الشراء " + (n <= 10 ? BW[n] : n + " مرة"));
function go(v, a, keep) {
  if (v == "search" && S.view != "search") SQ = sq0();
  S.view = v;
  S.arg = a ?? null;
  FRESH = !keep;
  IMG = "";
  LOC = "";
  if (!keep) {
    RM = "n";
    CT = "c";
    $("#q").value = "";
    S.q = "";
  }
  dr(0);
  render();
  if (!keep) scrollTo(0, 0);
}
function dr(o) {
  $("#dr").classList.toggle("on", !!o);
  if (o) {
    const g = S.role == "guest";
    $("#pn").innerHTML =
      '<div class="dh dlogo"><div class="logo">' + ($("header .logo svg") ? $("header .logo").innerHTML : "أسواق") + "</div></div>" +
      [
        [g ? "تسجيل دخول" : "حسابي", g ? "login" : "acct"],
        ["الأسواق", "markets"],
        ["المتاجر", "stores"],
        ["المنتجات", "types"],
        ["شي ان", "shein"],
        ["خدمات التوصيل", "deliv"],
        ["من نحن", "about"],
        ["سياسة الخصوصية", "priv"],
        ["المعلومات القانونية", "legal"],
      ]
        .map((x) => `<button onclick="go('${x[1]}')">${x[0]}</button>`)
        .join("");
    const hl = $("#pn .hl");
    if (hl) hl.classList.add("lv");
  }
}
const card = (p, m) =>
  `<div class="pc"><button class="pl" onclick="go('product',${p.id})">${pic(p)}<div class="pi"><b>${E(p.n)}</b><small>${E(p.d)}</small><small class="sn">${E(sto(p.s).n)}</small><span class="pr">${fm(p.p)}</span></div></button><button class="lk ${liked(p.id) ? "on" : ""}" data-id="${p.id}" onclick="lk(${p.id})" aria-label="إعجاب">${ic("heart")}</button>${m ? `<div class="pa"><button class="sb" onclick="go('editp',${p.id})">تعديل المنتج</button><button class="sb d" onclick="delp(${p.id})">حذف المنتج</button></div>` : `<button class="qa" onclick="add(${p.id})" aria-label="إضافة للسلة">+</button>`}</div>`;
const stc = (s) =>
  `<button class="st" onclick="go('home',${s.id})">${pic(s)}<div class="t"><b>${E(s.n)}</b><span class="tg">${E(s.t)}</span><span class="mu">${E(s.d)}</span><small class="mu">📍 ${E(MK[s.m]?.n || s.mt || "")}</small></div></button>`;
const F = (id, l, o = {}) =>
  `<label>${l}${o.n ? " <i>(اختياري)</i>" : ""}${o.o ? `<select id="${id}" ${o.c || ""}>${o.o.map((x, i) => `<option value="${i}">${E(x)}</option>`).join("")}</select>` : o.ta ? `<textarea id="${id}" rows="2"></textarea>` : `<input id="${id}" type="${o.t || "text"}" ${o.t == "tel" ? 'inputmode="numeric" maxlength="9" placeholder="7XXXXXXXX"' : ""}>`}</label>`;
const IMGF = `<label>صورة<input type="file" accept="image/*" onchange="upl(this)"></label><img id="pv" alt="" hidden>`;
const LOCF = `<button type="button" class="b o" onclick="loc()">تحديد الموقع عبر خرائط جوجل</button><p id="lk" class="mu" style="margin:8px 0"></p>`;
const g = (id) => $("#" + id).value.trim();
function upl(el) {
  const f = el.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => {
    const i = new Image();
    i.onload = () => {
      const c = document.createElement("canvas"),
        k = Math.min(1, 400 / Math.max(i.width, i.height));
      c.width = i.width * k;
      c.height = i.height * k;
      c.getContext("2d").drawImage(i, 0, 0, c.width, c.height);
      IMG = c.toDataURL("image/jpeg", 0.7);
      $("#pv").src = IMG;
      $("#pv").hidden = false;
    };
    i.src = r.result;
  };
  r.readAsDataURL(f);
}
function loc() {
  navigator.geolocation
    ? navigator.geolocation.getCurrentPosition(
        (p) => {
          LOC =
            p.coords.latitude.toFixed(5) + "," + p.coords.longitude.toFixed(5);
          $("#lk").innerHTML =
            `<a target="_blank" rel="noopener" style="color:var(--pri)" href="https://www.google.com/maps?q=${LOC}">تم تحديد الموقع، افتحه في الخرائط</a>`;
        },
        () => T("اسمح للتطبيق بالوصول إلى موقعك وحاول مرة أخرى"),
      )
    : T("المتصفح لا يدعم تحديد الموقع");
}
function sub(k) {
  const nm = g("nm"),
    ph = g("ph");
  if (!nm) return T("اكتب الاسم الشخصي");
  if (!/^7\d{8}$/.test(ph)) return T("الرقم من 9 أرقام ويبدأ بـ 7");
  if (k == "d") {
    S.user = { k, nm, ph };
    return go("deldone");
  }
  if (k == "s" && !g("sn")) return T("اكتب اسم المحل التجاري");
  if (k == "c" && !g("st")) return T("اكتب اسم الشارع");
  const pw = g("pw");
  if (pw.length < 4) return T("كلمة المرور 4 أحرف أو أكثر");
  if (S.accs.some((a) => a.k == k && a.ph == ph))
    return T("هذا الرقم مسجل من قبل، اختر «لدي حساب من قبل»");
  const aid = "a" + Date.now();
  if (k == "s") {
    const s = {
      id: Date.now(),
      n: g("sn"),
      t: TY[g("ty")],
      m: +g("mk"),
      d: g("ds"),
      img: IMG,
      loc: LOC,
      local: true,
    };
    S.ss.push(s);
    S.user = {
      k,
      aid,
      pw,
      nm,
      ph,
      sid: s.id,
      sn: s.n,
      em: g("em"),
      ds: g("ds"),
      img: IMG,
    };
    S.role = "store";
  } else {
    S.user = { k, aid, pw, nm, ph, em: g("em"), dr: DR[g("drs")], st: g("st"), loc: LOC };
    S.role = "customer";
  }
  S.accs.push({ ...S.user });
  T("تم الحفظ، أهلا بك");
  go("home");
}
/* تسجيل الدخول بحساب سابق: الرقم + كلمة المرور فقط، ثم تظهر صفحة حسابه */
function signin(k) {
  const ph = g("ph"),
    pw = g("pw");
  if (!/^7\d{8}$/.test(ph)) return T("الرقم من 9 أرقام ويبدأ بـ 7");
  if (!pw) return T("اكتب كلمة المرور");
  const a = S.accs.find((x) => x.k == k && x.ph == ph);
  if (!a) return T("لا يوجد حساب بهذا الرقم");
  if (a.pw !== pw) return T("كلمة المرور غير صحيحة");
  S.user = { ...a };
  S.role = k == "s" ? "store" : "customer";
  T("أهلا بعودتك " + a.nm);
  go("acct");
}
const rm = (m) => {
  RM = m;
  render();
};
function addp() {
  const n = g("pnm"),
    p = +g("pp");
  if (!n) return T("اكتب اسم المنتج");
  if (!(p > 0)) return T("اكتب سعرا صحيحا");
  S.ps.unshift({
    id: Date.now(),
    n,
    d: g("pd"),
    s: S.user.sid,
    p,
    img: IMG,
    local: true,
  });
  T("تمت إضافة المنتج");
  go("mine");
}
function saveProd(id) {
  const p = S.ps.find((x) => x.id == id);
  if (!p || p.s != S.user.sid) return T("لا يمكنك تعديل هذا المنتج");
  const n = g("pnm"),
    pr = +g("pp");
  if (!n) return T("اكتب اسم المنتج");
  if (!(pr > 0)) return T("اكتب سعرا صحيحا");
  Object.assign(p, { n, d: g("pd"), p: pr });
  if (IMG) p.img = IMG;
  T("تم تعديل المنتج");
  go("mine");
}
function delp(id) {
  const p = S.ps.find((x) => x.id == id);
  if (!p || p.s != S.user.sid) return;
  if (!confirm("هل تريد حذف هذا المنتج؟")) return;
  S.ps = S.ps.filter((x) => x.id != id);
  S.cart = S.cart.filter((c) => c.id != id);
  [S.lk, S.rt, S.cm, S.sold].forEach((o) => delete o[id]);
  T("تم حذف المنتج");
  render();
}
function lk(id) {
  if (S.role == "guest") {
    T("سجّل الدخول أولا للإعجاب بالمنتج");
    return go("login");
  }
  const a = (S.lk[id] = S.lk[id] || []),
    u = uid(),
    i = a.indexOf(u);
  i < 0 ? a.push(u) : a.splice(i, 1);
  T(i < 0 ? "أضيف إلى المفضلة" : "أزيل من المفضلة");
  document
    .querySelectorAll('.lk[data-id="' + id + '"]')
    .forEach((b) => b.classList.toggle("on", i < 0));
  if (S.view == "cart" || S.view == "product") render();
  else save();
}
function rate(id, n) {
  if (S.role == "guest") {
    T("سجّل الدخول أولا لتقييم المنتج");
    return go("login");
  }
  (S.rt[id] = S.rt[id] || {})[uid()] = n;
  T("تم حفظ تقييمك");
  render();
}
function addc(id) {
  if (S.role == "guest") {
    T("سجّل الدخول أولا لكتابة تعليق");
    return go("login");
  }
  const t = g("cmt");
  if (!t) return T("اكتب تعليقك أولا");
  (S.cm[id] = S.cm[id] || []).push({
    n: S.user.nm,
    u: uid(),
    t,
    d: new Date().toLocaleDateString("en-GB"),
  });
  T("تم نشر تعليقك");
  render();
}
const ct = (t) => {
  CT = t;
  render();
};
function add(id) {
  const p0 = S.ps.find((x) => x.id == id);
  if (p0 && (p0.qt === 0 || p0.h)) return T("هذا المنتج غير متوفر حاليا");
  const c = S.cart.find((x) => x.id == id);
  c ? c.q++ : S.cart.push({ id, q: 1 });
  save();
  nav();
  T("أضيف إلى السلة");
}
function qty(id, d) {
  const c = S.cart.find((x) => x.id == id);
  c.q += d;
  if (c.q < 1) S.cart = S.cart.filter((x) => x.id != id);
  render();
}
function checkout() {
  if (S.role == "guest") {
    T("سجّل الدخول أولا لإتمام الطلب");
    return go("login");
  }
  if (!S.user.loc) {
    T("حدّد موقعك أولا لإتمام الطلب");
    return;
  }
  PM = "";
  PG = "";
  go("pay");
}
const pick = (m) => {
    PM = m;
    render();
  },
  pg = (i) => {
    PG = PG === i ? "" : i;
    render();
  };
function fillMk() {
  if (!$("#mk")) return;
  $("#mk").innerHTML = MK.map((m, i) =>
    m.d == +g("drs") ? `<option value="${i}">${E(m.n)}</option>` : "",
  ).join("");
}
function setLoc() {
  navigator.geolocation
    ? navigator.geolocation.getCurrentPosition(
        (p) => {
          S.user.loc =
            p.coords.latitude.toFixed(5) + "," + p.coords.longitude.toFixed(5);
          T("تم تحديد موقعك");
          render();
        },
        () => T("اسمح للتطبيق بالوصول إلى موقعك وحاول مرة أخرى"),
      )
    : T("المتصفح لا يدعم تحديد الموقع");
}
function saveEdit() {
  const u = S.user,
    nm = g("nm"),
    ph = g("ph");
  if (!nm) return T("اكتب الاسم الشخصي");
  if (!/^7\d{8}$/.test(ph)) return T("الرقم من 9 أرقام ويبدأ بـ 7");
  if (S.accs.some((a) => a.k == u.k && a.ph == ph && a.aid != u.aid))
    return T("هذا الرقم مستخدم في حساب آخر");
  Object.assign(u, { nm, ph, em: g("em") });
  if (IMG) u.img = IMG;
  if (u.k == "s") {
    u.sn = g("sn") || u.sn;
    u.ds = g("ds");
    const s = sto(u.sid);
    s.n = u.sn;
    s.d = u.ds;
    if (IMG) s.img = IMG;
  }
  T("تم حفظ التعديلات");
  go("acct");
}
function doc(t, ico, sub, txt) {
  let n = 0;
  const h = txt
    .trim()
    .split("\n")
    .map((l) => {
      l = l.trim();
      if (!l) return "";
      if (l.startsWith("## ")) return `<h3 class="dh3">${E(l.slice(3))}</h3>`;
      if (l.startsWith("+ ")) {
        n++;
        const [a, ...b] = l.slice(2).split(":");
        return `<div class="stp"><span>${n}</span><div><b>${E(a)}</b><p>${E(b.join(":").trim())}</p></div></div>`;
      }
      if (l.startsWith("- ")) {
        const [a, ...b] = l.slice(2).split(":");
        return b.length
          ? `<div class="li"><b>${E(a)}:</b> ${E(b.join(":").trim())}</div>`
          : `<div class="li">${E(a)}</div>`;
      }
      return `<p class="tx">${E(l)}</p>`;
    })
    .join("");
  return `<div class="dhero"><span class="di">${ico}</span><h2>${t}</h2><p>${sub}</p></div><div class="card dc">${h}</div>`;
}
/* ===== صفحة شي ان ===== */
function shf() {
  const f = $("#shf");
  f.hidden = !f.hidden;
  if (!f.hidden) f.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
async function shs() {
  const n = g("hn"),
    d = g("hd"),
    i = g("hi");
  if (!n) return T("اكتب اسم المنتج");
  if (!i) return T("اكتب الآي دي أو كلمة تعريف المنتج");
  const txt = [
    "طلب منتج من شي ان",
    "اسم المنتج: " + n,
    d ? "وصف المنتج: " + d : "",
    "الآي دي / كلمة التعريف: " + i,
    S.role != "guest" ? "الاسم: " + S.user.nm + " - الرقم: " + S.user.ph : "",
  ]
    .filter(Boolean)
    .join("\n");
  try {
    if (IMG && navigator.canShare) {
      const b = await (await fetch(IMG)).blob(),
        f = new File([b], "shein-product.jpg", { type: b.type || "image/jpeg" });
      if (navigator.canShare({ files: [f] })) {
        await navigator.share({ files: [f], text: txt });
        return;
      }
    }
  } catch (e) {
    if (e && e.name == "AbortError") return;
  }
  window.open("https://wa.me/" + OWNER + "?text=" + encodeURIComponent(txt), "_blank", "noopener");
}

/* ===== صفحة البحث والفلترة ===== */
const OFF = (i) => /^سوق/.test(MK[i]?.n || ""); // السوق النظامي: اسمه يبدأ بـ «سوق» (وليس شارعا)
function sr() {
  const Q = SQ,
    q = Q.q.trim(),
    mn = +Q.mn || 0,
    mx = +Q.mx || Infinity,
    okS = (s) =>
      (Q.mk === "" || s.m == Q.mk) &&
      (Q.ty === "" || s.t == TY[Q.ty]) &&
      (!Q.of || OFF(s.m));
  let h;
  if (Q.m == "p") {
    const l = S.ps.filter(
      (p) =>
        !p.h &&
        (!q || (p.n + p.d + sto(p.s).n).includes(q)) &&
        okS(sto(p.s)) &&
        p.p >= mn &&
        p.p <= mx,
    );
    l.sort(
      Q.so == "hi"
        ? (a, b) => b.p - a.p
        : Q.so == "lo"
          ? (a, b) => a.p - b.p
          : (a, b) => (b.ts || b.id) - (a.ts || a.id),
    );
    h = l.length
      ? `<div class="grid">${l.map((p) => card(p)).join("")}</div>`
      : emp("لا توجد منتجات مطابقة.");
    h = `<p class="mu" style="margin:0 0 10px">${l.length} منتج</p>` + h;
  } else {
    const l = S.ss.filter((s) => (!q || (s.n + s.d + s.t).includes(q)) && okS(s));
    l.sort(Q.so == "old" ? (a, b) => (a.ts || a.id) - (b.ts || b.id) : (a, b) => (b.ts || b.id) - (a.ts || a.id));
    h = l.length ? l.map((s) => stc(s)).join("") : emp("لا توجد متاجر مطابقة.");
    h = `<p class="mu" style="margin:0 0 10px">${l.length} متجر</p>` + h;
  }
  $("#sres").innerHTML = h;
}
const sm = (m) => {
  SQ = { ...SQ, m, so: "new", mn: "", mx: "" };
  render();
};
const sof = () => {
  SQ.of = !SQ.of;
  render();
};
const srs = () => {
  SQ = { ...sq0(), m: SQ.m };
  render();
};
const wa = () =>
  `<a class="wa" target="_blank" rel="noopener" href="https://wa.me/${WA}">${ic("chat")}<span>راسل المالك عبر واتساب</span></a>`;
function out() {
  save();
  S.role = "guest";
  S.user = {};
  T("تم تسجيل الخروج");
  go("home");
}
const V = {
  home(a) {
    const q = S.q.trim();
    let l = S.ps.filter(
      (p) => !p.h && (!a || p.s == a) && (!q || (p.n + p.d + sto(p.s).n).includes(q)),
    );
    const hero =
      a || q
        ? ""
        : `<div class="hero"><b>كل أسواق المدينة في جيبك</b><span>تسوّق من متاجرك المفضلة ونوصّل لباب بيتك</span></div><div class="chips">${TY.map((m, i) => `<button onclick="go('bytype',${i})">${m}</button>`).join("")}</div>`;
    return (
      hero +
      `<h2>${a ? E(sto(a).n) : q ? "نتائج البحث" : "المنتجات"}</h2>` +
      (l.length
        ? `<div class="grid">${l.map((p) => card(p)).join("")}</div>`
        : emp("لا توجد منتجات مطابقة. جرّب كلمة أخرى."))
    );
  },
  markets() {
    return (
      "<h2>الأسواق</h2>" +
      DR.map(
        (d, di) =>
          `<h3 class="dg">${E(d)}</h3>` +
          MK.map((m, i) => ({ ...m, i }))
            .filter((m) => m.d == di)
            .map(
              (m) =>
                `<button class="mk" onclick="go('stores',${m.i})"><span class="mi">🏬</span><span>${E(m.n)}<small>${S.ss.filter((s) => s.m == m.i).length} متجر</small></span></button>`,
            )
            .join(""),
      ).join("")
    );
  },
  types() {
    return (
      '<h2>المنتجات</h2><p class="mu" style="margin:-6px 0 14px">اختر نوع المنتج</p><div class="grid">' +
      TY.map(
        (t, i) =>
          `<button class="tp" onclick="go('bytype',${i})"><span>${TE[i]}</span>${E(t)}</button>`,
      ).join("") +
      "</div>"
    );
  },
  bytype(i) {
    const l = S.ps.filter((p) => !p.h && sto(p.s).t == TY[i]);
    return (
      `<h2>${E(TY[i])}</h2>` +
      (l.length
        ? `<div class="grid">${l.map((p) => card(p)).join("")}</div>`
        : emp("لا توجد منتجات من هذا النوع بعد."))
    );
  },
  stores(a) {
    const l = S.ss.filter((s) => a == null || s.m == a);
    return (
      `<h2>${a == null ? "المتاجر" : MK[a].n}</h2>` +
      (l.length
        ? l.map((s) => stc(s)).join("")
        : emp("لا توجد متاجر في هذا السوق بعد."))
    );
  },
  product(id) {
    const p = S.ps.find((x) => x.id == id);
    if (!p || (p.h && !(S.role == "store" && p.s == S.user.sid))) return '<div class="em">هذا المنتج لم يعد متوفرا.</div>';
    const rs = S.rt[id] || {},
      vs = Object.values(rs),
      n = vs.length,
      avg = n ? vs.reduce((a, b) => a + b, 0) / n : 0,
      my = S.role == "guest" ? 0 : rs[uid()] || 0,
      nl = (S.lk[id] || []).length,
      cm = S.cm[id] || [];
    return `${pic(p, "big")}<div class="card" style="margin-top:12px"><h2 style="margin:0 0 6px">${E(p.n)}</h2><p class="mu">${E(p.d)}</p><p style="margin:8px 0"><a href="#" style="color:var(--pri);font-weight:700" onclick="go('home',${p.s});return false">${E(sto(p.s).n)}</a></p><p class="pr" style="font-size:22px">${fm(p.p)}</p><span class="tg" style="display:inline-block;margin-top:8px">${bt(S.sold[id] || 0)}</span>${p.qt === 0 ? '<span class="tg" style="display:inline-block;margin-top:10px;color:#e5594f">نفدت الكمية</span>' : `<button class="b s" onclick="add(${p.id})">إضافة للسلة</button>`}</div><div class="card"><div class="row"><b>تقييم المنتج</b><span class="pr" style="margin:0">★ ${n ? avg.toFixed(1) : "—"} <small class="mu">(${n} تقييم)</small></span></div><div class="stars">${[1, 2, 3, 4, 5].map((i) => `<button class="${my >= i ? "on" : ""}" onclick="rate(${id},${i})" aria-label="${i} من 5">★</button>`).join("")}</div><p class="mu" style="font-size:13px">${my ? "تقييمك: " + my + " من 5" : "اضغط على النجوم لتقييم المنتج"}</p><button class="b o" onclick="lk(${id})">${liked(id) ? "♥ تم الإعجاب" : "♡ إعجاب"} (${nl})</button></div><h3 class="dg">التعليقات (${cm.length})</h3><div class="card"><label>أضف تعليقك<textarea id="cmt" rows="3"></textarea></label><button class="b" onclick="addc(${id})">إرسال التعليق</button>${cm.length ? `<div style="margin-top:14px">${cm.map((c) => `<div class="li"><b>${E(c.n)}</b> <small class="mu">${E(c.d)}</small><br>${E(c.t)}${c.img ? `<img src="${E(c.img)}" alt="" style="display:block;max-width:100%;max-height:180px;border-radius:12px;margin-top:8px">` : ""}</div>`).join("")}</div>` : '<p class="mu" style="margin-top:12px">لا توجد تعليقات بعد. كن أول من يعلّق.</p>'}</div>`;
  },
  cart() {
    const tabs = `<div class="seg"><button class="op ${CT == "c" ? "on" : ""}" onclick="ct('c')">السلة</button><button class="op ${CT == "f" ? "on" : ""}" onclick="ct('f')">المفضلة لدي</button></div>`;
    if (CT == "f") {
      if (S.role == "guest")
        return `<h2>سلتي</h2>${tabs}<div class="em">سجّل الدخول لعرض المنتجات التي أعجبتك.</div>`;
      const l = S.ps.filter((p) => !p.h && liked(p.id));
      return (
        `<h2>سلتي</h2>${tabs}` +
        (l.length
          ? `<div class="grid">${l.map((p) => card(p)).join("")}</div>`
          : '<div class="em">لا توجد منتجات في المفضلة بعد. اضغط على القلب في أي منتج لإضافته.</div>') + wishAl(l)
      );
    }
    const it = S.cart
      .map((c) => ({ c, p: S.ps.find((x) => x.id == c.id) }))
      .filter((x) => x.p);
    if (!it.length)
      return CAT == "loading" && S.cart.length
        ? `<h2>سلتي</h2>${tabs}<div class="em">جاري التحميل...</div>`
        : `<h2>سلتي</h2>${tabs}<div class="em">سلتك فارغة. اختر منتجات من الصفحة الرئيسية.</div>`;
    let t = 0;
    return (
      `<h2>سلتي</h2>${tabs}` +
      it
        .map(({ c, p }) => {
          t += p.p * c.q;
          return `<div class="card row"><div><b>${E(p.n)}</b><div class="mu">${fm(p.p)}</div></div><div class="q"><button onclick="qty(${p.id},1)" aria-label="زيادة">+</button><b>${c.q}</b><button onclick="qty(${p.id},-1)" aria-label="إنقاص">−</button></div></div>`;
        })
        .join("") +
      `<div class="card"><div class="row"><span>المجموع</span><b>${fm(t)}</b></div><div class="row"><span>قيمة التوصيل</span><b>${fm(FEE)}</b></div><div class="row tot"><b>الإجمالي</b><b class="pr">${fm(t + FEE)}</b></div></div>${locBox()}<button class="b" onclick="checkout()">إتمام الطلب</button>`
    );
  },
  login() {
    return `<h2>تسجيل الدخول</h2><div class="ty"><button onclick="go('reg','s')">🏪 حساب محل تجاري</button><button onclick="go('reg','c')">🛒 حساب زبون</button><button onclick="go('reg','d')">🛵 حساب عامل توصيل</button></div>`;
  },
  reg(k) {
    const A = F("nm", "الاسم الشخصي"),
      B = F("ph", "الرقم", { t: "tel" }),
      C = F("em", "الإيميل", { n: 1, t: "email" }),
      W = F("pw", "كلمة المرور", { t: "password" });
    if (k == "d")
      return `<h2>حساب عامل توصيل</h2><div class="card">${A}${B}<button class="b" onclick="sub('d')">حفظ</button></div>`;
    const ttl = k == "s" ? "حساب محل تجاري" : "حساب زبون",
      tabs = `<div class="seg"><button class="op ${RM == "n" ? "on" : ""}" onclick="rm('n')">تسجيل بحساب جديد</button><button class="op ${RM == "o" ? "on" : ""}" onclick="rm('o')">لدي حساب من قبل</button></div>`;
    if (RM == "o")
      return `<h2>${ttl}</h2><div class="card">${tabs}${B}${W}<button class="b" onclick="signin('${k}')">دخول</button></div>`;
    if (k == "s")
      return `<h2>${ttl}</h2><div class="card">${tabs}${A}${F("sn", "اسم المحل التجاري")}${B}${C}${W}${F("ty", "نوع المتجر", { o: TY })}${F("drs", "موقع المحل في المديرية", { o: DR, c: 'onchange="fillMk()"' })}${F("mk", "السوق", { o: [] })}${IMGF}${F("ds", "وصف الموقع", { ta: 1 })}${LOCF}<button class="b" onclick="sub('s')">حفظ</button></div>`;
    return `<h2>${ttl}</h2><div class="card">${tabs}${A}${B}${C}${W}${F("drs", "موقعك في المديرية", { o: DR })}${F("st", "اسم الشارع")}${F("ds", "وصف العنوان", { ta: 1, n: 1 })}${LOCF}<button class="b" onclick="sub('c')">حفظ</button></div>`;
  },
  shein() {
    return `<h2>شي ان</h2><div class="card"><p class="mu" style="margin-bottom:4px">تصفّح منتجات شي ان، وعندما يعجبك منتج أرسل لنا تفاصيله ليصل إلى المالك.</p><button class="b s" onclick="sh()">تصفح موقع شي ان</button><button class="b o" onclick="shf()">إرسال المعلومات</button></div><div class="card" id="shf" hidden><h3 class="dg" style="margin:0 0 10px">تفاصيل المنتج</h3>${IMGF.replace("صورة", "صورة المنتج من شي ان")}${F("hd", "وصف المنتج", { ta: 1, n: 1 })}${F("hn", "اسم المنتج")}${F("hi", "الآي دي أو كلمة تعريف المنتج")}<button class="b" onclick="shs()">إرسال إلى المالك</button><p class="mu" style="font-size:12.5px;margin-top:8px">عند إرفاق صورة تظهر قائمة المشاركة: اختر واتساب ثم رقم المالك.</p></div>`;
  },
  search() {
    const Q = SQ,
      p = Q.m == "p",
      opt = (v, t, cur) =>
        `<option value="${v}" ${String(cur) === String(v) ? "selected" : ""}>${E(t)}</option>`,
      sorts = p
        ? [
            ["new", "الأحدث"],
            ["hi", "السعر: من الأعلى إلى الأرخص"],
            ["lo", "السعر: من الأرخص إلى الأعلى"],
          ]
        : [
            ["new", "الأحدث"],
            ["old", "الأقدم"],
          ],
      mks = DR.map(
        (d, di) =>
          `<optgroup label="${E(d)}">${MK.map((m, i) => ({ ...m, i }))
            .filter((m) => m.d == di)
            .map((m) => opt(m.i, m.n, Q.mk))
            .join("")}</optgroup>`,
      ).join("");
    return `<h2>البحث</h2><div class="card"><div class="seg"><button class="op ${p ? "on" : ""}" onclick="sm('p')">المنتجات</button><button class="op ${p ? "" : "on"}" onclick="sm('s')">المتاجر</button></div><label>كلمة البحث<input id="sq" type="search" value="${E(Q.q)}" placeholder="${p ? "ابحث عن منتج" : "ابحث عن متجر"}" oninput="SQ.q=this.value;sr()"></label><label>الترتيب<select onchange="SQ.so=this.value;sr()">${sorts.map((x) => opt(x[0], x[1], Q.so)).join("")}</select></label><label>السوق<select onchange="SQ.mk=this.value;sr()">${opt("", "كل الأسواق", Q.mk)}${mks}</select></label><label>${p ? "نوع المنتج" : "نوع المتجر"}<select onchange="SQ.ty=this.value;sr()">${opt("", "الكل", Q.ty)}${TY.map((t, i) => opt(i, t, Q.ty)).join("")}</select></label>${p ? `<div class="two"><label>السعر من<input type="number" inputmode="numeric" value="${E(Q.mn)}" oninput="SQ.mn=this.value;sr()"></label><label>السعر إلى<input type="number" inputmode="numeric" value="${E(Q.mx)}" oninput="SQ.mx=this.value;sr()"></label></div>` : ""}<button class="op w ${Q.of ? "on" : ""}" onclick="sof()">${Q.of ? "✓ " : ""}السوق النظامي فقط</button><button class="b o" onclick="srs()">مسح الفلاتر</button></div><div id="sres"></div>`;
  },
  editp(id) {
    const p = S.ps.find((x) => x.id == id);
    if (S.role != "store" || !p || p.s != S.user.sid)
      return '<div class="em">لا يمكنك تعديل هذا المنتج.</div>';
    return `<h2>تعديل المنتج</h2><div class="card">${IMGF.replace("صورة", "صورة المنتج")}${F("pnm", "اسم المنتج")}${F("pd", "الوصف", { n: 1 })}${F("pp", "السعر بالريال اليمني", { t: "number" })}<button class="b" onclick="saveProd(${p.id})">حفظ التعديلات</button><button class="b o" onclick="go('mine')">إلغاء</button></div>`;
  },
  deldone() {
    return `<h2>شكرا ${E(S.user.nm)}</h2><div class="card" style="line-height:1.9">الرجاء التواصل على هذا الرقم لإجراء التسجيل.<br><b dir="ltr">+${OWNER}</b><a class="b" target="_blank" rel="noopener" href="https://wa.me/${OWNER}">واتساب</a><a class="b o" href="tel:+${OWNER}">اتصال هاتفي</a></div>`;
  },
  mine() {
    if (S.role == "guest") return V.login();
    if (S.role != "store") return V.my("orders");
    const l = S.ps.filter((p) => p.s == S.user.sid);
    return `<h2>منتجاتي</h2>${l.length ? `<div class="grid">${l.map((p) => card(p, 1)).join("")}</div>` : '<div class="em">لم تضف منتجات بعد.</div>'}<h2 style="margin-top:18px">إضافة منتج</h2><div class="card">${F("pnm", "اسم المنتج")}${F("pd", "الوصف", { n: 1 })}${F("pp", "السعر بالريال اليمني", { t: "number" })}${IMGF}<button class="b" onclick="addp()">حفظ المنتج</button></div>`;
  },
  pay() {
    const t =
      S.cart.reduce((a, c) => a + (S.ps.find((x) => x.id == c.id)?.p || 0) * c.q, 0) +
      FEE;
    const G = [
      [
        "💳 المحافظ الإلكترونية",
        [
          "ون كاش (OneCash)",
          "جوالي (Jawwali)",
          "شامل موني (Shamel Money)",
          "فلوسك (Floosak)",
        ],
      ],
      ["🏦 حسابات بنكية", ["تطبيق الكريمي جوال / مالي", "تطبيق القطيبي شلن"]],
    ];
    return (
      `<h2>طريقة الدفع</h2><div class="card row"><span>الإجمالي مع التوصيل</span><b class="pr">${fm(t)}</b></div>${walletBox(t)}` +
      G.map(
        (g, i) =>
          `<div class="card"><button class="gb" onclick="pg(${i})"><span>${g[0]}</span><span>${PG === i ? "▲" : "▼"}</span></button>${PG === i ? `<div class="opts">${g[1].map((m) => `<button class="op ${PM == m ? "on" : ""}" onclick="pick('${m}')">${m}</button>`).join("")}</div>` : ""}</div>`,
      ).join("") +
      `<button class="b" onclick="order()">تأكيد الطلب</button>`
    );
  },
  done(m) {
    return `<div class="em"><div style="font-size:64px">✅</div><h2>تم استلام طلبك</h2><p>طريقة الدفع: ${E(m)}</p><p>سيتواصل معك فريقنا لتأكيد الدفع والتوصيل.</p><button class="b" onclick="go('home')">العودة للرئيسية</button></div>`;
  },
  acct() {
    if (S.role == "guest") return V.login();
    const u = S.user,
      st = u.k == "s";
    return `<h2>حسابي</h2><div class="card pf"><div class="av">${u.img ? `<img src="${u.img}" alt="">` : st ? "🏪" : "👤"}</div><b class="pn2">${E(u.nm)}</b><span class="tg">${st ? "محل تجاري" : "زبون"}</span></div>${acMenu()}<div class="card info">${st ? `<div><small>اسم المحل التجاري</small><b>${E(u.sn)}</b></div><div><small>وصف المحل</small><b>${E(u.ds || "—")}</b></div>` : `<div><small>العنوان</small><b>${E((u.dr || "") + " - " + (u.st || ""))}</b></div>`}<div><small>الرقم</small><b dir="ltr">${E(u.ph)}</b></div><div><small>الإيميل</small><b>${E(u.em || "—")}</b></div><div><small>نوع الحساب</small><b>${st ? "محل تجاري" : "زبون"}</b></div></div>${st ? "" : `<div class="card"><b>📍 موقعي</b><p class="mu" style="margin:6px 0">${u.loc ? `<a target="_blank" rel="noopener" style="color:var(--pri)" href="https://www.google.com/maps?q=${u.loc}">فتح موقعي في الخرائط</a>` : "لم يتم تحديد موقعك بعد"}</p><button class="b o" onclick="setLoc()">تحديد موقعي عبر خرائط جوجل</button></div>`}<button class="b" onclick="go('edit')">تعديل البيانات</button><button class="b o" onclick="out()">تسجيل خروج</button>`;
  },
  edit() {
    if (S.role == "guest") return V.login();
    const st = S.user.k == "s";
    return `<h2>تعديل البيانات</h2><div class="card">${IMGF.replace("صورة", "صورة الحساب")}${F("nm", "الاسم الشخصي")}${st ? F("sn", "اسم المحل التجاري") + F("ds", "وصف المحل", { ta: 1, n: 1 }) : ""}${F("ph", "الرقم", { t: "tel" })}${F("em", "الإيميل", { n: 1, t: "email" })}<button class="b" onclick="saveEdit()">حفظ التعديلات</button></div>`;
  },
  deliv() {
    return doc(
      "خدمات التوصيل في «أسواق»",
      "🛵",
      "سرعة وصول المنتجات وسلامتها أساس تجربة التسوق",
      `
نعلم أن سرعة وصول المنتجات وسلامتها هي أساس تجربة التسوق الناجحة. لذلك طورنا منظومة توصيل متكاملة تجمع بين السرعة والدقة والأمان لخدمة الزبائن والمحلات التجارية.
## كيف نعمل؟ رحلة الطلب من المحل إلى باب منزلك
+ إرسال الطلب: بمجرد تأكيد طلبك عبر الموقع، يصل إشعار فوري للمحل التجاري لتجهيز البضاعة.
+ التغليف والجهوزية: يقوم التاجر بفحص المنتجات وتغليفها جيدا لضمان وصولها بحالة ممتازة.
+ استلام الشحنة: يتجه مندوب التوصيل الأقرب للمحل لاستلام الطلب فور تجهيزه.
+ التوصيل الفوري: يتم توجيه المندوب عبر أفضل المسارات المباشرة إلى عنوانك المحدد بشكل قياسي وسريع.
## مميزات خدمة التوصيل لدينا
- توصيل فائق السرعة: نعتمد على شبكة من المناديب لتغطية المناطق والتوصيل في أسرع وقت ممكن فور إتمام الطلب.
- تتبع حالة الطلب: تتيح المنصة للزبون متابعة حالة الطلب خطوة بخطوة (قيد التجهيز، مع المندوب، تم التوصيل).
- حفظ جودة البضائع: نراعي طبيعة المنتجات أثناء النقل (مثل الأغذية والمستلزمات الحساسة) لضمان وصولها بنفس جودة التصنيع.
## رسوم ومواعيد التوصيل
- رسوم التوصيل: تحسب رسوم التوصيل تلقائيا أثناء إتمام الطلب.
- مواعيد العمل: تعمل خدمة التوصيل على مدار اليوم لتغطية كافة الطلبات اليومية وضمان عدم تأخير احتياجاتكم.
`,
    );
  },
  about() {
    return (
      doc(
        "من نحن",
        "🏪",
        "وجهتكم الأولى والأكثر موثوقية لتلبية احتياجاتكم",
        `
مرحبا بكم في «أسواق»، وجهتكم الأولى والأكثر موثوقية لتلبية جميع احتياجاتكم اليومية والتجارية بكل سهولة ويسر.
نحن لسنا مجرد منصة تسوق عادية، بل صمم موقعنا ليكون حلقة الوصل الذكية والمباشرة بين المستهلكين وأصحاب المحلات التجارية، لنضمن لكم تجربة تسوق استثنائية متكاملة.
## رؤيتنا وهدفنا
نسعى لأن نكون المنصة الرائدة والأقرب لكل منزل ومحل تجاري، من خلال توفير منصة سهلة الاستخدام تضم تشكيلة واسعة وشاملة من السلع والبضائع والمستلزمات التجارية تحت سقف إلكتروني واحد.
## ماذا نقدم للزبائن والعملاء؟
- تنوع لا محدود: نوفر جميع المنتجات والبضائع الاستهلاكية والتجارية التي تبحثون عنها.
- توصيل سريع حتى باب المنزل: ندرك أن الوقت مهم، لذلك خصصنا شبكة توصيل فائقة السرعة تضمن وصول طلبياتكم في أسرع وقت وبأفضل حالة.
- خدمة عملاء استثنائية: راحتكم ورضاكم غايتنا الأولى، ونعمل دائما على تقديم الدعم وتلبية استفساراتكم بكل احترافية.
## دعمنا للمحلات التجارية والتاجر الصغير
لا يقتصر دورنا على خدمة المستهلك فحسب، بل نؤمن بدعم التجارة المحلية وتطويرها. من خلال «أسواق»، نتيح الفرصة للمحلات التجارية والمتاجر لإنشاء متاجر إلكترونية خاصة بهم وعرض منتجاتهم أمام قاعدة واسعة من الزبائن، مما يسهل عليهم توسيع نطاق أعمالهم ومضاعفة مبيعاتهم بكل سهولة.
«أسواق».. كل ما تحتاجه أنت ومحلك التجاري.. أصبح بين يديك وفي أسرع وقت!
`,
      ) + wa()
    );
  },
  priv() {
    return (
      doc(
        "سياسة الخصوصية",
        "🔒",
        "خصوصيتكم أولوية قصوى بالنسبة لنا",
        `
في «أسواق»، نعتبر خصوصية مستخدمينا (زبائن وأصحاب محلات تجارية) أولوية قصوى. توضح هذه السياسة كيفية جمع معلوماتكم الشخصية والمالية واستخدامها وحمايتها.
## 1. جمع المعلومات
نقوم بجمع البيانات الضرورية فقط لتقديم خدمة ممتازة وتوصيل الطلبات بدقة، وتتضمن:
- بيانات الحساب: الاسم، رقم الهاتف، والبريد الإلكتروني.
- بيانات التوصيل: العنوان الدقيق وموقع التوصيل لتسهيل وصول الشحنات في أسرع وقت.
- بيانات المحلات التجارية: معلومات المتجر، المنتجات المعروضة، وبيانات التواصل الخاصة بالتجار.
## 2. تشفير البيانات وحمايتها
- سرية تامة: جميع بياناتكم الشخصية ومعاملاتكم تعامل بسرية مطلقة ولا يتم بيعها أو مشاركتها مع أي طرف ثالث لأغراض تسويقية.
- تشفير متقدم: نستخدم تقنيات تشفير حديثة وبروتوكولات أمان صارمة لحماية بياناتكم من أي وصول غير مصرح به أو تسريب.
## 3. استخدام المعلومات
نستخدم المعلومات التي نجمعها للأغراض التالية فقط:
- معالجة الطلبات وتنفيذ عمليات التوصيل للزبائن.
- إدارة المتاجر الإلكترونية للمحلات التجارية وتسهيل عرض منتجاتها.
- تحسين جودة خدماتنا وتقديم دعم فني مخصص للعملاء.
- إرسال التحديثات الخاصة بالطلبات أو العروض (في حال موافقتكم).
## 4. حقوقك في التحكم ببياناتك
يحق لك في أي وقت تعديل بياناتك الشخصية المسجلة لدينا أو تحديثها أو طلب حذفها من خلال التواصل مع فريق الدعم الفني.
## 5. التحديثات على سياسة الخصوصية
قد نقوم بتحديث هذه السياسة من وقت لآخر لملائمة أي تطورات جديدة في الخدمات أو القوانين، وندعوكم لمراجعة هذه الصفحة بشكل دوري.
لأي استفسارات حول سياسة الخصوصية أو كيفية التعامل مع بياناتك، يمكنك التواصل معنا عبر بريد الدعم الخاص بموقع «أسواق».
`,
      ) + wa()
    );
  },
  legal() {
    return (
      doc(
        "المعلومات القانونية",
        "⚖️",
        "وثيقة اتفاق تنظم استخدامكم للمنصة",
        `
مرحبا بكم في موقع «أسواق». تعتبر هذه الصفحة وثيقة اتفاق قانونية تنظم استخدامكم للمنصة وجميع الخدمات المتاحة من خلالها. باستخدامكم للموقع أو التسجيل فيه، فإنكم توافقون على الالتزام الكامل بهذه الشروط والأنظمة.
## 1. طبيعة عمل المنصة
- موقع «أسواق» منصة إلكترونية تجمع بين المستهلكين (الزبائن) والتجار (أصحاب المحلات التجارية).
- تقتصر مسؤولية المنصة على توفير البنية التحتية الإلكترونية للمتاجر، وتسهيل استعراض البضائع وتوصيلها، وإدارة التواصل بين الطرفين.
## 2. شروط الاستخدام وحساب المستخدم
- دقة البيانات: يلتزم المستخدم (زبونا كان أم تاجرا) بتقديم معلومات صحيحة ودقيقة (الاسم، رقم الهاتف، العنوان، بيانات المتجر) ويتحمل كامل المسؤولية عن أي أخطاء ناتجة عن بيانات غير دقيقة.
- أمان الحساب: يتحمل المستخدم مسؤولية الحفاظ على سرية كلمة المرور وبيانات حسابه، وهو مسؤول عن جميع الأنشطة التي تتم من خلاله.
## 3. الطلبات والأسعار والتوصيل
- الأسعار: تعرض جميع الأسعار بالموقع شاملة تفاصيل المنتج، وتستثنى منها رسوم التوصيل إلا إذا كتب خلاف ذلك.
- التوصيل: نلتزم بتوصيل الطلبات في أسرع وقت ممكن وفق المواعيد المحددة، وقد تطرأ تأخيرات خارجة عن الإرادة (مثل الأحوال الجوية أو الظروف القاهرة) وسيتم إبلاغ العملاء فورا.
- إلغاء الطلب: يحق للزبون إلغاء الطلب قبل بدء إجراءات الشحن والتوصيل وفق السياسة المعتمدة.
## 4. الملكية الفكرية
- جميع حقوق الملكية الفكرية الخاصة بموقع «أسواق» (من نصوص وشعارات وتصميم واجهات وبرمجيات) ملك حصري للموقع ومحمية بموجب قوانين الملكية الفكرية.
- يمنع منعا باتا نسخ أو إعادة إنتاج أي جزء من المنصة دون إذن كتابي مسبق.
## 5. تحديد المسؤولية
- يسعى موقع «أسواق» لضمان عمل الخدمة دون انقطاع، لكنه لا يضمن عدم حدوث أعطال تقنية مفاجئة خارجة عن السيطرة، ويتم معالجتها فورا.
- المنصة غير مسؤولة عن الأضرار المباشرة أو غير المباشرة الناتجة عن سوء استخدام المنتجات بعد استلامها بحالة سليمة.
## 6. التعديلات القانونية
نحتفظ بحق تعديل هذه الشروط والأحكام في أي وقت، وتصبح التعديلات نافذة فور نشرها على الموقع. ويعد استمرارك في استخدام الموقع موافقة ضمنية عليها.
لأي استفسارات قانونية أو بلاغات تتعلق بالشروط والأحكام، يرجى التواصل مع القسم القانوني لموقع «أسواق» عبر وسائل التواصل الرسمية المتاحة.
`,
      ) + wa()
    );
  },
  set() {
    return `<h2>الإعدادات</h2><div class="card"><h3 class="dg" style="margin:0 0 8px">المظهر</h3><div class="themes">${THEMES.map((t) => `<button class="thm ${TH == t[0] ? "on" : ""}" data-t="${t[0]}" onclick="setTheme('${t[0]}')"><span class="sw"></span><b>${t[1]}</b></button>`).join("")}</div><button class="b o" style="margin-top:18px" onclick="if(confirm('سيتم مسح بيانات التطبيق من هذا الجهاز. متأكد؟')){localStorage.removeItem('aswaq2');location.reload()}">مسح بيانات التطبيق</button></div>`;
  },
};
/* =====================================================================
   إضافات: لوحة تحكم المحل + صفحة حساب الزبون
   البيانات هنا تُحفظ في S (و localStorage) بنفس أسلوب الموقع الحالي،
   وهيكلها (orders / rets / tk / al / nt) جاهز للنقل إلى جداول Supabase.
   ===================================================================== */
["orders", "rets", "tk", "nt"].forEach((k) => (S[k] = S[k] || []));
S.al = S.al || {};
const SUP = "967776319927"; // رقم الدعم الفني
const DAY = 864e5;
const OST = { new: "جديد", prep: "قيد التجهيز", ship: "مع المندوب", done: "تم التوصيل", cancel: "ملغي" };
const OFL = ["new", "prep", "ship", "done"];
const RSN = ["مقاس خاطئ", "عيب تصنيع", "المنتج مختلف عن الوصف", "وصل تالفا", "أخرى"];
const RL = { pending: "قيد المراجعة", accepted: "تم القبول", rejected: "مرفوض", refunded: "تم استرداد المبلغ" };
const TKT = ["تأخر في التوصيل", "منتج ناقص أو خاطئ", "منتج تالف", "مشكلة في الدفع", "مشكلة في الحساب", "أخرى"];
const fd = (t) => new Date(t).toLocaleDateString("en-GB");
const wlt = () => (+S.user.wb || 0) + (+S.user.pt || 0) * 10; // الرصيد + (النقطة = 10 ر.ي)
let UW = false, // استخدام المحفظة في الدفع
  RS = 0, // نجوم نموذج التقييم
  DT = "rep"; // تبويب لوحة المحل
const trk = (o) =>
  o.st == "cancel"
    ? ""
    : `<div class="trk">${OFL.map((s, i) => `<span class="${OFL.indexOf(o.st) >= i ? "on" : ""}">${OST[s]}</span>`).join("")}</div>`;
const locBox = () =>
  S.role == "guest"
    ? ""
    : S.user.loc
      ? `<div class="card row"><span>📍 تم تحديد موقعك</span><a target="_blank" rel="noopener" style="color:var(--pri)" href="https://www.google.com/maps?q=${E(S.user.loc)}">عرض</a></div>`
      : `<div class="card alb"><div>📍 يجب تحديد موقعك قبل إتمام الطلب لنوصّل إليك</div><button class="b s" onclick="setLoc()">تحديد موقعي الآن</button></div>`;
const uw = () => {
  UW = !UW;
  render();
};
const walletBox = (t) =>
  wlt() > 0
    ? `<div class="card"><button class="op ${UW ? "on" : ""}" onclick="uw()">استخدام الرصيد والنقاط (${fm(wlt())})</button>${UW ? `<div class="row" style="margin-top:10px"><span>المطلوب دفعه بعد الخصم</span><b class="pr">${fm(t - Math.min(t - FEE, wlt()))}</b></div>` : ""}</div>`
    : "";
const wishAl = (l) =>
  l.length
    ? `<h3 class="dg">🔔 تنبيهات المفضلة</h3>` +
      l
        .map((p) => {
          const on = (S.al[p.id] || {})[uid()];
          return `<div class="card row"><span><b>${E(p.n)}</b><small class="mu" style="display:block">${p.qt === 0 ? "نفد من المخزون" : fm(p.p)}</small></span><button class="op ${on ? "on" : ""}" style="width:auto;padding:8px 14px" onclick="al(${p.id})">${on ? "🔔 مفعّل" : "🔕 نبّهني"}</button></div>`;
        })
        .join("") +
      `<p class="mu" style="font-size:13px">تصلك إشعارات في حسابك عند عودة المنتج للمخزون أو انخفاض سعره.</p>`
    : "";
function al(id) {
  const p = S.ps.find((x) => x.id == id),
    a = (S.al[id] = S.al[id] || {}),
    u = uid();
  if (a[u]) {
    delete a[u];
    T("تم إيقاف التنبيه");
  } else {
    a[u] = { p0: p.p, o0: p.qt === 0 };
    T("سنبلغك عند التوفر أو انخفاض السعر");
  }
  render();
}
function chkAl() {
  Object.keys(S.al).forEach((id) => {
    const p = S.ps.find((x) => x.id == id);
    if (!p || p.h) return;
    Object.entries(S.al[id]).forEach(([u, e]) => {
      if (e.o0 && p.qt !== 0) {
        S.nt.push({ u, t: "عاد «" + p.n + "» إلى المخزون", d: Date.now() });
        e.o0 = false;
        if (u == uid()) T("🔔 عاد «" + p.n + "» إلى المخزون");
      }
      if (p.qt === 0) e.o0 = true;
      if (p.p < e.p0) {
        S.nt.push({ u, t: "انخفض سعر «" + p.n + "» إلى " + fm(p.p), d: Date.now() });
        if (u == uid()) T("🔔 انخفض سعر «" + p.n + "»");
      }
      e.p0 = p.p;
    });
  });
}
function nread() {
  S.nt.forEach((x) => {
    if (x.u == uid()) x.s = 1;
  });
  render();
}
const mi2 = (i, t, a) => `<button class="mi2" onclick="${a}"><span>${i}</span><b>${t}</b><i>‹</i></button>`;
const acMenu = () => {
  const k = S.user.k;
  if (k == "s") return mi2("📊", "لوحة التحكم والتقارير", "go('dash')") + mi2("🛍️", "إضافة المنتجات", "go('mine')");
  if (k != "c") return "";
  const n = S.nt.filter((x) => x.u == uid() && !x.s);
  return (
    (n.length ? `<div class="card alb">${n.map((x) => `<div>🔔 ${E(x.t)}</div>`).join("")}<button class="b o" onclick="nread()">حسنا</button></div>` : "") +
    mi2("📦", "طلباتي وتتبع الشحن", "go('my','orders')") +
    mi2("⭐", "تقييماتي", "go('my','myrev')") +
    mi2("↩️", "الإرجاع والاسترداد", "go('my','returns')") +
    mi2("❤️", "المفضلة والتنبيهات", "go('cart');ct('f')") +
    mi2("📍", "دفتر العناوين", "go('my','addr')") +
    mi2("💰", "المحفظة ونقاط الولاء", "go('my','wallet')") +
    mi2("🎧", "الدعم الفني", "go('my','support')")
  );
};
/* ===== الطلب: يُسجَّل كسجل كامل ويخصم المخزون ويضيف النقاط ===== */
function order() {
  if (!S.user.loc) return T("حدّد موقعك أولا لإتمام الطلب");
  if (!PM) return T("اختر طريقة الدفع");
  const its = [];
  for (const c of S.cart) {
    const p = S.ps.find((x) => x.id == c.id);
    if (!p) continue;
    if (p.h || (p.qt != null && p.qt < c.q)) return T("الكمية المطلوبة من «" + p.n + "» غير متوفرة");
    its.push({ id: p.id, n: p.n, p: p.p, q: c.q, s: p.s });
  }
  if (!its.length) return T("السلة فارغة");
  const sub = its.reduce((a, i) => a + i.p * i.q, 0);
  let disc = 0;
  if (UW) {
    disc = Math.min(sub, wlt());
    const fromW = Math.min(disc, +S.user.wb || 0);
    S.user.wb = (+S.user.wb || 0) - fromW;
    S.user.pt = Math.max(0, (+S.user.pt || 0) - Math.ceil((disc - fromW) / 10));
  }
  const total = sub + FEE - disc;
  S.orders.push({
    id: Date.now(),
    no: "A" + (1001 + S.orders.length),
    aid: S.user.aid,
    cn: S.user.nm,
    ph: S.user.ph,
    ts: Date.now(),
    items: its,
    fee: FEE,
    disc,
    total,
    pay: PM,
    st: "new",
    ad: S.user.dr ? S.user.dr + " - " + (S.user.st || "") : "",
  });
  its.forEach((i) => {
    S.sold[i.id] = (S.sold[i.id] || 0) + 1;
    const p = S.ps.find((x) => x.id == i.id);
    if (p.qt != null) p.qt -= i.q;
  });
  S.user.pt = (+S.user.pt || 0) + Math.floor(total / 1000);
  S.cart = [];
  UW = false;
  const m = PM;
  PM = "";
  PG = "";
  go("done", m);
}
function ocancel(id) {
  const o = S.orders.find((x) => x.id == id);
  if (!o || !["new", "prep"].includes(o.st)) return T("لا يمكن إلغاء هذا الطلب الآن");
  if (!confirm("هل تريد إلغاء هذا الطلب؟ سيعود المبلغ إلى محفظة الزبون.")) return;
  o.st = "cancel";
  o.items.forEach((i) => {
    const p = S.ps.find((x) => x.id == i.id);
    if (p && p.qt != null) p.qt += i.q;
  });
  const pts = Math.floor(o.total / 1000);
  [S.accs.find((x) => x.aid == o.aid), S.user.aid == o.aid ? S.user : null].forEach((a) => {
    if (a) {
      a.wb = (+a.wb || 0) + o.total;
      a.pt = Math.max(0, (+a.pt || 0) - pts);
    }
  });
  T("تم إلغاء الطلب وإعادة المبلغ للمحفظة");
  render();
}
function ost(id) {
  const o = S.orders.find((x) => x.id == id),
    n = o && { new: "prep", prep: "ship", ship: "done" }[o.st];
  if (!n) return;
  o.st = n;
  T("تم تحديث حالة الطلب: " + OST[n]);
  render();
}
function reord(id) {
  const o = S.orders.find((x) => x.id == id);
  if (!o) return;
  let n = 0;
  o.items.forEach((i) => {
    const p = S.ps.find((x) => x.id == i.id);
    if (!p || p.h || p.qt === 0) return;
    const c = S.cart.find((x) => x.id == i.id);
    c ? (c.q += i.q) : S.cart.push({ id: i.id, q: i.q });
    n++;
  });
  if (!n) return T("هذه المنتجات لم تعد متوفرة");
  T("أضيفت المنتجات إلى السلة");
  go("cart");
}
function inv(id) {
  const o = S.orders.find((x) => x.id == id);
  if (!o) return;
  const w = window.open("", "_blank");
  if (!w) return T("اسمح بالنوافذ المنبثقة لعرض الفاتورة");
  w.document.write(
    `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>فاتورة ${E(o.no)}</title><style>body{font-family:Tahoma,Arial,sans-serif;padding:24px;color:#12263f}h1{margin:0 0 6px}table{width:100%;border-collapse:collapse;margin:16px 0}th,td{border:1px solid #ccc;padding:8px;text-align:start}th{background:#f3efe6}.t{line-height:2}button{padding:12px 20px;margin-top:16px;font-size:16px}@media print{button{display:none}}</style></head><body><h1>أسواق</h1><p>فاتورة رقم ${E(o.no)}<br>التاريخ: ${fd(o.ts)}<br>العميل: ${E(o.cn)} - ${E(o.ph)}<br>طريقة الدفع: ${E(o.pay)}</p><table><tr><th>المنتج</th><th>السعر</th><th>الكمية</th><th>الإجمالي</th></tr>${o.items.map((i) => `<tr><td>${E(i.n)}</td><td>${fm(i.p)}</td><td>${i.q}</td><td>${fm(i.p * i.q)}</td></tr>`).join("")}</table><div class="t">التوصيل: ${fm(o.fee)}<br>${o.disc ? "خصم المحفظة: " + fm(o.disc) + "<br>" : ""}<b>الإجمالي: ${fm(o.total)}</b></div><button onclick="print()">طباعة / حفظ PDF</button></body></html>`,
  );
  w.document.close();
}
/* ===== التقييمات ===== */
function rvs(n) {
  RS = n;
  document.querySelectorAll("#rst button").forEach((b, i) => b.classList.toggle("on", i < n));
}
function rvsave(id) {
  if (!RS) return T("اختر عدد النجوم");
  const u = uid(),
    t = g("rvt");
  (S.rt[id] = S.rt[id] || {})[u] = RS;
  const a = (S.cm[id] = S.cm[id] || []),
    c = a.find((x) => x.u == u);
  if (c) {
    c.t = t;
    if (IMG) c.img = IMG;
  } else if (t || IMG) a.push({ n: S.user.nm, u, t, img: IMG, d: fd(Date.now()) });
  T("تم حفظ تقييمك");
  go("my", "myrev");
}
function myHook() {
  const [k, x] = String(S.arg || "").split(":");
  if (k == "revf") {
    const c = (S.cm[x] || []).find((v) => v.u == uid());
    if (c) {
      $("#rvt").value = c.t || "";
      if (c.img) {
        $("#pv").src = c.img;
        $("#pv").hidden = false;
      }
    }
  }
}
/* ===== الإرجاع ===== */
function retsub() {
  const v = g("rpi");
  if (!v) return T("اختر المنتج");
  const [oid, pid] = v.split("_"),
    o = S.orders.find((x) => x.id == oid),
    i = o && o.items.find((x) => x.id == pid);
  if (!i) return;
  S.rets.push({ id: Date.now(), u: S.user.aid, oid: o.id, no: o.no, pid: i.id, n: i.n, s: i.s, amt: i.p * i.q, rs: RSN[+g("rrs")], nt: g("rnt"), d: fd(Date.now()), st: "pending" });
  T("تم إرسال طلب الإرجاع");
  go("my", "returns");
}
function retact(id, ok) {
  const r = S.rets.find((x) => x.id == id);
  if (!r || r.st != "pending") return;
  r.st = ok ? "refunded" : "rejected";
  if (ok) {
    const a = S.accs.find((x) => x.aid == r.u);
    if (a) a.wb = (+a.wb || 0) + r.amt;
  }
  T(ok ? "تم قبول الإرجاع وإضافة المبلغ لمحفظة الزبون" : "تم رفض الطلب");
  render();
}
/* ===== العناوين ===== */
function adm(id, q) {
  const a = (S.user.ads || []).find((x) => x.id == id);
  if (!a) return;
  S.user.da = id;
  Object.assign(S.user, { dr: a.dr, st: a.st, loc: a.loc });
  if (!q) {
    T("تم تعيين العنوان الأساسي");
    render();
  }
}
function adsave() {
  const st = g("al_st");
  if (!st) return T("اكتب اسم الشارع");
  const a = { id: Date.now(), l: g("al_l"), dr: DR[+g("al_dr")], st, ds: g("al_ds"), loc: LOC };
  (S.user.ads = S.user.ads || []).push(a);
  if (!S.user.da) adm(a.id, 1);
  T("تم حفظ العنوان");
  go("my", "addr");
}
function addel(id) {
  if (!confirm("حذف هذا العنوان؟")) return;
  S.user.ads = (S.user.ads || []).filter((x) => x.id != id);
  if (S.user.da == id) S.user.da = null;
  render();
}
/* ===== الدعم الفني ===== */
async function shareWA(txt) {
  try {
    if (IMG && navigator.canShare) {
      const b = await (await fetch(IMG)).blob(),
        f = new File([b], "problem.jpg", { type: b.type || "image/jpeg" });
      if (navigator.canShare({ files: [f] })) {
        await navigator.share({ files: [f], text: txt });
        return;
      }
    }
  } catch (e) {
    if (e && e.name == "AbortError") return;
  }
  window.open("https://wa.me/" + SUP + "?text=" + encodeURIComponent(txt), "_blank", "noopener");
}
function tksend() {
  const m = g("tkm");
  if (!m) return T("اكتب سبب المراسلة");
  const o = S.orders.find((x) => x.id == g("tko")),
    ty = TKT[+g("tkt")];
  S.tk.push({ id: Date.now(), u: S.user.aid, no: o ? o.no : "", ty, m, img: IMG, d: fd(Date.now()), st: "open" });
  const txt = ["شكوى من الزبون", "الاسم: " + S.user.nm + " - الرقم: " + S.user.ph, o ? "رقم الطلب: " + o.no : "", "نوع المشكلة: " + ty, "التفاصيل: " + m].filter(Boolean).join("\n");
  save();
  T("تم تسجيل شكواك، أكمل الإرسال للدعم");
  shareWA(txt);
  go("my", "support");
}
/* ===== المحل: المخزون والظهور ===== */
function qtadd(id, d) {
  const p = S.ps.find((x) => x.id == id);
  if (!p || p.s != S.user.sid) return;
  p.qt = Math.max(0, (p.qt ?? 0) + d);
  render();
}
function qtset(id, v) {
  const p = S.ps.find((x) => x.id == id);
  if (!p || p.s != S.user.sid) return;
  p.qt = v === "" ? null : Math.max(0, Math.floor(+v) || 0);
  T("تم تحديث الكمية");
  render();
}
function tgl(id) {
  const p = S.ps.find((x) => x.id == id);
  if (!p || p.s != S.user.sid) return;
  p.h = !p.h;
  T(p.h ? "تم إخفاء المنتج عن الزبائن" : "المنتج ظاهر الآن للزبائن");
  render();
}
const dtab = (t) => {
  DT = t;
  render();
};
const MY = {
  orders() {
    const l = S.orders.filter((o) => o.aid == S.user.aid).sort((a, b) => b.ts - a.ts);
    if (!l.length) return '<h2>طلباتي</h2><div class="em">لا توجد طلبات سابقة.</div>';
    return (
      "<h2>طلباتي</h2>" +
      l
        .map(
          (o) =>
            `<div class="card"><div class="row"><b>طلب ${E(o.no)}</b><span class="tg">${OST[o.st]}</span></div><div class="mu" style="margin:6px 0">${fd(o.ts)} · الإجمالي ${fm(o.total)}</div>${trk(o)}<div style="margin:8px 0">${o.items.map((i) => `<div class="li">${E(i.n)} × ${i.q}</div>`).join("")}</div><div class="row"><button class="b o" onclick="reord(${o.id})">إعادة الطلب</button><button class="b o" onclick="inv(${o.id})">الفاتورة PDF</button></div>${["new", "prep"].includes(o.st) ? `<button class="b o" onclick="ocancel(${o.id})">إلغاء الطلب</button>` : ""}</div>`,
        )
        .join("")
    );
  },
  myrev() {
    const u = uid(),
      rev = (id) => ({ r: (S.rt[id] || {})[u] || 0, c: (S.cm[id] || []).find((c) => c.u == u) }),
      bought = [...new Set(S.orders.filter((o) => o.aid == S.user.aid && o.st == "done").flatMap((o) => o.items.map((i) => i.id)))],
      todo = bought.map((id) => S.ps.find((p) => p.id == id)).filter((p) => p && !rev(p.id).r && !rev(p.id).c),
      all = S.ps.filter((p) => rev(p.id).r || rev(p.id).c);
    return (
      "<h2>تقييماتي</h2>" +
      (todo.length
        ? '<h3 class="dg">بانتظار تقييمك</h3>' +
          todo.map((p) => `<div class="card row"><b>${E(p.n)}</b><button class="b s" style="width:auto;margin:0;padding:8px 18px" onclick="go('my','revf:${p.id}')">قيّم</button></div>`).join("")
        : "") +
      '<h3 class="dg">سجل تقييماتي</h3>' +
      (all.length
        ? all
            .map((p) => {
              const v = rev(p.id);
              return `<div class="card"><div class="row"><b>${E(p.n)}</b><span class="pr" style="margin:0">${"★".repeat(v.r)}${"☆".repeat(5 - v.r)}</span></div>${v.c ? `<p style="margin:8px 0">${E(v.c.t)}</p>${v.c.img ? `<img src="${E(v.c.img)}" alt="" style="max-width:100%;max-height:180px;border-radius:12px">` : ""}` : ""}<button class="b o" onclick="go('my','revf:${p.id}')">تعديل</button></div>`;
            })
            .join("")
        : '<div class="em" style="padding:24px">لم تكتب أي تقييم بعد. التقييم متاح للطلبات التي تم توصيلها.</div>')
    );
  },
  revf(id) {
    const p = S.ps.find((x) => x.id == id);
    if (!p) return '<div class="em">المنتج غير متوفر.</div>';
    RS = (S.rt[id] || {})[uid()] || 0;
    return `<h2>تقييم ${E(p.n)}</h2><div class="card"><div class="stars" id="rst">${[1, 2, 3, 4, 5].map((i) => `<button class="${RS >= i ? "on" : ""}" onclick="rvs(${i})" aria-label="${i} من 5">★</button>`).join("")}</div><label>تعليقك<textarea id="rvt" rows="3"></textarea></label>${IMGF.replace("صورة", "صورة المنتج على الواقع")}<button class="b" onclick="rvsave(${id})">حفظ التقييم</button></div>`;
  },
  returns() {
    const ops = S.orders
        .filter((o) => o.aid == S.user.aid && o.st == "done")
        .flatMap((o) => o.items.filter((i) => !S.rets.some((r) => r.oid == o.id && r.pid == i.id)).map((i) => `<option value="${o.id}_${i.id}">${E(i.n)} (طلب ${E(o.no)})</option>`)),
      l = S.rets.filter((r) => r.u == S.user.aid).sort((a, b) => b.id - a.id);
    return (
      "<h2>الإرجاع والاسترداد</h2>" +
      (ops.length
        ? `<div class="card"><label>المنتج المراد إرجاعه<select id="rpi">${ops.join("")}</select></label><label>سبب الإرجاع<select id="rrs">${RSN.map((x, i) => `<option value="${i}">${E(x)}</option>`).join("")}</select></label><label>تفاصيل إضافية <i>(اختياري)</i><textarea id="rnt" rows="2"></textarea></label><button class="b" onclick="retsub()">إرسال طلب الإرجاع</button></div>`
        : '<div class="card mu">يمكنك طلب إرجاع منتج بعد استلام الطلب (حالة «تم التوصيل»).</div>') +
      (l.length
        ? '<h3 class="dg">متابعة طلباتي</h3>' +
          l.map((r) => `<div class="card"><div class="row"><b>${E(r.n)}</b><span class="tg">${RL[r.st]}</span></div><p class="mu" style="margin:6px 0">طلب ${E(r.no)} · ${E(r.rs)} · ${r.d}</p>${r.st == "refunded" ? `<p>تمت إضافة ${fm(r.amt)} إلى محفظتك</p>` : ""}</div>`).join("")
        : "")
    );
  },
  addr() {
    const l = S.user.ads || [];
    return (
      "<h2>دفتر العناوين</h2>" +
      (l.length
        ? l
            .map(
              (a) =>
                `<div class="card"><div class="row"><b>${E(a.l)}</b>${a.id == S.user.da ? '<span class="tg">الأساسي</span>' : ""}</div><p class="mu" style="margin:6px 0">${E(a.dr)} - ${E(a.st)}${a.ds ? " - " + E(a.ds) : ""}</p>${a.loc ? `<a target="_blank" rel="noopener" style="color:var(--pri)" href="https://www.google.com/maps?q=${E(a.loc)}">فتح الموقع في الخرائط</a>` : ""}<div class="row">${a.id == S.user.da ? "" : `<button class="b o" onclick="adm(${a.id})">جعله الأساسي</button>`}<button class="b o" onclick="addel(${a.id})">حذف</button></div></div>`,
            )
            .join("")
        : '<div class="em" style="padding:24px">لا توجد عناوين محفوظة.</div>') +
      `<h3 class="dg">إضافة عنوان</h3><div class="card"><label>التسمية<select id="al_l"><option>البيت</option><option>العمل</option><option>عنوان صديق</option></select></label>${F("al_dr", "المديرية", { o: DR })}${F("al_st", "اسم الشارع")}${F("al_ds", "وصف العنوان", { ta: 1, n: 1 })}${LOCF}<button class="b" onclick="adsave()">حفظ العنوان</button></div>`
    );
  },
  wallet() {
    const wb = +S.user.wb || 0,
      pt = +S.user.pt || 0;
    return `<h2>المحفظة ونقاط الولاء</h2><div class="kpis"><div class="kp"><small>الرصيد المسترجع</small><b>${fm(wb)}</b></div><div class="kp"><small>نقاط الولاء</small><b>${pt}</b></div></div><div class="card mu" style="line-height:1.9">كل 1,000 ر.ي من مشترياتك = نقطة واحدة، وكل نقطة تخصم 10 ر.ي من طلبك القادم. يُضاف الرصيد المسترجع عند إلغاء طلب أو قبول طلب إرجاع، ويمكنك استخدامه من صفحة الدفع.</div>`;
  },
  support() {
    const os = S.orders.filter((o) => o.aid == S.user.aid),
      tk = S.tk.filter((t) => t.u == S.user.aid).sort((a, b) => b.id - a.id);
    return (
      `<h2>الدعم الفني</h2><div class="sup"><a class="b s" target="_blank" rel="noopener" href="https://wa.me/${SUP}">${ic("wa")}<span>واتساب</span></a><a class="b o" href="tel:+${SUP}">${ic("phone")}<span>اتصال</span></a></div><h3 class="dg">فتح شكوى</h3><div class="card"><label>الطلب المتعلق بالشكوى <i>(اختياري)</i><select id="tko"><option value="">بدون طلب محدد</option>${os.map((o) => `<option value="${o.id}">${E(o.no)} - ${fd(o.ts)}</option>`).join("")}</select></label><label>نوع المشكلة<select id="tkt">${TKT.map((x, i) => `<option value="${i}">${E(x)}</option>`).join("")}</select></label><label>سبب المراسلة<textarea id="tkm" rows="4" placeholder="اشرح المشكلة بالتفصيل"></textarea></label>${IMGF.replace("صورة", "صورة للمشكلة")}<button class="b" onclick="tksend()">إرسال</button></div>` +
      (tk.length ? '<h3 class="dg">شكاواي</h3>' + tk.map((t) => `<div class="card"><div class="row"><b>${E(t.ty)}</b><span class="tg">قيد المتابعة</span></div><p class="mu" style="margin:6px 0">${t.d}${t.no ? " · طلب " + E(t.no) : ""}</p><p>${E(t.m)}</p></div>`).join("") : "")
    );
  },
};
V.my = (a) => {
  if (S.role == "guest") return V.login();
  if (S.role != "customer") return '<div class="em">هذه الصفحة خاصة بحسابات الزبائن.</div>';
  const [k, x] = String(a || "orders").split(":");
  return `<button class="b o" style="margin:0 0 12px" onclick="go('acct')">‹ العودة لحسابي</button>` + (MY[k] ? MY[k](x) : "");
};
V.dash = () => {
  if (S.role == "guest") return V.login();
  if (S.role != "store") return '<h2>لوحة التحكم</h2><div class="em">هذه الصفحة خاصة بالمحلات التجارية.</div>';
  const sid = S.user.sid,
    now = Date.now(),
    d0 = new Date();
  d0.setHours(0, 0, 0, 0);
  const t0 = d0.getTime(),
    mo = S.orders.filter((o) => o.items.some((i) => i.s == sid)),
    live = mo.filter((o) => o.st != "cancel"),
    its = (o) => o.items.filter((i) => i.s == sid),
    tot = (o) => its(o).reduce((a, i) => a + i.p * i.q, 0),
    sum = (f, to = Infinity) => live.filter((o) => o.ts >= f && o.ts < to).reduce((a, o) => a + tot(o), 0),
    qn = (id, f) => live.filter((o) => o.ts >= f).reduce((a, o) => a + its(o).filter((i) => i.id == id).reduce((b, i) => b + i.q, 0), 0),
    ps = S.ps.filter((p) => p.s == sid),
    nNew = mo.filter((o) => o.st == "new").length,
    nDone = mo.filter((o) => o.st == "done").length,
    low = ps.filter((p) => p.qt != null && p.qt <= 5),
    rets = S.rets.filter((r) => r.s == sid),
    nRet = rets.filter((r) => r.st == "pending").length,
    bad = ps.filter((p) => {
      const v = Object.values(S.rt[p.id] || {});
      return v.length && (v.reduce((a, b) => a + b, 0) / v.length < 3 || v.some((x) => x <= 2));
    }),
    chips = [nNew && `🆕 ${nNew} طلب جديد`, low.length && `📉 ${low.length} منتج يوشك على النفاد`, bad.length && `⚠️ ${bad.length} منتج بتقييم منخفض`, nRet && `↩️ ${nRet} طلب إرجاع`].filter(Boolean),
    TB = [["rep", "التقارير", 0], ["ord", "الطلبات", nNew + nRet], ["prd", "المنتجات", 0], ["rev", "التقييمات", bad.length], ["inv", "المخزون", low.length], ["cat", "الكتالوج", 0]];
  let body = "";
  if (DT == "rep") {
    const days = [...Array(7)].map((_, i) => {
        const f = t0 - (6 - i) * DAY;
        return { l: new Date(f).toLocaleDateString("ar", { weekday: "short" }), v: sum(f, f + DAY) };
      }),
      mx = Math.max(...days.map((d) => d.v), 1);
    body = `<div class="kpis"><div class="kp"><small>مبيعات اليوم</small><b>${fm(sum(t0))}</b></div><div class="kp"><small>آخر 7 أيام</small><b>${fm(sum(t0 - 6 * DAY))}</b></div><div class="kp"><small>آخر 30 يوما</small><b>${fm(sum(t0 - 29 * DAY))}</b></div><div class="kp"><small>إجمالي الدخل</small><b>${fm(sum(0))}</b></div></div><div class="card"><b>المبيعات خلال 7 أيام</b><div class="bars">${days.map((d) => `<div class="bc"><em>${d.v ? Math.round(d.v / 1000) + "k" : ""}</em><i style="height:${Math.max(3, (d.v / mx) * 100)}%"></i><small>${d.l}</small></div>`).join("")}</div></div><div class="card"><div class="row"><b>الطلبات</b><small class="mu">${mo.length} طلب</small></div><div class="pbar"><i style="width:${mo.length ? (nDone / mo.length) * 100 : 0}%"></i></div><div class="row"><span>🆕 جديدة: <b>${nNew}</b></span><span>✅ مكتملة: <b>${nDone}</b></span></div></div>`;
  } else if (DT == "ord") {
    const nx = { new: "بدء التجهيز", prep: "تسليم للمندوب", ship: "تأكيد التوصيل" };
    body =
      (mo.length
        ? mo
            .slice()
            .sort((a, b) => b.ts - a.ts)
            .map(
              (o) =>
                `<div class="card"><div class="row"><b>طلب ${E(o.no)}</b><span class="tg">${OST[o.st]}</span></div><div class="mu" style="margin:6px 0">${fd(o.ts)} · ${E(o.cn)} · <span dir="ltr">${E(o.ph)}</span></div>${its(o).map((i) => `<div class="li">${E(i.n)} × ${i.q} — ${fm(i.p * i.q)}</div>`).join("")}<div class="row"><b>إجمالي المحل</b><b class="pr">${fm(tot(o))}</b></div>${nx[o.st] ? `<button class="b s" onclick="ost(${o.id})">${nx[o.st]}</button>` : ""}${["new", "prep"].includes(o.st) ? `<button class="b o" onclick="ocancel(${o.id})">إلغاء الطلب</button>` : ""}</div>`,
            )
            .join("")
        : '<div class="em">لا توجد طلبات بعد.</div>') +
      (rets.length
        ? '<h3 class="dg">طلبات الإرجاع</h3>' +
          rets.map((r) => `<div class="card"><div class="row"><b>${E(r.n)}</b><span class="tg">${RL[r.st]}</span></div><p class="mu" style="margin:6px 0">طلب ${E(r.no)} · السبب: ${E(r.rs)}${r.nt ? " · " + E(r.nt) : ""}</p>${r.st == "pending" ? `<div class="row"><button class="b s" onclick="retact(${r.id},1)">قبول واسترداد ${fm(r.amt)}</button><button class="b o" onclick="retact(${r.id},0)">رفض</button></div>` : ""}</div>`).join("")
        : "");
  } else if (DT == "prd") {
    const rows = ps.map((p) => ({ p, d: qn(p.id, t0), m: qn(p.id, t0 - 29 * DAY), t: S.sold[p.id] || 0 })),
      top = rows.filter((r) => r.m > 0).sort((a, b) => b.m - a.m).slice(0, 5),
      old = (p) => (p.ts || p.id > 1e12 ? (p.ts || p.id) < now - 30 * DAY : true),
      stale = rows.filter((r) => r.m == 0 && old(r.p));
    body =
      '<h3 class="dg">🏆 الأكثر مبيعا</h3>' +
      (top.length ? top.map((r, i) => `<div class="card row"><span><b>${i + 1}. ${E(r.p.n)}</b><small class="mu" style="display:block">${r.m} قطعة خلال 30 يوما${r.p.qt != null && r.p.qt <= 5 ? " · تأكد من توفر المخزون" : ""}</small></span><span class="tg">${r.m}</span></div>`).join("") : '<div class="em" style="padding:20px">لا توجد مبيعات بعد.</div>') +
      '<h3 class="dg">💤 منتجات راكدة</h3>' +
      (stale.length ? stale.map((r) => `<div class="card row"><span><b>${E(r.p.n)}</b><small class="mu" style="display:block">لم يُبع منذ 30 يوما، جرّب تخفيض السعر</small></span><button class="op" style="width:auto;padding:8px 14px" onclick="go('editp',${r.p.id})">تعديل السعر</button></div>`).join("") : '<div class="em" style="padding:20px">لا توجد منتجات راكدة.</div>') +
      '<h3 class="dg">📊 حجم مبيعات كل منتج</h3><div class="card">' +
      (rows.length ? '<div class="tb"><b>المنتج</b><b>اليوم</b><b>الشهر</b><b>الكل</b></div>' + rows.map((r) => `<div class="tb"><span>${E(r.p.n)}</span><span>${r.d}</span><span>${r.m}</span><span>${r.t}</span></div>`).join("") : '<p class="mu">لا توجد منتجات.</p>') +
      "</div>";
  } else if (DT == "rev") {
    body = ps.length
      ? ps
          .map((p) => {
            const rs = S.rt[p.id] || {},
              v = Object.values(rs),
              n = v.length,
              avg = n ? v.reduce((a, b) => a + b, 0) / n : 0,
              cm = (S.cm[p.id] || []).slice(-3).reverse(),
              isb = n && (avg < 3 || v.some((x) => x <= 2)),
              lows = Object.entries(rs).filter((e) => e[1] <= 2).map((e) => S.accs.find((a) => a.aid == e[0] || a.ph == e[0])).filter((a) => a && a.ph);
            return `<div class="card${isb ? " wr" : ""}"><div class="row"><b>${E(p.n)}</b><span class="pr" style="margin:0">★ ${n ? avg.toFixed(1) : "—"} <small class="mu">(${n})</small></span></div>${isb ? '<p style="margin:8px 0;color:#e8a33d">⚠️ تقييم منخفض: عالج المشكلة أو تواصل مع العميل</p>' : ""}${cm.map((c) => `<div class="li"><b>${E(c.n)}</b> <small class="mu">${E(c.d)}</small><br>${E(c.t)}</div>`).join("")}${lows.map((a) => `<a class="b o" target="_blank" rel="noopener" href="https://wa.me/967${E(a.ph)}">تواصل مع ${E(a.nm)}</a>`).join("")}</div>`;
          })
          .join("")
      : '<div class="em">أضف منتجات لتظهر تقييماتها.</div>';
  } else if (DT == "inv") {
    body = ps.length
      ? ps
          .map(
            (p) =>
              `<div class="card"><div class="row"><b>${E(p.n)}</b>${p.qt === 0 ? '<span class="tg" style="color:#e5594f">نفد</span>' : p.qt != null && p.qt <= 5 ? '<span class="tg" style="color:#e8a33d">يوشك على النفاد</span>' : ""}</div><div class="qe"><button onclick="qtadd(${p.id},-1)" aria-label="إنقاص">−</button><input type="number" min="0" inputmode="numeric" value="${p.qt ?? ""}" placeholder="غير محدد" onchange="qtset(${p.id},this.value)"><button onclick="qtadd(${p.id},1)" aria-label="زيادة">+</button><button onclick="qtadd(${p.id},10)">+10</button></div></div>`,
          )
          .join("")
      : '<div class="em">لا توجد منتجات.</div>';
  } else {
    body =
      `<button class="b s" onclick="go('mine')">+ إضافة منتج جديد</button>` +
      ps.map((p) => `<div class="card"><div class="row"><b>${E(p.n)}</b><span class="tg">${p.h ? "مخفي" : "ظاهر"}</span></div><p class="mu" style="margin:6px 0">${fm(p.p)}${p.d ? " · " + E(p.d) : ""}</p><div class="row"><button class="b o" onclick="go('editp',${p.id})">تعديل</button><button class="b o" onclick="tgl(${p.id})">${p.h ? "إظهار" : "إخفاء"}</button><button class="b o" onclick="delp(${p.id})">حذف</button></div></div>`).join("");
  }
  return `<h2>لوحة التحكم</h2><p class="mu" style="margin:-6px 0 12px">${E(S.user.sn || "")}</p>${chips.length ? `<div class="card alb">${chips.map((c) => `<span>${c}</span>`).join("")}</div>` : ""}<div class="tabs">${TB.map((t) => `<button class="op ${DT == t[0] ? "on" : ""}" onclick="dtab('${t[0]}')">${t[1]}${t[2] ? ` <span class="bd2">${t[2]}</span>` : ""}</button>`).join("")}</div>${body}`;
};

function nav() {
  const r = S.role,
    n = S.cart.reduce((a, c) => a + c.q, 0);
  const it = [
    ["home", "الرئيسية", "go('home')", "home"],
    ["bag", "شي ان", "go('shein')", "shein"],
    ["search", "بحث", "go('search')", "search"],
  ];
  if (r == "store" || r == "delivery")
    it.push(r == "store" ? ["box", "لوحتي", "go('dash')", "dash"] : ["box", "طلباتي", "go('mine')", "mine"]);
  else it.push(["cart", "السلة", "go('cart')", "cart"]);
  it.push([
    "user",
    r == "guest" ? "دخول" : "حسابي",
    r == "guest" ? "go('login')" : "go('acct')",
    r == "guest" ? "login" : "acct",
  ]);
  $("#nav").innerHTML = it
    .map(
      (x) =>
        `<button class="${S.view == x[3] ? "on" : ""}" onclick="${x[2]}">${ic(x[0])}<span>${x[1]}</span>${x[0] == "cart" && n ? `<span class="bd">${n}</span>` : ""}</button>`,
    )
    .join("");
}
function render() {
  const mn = $("#main");
  mn.innerHTML = V[S.view](S.arg);
  mn.classList.remove("fresh");
  if (FRESH) {
    void mn.offsetWidth;
    mn.classList.add("fresh");
  }
  FRESH = false;
  if (S.view == "reg" && S.arg == "s" && RM == "n") fillMk();
  if (S.view == "editp") {
    const p = S.ps.find((x) => x.id == S.arg);
    if (p && $("#pnm")) {
      $("#pnm").value = p.n;
      $("#pd").value = p.d || "";
      $("#pp").value = p.p;
      if (p.img) {
        $("#pv").src = p.img;
        $("#pv").hidden = false;
      }
    }
  }
  if (S.view == "search") sr();
  if (S.view == "my") myHook();
  if (S.view == "edit")
    ["nm", "sn", "ds", "ph", "em"].forEach((k) => {
      const e = $("#" + k);
      if (e) e.value = S.user[k] ?? "";
    });
  chkAl();
  nav();
  save();
}
$("#cp").textContent =
  "© " + new Date().getFullYear() + " أسواق. جميع الحقوق محفوظة.";
$("#gear").innerHTML = ic("gear");
applyTheme();
$("#mn").innerHTML = ic("menu");
render();
loadCatalog();
