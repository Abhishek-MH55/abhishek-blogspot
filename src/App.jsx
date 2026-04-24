import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Google Fonts via style injection ─── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Noto+Sans+Devanagari:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #f0ebe3; }
    ::-webkit-scrollbar-thumb { background: #c8bfb4; border-radius: 3px; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif !important; }
    .devanagari { font-family: 'Noto Sans Devanagari', sans-serif !important; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes scaleIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
    @keyframes progressBar { from { transform:scaleX(0); } to { transform:scaleX(1); } }
    .anim-fadeUp { animation: fadeUp 0.5s ease forwards; }
    .anim-fadeIn { animation: fadeIn 0.3s ease forwards; }
    .anim-scaleIn { animation: scaleIn 0.25s ease forwards; }
    input, textarea, select, button { font-family: inherit; }
    button { cursor: pointer; border: none; background: none; }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }
  `}</style>
);

/* ─── THEME ─── */
const LIGHT = {
  bg: "#f9f6f1", bg2: "#f0ebe2", bg3: "#e6ddd0",
  surface: "#ffffff", surface2: "#faf8f4",
  text: "#1c1712", text2: "#5c4f42", text3: "#9c8c7e",
  accent: "#c0392b", accent2: "#e04030", accentSoft: "#fdf0ee",
  blue: "#2563eb", border: "#e0d5c8", border2: "#ccc0b0",
  shadow: "rgba(28,23,18,0.07)", shadow2: "rgba(28,23,18,0.14)",
};
const DARK = {
  bg: "#131008", bg2: "#1a1710", bg3: "#222018",
  surface: "#1e1b12", surface2: "#252218",
  text: "#f0ebe0", text2: "#b0a090", text3: "#706050",
  accent: "#e04535", accent2: "#ff5545", accentSoft: "#2a1410",
  blue: "#60a5fa", border: "#2c2820", border2: "#3c3428",
  shadow: "rgba(0,0,0,0.3)", shadow2: "rgba(0,0,0,0.5)",
};

/* ─── SEED DATA ─── */
const SEED_POSTS = [
  {
    id: "p1", lang: "en", featured: true,
    title: "The Art of Finding Beauty in Ordinary Days",
    category: "Life", tags: ["reflection", "mindfulness", "everyday"],
    date: "2025-04-15", readTime: "4 min",
    excerpt: "Sometimes the most extraordinary stories are written in the margins of mundane mornings.",
    image: "",
    content: `## The Ordinary Hours\n\nThere's something quietly magnificent about Tuesday mornings. The world hasn't yet decided what kind of day it wants to be, and in that indecision, there's space — *infinite*, generous space — for wonder. 🌅\n\nI've been keeping a small notebook lately. Nothing grand. A pocket-sized thing I carry for those moments when a thought arrives fully formed, unexpected, like a stranger on a bench who tells you something that changes how you see the world.\n\n## What I've Noticed\n\nThe pattern in my tea, the particular silence before rain, the way certain songs arrive right when you need them — these aren't accidents. They're invitations to pay attention.\n\n> "The ordinary is extraordinary if only we could see it clearly."\n\nHere are things that have surprised me with beauty this week:\n\n- A child arguing passionately with a pigeon about who owns the bench\n- The smell of old books in a used shop\n- My neighbor's laugh which sounds exactly like a question mark\n\n**What would happen** if we treated each day like a short story we were reading for the first time? 📖`,
  },
  {
    id: "p2", lang: "mr", featured: false,
    title: "पावसाळ्यातील माझ्या गावाची गोष्ट",
    category: "निसर्ग", tags: ["पाऊस", "गाव", "आठवणी"],
    date: "2025-04-10", readTime: "3 min",
    excerpt: "पाऊस पडला की माझ्या गावाचं रूप पालटतं — हिरवाईने नटलेल्या त्या वाटांवर मन रमतं.",
    image: "",
    content: `## पहिला पाऊस 🌧️\n\nजेव्हा पहिला पाऊस येतो, तेव्हा माती एक वेगळाच सुगंध सोडते. त्याला "पेट्रीकोर" म्हणतात असं कुणीतरी सांगितलं होतं — पण माझ्यासाठी तो फक्त "घराचा वास" आहे.\n\nआपल्या गावात पाऊस जसा सुरू होतो, तसे रस्ते ओलेचिंब होतात. मुलं कागदाच्या होड्या सोडतात पाण्यात.\n\n## आठवणी 🍃\n\nलहानपणी पावसात भिजायचो. आईने रागे भरले की "ताप येईल" — पण तो क्षण इतका जिवंत होता की ताप येणं स्वीकारायला तयार होतो.\n\n> पाऊस म्हणजे फक्त पाणी नाही — पाऊस म्हणजे एक संगीत आहे, जे जमिनीशी संवाद करतं.\n\n**गावातील पाऊस** शहरातल्या पावसापेक्षा वेगळा असतो. शेतकरी बघतात — डोळ्यात पाणी की हर्ष? दोन्ही एकत्र असतात. 🌾`,
  },
  {
    id: "p3", lang: "en", featured: false,
    title: "Why I Stopped Optimizing My Morning Routine",
    category: "Lifestyle", tags: ["productivity", "wellness", "mornings"],
    date: "2025-04-05", readTime: "5 min",
    excerpt: "Every productivity guru told me to hack my mornings. I tried. Here is what actually happened.",
    image: "",
    content: `## The Optimization Trap ⏱️\n\nFor six months I followed the perfect morning routine. Cold shower at 5:47am. Seventeen minutes of journaling (exactly). Protein shake with exactly 23g of protein.\n\nI was *efficient*. I was also exhausted and slightly unhinged.\n\n## What I Realized\n\nMornings aren't a productivity problem to solve. They're the first chapter of your day — and no good author starts chapter one with a spreadsheet.\n\n**The things that changed when I stopped:**\n\n- I started noticing when I was actually hungry\n- My dog started getting longer, more wandering walks\n- I found out I really enjoy just sitting with coffee doing absolutely nothing\n\n> The irony: my work got better. Not because I optimized it, but because I stopped being at war with the morning.\n\nIt's not productive. It's just mine. And somehow that's exactly enough. 🌿`,
  },
  {
    id: "p4", lang: "mr", featured: false,
    title: "स्वयंपाकघरातील ज्ञान: आजीच्या पाककृती",
    category: "संस्कृती", tags: ["आजी", "खाणं", "संस्कृती"],
    date: "2025-03-28", readTime: "4 min",
    excerpt: "आजीच्या हातचं जेवण म्हणजे फक्त खाणं नाही — ती एक भाषा होती, प्रेमाची.",
    image: "",
    content: `## जेवणाची भाषा 🍲\n\nआजी कधीही रेसिपी लिहून ठेवत नसे. "चव बघ, समजेल" एवढंच सांगायची.\n\n## आंबट-गोड सारखं आयुष्य 🍋\n\nपुरण पोळी करताना ती म्हणायची: "गोड जास्त नको, थोडंसं खारट असेल तर गोडाचा आनंद जास्त होतो."\n\n**जे मला तिने शिकवलं:**\n\n- स्वयंपाक म्हणजे फक्त भूक भागवणं नाही, ती एक काळजी आहे\n- वेळ द्यावा लागतो — घाई करून चांगलं जेवण होत नाही\n- प्रत्येक घटकाचा मान ठेवा\n\n> "अन्न हे पूर्णब्रह्म" — आजी रोज म्हणायची, आणि आता ते खरं वाटतं.\n\nआज मी तिची डाळ करण्याचा प्रयत्न करतो. अजून जमत नाही — पण त्या प्रयत्नातच ती जगत असते. ❤️`,
  },
];

/* ─── MARKDOWN PARSER ─── */
function parseMarkdown(text) {
  if (!text) return "";
  const lines = text.split("\n");
  const html = [];
  let inUl = false;
  for (let line of lines) {
    if (line.startsWith("## ")) { if (inUl) { html.push("</ul>"); inUl = false; } html.push(`<h2 style="font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:600;margin:1.8em 0 0.6em;color:inherit">${line.slice(3)}</h2>`); }
    else if (line.startsWith("### ")) { if (inUl) { html.push("</ul>"); inUl = false; } html.push(`<h3 style="font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;margin:1.4em 0 0.5em;color:inherit">${line.slice(4)}</h3>`); }
    else if (line.startsWith("> ")) { if (inUl) { html.push("</ul>"); inUl = false; } html.push(`<blockquote style="border-left:3px solid #c0392b;padding:10px 18px;margin:1.4em 0;background:rgba(192,57,43,0.06);border-radius:0 8px 8px 0;font-style:italic;color:inherit">${line.slice(2)}</blockquote>`); }
    else if (line.startsWith("- ")) { if (!inUl) { html.push('<ul style="padding-left:1.4em;margin:0.8em 0">'); inUl = true; } html.push(`<li style="margin-bottom:6px">${fmt(line.slice(2))}</li>`); }
    else if (line.trim() === "") { if (inUl) { html.push("</ul>"); inUl = false; } html.push("<br/>"); }
    else { if (inUl) { html.push("</ul>"); inUl = false; } html.push(`<p style="margin-bottom:1.2em;line-height:1.85">${fmt(line)}</p>`); }
  }
  if (inUl) html.push("</ul>");
  return html.join("");
}
function fmt(t) {
  return t
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:underline;text-underline-offset:3px">$1</a>');
}

/* ─── HELPERS ─── */
const fmtDate = (s) => s ? new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
const uid = () => "p" + Date.now();
const store = { get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } }, set: (k, v) => localStorage.setItem(k, JSON.stringify(v)) };

const EMOJIS = ["😊","❤️","🌟","✨","🎉","🔥","💫","🌈","🌸","☀️","🌙","⭐","💪","🙏","👏","📖","✍️","🌿","🍂","🌧️","🏔️","🌊","🦋","🌺","🍃","🎨","💡","🚀","🌍","📸","🍲","🍋"];

/* ════════════════════════════════════════════
   ROOT APP
════════════════════════════════════════════ */
export default function App() {
  const [dark, setDark] = useState(() => store.get("aw_theme", "light") === "dark");
  const [posts, setPosts] = useState(() => store.get("aw_posts", SEED_POSTS));
  const [gallery, setGallery] = useState(() => store.get("aw_gallery", []));
  const [tab, setTab] = useState("home");          // home | english | marathi | gallery
  const [openPost, setOpenPost] = useState(null);  // post id
  const [isAuthor, setIsAuthor] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);      // category / tag string
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const T = dark ? DARK : LIGHT;

  useEffect(() => { store.set("aw_theme", dark ? "dark" : "light"); }, [dark]);
  useEffect(() => { store.set("aw_posts", posts); }, [posts]);
  useEffect(() => { store.set("aw_gallery", gallery); }, [gallery]);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const filtered = (() => {
    let p = [...posts];
    if (tab === "english") p = p.filter(x => x.lang === "en");
    if (tab === "marathi") p = p.filter(x => x.lang === "mr");
    if (filter) p = p.filter(x => x.category === filter || (x.tags||[]).includes(filter));
    if (search) { const q = search.toLowerCase(); p = p.filter(x => x.title.toLowerCase().includes(q) || x.excerpt.toLowerCase().includes(q)); }
    return p;
  })();

  const allCategories = [...new Set(posts.map(p => p.category))];
  const allTags = [...new Set(posts.flatMap(p => p.tags || []))];

  const switchTab = (t) => { setTab(t); setOpenPost(null); setFilter(null); setSearch(""); setMobileMenu(false); };

  /* ── shared css vars ── */
  const cssVars = {
    "--bg": T.bg, "--bg2": T.bg2, "--bg3": T.bg3,
    "--surface": T.surface, "--text": T.text, "--text2": T.text2, "--text3": T.text3,
    "--accent": T.accent, "--border": T.border, "--border2": T.border2,
  };

  return (
    <div style={{ ...cssVars, background: T.bg, color: T.text, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <FontStyle />

      {/* HEADER */}
      <Header T={T} dark={dark} setDark={setDark} tab={tab} switchTab={switchTab}
        isAuthor={isAuthor} setAuthOpen={setAuthOpen} setIsAuthor={setIsAuthor}
        mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} showToast={showToast} />

      {/* MOBILE NAV */}
      {mobileMenu && (
        <div style={{ position: "sticky", top: 64, zIndex: 90, background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "10px 16px", boxShadow: `0 8px 24px ${T.shadow}` }}>
          {["home","english","marathi","gallery"].map(t => (
            <button key={t} onClick={() => switchTab(t)} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", borderRadius: 10, fontSize: "0.9rem", color: tab === t ? T.accent : T.text2, background: tab === t ? T.accentSoft : "transparent", marginBottom: 2 }}>
              { {home:"🏠 Home", english:"🇬🇧 English", marathi:"🇮🇳 मराठी", gallery:"🖼️ Gallery"}[t] }
            </button>
          ))}
        </div>
      )}

      {/* READING PROGRESS */}
      {openPost && <ReadingProgress T={T} />}

      {/* HERO */}
      {!openPost && tab !== "gallery" && (
        <Hero T={T} posts={posts} gallery={gallery} />
      )}

      {/* TABS BAR */}
      <TabsBar T={T} tab={tab} switchTab={switchTab} openPost={openPost} />

      {/* MAIN */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px" }}>
        {openPost ? (
          <PostView T={T} post={posts.find(p => p.id === openPost)} onBack={() => setOpenPost(null)}
            isAuthor={isAuthor} onEdit={() => { setEditingId(openPost); setEditorOpen(true); }}
            onDelete={() => setDeleteTarget(openPost)} showToast={showToast} />
        ) : tab === "gallery" ? (
          <GallerySection T={T} gallery={gallery} setGallery={setGallery} isAuthor={isAuthor}
            setLightbox={setLightbox} showToast={showToast} />
        ) : (
          <BlogLayout T={T} filtered={filtered} posts={posts} isAuthor={isAuthor}
            setOpenPost={setOpenPost} setFilter={setFilter} filter={filter}
            search={search} setSearch={setSearch}
            allCategories={allCategories} allTags={allTags}
            onEdit={(id) => { setEditingId(id); setEditorOpen(true); }}
            onDelete={(id) => setDeleteTarget(id)}
            onNewPost={() => { setEditingId(null); setEditorOpen(true); }} />
        )}
      </main>

      {/* FOOTER */}
      {!openPost && <Footer T={T} switchTab={switchTab} />}

      {/* FAB */}
      {isAuthor && tab !== "gallery" && (
        <button onClick={() => { setEditingId(null); setEditorOpen(true); }}
          title="Write new post"
          style={{ position: "fixed", bottom: 32, right: 32, zIndex: 150, width: 56, height: 56, borderRadius: "50%", background: T.accent, color: "#fff", fontSize: "1.6rem", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 24px ${T.accent}66`, transition: "transform 0.2s, background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1) rotate(90deg)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}>+</button>
      )}

      {/* MODALS */}
      {authOpen && <AuthModal T={T} onClose={() => setAuthOpen(false)} onLogin={() => { setIsAuthor(true); setAuthOpen(false); showToast("Welcome back, Abhishek! ✍️"); }} />}
      {editorOpen && <Editor T={T} editingId={editingId} posts={posts} setPosts={setPosts}
        onClose={() => setEditorOpen(false)} showToast={showToast} />}
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
      {deleteTarget && <ConfirmDialog T={T} onCancel={() => setDeleteTarget(null)}
        onConfirm={() => { setPosts(p => p.filter(x => x.id !== deleteTarget)); setDeleteTarget(null); if (openPost === deleteTarget) setOpenPost(null); showToast("Post deleted"); }} />}
      {toast && <Toast T={T} msg={toast.msg} type={toast.type} />}
    </div>
  );
}

/* ════════════ HEADER ════════════ */
function Header({ T, dark, setDark, tab, switchTab, isAuthor, setAuthOpen, setIsAuthor, mobileMenu, setMobileMenu, showToast }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: T.surface, borderBottom: `1px solid ${T.border}`, boxShadow: `0 2px 20px ${T.shadow}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", gap: 16 }}>
        {/* Logo */}
        <div onClick={() => switchTab("home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
          <LogoMark T={T} />
          <span className="serif" style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em", color: T.text }}>
            Abhishek <span style={{ color: T.accent }}>Writes</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 2, marginLeft: "auto", ["@media(max-width:768px)"]: { display: "none" } }} className="desktop-nav">
          {[["home","Home"],["english","English 🇬🇧"],["marathi","मराठी 🇮🇳"],["gallery","Gallery 🖼️"]].map(([t,label]) => (
            <NavBtn key={t} active={tab===t} T={T} onClick={() => switchTab(t)}>{label}</NavBtn>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: window.innerWidth > 768 ? 8 : "auto" }}>
          <IconBtn T={T} title={dark ? "Light mode" : "Dark mode"} onClick={() => setDark(d => !d)}>{dark ? "☀️" : "🌙"}</IconBtn>
          {isAuthor && <span style={{ padding: "5px 12px", borderRadius: 8, background: T.accentSoft, color: T.accent, fontSize: "0.78rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>✍️ Author</span>}
          <IconBtn T={T} title={isAuthor ? "Logout" : "Author login"}
            onClick={() => isAuthor ? (setIsAuthor(false), showToast("Logged out")) : setAuthOpen(true)}>
            {isAuthor ? "🔓" : "🔐"}
          </IconBtn>
          <button onClick={() => setMobileMenu(m => !m)} style={{ display: "none", width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center", fontSize: "1.1rem", color: T.text2, background: "transparent" }} className="mobile-menu-btn">☰</button>
        </div>
      </div>
      <style>{`
        @media(max-width:768px) { .desktop-nav { display:none!important; } .mobile-menu-btn { display:flex!important; } }
      `}</style>
    </header>
  );
}

function LogoMark({ T }) {
  return (
    <svg width="38" height="38" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 10, flexShrink: 0 }}>
      <rect width="100" height="100" rx="20" fill={T.bg2} />
      <text x="50" y="72" textAnchor="middle" fontSize="60" fontFamily="'Cormorant Garamond',Georgia,serif" fill={T.accent} fontWeight="700">A</text>
    </svg>
  );
}

function NavBtn({ children, active, T, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "8px 15px", borderRadius: 8, fontSize: "0.875rem", fontWeight: 500, color: active ? T.accent : T.text2, background: active ? T.accentSoft : "transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = T.bg2; e.currentTarget.style.color = T.text; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.text2; } }}>
      {children}
    </button>
  );
}

function IconBtn({ children, T, onClick, title }) {
  return (
    <button onClick={onClick} title={title} style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: T.text2, background: "transparent", fontSize: "1rem", transition: "all 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.background = T.bg2; e.currentTarget.style.color = T.text; }}
      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.text2; }}>
      {children}
    </button>
  );
}

/* ════════════ HERO ════════════ */
function Hero({ T, posts, gallery }) {
  const en = posts.filter(p => p.lang === "en").length;
  const mr = posts.filter(p => p.lang === "mr").length;
  return (
    <section style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "72px 20px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 50% -5%, ${T.accent}12, transparent)`, pointerEvents: "none" }} />
      <div style={{ position: "relative" }}>
        <div className="anim-fadeUp" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 100, border: `1px solid ${T.border2}`, background: T.bg2, fontSize: "0.75rem", fontWeight: 500, color: T.text3, marginBottom: 22, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          ✨ Personal Blog & Stories
        </div>
        <h1 className="serif anim-fadeUp" style={{ fontSize: "clamp(2.2rem,6vw,4rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 18, animationDelay: "0.05s", opacity: 0 }}>
          Words that <em style={{ color: T.accent }}>wander,</em><br />thoughts that stay.
        </h1>
        <p className="anim-fadeUp" style={{ maxWidth: 520, margin: "0 auto 36px", fontSize: "1.05rem", color: T.text2, lineHeight: 1.75, animationDelay: "0.1s", opacity: 0 }}>
          A space where stories unfold in English and Marathi — personal reflections, ideas, and the beauty of bilingual expression.
        </p>
        <div className="anim-fadeUp" style={{ display: "flex", justifyContent: "center", gap: 36, flexWrap: "wrap", animationDelay: "0.15s", opacity: 0 }}>
          {[["Stories", posts.length], ["English", en], ["मराठी", mr], ["Photos", gallery.length]].map(([label, num], i) => (
            <>
              {i > 0 && <div style={{ width: 1, height: 40, background: T.border, alignSelf: "center" }} />}
              <div key={label} style={{ textAlign: "center" }}>
                <div className="serif" style={{ fontSize: "1.8rem", fontWeight: 700, lineHeight: 1, color: T.text }}>{num}</div>
                <div style={{ fontSize: "0.72rem", color: T.text3, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════ TABS BAR ════════════ */
function TabsBar({ T, tab, switchTab, openPost }) {
  return (
    <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 64, zIndex: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
        {[["home","All Posts"],["english","English 🇬🇧"],["marathi","मराठी 🇮🇳"],["gallery","Gallery 🖼️"]].map(([t, label]) => (
          <button key={t} onClick={() => switchTab(t)} style={{ padding: "15px 20px", fontSize: "0.875rem", fontWeight: 500, color: tab === t ? T.accent : T.text3, borderBottom: `2px solid ${tab === t ? T.accent : "transparent"}`, whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s", background: "transparent" }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════ BLOG LAYOUT ════════════ */
function BlogLayout({ T, filtered, posts, isAuthor, setOpenPost, setFilter, filter, search, setSearch, allCategories, allTags, onEdit, onDelete }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 290px", gap: 40, alignItems: "start" }}>
      <style>{`@media(max-width:1024px){ .blog-layout-sidebar { display:none!important; } .blog-layout-grid { grid-template-columns:1fr!important; } }`}</style>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 className="serif" style={{ fontSize: "1.55rem", fontWeight: 600, color: T.text }}>Latest Stories</h2>
            <p style={{ fontSize: "0.82rem", color: T.text3, marginTop: 3 }}>{filtered.length} post{filtered.length !== 1 ? "s" : ""}</p>
          </div>
          {filter && (
            <button onClick={() => setFilter(null)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: `1px solid ${T.border}`, fontSize: "0.82rem", color: T.text2, background: T.bg2 }}>
              Clear: {filter} ✕
            </button>
          )}
        </div>
        <BlogGrid T={T} filtered={filtered} posts={posts} isAuthor={isAuthor}
          setOpenPost={setOpenPost} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className="blog-layout-sidebar">
        <Sidebar T={T} posts={posts} allCategories={allCategories} allTags={allTags}
          filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} setOpenPost={setOpenPost} />
      </div>
    </div>
  );
}

/* ════════════ BLOG GRID ════════════ */
function BlogGrid({ T, filtered, isAuthor, setOpenPost, onEdit, onDelete }) {
  if (filtered.length === 0) return (
    <div style={{ textAlign: "center", padding: "80px 20px", color: T.text3 }}>
      <div style={{ fontSize: "3rem", marginBottom: 16 }}>✍️</div>
      <h3 className="serif" style={{ fontSize: "1.2rem", color: T.text2, marginBottom: 8 }}>No posts found</h3>
      <p style={{ fontSize: "0.875rem" }}>{isAuthor ? "Use the + button to write your first post!" : "Check back soon for new stories."}</p>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 22 }}>
      {filtered.map((post, i) => (
        <PostCard key={post.id} T={T} post={post} featured={post.featured && i === 0}
          delay={i * 0.05} isAuthor={isAuthor}
          onClick={() => setOpenPost(post.id)}
          onEdit={() => onEdit(post.id)} onDelete={() => onDelete(post.id)} />
      ))}
    </div>
  );
}

/* ════════════ POST CARD ════════════ */
function PostCard({ T, post, featured, delay, isAuthor, onClick, onEdit, onDelete }) {
  const [hov, setHov] = useState(false);
  const isMr = post.lang === "mr";
  const style = {
    background: T.surface, border: `1px solid ${hov ? T.border2 : T.border}`,
    borderRadius: 16, overflow: "hidden", cursor: "pointer",
    transition: "all 0.22s", transform: hov ? "translateY(-2px)" : "translateY(0)",
    boxShadow: hov ? `0 10px 36px ${T.shadow2}` : "none",
    display: featured ? "grid" : "block",
    gridTemplateColumns: featured ? "1fr 1fr" : undefined,
    animation: `fadeUp 0.45s ease ${delay}s forwards`, opacity: 0,
  };

  return (
    <div style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}>
      {/* Image */}
      <div style={{ height: featured ? "100%" : 210, minHeight: featured ? 260 : undefined, background: T.bg3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", position: "relative", overflow: "hidden" }}>
        {post.image
          ? <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov ? "scale(1.05)" : "scale(1)" }} />
          : <span style={{ opacity: 0.5 }}>{isMr ? "📖" : "✍️"}</span>}
        <span style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em", background: isMr ? "rgba(192,57,43,0.88)" : "rgba(37,99,235,0.88)", color: "#fff" }}>
          {isMr ? "मर" : "EN"}
        </span>
        {isAuthor && (
          <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
            <Ctrl color="#2563eb" onClick={onEdit}>✏️</Ctrl>
            <Ctrl color="#dc2626" onClick={onDelete}>🗑️</Ctrl>
          </div>
        )}
      </div>
      {/* Body */}
      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10, alignItems: "center" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: T.accent, background: T.accentSoft, padding: "3px 9px", borderRadius: 5 }}>{post.category}</span>
          <span style={{ fontSize: "0.76rem", color: T.text3 }}>📅 {fmtDate(post.date)}</span>
          <span style={{ fontSize: "0.76rem", color: T.text3 }}>⏱️ {post.readTime}</span>
        </div>
        <h3 className={`serif ${isMr ? "devanagari" : ""}`} style={{ fontSize: featured ? "1.4rem" : "1.15rem", fontWeight: 600, lineHeight: 1.3, marginBottom: 9, color: hov ? T.accent : T.text, transition: "color 0.2s" }}>{post.title}</h3>
        <p className={isMr ? "devanagari" : ""} style={{ fontSize: "0.875rem", color: T.text2, lineHeight: 1.7, marginBottom: 14 }}>{post.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(post.tags||[]).slice(0,3).map(t => (
              <span key={t} style={{ fontSize: "0.7rem", padding: "3px 9px", borderRadius: 5, background: T.bg2, color: T.text3, border: `1px solid ${T.border}` }}>#{t}</span>
            ))}
          </div>
          <span style={{ fontSize: "0.8rem", color: T.accent, fontWeight: 500 }}>Read {isMr?"करा":"more"} →</span>
        </div>
      </div>
    </div>
  );
}

function Ctrl({ color, onClick, children }) {
  return (
    <button onClick={onClick} style={{ width: 30, height: 30, borderRadius: 7, background: color, color: "#fff", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {children}
    </button>
  );
}

/* ════════════ SIDEBAR ════════════ */
function Sidebar({ T, posts, allCategories, allTags, filter, setFilter, search, setSearch, setOpenPost }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Search */}
      <SideCard T={T} title="🔍 Search">
        <div style={{ position: "relative" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
            style={{ width: "100%", padding: "10px 36px 10px 12px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg2, color: T.text, fontSize: "0.875rem", outline: "none" }} />
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: T.text3 }}>🔍</span>
        </div>
      </SideCard>
      {/* Categories */}
      <SideCard T={T} title="📂 Categories">
        <CatItem T={T} active={!filter} onClick={() => setFilter(null)}>📚 All Posts <CatCount T={T}>{posts.length}</CatCount></CatItem>
        {allCategories.map(c => (
          <CatItem key={c} T={T} active={filter===c} onClick={() => setFilter(c)}>
            • {c} <CatCount T={T}>{posts.filter(p=>p.category===c).length}</CatCount>
          </CatItem>
        ))}
      </SideCard>
      {/* Recent */}
      <SideCard T={T} title="🕐 Recent Posts">
        {posts.slice(0,4).map(p => (
          <div key={p.id} onClick={() => setOpenPost(p.id)} style={{ display: "flex", gap: 11, cursor: "pointer", marginBottom: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 8, background: T.bg3, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
              {p.lang==="mr"?"📖":"✍️"}
            </div>
            <div>
              <div className={p.lang==="mr"?"devanagari":""} style={{ fontSize: "0.8rem", fontWeight: 500, color: T.text, lineHeight: 1.3, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: "0.72rem", color: T.text3 }}>{fmtDate(p.date)}</div>
            </div>
          </div>
        ))}
      </SideCard>
      {/* Tags */}
      <SideCard T={T} title="🏷️ Tags">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {allTags.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ padding: "5px 11px", borderRadius: 7, fontSize: "0.75rem", border: `1px solid ${filter===t ? T.accent : T.border}`, color: filter===t ? T.accent : T.text2, background: filter===t ? T.accentSoft : T.bg2, cursor: "pointer", transition: "all 0.18s" }}>
              #{t}
            </button>
          ))}
        </div>
      </SideCard>
    </div>
  );
}

function SideCard({ T, title, children }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
      <div className="serif" style={{ fontSize: "0.95rem", fontWeight: 600, color: T.text, marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>{title}</div>
      {children}
    </div>
  );
}
function CatItem({ T, active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "8px 10px", borderRadius: 8, fontSize: "0.875rem", color: active ? T.accent : T.text2, background: active ? T.accentSoft : "transparent", textAlign: "left", marginBottom: 3, transition: "all 0.18s" }}>
      {children}
    </button>
  );
}
function CatCount({ T, children }) {
  return <span style={{ fontSize: "0.7rem", padding: "2px 7px", borderRadius: 5, background: T.bg3, color: T.text3 }}>{children}</span>;
}

/* ════════════ POST VIEW ════════════ */
function PostView({ T, post, onBack, isAuthor, onEdit, onDelete, showToast }) {
  if (!post) return null;
  const isMr = post.lang === "mr";
  return (
    <div style={{ maxWidth: 740, margin: "0 auto", animation: "fadeUp 0.4s ease forwards" }}>
      <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.text2, fontSize: "0.875rem", marginBottom: 32, transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.background = T.bg2; e.currentTarget.style.color = T.text; }}
        onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.color = T.text2; }}>
        ← Back to stories
      </button>

      {/* Meta */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 700, background: isMr ? "rgba(192,57,43,0.15)" : "rgba(37,99,235,0.12)", color: isMr ? T.accent : T.blue }}>
          {isMr ? "🇮🇳 मराठी" : "🇬🇧 English"}
        </span>
        <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: T.accent }}>{post.category}</span>
      </div>
      <h1 className={`serif ${isMr?"devanagari":""}`} style={{ fontSize: "clamp(1.8rem,4vw,2.7rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 18 }}>{post.title}</h1>
      <p className={isMr?"devanagari":""} style={{ fontSize: "1.05rem", color: T.text2, lineHeight: 1.7, borderLeft: `3px solid ${T.accent}`, paddingLeft: 20, marginBottom: 22 }}>{post.excerpt}</p>

      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", padding: "12px 16px", background: T.bg2, borderRadius: 10, fontSize: "0.8rem", color: T.text3, marginBottom: 36 }}>
        <span>📅 {fmtDate(post.date)}</span>
        <span>⏱️ {post.readTime} read</span>
        <span>✍️ Abhishek</span>
      </div>

      {post.image && <img src={post.image} alt={post.title} style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 14, marginBottom: 32 }} />}

      <div className={isMr?"devanagari":""} style={{ fontSize: "1rem", lineHeight: 1.85, color: T.text }} dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }} />

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 36, paddingTop: 22, borderTop: `1px solid ${T.border}` }}>
        {(post.tags||[]).map(t => <span key={t} style={{ padding: "5px 12px", borderRadius: 8, fontSize: "0.76rem", border: `1px solid ${T.border}`, color: T.text2, background: T.bg2 }}>#{t}</span>)}
      </div>

      {/* Footer actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
        {isAuthor && <ActionBtn T={T} onClick={onEdit}>✏️ Edit Post</ActionBtn>}
        {isAuthor && <ActionBtn T={T} onClick={onDelete}>🗑️ Delete</ActionBtn>}
        <ActionBtn T={T} onClick={() => { navigator.clipboard.writeText(window.location.href); showToast("Link copied! 🔗"); }}>🔗 Share</ActionBtn>
      </div>
    </div>
  );
}

function ActionBtn({ T, onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 10, border: `1px solid ${T.border}`, background: hov ? T.bg2 : T.surface, color: T.text2, fontSize: "0.82rem", fontWeight: 500, transition: "all 0.18s" }}>
      {children}
    </button>
  );
}

/* ════════════ GALLERY ════════════ */
function GallerySection({ T, gallery, setGallery, isAuthor, setLightbox, showToast }) {
  const fileRef = useRef();

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    let done = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setGallery(g => [...g, { src: ev.target.result, caption: file.name.replace(/\.[^.]+$/, ""), date: new Date().toISOString().split("T")[0] }]);
        done++;
        if (done === files.length) { showToast(`${files.length} photo${files.length>1?"s":""} added! 📸`); }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease forwards" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h2 className="serif" style={{ fontSize: "1.7rem", fontWeight: 600 }}>Photo Gallery</h2>
          <p style={{ fontSize: "0.82rem", color: T.text3, marginTop: 4 }}>{gallery.length} photo{gallery.length !== 1 ? "s" : ""}</p>
        </div>
        {isAuthor && (
          <button onClick={() => fileRef.current.click()} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, background: T.accent, color: "#fff", fontWeight: 600, fontSize: "0.875rem", boxShadow: `0 4px 14px ${T.accent}55` }}>
            📸 Upload Photos
          </button>
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handleUpload} />

      {isAuthor && gallery.length === 0 && (
        <div onClick={() => fileRef.current.click()} style={{ border: `2px dashed ${T.border2}`, borderRadius: 16, padding: "60px 24px", textAlign: "center", cursor: "pointer", marginBottom: 28, background: T.surface, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = T.accentSoft; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border2; e.currentTarget.style.background = T.surface; }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📸</div>
          <div style={{ fontWeight: 600, color: T.text, marginBottom: 6 }}>Upload your first photo</div>
          <div style={{ fontSize: "0.875rem", color: T.text3 }}>Click or drag images here</div>
        </div>
      )}

      {gallery.length === 0 && !isAuthor ? (
        <div style={{ textAlign: "center", padding: "80px 20px", color: T.text3 }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>🖼️</div>
          <h3 className="serif" style={{ fontSize: "1.2rem", color: T.text2, marginBottom: 8 }}>Gallery coming soon</h3>
          <p style={{ fontSize: "0.875rem" }}>Beautiful photos will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {gallery.map((item, i) => <GalleryCard key={i} T={T} item={item} isAuthor={isAuthor}
            onView={() => setLightbox(item.src)} onDelete={() => { setGallery(g => g.filter((_,j)=>j!==i)); showToast("Photo removed"); }} />)}
        </div>
      )}
    </div>
  );
}

function GalleryCard({ T, item, isAuthor, onView, onDelete }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ position: "relative", borderRadius: 14, overflow: "hidden", aspectRatio: "4/3", border: `1px solid ${T.border}`, cursor: "pointer", transition: "all 0.22s", transform: hov ? "scale(1.02)" : "scale(1)", boxShadow: hov ? `0 10px 36px ${T.shadow2}` : "none" }}
      onClick={onView}>
      <img src={item.src} alt={item.caption} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hov ? "scale(1.06)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)", opacity: hov ? 1 : 0, transition: "opacity 0.22s", display: "flex", alignItems: "flex-end", padding: 14 }}>
        <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 500 }}>{item.caption}</span>
      </div>
      {isAuthor && (
        <div style={{ position: "absolute", top: 10, right: 10 }} onClick={e => { e.stopPropagation(); onDelete(); }}>
          <Ctrl color="rgba(220,38,38,0.88)" onClick={() => {}}>🗑️</Ctrl>
        </div>
      )}
    </div>
  );
}

/* ════════════ POST EDITOR ════════════ */
function Editor({ T, editingId, posts, setPosts, onClose, showToast }) {
  const existing = editingId ? posts.find(p => p.id === editingId) : null;
  const [title, setTitle] = useState(existing?.title || "");
  const [lang, setLang] = useState(existing?.lang || "en");
  const [category, setCategory] = useState(existing?.category || "");
  const [excerpt, setExcerpt] = useState(existing?.excerpt || "");
  const [tags, setTags] = useState((existing?.tags||[]).join(", "));
  const [content, setContent] = useState(existing?.content || "");
  const [imgData, setImgData] = useState(existing?.image || null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const taRef = useRef();
  const fileRef = useRef();

  const insert = (before, after = "") => {
    const ta = taRef.current; if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const sel = content.substring(s, e);
    const next = content.substring(0, s) + before + sel + after + content.substring(e);
    setContent(next);
    setTimeout(() => { ta.focus(); ta.setSelectionRange(s + before.length, s + before.length + sel.length); }, 0);
  };

  const save = () => {
    if (!title.trim() || !content.trim()) { showToast("Title and content are required!", "error"); return; }
    const tagArr = tags.split(",").map(t => t.trim()).filter(Boolean);
    const words = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.round(words / 200)) + " min";
    if (editingId) {
      setPosts(p => p.map(x => x.id === editingId ? { ...x, title, lang, category: category||"Misc", excerpt: excerpt || content.slice(0,110)+"…", tags: tagArr, content, readTime, image: imgData||"" } : x));
      showToast("Post updated! ✅");
    } else {
      const newPost = { id: uid(), title, lang, category: category||"Misc", excerpt: excerpt||content.slice(0,110)+"…", tags: tagArr, content, readTime, date: new Date().toISOString().split("T")[0], image: imgData||"", featured: posts.length === 0 };
      setPosts(p => [newPost, ...p]);
      showToast("Post published! 🚀");
    }
    onClose();
  };

  const inputSty = { width: "100%", padding: "11px 14px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.surface, color: T.text, fontSize: "0.95rem", outline: "none" };
  const labelSty = { display: "block", fontSize: "0.78rem", fontWeight: 600, color: T.text2, marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.05em" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: T.bg, overflowY: "auto", animation: "fadeIn 0.2s ease" }}>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "0 20px", height: 60, display: "flex", alignItems: "center", gap: 14 }}>
        <span className="serif" style={{ fontSize: "1.05rem", fontWeight: 600, flex: 1 }}>{editingId ? "✏️ Edit Post" : "✍️ New Post"}</span>
        <button onClick={onClose} style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${T.border}`, color: T.text2, fontSize: "0.875rem" }}>Discard</button>
        <button onClick={save} style={{ padding: "8px 20px", borderRadius: 8, background: T.accent, color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Publish 🚀</button>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "36px 20px" }}>
        {/* Title */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelSty}>Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Write a compelling title…" style={{ ...inputSty, fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 600 }} />
        </div>

        {/* Row: Lang + Category */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
          <div>
            <label style={labelSty}>Language</label>
            <select value={lang} onChange={e => setLang(e.target.value)} style={{ ...inputSty, cursor: "pointer" }}>
              <option value="en">🇬🇧 English</option>
              <option value="mr">🇮🇳 Marathi (मराठी)</option>
            </select>
          </div>
          <div>
            <label style={labelSty}>Category</label>
            <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Life, Travel, Food…" style={inputSty} />
          </div>
        </div>

        {/* Excerpt */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelSty}>Excerpt</label>
          <input value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="Short summary of your post…" style={inputSty} />
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelSty}>Tags (comma separated)</label>
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="travel, food, culture" style={inputSty} />
        </div>

        {/* Cover Image */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelSty}>Cover Image (optional)</label>
          {imgData
            ? <div style={{ position: "relative" }}>
                <img src={imgData} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 10 }} />
                <button onClick={() => setImgData(null)} style={{ position: "absolute", top: 10, right: 10, width: 32, height: 32, borderRadius: 8, background: "rgba(0,0,0,0.6)", color: "#fff" }}>✕</button>
              </div>
            : <label style={{ display: "block", border: `2px dashed ${T.border2}`, borderRadius: 10, padding: "28px", textAlign: "center", cursor: "pointer", background: T.bg2 }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>🖼️</div>
                <div style={{ fontSize: "0.875rem", color: T.text2 }}>Click to upload cover image</div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setImgData(ev.target.result); r.readAsDataURL(f); }} />
              </label>}
        </div>

        {/* Content */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <label style={{ ...labelSty, marginBottom: 0 }}>Content *</label>
            <div style={{ position: "relative" }}>
              <button onClick={() => setEmojiOpen(e => !e)} style={{ padding: "5px 12px", borderRadius: 7, border: `1px solid ${T.border}`, fontSize: "0.78rem", color: T.text2, background: T.bg2 }}>+ Emoji</button>
              {emojiOpen && (
                <div style={{ position: "absolute", top: "100%", right: 0, zIndex: 50, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 10, display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 3, boxShadow: `0 8px 28px ${T.shadow2}`, minWidth: 260 }}>
                  {EMOJIS.map(em => (
                    <button key={em} onClick={() => { insert(em); setEmojiOpen(false); }} style={{ width: 30, height: 30, borderRadius: 6, fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{em}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Toolbar */}
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap", padding: 8, border: `1px solid ${T.border}`, borderBottom: "none", borderRadius: "10px 10px 0 0", background: T.bg2 }}>
            {[["B","**","**"],["I","*","*"],["H2","\n## ",""],["H3","\n### ",""],["❝","\n> ",""],["•","\n- ",""]].map(([label, b, a]) => (
              <button key={label} onClick={() => insert(b,a)} style={{ width: 30, height: 30, borderRadius: 6, fontSize: "0.78rem", fontWeight: 600, color: T.text2, background: "transparent", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.bg3}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                {label}
              </button>
            ))}
            <button onClick={() => { const url = prompt("URL:","https://"); const txt = prompt("Link text:","Click here"); if (url&&txt) insert(`[${txt}](${url})`); }} style={{ padding: "0 8px", height: 30, borderRadius: 6, fontSize: "0.78rem", color: T.text2, background: "transparent" }}>🔗</button>
          </div>
          <textarea ref={taRef} value={content} onChange={e => setContent(e.target.value)}
            placeholder={"Write your story here…\n\nUse Markdown:\n## Heading\n**bold** *italic*\n> blockquote\n- list"}
            style={{ width: "100%", padding: "14px 16px", border: `1px solid ${T.border}`, borderRadius: "0 0 10px 10px", background: T.surface, color: T.text, fontSize: "0.95rem", outline: "none", resize: "vertical", minHeight: 320, lineHeight: 1.8, fontFamily: "inherit" }} />
        </div>
      </div>
    </div>
  );
}

/* ════════════ AUTH MODAL ════════════ */
function AuthModal({ T, onClose, onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const attempt = () => {
    if (user === "abhishek" && pass === "writes@2025") { onLogin(); }
    else { setErr(true); setPass(""); }
  };
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: T.surface, borderRadius: 20, padding: 36, width: "100%", maxWidth: 380, border: `1px solid ${T.border}`, boxShadow: `0 24px 70px ${T.shadow2}`, animation: "scaleIn 0.25s ease" }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <LogoMark T={T} />
          <h2 className="serif" style={{ fontSize: "1.45rem", fontWeight: 600, marginTop: 12, marginBottom: 4 }}>Author Login</h2>
          <p style={{ fontSize: "0.82rem", color: T.text3 }}>Sign in to manage your blog</p>
        </div>
        {err && <div style={{ padding: "9px 14px", borderRadius: 8, background: "#fef2f2", color: "#dc2626", fontSize: "0.82rem", marginBottom: 14, border: "1px solid #fecaca" }}>Incorrect credentials. Try again.</div>}
        <Field label="Username" T={T}><input value={user} onChange={e => setUser(e.target.value)} onKeyDown={e => e.key==="Enter"&&attempt()} placeholder="Username" autoFocus style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg2, color: T.text, fontSize: "0.9rem", outline: "none" }} /></Field>
        <Field label="Password" T={T}><input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key==="Enter"&&attempt()} placeholder="Password" style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg2, color: T.text, fontSize: "0.9rem", outline: "none" }} /></Field>
        <button onClick={attempt} style={{ width: "100%", padding: 12, borderRadius: 10, background: T.accent, color: "#fff", fontWeight: 700, fontSize: "0.9rem", marginTop: 6 }}>Sign In ✍️</button>
        <button onClick={onClose} style={{ width: "100%", padding: 11, borderRadius: 10, border: `1px solid ${T.border}`, color: T.text2, fontSize: "0.875rem", marginTop: 10 }}>Cancel</button>
      </div>
    </Overlay>
  );
}

function Field({ label, T, children }) {
  return <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: T.text2, marginBottom: 6 }}>{label}</label>{children}</div>;
}

/* ════════════ CONFIRM DIALOG ════════════ */
function ConfirmDialog({ T, onCancel, onConfirm }) {
  return (
    <Overlay onClose={onCancel}>
      <div style={{ background: T.surface, borderRadius: 16, padding: 28, maxWidth: 360, width: "calc(100% - 40px)", border: `1px solid ${T.border}`, textAlign: "center", animation: "scaleIn 0.22s ease" }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: "2.2rem", marginBottom: 10 }}>🗑️</div>
        <h3 className="serif" style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 8 }}>Delete Post?</h3>
        <p style={{ fontSize: "0.875rem", color: T.text2, marginBottom: 22, lineHeight: 1.6 }}>This cannot be undone. The post will be permanently removed.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={onCancel} style={{ padding: "10px 22px", borderRadius: 8, border: `1px solid ${T.border}`, color: T.text2, fontSize: "0.875rem" }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: "10px 22px", borderRadius: 8, background: "#dc2626", color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>Delete</button>
        </div>
      </div>
    </Overlay>
  );
}

/* ════════════ FOOTER ════════════ */
function Footer({ T, switchTab }) {
  return (
    <footer style={{ background: T.surface, borderTop: `1px solid ${T.border}`, padding: "56px 20px 36px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 44 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, cursor: "pointer" }} onClick={() => switchTab("home")}>
              <LogoMark T={T} />
              <span className="serif" style={{ fontSize: "1.3rem", fontWeight: 700 }}>Abhishek <span style={{ color: T.accent }}>Writes</span></span>
            </div>
            <p style={{ fontSize: "0.875rem", color: T.text3, lineHeight: 1.7, marginBottom: 20, maxWidth: 270 }}>A personal blog where stories come alive in two languages. Exploring life, culture, and everything in between.</p>
            <div style={{ display: "flex", gap: 9 }}>
              {[["𝕏","https://twitter.com"],["📸","https://instagram.com"],["in","https://linkedin.com"],["✉️","mailto:abhishek@example.com"]].map(([icon, href]) => (
                <a key={icon} href={href} target="_blank" rel="noopener" style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${T.border}`, background: T.bg2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", color: T.text2, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.accentSoft; e.currentTarget.style.color = T.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = T.bg2; e.currentTarget.style.color = T.text2; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {/* Explore */}
          <div>
            <div className="serif" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 14 }}>Explore</div>
            {[["🏠 All Stories","home"],["🇬🇧 English Posts","english"],["🇮🇳 मराठी पोस्ट","marathi"],["🖼️ Photo Gallery","gallery"]].map(([label,t]) => (
              <div key={t} onClick={() => switchTab(t)} style={{ fontSize: "0.875rem", color: T.text3, marginBottom: 10, cursor: "pointer", transition: "color 0.18s" }}
                onMouseEnter={e => e.currentTarget.style.color = T.accent}
                onMouseLeave={e => e.currentTarget.style.color = T.text3}>{label}</div>
            ))}
          </div>
          {/* Contact */}
          <div>
            <div className="serif" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 14 }}>Connect</div>
            {[["✉️","abhishek@example.com"],["📍","Maharashtra, India"],["🐦","@abhishekwrites"],["📸","@abhishekwrites"]].map(([icon, val]) => (
              <div key={val} style={{ display: "flex", gap: 9, fontSize: "0.875rem", color: T.text3, marginBottom: 11, alignItems: "flex-start" }}>
                <span style={{ color: T.accent, flexShrink: 0 }}>{icon}</span>{val}
              </div>
            ))}
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: "0.78rem", color: T.text3 }}>
          <span>© 2025 Abhishek Writes. Made with ❤️ in Maharashtra.</span>
          <span>Designed for storytelling.</span>
        </div>
      </div>
    </footer>
  );
}

/* ════════════ MISC ════════════ */
function Overlay({ onClose, children }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease", padding: 20 }}>
      {children}
    </div>
  );
}

function Lightbox({ src, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 600, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.2s ease" }}>
      <img src={src} style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 8 }} />
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
    </div>
  );
}

function Toast({ T, msg, type }) {
  return (
    <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "11px 20px", display: "flex", alignItems: "center", gap: 9, boxShadow: `0 8px 28px ${T.shadow2}`, zIndex: 999, fontSize: "0.875rem", whiteSpace: "nowrap", animation: "fadeUp 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
      <span>{type === "success" ? "✅" : "❌"}</span>
      <span style={{ color: T.text }}>{msg}</span>
    </div>
  );
}

function ReadingProgress({ T }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${T.accent}, ${T.accent2})`, transformOrigin: "left", transform: `scaleX(${pct/100})`, zIndex: 200, transition: "transform 0.1s" }} />;
}
