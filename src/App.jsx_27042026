import { useState, useEffect, useRef, useCallback } from "react";

/* LOGO - embedded as base64 */
const LOGO_SRC = "LOGO_PLACEHOLDER";

const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Noto+Sans+Devanagari:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 100%; min-height: 100vh; scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #f0ebe3; }
    ::-webkit-scrollbar-thumb { background: #c8bfb4; border-radius: 3px; }
    .serif { font-family: 'Cormorant Garamond', Georgia, serif !important; }
    .deva  { font-family: 'Noto Sans Devanagari', sans-serif !important; }
    @keyframes fadeUp  { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes scaleIn { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:scale(1); } }
    .fu { animation: fadeUp  .5s ease forwards; }
    .fi { animation: fadeIn  .3s ease forwards; }
    .si { animation: scaleIn .25s ease forwards; }
    button, input, textarea, select { font-family: inherit; }
    button { cursor: pointer; border: none; background: none; }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; display: block; }
    @media(max-width:768px)  { .desk { display:none!important; } .mob { display:flex!important; } }
    @media(min-width:769px)  { .mob  { display:none!important; } }
    @media(max-width:1024px) { .sidebar { display:none!important; } }
    @media(max-width:600px)  { .feat-grid { grid-template-columns:1fr!important; } }
  `}</style>
);

/* THEMES */
const L = {
  bg:"#f9f6f1", bg2:"#ede8e0", bg3:"#e0d8cc",
  surface:"#ffffff", surface2:"#faf8f5",
  text:"#1a1410", text2:"#4a3f35", text3:"#6e5e50",
  accent:"#c0392b", accent2:"#d94030", accentSoft:"#fdecea",
  blue:"#1d4ed8", border:"#ddd5c8", border2:"#c8bfb0",
  shadow:"rgba(26,20,16,.08)", shadow2:"rgba(26,20,16,.16)",
  cardBg:"#ffffff", inputBg:"#f4efe8",
};
const D = {
  bg:"#110e08", bg2:"#18150d", bg3:"#201c12",
  surface:"#1c1910", surface2:"#221f14",
  text:"#f0ead8", text2:"#b8a88a", text3:"#6e5e48",
  accent:"#e04535", accent2:"#f05545", accentSoft:"#2c1410",
  blue:"#60a5fa", border:"#2a2518", border2:"#38301e",
  shadow:"rgba(0,0,0,.32)", shadow2:"rgba(0,0,0,.52)",
  cardBg:"#1c1910", inputBg:"#201c12",
};

/* SEED POSTS */
const SEED = [
  { id:"p1", lang:"en", featured:true,
    title:"The Art of Finding Beauty in Ordinary Days",
    category:"Life", tags:["reflection","mindfulness","everyday"],
    date:"2025-04-15", readTime:"4 min",
    excerpt:"Sometimes the most extraordinary stories are written in the margins of mundane mornings.",
    image:"",
    content:"## The Ordinary Hours\n\nThere's something quietly magnificent about Tuesday mornings. The world hasn't yet decided what kind of day it wants to be, and in that indecision, there's space — *infinite*, generous space — for wonder. 🌅\n\nI've been keeping a small notebook. A pocket-sized thing for those moments when a thought arrives fully formed, like a stranger on a bench who changes how you see the world.\n\n## What I've Noticed\n\nThe pattern in my tea, the particular silence before rain, the way certain songs arrive right when you need them — these aren't accidents. They're invitations to pay attention.\n\n> \"The ordinary is extraordinary if only we could see it clearly.\"\n\n- A child arguing passionately with a pigeon about who owns the bench\n- The smell of old books in a used shop\n- My neighbor's laugh which sounds exactly like a question mark\n\n**What would happen** if we treated each day like a short story we were reading for the first time? 📖" },
  { id:"p2", lang:"mr", featured:false,
    title:"पावसाळ्यातील माझ्या गावाची गोष्ट",
    category:"निसर्ग", tags:["पाऊस","गाव","आठवणी"],
    date:"2025-04-10", readTime:"3 min",
    excerpt:"पाऊस पडला की माझ्या गावाचं रूप पालटतं — हिरवाईने नटलेल्या त्या वाटांवर मन रमतं.",
    image:"",
    content:"## पहिला पाऊस 🌧️\n\nजेव्हा पहिला पाऊस येतो, तेव्हा माती एक वेगळाच सुगंध सोडते. माझ्यासाठी तो फक्त \"घराचा वास\" आहे.\n\n> पाऊस म्हणजे फक्त पाणी नाही — पाऊस म्हणजे एक संगीत आहे, जे जमिनीशी संवाद करतं.\n\n**गावातील पाऊस** शहरातल्या पावसापेक्षा वेगळा असतो. शेतकरी बघतात — डोळ्यात पाणी की हर्ष? दोन्ही एकत्र असतात. 🌾" },
  { id:"p3", lang:"en", featured:false,
    title:"Why I Stopped Optimizing My Morning Routine",
    category:"Lifestyle", tags:["productivity","wellness","mornings"],
    date:"2025-04-05", readTime:"5 min",
    excerpt:"Every productivity guru told me to hack my mornings. I tried. Here is what actually happened.",
    image:"",
    content:"## The Optimization Trap ⏱️\n\nFor six months I followed the perfect morning routine. Cold shower at 5:47am. Seventeen minutes of journaling exactly.\n\nI was *efficient*. I was also exhausted and slightly unhinged.\n\n## What I Realized\n\n- I started noticing when I was actually hungry\n- My dog started getting longer, more wandering walks\n- I found out I really enjoy just sitting with coffee doing absolutely nothing\n\n> The irony: my work got better when I stopped being at war with the morning.\n\nIt's not productive. It's just mine. And that's exactly enough. 🌿" },
  { id:"p4", lang:"mr", featured:false,
    title:"स्वयंपाकघरातील ज्ञान: आजीच्या पाककृती",
    category:"संस्कृती", tags:["आजी","खाणं","संस्कृती"],
    date:"2025-03-28", readTime:"4 min",
    excerpt:"आजीच्या हातचं जेवण म्हणजे फक्त खाणं नाही — ती एक भाषा होती, प्रेमाची.",
    image:"",
    content:"## जेवणाची भाषा 🍲\n\nआजी कधीही रेसिपी लिहून ठेवत नसे. \"चव बघ, समजेल\" एवढंच सांगायची.\n\n- स्वयंपाक म्हणजे फक्त भूक भागवणं नाही, ती एक काळजी आहे\n- वेळ द्यावा लागतो\n\n> \"अन्न हे पूर्णब्रह्म\" — आजी रोज म्हणायची.\n\nआज मी तिची डाळ करण्याचा प्रयत्न करतो. त्या प्रयत्नातच ती जगत असते. ❤️" },
];

const SEED_ABOUT = {
  name:"Abhishek Mhatre", tagline:"Writer · Thinker · Storyteller",
  bio:"Hi! I'm Abhishek, a passionate writer from Maharashtra, India. I write in both English and Marathi — exploring life, culture, food, travel, and everything in between.\n\nThis blog is my personal space to share thoughts, stories, and reflections that matter to me. Whether it's a quiet morning observation or a deep dive into Marathi culture, I hope my words find you at the right moment.",
  location:"Maharashtra, India", email:"abhishek@example.com",
  twitter:"abhishekwrites", instagram:"abhishekwrites",
  whatsapp:"+919876543210", website:"https://abhishek-mhatre.vercel.app",
  interests:["Writing ✍️","Reading 📚","Travel 🌍","Food 🍲","Photography 📸","Marathi Culture 🎭"],
};

/* MARKDOWN PARSER */
function parseMd(text) {
  if (!text) return "";
  const lines = text.split("\n");
  const out = []; let ul = false;
  for (const l of lines) {
    if (l.startsWith("## "))  { if(ul){out.push("</ul>");ul=false;} out.push(`<h2 style="font-family:'Cormorant Garamond',serif;font-size:1.45rem;font-weight:600;margin:1.8em 0 .6em">${l.slice(3)}</h2>`); }
    else if(l.startsWith("### ")) { if(ul){out.push("</ul>");ul=false;} out.push(`<h3 style="font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;margin:1.4em 0 .5em">${l.slice(4)}</h3>`); }
    else if(l.startsWith("> ")) { if(ul){out.push("</ul>");ul=false;} out.push(`<blockquote style="border-left:3px solid #c0392b;padding:10px 18px;margin:1.4em 0;background:rgba(192,57,43,.07);border-radius:0 8px 8px 0;font-style:italic">${l.slice(2)}</blockquote>`); }
    else if(l.startsWith("- ")) { if(!ul){out.push('<ul style="padding-left:1.4em;margin:.8em 0">');ul=true;} out.push(`<li style="margin-bottom:6px">${fmtInl(l.slice(2))}</li>`); }
    else if(l.trim()==="")   { if(ul){out.push("</ul>");ul=false;} out.push("<br/>"); }
    else { if(ul){out.push("</ul>");ul=false;} out.push(`<p style="margin-bottom:1.2em;line-height:1.85">${fmtInl(l)}</p>`); }
  }
  if(ul) out.push("</ul>");
  return out.join("");
}
function fmtInl(t) {
  return t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
          .replace(/\*(.+?)\*/g,"<em>$1</em>")
          .replace(/\[(.+?)\]\((.+?)\)/g,'<a href="$2" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:underline">$1</a>');
}

const fmtDate = s => s ? new Date(s).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}) : "";
const uid = () => "p"+Date.now();
const LS  = {
  get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d;}catch{return d;}},
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))
};
const EMOJIS = ["😊","❤️","🌟","✨","🎉","🔥","💫","🌈","🌸","☀️","🌙","⭐","💪","🙏","👏","📖","✍️","🌿","🍂","🌧️","🏔️","🌊","🦋","🌺","🍃","🎨","💡","🚀","🌍","📸","🍲","🍋"];

/* SVG SOCIAL ICONS */
function WaIcon({size=18}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}
function TwIcon({size=18}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function IgIcon({size=18}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
}
function FbIcon({size=18}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}

/* ═══════════════════════════════════════
   ROOT APP
═══════════════════════════════════════ */
export default function App() {
  const [dark,    setDark]    = useState(()=>LS.get("aw_theme","light")==="dark");
  const [posts,   setPosts]   = useState(()=>LS.get("aw_posts",SEED));
  const [gallery, setGallery] = useState(()=>LS.get("aw_gallery",[]));
  const [about,   setAbout]   = useState(()=>LS.get("aw_about",SEED_ABOUT));
  const [tab,     setTab]     = useState("home");
  const [openPost,setOpenPost]= useState(null);
  const [isAuthor,setIsAuthor]= useState(false);
  const [authOpen,setAuthOpen]= useState(false);
  const [editorOpen,setEditorOpen] = useState(false);
  const [editingId, setEditingId]  = useState(null);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState(null);
  const [lightbox,setLightbox]= useState(null);
  const [toast,   setToast]   = useState(null);
  const [delTarget,setDelTarget] = useState(null);
  const [mobMenu, setMobMenu] = useState(false);
  const [aboutEdOpen,setAboutEdOpen] = useState(false);

  const T = dark ? D : L;

  useEffect(()=>LS.set("aw_theme",dark?"dark":"light"),[dark]);
  useEffect(()=>LS.set("aw_posts",posts),[posts]);
  useEffect(()=>LS.set("aw_gallery",gallery),[gallery]);
  useEffect(()=>LS.set("aw_about",about),[about]);

  const showToast = useCallback((msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3200);},[]);

  const filtered = (()=>{
    let p=[...posts];
    if(tab==="english") p=p.filter(x=>x.lang==="en");
    if(tab==="marathi") p=p.filter(x=>x.lang==="mr");
    if(filter) p=p.filter(x=>x.category===filter||(x.tags||[]).includes(filter));
    if(search){const q=search.toLowerCase();p=p.filter(x=>x.title.toLowerCase().includes(q)||x.excerpt.toLowerCase().includes(q));}
    return p;
  })();

  const allCats = [...new Set(posts.map(p=>p.category))];
  const allTags = [...new Set(posts.flatMap(p=>p.tags||[]))];
  const go = t => { setTab(t); setOpenPost(null); setFilter(null); setSearch(""); setMobMenu(false); };

  return (
    <div style={{background:T.bg,color:T.text,minHeight:"100vh",width:"100%",fontFamily:"'DM Sans',sans-serif",transition:"background .3s,color .3s",overflowX:"hidden"}}>
      <FontStyle/>
      <Header T={T} dark={dark} setDark={setDark} tab={tab} go={go}
        isAuthor={isAuthor} setAuthOpen={setAuthOpen} setIsAuthor={setIsAuthor}
        mobMenu={mobMenu} setMobMenu={setMobMenu} showToast={showToast}/>
      {mobMenu && (
        <div style={{position:"sticky",top:64,zIndex:90,background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"10px 16px 14px",boxShadow:`0 8px 24px ${T.shadow}`}}>
          {[["home","🏠 Home"],["english","🇬🇧 English"],["marathi","🇮🇳 मराठी"],["gallery","🖼️ Gallery"],["about","👤 About"]].map(([t,label])=>(
            <button key={t} onClick={()=>go(t)} style={{display:"block",width:"100%",textAlign:"left",padding:"11px 16px",borderRadius:10,fontSize:"0.9rem",color:tab===t?T.accent:T.text2,background:tab===t?T.accentSoft:"transparent",marginBottom:2}}>{label}</button>
          ))}
        </div>
      )}
      {openPost && <ReadingProgress T={T}/>}
      {!openPost && tab!=="gallery" && tab!=="about" && <Hero T={T} posts={posts} gallery={gallery}/>}
      <TabsBar T={T} tab={tab} go={go}/>
      <main style={{width:"100%",maxWidth:1440,margin:"0 auto",padding:"48px 24px"}}>
        {openPost ? (
          <PostView T={T} post={posts.find(p=>p.id===openPost)} onBack={()=>setOpenPost(null)}
            isAuthor={isAuthor} onEdit={()=>{setEditingId(openPost);setEditorOpen(true);}}
            onDelete={()=>setDelTarget(openPost)} showToast={showToast}/>
        ) : tab==="gallery" ? (
          <GallerySection T={T} gallery={gallery} setGallery={setGallery} isAuthor={isAuthor} setLightbox={setLightbox} showToast={showToast}/>
        ) : tab==="about" ? (
          <AboutPage T={T} about={about} isAuthor={isAuthor} onEdit={()=>setAboutEdOpen(true)}/>
        ) : (
          <BlogLayout T={T} filtered={filtered} posts={posts} isAuthor={isAuthor}
            setOpenPost={setOpenPost} setFilter={setFilter} filter={filter}
            search={search} setSearch={setSearch} allCats={allCats} allTags={allTags}
            onEdit={id=>{setEditingId(id);setEditorOpen(true);}} onDelete={id=>setDelTarget(id)}/>
        )}
      </main>
      {!openPost && <Footer T={T} go={go} about={about}/>}
      {isAuthor && tab!=="gallery" && tab!=="about" && <Fab T={T} onClick={()=>{setEditingId(null);setEditorOpen(true);}}/>}
      {authOpen    && <AuthModal     T={T} onClose={()=>setAuthOpen(false)}    onLogin={()=>{setIsAuthor(true);setAuthOpen(false);showToast("Welcome back, Abhishek! ✍️");}}/>}
      {editorOpen  && <Editor        T={T} editingId={editingId} posts={posts} setPosts={setPosts} onClose={()=>setEditorOpen(false)} showToast={showToast}/>}
      {aboutEdOpen && <AboutEditor   T={T} about={about} setAbout={setAbout}   onClose={()=>setAboutEdOpen(false)} showToast={showToast}/>}
      {lightbox    && <Lightbox      src={lightbox} onClose={()=>setLightbox(null)}/>}
      {delTarget   && <ConfirmDlg    T={T} onCancel={()=>setDelTarget(null)}   onConfirm={()=>{setPosts(p=>p.filter(x=>x.id!==delTarget));setDelTarget(null);if(openPost===delTarget)setOpenPost(null);showToast("Post deleted");}}/>}
      {toast       && <Toast         T={T} msg={toast.msg} type={toast.type}/>}
    </div>
  );
}

/* HEADER */
function Header({T,dark,setDark,tab,go,isAuthor,setAuthOpen,setIsAuthor,mobMenu,setMobMenu,showToast}) {
  return (
    <header style={{position:"sticky",top:0,zIndex:100,background:T.surface,borderBottom:`1px solid ${T.border}`,boxShadow:`0 2px 20px ${T.shadow}`}}>
      <div style={{maxWidth:1440,margin:"0 auto",padding:"0 24px",height:64,display:"flex",alignItems:"center",gap:16}}>
        <div onClick={()=>go("home")} style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}}>
          <img src={LOGO_SRC} alt="Abhishek Writes" style={{width:42,height:42,borderRadius:10,objectFit:"cover",flexShrink:0,boxShadow:`0 2px 8px ${T.shadow}`}}/>
          <span className="serif" style={{fontSize:"1.35rem",fontWeight:700,letterSpacing:"-.02em",color:T.text}}>
            Abhishek <span style={{color:T.accent}}>Writes</span>
          </span>
        </div>
        <nav className="desk" style={{display:"flex",gap:2,marginLeft:"auto"}}>
          {[["home","Home"],["english","English 🇬🇧"],["marathi","मराठी 🇮🇳"],["gallery","Gallery 🖼️"],["about","About 👤"]].map(([t,label])=>(
            <NavBtn key={t} active={tab===t} T={T} onClick={()=>go(t)}>{label}</NavBtn>
          ))}
        </nav>
        <div className="desk" style={{display:"flex",alignItems:"center",gap:8,marginLeft:8}}>
          <IBtn T={T} title={dark?"Light":"Dark"} onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</IBtn>
          {isAuthor && <span style={{padding:"5px 12px",borderRadius:8,background:T.accentSoft,color:T.accent,fontSize:"0.78rem",fontWeight:600}}>✍️ Author</span>}
          <IBtn T={T} title={isAuthor?"Logout":"Login"} onClick={()=>isAuthor?(setIsAuthor(false),showToast("Logged out")):setAuthOpen(true)}>{isAuthor?"🔓":"🔐"}</IBtn>
        </div>
        <div className="mob" style={{display:"flex",alignItems:"center",gap:6,marginLeft:"auto"}}>
          <IBtn T={T} onClick={()=>setDark(d=>!d)}>{dark?"☀️":"🌙"}</IBtn>
          <IBtn T={T} onClick={()=>isAuthor?(setIsAuthor(false),showToast("Logged out")):setAuthOpen(true)}>{isAuthor?"🔓":"🔐"}</IBtn>
          <IBtn T={T} onClick={()=>setMobMenu(m=>!m)}>☰</IBtn>
        </div>
      </div>
    </header>
  );
}
function NavBtn({children,active,T,onClick}) {
  const [hov,setHov]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
    style={{padding:"8px 15px",borderRadius:8,fontSize:".875rem",fontWeight:500,color:active?T.accent:hov?T.text:T.text2,background:active?T.accentSoft:hov?T.bg2:"transparent",transition:"all .2s",whiteSpace:"nowrap"}}>{children}</button>;
}
function IBtn({children,T,onClick,title}) {
  const [h,setH]=useState(false);
  return <button onClick={onClick} title={title} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:h?T.text:T.text2,background:h?T.bg2:"transparent",fontSize:"1rem",transition:"all .2s"}}>{children}</button>;
}

/* HERO */
function Hero({T,posts,gallery}) {
  const en=posts.filter(p=>p.lang==="en").length, mr=posts.filter(p=>p.lang==="mr").length;
  return (
    <section style={{background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"80px 24px 64px",textAlign:"center",position:"relative",overflow:"hidden",width:"100%"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 80% 60% at 50% -5%,${T.accent}18,transparent)`,pointerEvents:"none"}}/>
      <div style={{position:"relative",maxWidth:680,margin:"0 auto"}}>
        <div className="fu" style={{display:"inline-flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:100,border:`1px solid ${T.border2}`,background:T.bg2,fontSize:".75rem",fontWeight:600,color:T.text3,marginBottom:22,letterSpacing:".07em",textTransform:"uppercase"}}>
          ✨ Personal Blog & Stories
        </div>
        <h1 className="serif fu" style={{fontSize:"clamp(2.4rem,5vw,4.2rem)",fontWeight:700,lineHeight:1.1,letterSpacing:"-.03em",marginBottom:20,animationDelay:".05s",opacity:0,color:T.text}}>
          Words that <em style={{color:T.accent}}>wander,</em><br/>thoughts that stay.
        </h1>
        <p className="fu" style={{maxWidth:520,margin:"0 auto 40px",fontSize:"1.05rem",color:T.text2,lineHeight:1.78,animationDelay:".1s",opacity:0}}>
          A space where stories unfold in English and Marathi — personal reflections, ideas, and the beauty of bilingual expression.
        </p>
        <div className="fu" style={{display:"flex",justifyContent:"center",gap:36,flexWrap:"wrap",animationDelay:".15s",opacity:0}}>
          {[["Stories",posts.length],["English",en],["मराठी",mr],["Photos",gallery.length]].map(([label,num],i)=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:36}}>
              {i>0 && <div style={{width:1,height:44,background:T.border}}/>}
              <div style={{textAlign:"center"}}>
                <div className="serif" style={{fontSize:"2rem",fontWeight:700,lineHeight:1,color:T.text}}>{num}</div>
                <div style={{fontSize:".72rem",color:T.text3,marginTop:5,textTransform:"uppercase",letterSpacing:".07em"}}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* TABS */
function TabsBar({T,tab,go}) {
  return (
    <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,position:"sticky",top:64,zIndex:80,width:"100%"}}>
      <div style={{maxWidth:1440,margin:"0 auto",padding:"0 24px",display:"flex",overflowX:"auto",scrollbarWidth:"none"}}>
        {[["home","All Posts"],["english","English 🇬🇧"],["marathi","मराठी 🇮🇳"],["gallery","Gallery 🖼️"],["about","About 👤"]].map(([t,label])=>(
          <button key={t} onClick={()=>go(t)} style={{padding:"15px 22px",fontSize:".875rem",fontWeight:500,color:tab===t?T.accent:T.text3,borderBottom:`2px solid ${tab===t?T.accent:"transparent"}`,whiteSpace:"nowrap",flexShrink:0,transition:"all .2s",background:"transparent"}}>{label}</button>
        ))}
      </div>
    </div>
  );
}

/* BLOG LAYOUT - centered with sidebar */
function BlogLayout({T,filtered,posts,isAuthor,setOpenPost,setFilter,filter,search,setSearch,allCats,allTags,onEdit,onDelete}) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:44,alignItems:"start",maxWidth:1200,margin:"0 auto"}}>
      <div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32,flexWrap:"wrap",gap:12}}>
          <div>
            <h2 className="serif" style={{fontSize:"1.6rem",fontWeight:600,color:T.text}}>Latest Stories</h2>
            <p style={{fontSize:".82rem",color:T.text3,marginTop:3}}>{filtered.length} post{filtered.length!==1?"s":""}</p>
          </div>
          {filter && <button onClick={()=>setFilter(null)} style={{padding:"7px 14px",borderRadius:8,border:`1px solid ${T.border}`,fontSize:".82rem",color:T.text2,background:T.bg2}}>Clear: {filter} ✕</button>}
        </div>
        {filtered.length===0 ? <Empty T={T} isAuthor={isAuthor}/> : (
          <div style={{display:"grid",gap:24}}>
            {filtered.map((post,i)=>(
              <PostCard key={post.id} T={T} post={post} featured={post.featured&&i===0&&!search&&!filter}
                delay={i*.05} isAuthor={isAuthor} onClick={()=>setOpenPost(post.id)}
                onEdit={()=>onEdit(post.id)} onDelete={()=>onDelete(post.id)}/>
            ))}
          </div>
        )}
      </div>
      <div className="sidebar">
        <Sidebar T={T} posts={posts} allCats={allCats} allTags={allTags} filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} setOpenPost={setOpenPost}/>
      </div>
    </div>
  );
}

/* POST CARD */
function PostCard({T,post,featured,delay,isAuthor,onClick,onEdit,onDelete}) {
  const [hov,setHov]=useState(false);
  const mr=post.lang==="mr";
  return (
    <div className={featured?"feat-grid":""} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}
      style={{background:T.cardBg,border:`1px solid ${hov?T.border2:T.border}`,borderRadius:18,overflow:"hidden",cursor:"pointer",
        transition:"all .22s",transform:hov?"translateY(-3px)":"translateY(0)",boxShadow:hov?`0 12px 40px ${T.shadow2}`:"none",
        display:featured?"grid":"block",gridTemplateColumns:featured?"1fr 1fr":undefined,
        animation:`fadeUp .45s ease ${delay}s forwards`,opacity:0}}>
      <div style={{height:featured?"100%":224,minHeight:featured?290:undefined,background:T.bg3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3rem",position:"relative",overflow:"hidden"}}>
        {post.image
          ? <img src={post.image} alt={post.title} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s",transform:hov?"scale(1.05)":"scale(1)"}}/>
          : <span style={{opacity:.4}}>{mr?"📖":"✍️"}</span>}
        <span style={{position:"absolute",top:12,left:12,padding:"4px 10px",borderRadius:6,fontSize:".7rem",fontWeight:700,letterSpacing:".05em",background:mr?"rgba(192,57,43,.9)":"rgba(37,99,235,.9)",color:"#fff"}}>{mr?"मर":"EN"}</span>
        {isAuthor && (
          <div style={{position:"absolute",top:10,right:10,display:"flex",gap:6}} onClick={e=>e.stopPropagation()}>
            <button onClick={onEdit} style={{width:30,height:30,borderRadius:7,background:"#2563eb",color:"#fff",fontSize:".75rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✏️</button>
            <button onClick={onDelete} style={{width:30,height:30,borderRadius:7,background:"#dc2626",color:"#fff",fontSize:".75rem",display:"flex",alignItems:"center",justifyContent:"center"}}>🗑️</button>
          </div>
        )}
      </div>
      <div style={{padding:24}}>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
          <span style={{fontSize:".72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",color:T.accent,background:T.accentSoft,padding:"3px 9px",borderRadius:5}}>{post.category}</span>
          <span style={{fontSize:".76rem",color:T.text3}}>📅 {fmtDate(post.date)}</span>
          <span style={{fontSize:".76rem",color:T.text3}}>⏱️ {post.readTime}</span>
        </div>
        <h3 className={`serif${mr?" deva":""}`} style={{fontSize:featured?"1.45rem":"1.2rem",fontWeight:600,lineHeight:1.3,marginBottom:10,color:hov?T.accent:T.text,transition:"color .2s"}}>{post.title}</h3>
        <p className={mr?"deva":""} style={{fontSize:".88rem",color:T.text2,lineHeight:1.72,marginBottom:14}}>{post.excerpt}</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {(post.tags||[]).slice(0,3).map(t=><span key={t} style={{fontSize:".7rem",padding:"3px 9px",borderRadius:5,background:T.bg2,color:T.text3,border:`1px solid ${T.border}`}}>#{t}</span>)}
          </div>
          <span style={{fontSize:".8rem",color:T.accent,fontWeight:600}}>Read {mr?"करा":"more"} →</span>
        </div>
      </div>
    </div>
  );
}

/* SIDEBAR */
function Sidebar({T,posts,allCats,allTags,filter,setFilter,search,setSearch,setOpenPost}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <SC T={T} title="🔍 Search">
        <div style={{position:"relative"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search posts…"
            style={{width:"100%",padding:"10px 36px 10px 12px",borderRadius:10,border:`1px solid ${T.border}`,background:T.inputBg,color:T.text,fontSize:".875rem",outline:"none"}}/>
          <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:T.text3}}>🔍</span>
        </div>
      </SC>
      <SC T={T} title="📂 Categories">
        {[["📚 All",null],...allCats.map(c=>[`• ${c}`,c])].map(([label,val])=>(
          <button key={label} onClick={()=>setFilter(val)}
            style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",padding:"8px 10px",borderRadius:8,fontSize:".875rem",color:filter===val?T.accent:T.text2,background:filter===val?T.accentSoft:"transparent",textAlign:"left",marginBottom:3}}>
            {label}<span style={{fontSize:".7rem",padding:"2px 7px",borderRadius:5,background:T.bg3,color:T.text3}}>{val?posts.filter(p=>p.category===val).length:posts.length}</span>
          </button>
        ))}
      </SC>
      <SC T={T} title="🕐 Recent">
        {posts.slice(0,4).map(p=>(
          <div key={p.id} onClick={()=>setOpenPost(p.id)} style={{display:"flex",gap:11,cursor:"pointer",marginBottom:14}}>
            <div style={{width:52,height:52,borderRadius:8,background:T.bg3,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.3rem"}}>{p.lang==="mr"?"📖":"✍️"}</div>
            <div>
              <div className={p.lang==="mr"?"deva":""} style={{fontSize:".8rem",fontWeight:500,color:T.text,lineHeight:1.3,marginBottom:4}}>{p.title}</div>
              <div style={{fontSize:".72rem",color:T.text3}}>{fmtDate(p.date)}</div>
            </div>
          </div>
        ))}
      </SC>
      <SC T={T} title="🏷️ Tags">
        <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
          {allTags.map(t=><button key={t} onClick={()=>setFilter(t)} style={{padding:"5px 11px",borderRadius:7,fontSize:".75rem",border:`1px solid ${filter===t?T.accent:T.border}`,color:filter===t?T.accent:T.text2,background:filter===t?T.accentSoft:T.bg2,cursor:"pointer"}}>#{t}</button>)}
        </div>
      </SC>
    </div>
  );
}
function SC({T,title,children}) {
  return (
    <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:20}}>
      <div className="serif" style={{fontSize:".95rem",fontWeight:600,color:T.text,marginBottom:14,paddingBottom:12,borderBottom:`1px solid ${T.border}`}}>{title}</div>
      {children}
    </div>
  );
}

/* POST VIEW */
function PostView({T,post,onBack,isAuthor,onEdit,onDelete,showToast}) {
  if(!post) return null;
  const mr=post.lang==="mr";
  const url=typeof window!=="undefined"?window.location.href:"";
  const enc=encodeURIComponent;
  const shares=[
    {label:"WhatsApp",color:"#25D366",icon:<WaIcon/>,href:`https://wa.me/?text=${enc(post.title+" "+url)}`},
    {label:"Twitter",color:"#1a1a2e",icon:<TwIcon/>,href:`https://twitter.com/intent/tweet?text=${enc(post.title)}&url=${enc(url)}`},
    {label:"Facebook",color:"#1877F2",icon:<FbIcon/>,href:`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`},
    {label:"Instagram",color:"#E1306C",icon:<IgIcon/>,href:"https://www.instagram.com"},
  ];
  return (
    <div style={{maxWidth:760,margin:"0 auto",animation:"fadeUp .4s ease forwards"}}>
      <button onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",borderRadius:10,border:`1px solid ${T.border}`,background:T.surface,color:T.text2,fontSize:".875rem",marginBottom:36}}>← Back to stories</button>
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{padding:"3px 10px",borderRadius:6,fontSize:".72rem",fontWeight:700,background:mr?"rgba(192,57,43,.15)":"rgba(37,99,235,.12)",color:mr?T.accent:T.blue}}>{mr?"🇮🇳 मराठी":"🇬🇧 English"}</span>
        <span style={{fontSize:".78rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",color:T.accent}}>{post.category}</span>
      </div>
      <h1 className={`serif${mr?" deva":""}`} style={{fontSize:"clamp(1.9rem,4vw,2.8rem)",fontWeight:700,lineHeight:1.15,letterSpacing:"-.02em",marginBottom:18,color:T.text}}>{post.title}</h1>
      <p className={mr?"deva":""} style={{fontSize:"1.05rem",color:T.text2,lineHeight:1.72,borderLeft:`3px solid ${T.accent}`,paddingLeft:20,marginBottom:24}}>{post.excerpt}</p>
      <div style={{display:"flex",gap:18,flexWrap:"wrap",padding:"13px 18px",background:T.bg2,borderRadius:10,fontSize:".8rem",color:T.text3,marginBottom:36}}>
        <span>📅 {fmtDate(post.date)}</span><span>⏱️ {post.readTime} read</span><span>✍️ Abhishek</span>
      </div>
      {post.image && <img src={post.image} alt={post.title} style={{width:"100%",height:340,objectFit:"cover",borderRadius:14,marginBottom:32}}/>}
      <div className={mr?"deva":""} style={{fontSize:"1rem",lineHeight:1.88,color:T.text}} dangerouslySetInnerHTML={{__html:parseMd(post.content)}}/>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:36,paddingTop:22,borderTop:`1px solid ${T.border}`}}>
        {(post.tags||[]).map(t=><span key={t} style={{padding:"5px 12px",borderRadius:8,fontSize:".76rem",border:`1px solid ${T.border}`,color:T.text2,background:T.bg2}}>#{t}</span>)}
      </div>
      <div style={{marginTop:28,paddingTop:22,borderTop:`1px solid ${T.border}`}}>
        <div style={{fontSize:".8rem",fontWeight:700,color:T.text3,marginBottom:14,textTransform:"uppercase",letterSpacing:".07em"}}>Share this post</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {shares.map(s=>(
            <a key={s.label} href={s.href} target="_blank" rel="noopener"
              style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:10,background:s.color,color:"#fff",fontSize:".82rem",fontWeight:600,textDecoration:"none",transition:"opacity .2s"}}
              onMouseEnter={e=>e.currentTarget.style.opacity=".82"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              {s.icon} {s.label}
            </a>
          ))}
          <button onClick={()=>{navigator.clipboard.writeText(url);showToast("Link copied! 🔗");}}
            style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:10,border:`1px solid ${T.border}`,background:T.surface,color:T.text2,fontSize:".82rem",fontWeight:500}}>
            🔗 Copy Link
          </button>
        </div>
      </div>
      {isAuthor && (
        <div style={{display:"flex",gap:10,marginTop:18,flexWrap:"wrap"}}>
          <button onClick={onEdit} style={{display:"flex",alignItems:"center",gap:7,padding:"10px 18px",borderRadius:10,border:`1px solid ${T.border}`,background:T.surface,color:T.text2,fontSize:".82rem"}}>✏️ Edit</button>
          <button onClick={onDelete} style={{display:"flex",alignItems:"center",gap:7,padding:"10px 18px",borderRadius:10,border:"1px solid #dc2626",background:"transparent",color:"#dc2626",fontSize:".82rem"}}>🗑️ Delete</button>
        </div>
      )}
    </div>
  );
}

/* ABOUT PAGE */
function AboutPage({T,about,isAuthor,onEdit}) {
  return (
    <div style={{maxWidth:840,margin:"0 auto",animation:"fadeUp .4s ease forwards"}}>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:22,overflow:"hidden",marginBottom:24}}>
        <div style={{background:`linear-gradient(135deg,${T.accent}28,${T.bg3})`,padding:"56px 40px 38px",textAlign:"center",position:"relative"}}>
          {isAuthor && <button onClick={onEdit} style={{position:"absolute",top:16,right:16,padding:"7px 16px",borderRadius:9,background:T.accent,color:"#fff",fontSize:".78rem",fontWeight:600}}>✏️ Edit</button>}
          <img src={LOGO_SRC} alt={about.name} style={{width:100,height:100,borderRadius:22,objectFit:"cover",margin:"0 auto 20px",border:`3px solid ${T.surface}`,boxShadow:`0 8px 28px ${T.shadow2}`}}/>
          <h1 className="serif" style={{fontSize:"2.2rem",fontWeight:700,color:T.text,marginBottom:8}}>{about.name}</h1>
          <p style={{fontSize:"1.05rem",color:T.accent,fontWeight:600,marginBottom:14}}>{about.tagline}</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:20,flexWrap:"wrap"}}>
            <span style={{display:"flex",alignItems:"center",gap:5,fontSize:".9rem",color:T.text2}}>📍 {about.location}</span>
            <a href={about.website} target="_blank" rel="noopener"
              style={{display:"flex",alignItems:"center",gap:5,fontSize:".9rem",color:T.blue,fontWeight:600,textDecoration:"underline",textUnderlineOffset:3}}>
              🌐 {about.website?.replace("https://","")}
            </a>
          </div>
        </div>
        <div style={{padding:"36px 40px"}}>
          <h2 className="serif" style={{fontSize:"1.35rem",fontWeight:600,color:T.text,marginBottom:18}}>About Me</h2>
          {about.bio.split("\n\n").map((para,i)=>(
            <p key={i} style={{fontSize:".975rem",color:T.text2,lineHeight:1.82,marginBottom:14}}>{para}</p>
          ))}
          <h2 className="serif" style={{fontSize:"1.35rem",fontWeight:600,color:T.text,margin:"28px 0 16px"}}>Interests & Passions</h2>
          <div style={{display:"flex",flexWrap:"wrap",gap:9}}>
            {(about.interests||[]).map(item=>(
              <span key={item} style={{padding:"7px 15px",borderRadius:9,background:T.bg2,border:`1px solid ${T.border}`,color:T.text2,fontSize:".875rem"}}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:22,padding:"32px 40px"}}>
        <h2 className="serif" style={{fontSize:"1.35rem",fontWeight:600,color:T.text,marginBottom:24}}>Connect With Me</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
          {[
            {icon:<WaIcon size={22}/>,label:"WhatsApp",value:about.whatsapp,color:"#25D366",href:`https://wa.me/${(about.whatsapp||"").replace(/[^0-9]/g,"")}`},
            {icon:<TwIcon size={22}/>,label:"Twitter / X",value:about.twitter?"@"+about.twitter.replace("@",""):"-",color:"#1a1a2e",href:`https://twitter.com/${(about.twitter||"").replace("@","")}`},
            {icon:<IgIcon size={22}/>,label:"Instagram",value:about.instagram?"@"+about.instagram.replace("@",""):"-",color:"#E1306C",href:`https://instagram.com/${(about.instagram||"").replace("@","")}`},
            {icon:<span style={{fontSize:"1.1rem"}}>✉️</span>,label:"Email",value:about.email,color:"#ea4335",href:`mailto:${about.email}`},
            {icon:<span style={{fontSize:"1.1rem"}}>🌐</span>,label:"Website",value:about.website?.replace("https://",""),color:"#0ea5e9",href:about.website},
          ].map(c=><SocialCard key={c.label} T={T} c={c}/>)}
        </div>
      </div>
    </div>
  );
}
function SocialCard({T,c}) {
  const [h,setH]=useState(false);
  return (
    <a href={c.href} target="_blank" rel="noopener" onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:13,border:`1px solid ${h?c.color:T.border}`,background:h?`${c.color}12`:T.bg2,textDecoration:"none",transition:"all .2s"}}>
      <span style={{width:40,height:40,borderRadius:10,background:c.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"1rem",flexShrink:0}}>{c.icon}</span>
      <div>
        <div style={{fontSize:".75rem",fontWeight:700,color:T.text3,textTransform:"uppercase",letterSpacing:".05em"}}>{c.label}</div>
        <div style={{fontSize:".85rem",color:T.text2,marginTop:2}}>{c.value}</div>
      </div>
    </a>
  );
}

/* ABOUT EDITOR */
function AboutEditor({T,about,setAbout,onClose,showToast}) {
  const [f,setF]=useState({...about});
  const set=(k,v)=>setF(x=>({...x,[k]:v}));
  const save=()=>{setAbout(f);showToast("About page updated! ✅");onClose();};
  const inp={width:"100%",padding:"10px 13px",borderRadius:10,border:`1px solid ${T.border}`,background:T.surface,color:T.text,fontSize:".9rem",outline:"none"};
  const lbl={display:"block",fontSize:".78rem",fontWeight:600,color:T.text3,marginBottom:6,textTransform:"uppercase",letterSpacing:".05em"};
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:T.bg,overflowY:"auto",animation:"fadeIn .2s"}}>
      <div style={{position:"sticky",top:0,zIndex:10,background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"0 20px",height:60,display:"flex",alignItems:"center",gap:14}}>
        <span className="serif" style={{fontSize:"1.05rem",fontWeight:600,flex:1,color:T.text}}>✏️ Edit About Page</span>
        <button onClick={onClose} style={{padding:"7px 16px",borderRadius:8,border:`1px solid ${T.border}`,color:T.text2,fontSize:".875rem"}}>Cancel</button>
        <button onClick={save} style={{padding:"8px 20px",borderRadius:8,background:T.accent,color:"#fff",fontWeight:600,fontSize:".875rem"}}>Save ✅</button>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"36px 20px"}}>
        {[["Name","name","text"],["Tagline","tagline","text"],["Location","location","text"],["Website","website","url"],["Email","email","email"],["WhatsApp","whatsapp","text"],["Twitter handle","twitter","text"],["Instagram handle","instagram","text"]].map(([label,key,type])=>(
          <div key={key} style={{marginBottom:18}}>
            <label style={lbl}>{label}</label>
            <input type={type} value={f[key]||""} onChange={e=>set(key,e.target.value)} style={inp}/>
          </div>
        ))}
        <div style={{marginBottom:18}}>
          <label style={lbl}>Bio (double line break = new paragraph)</label>
          <textarea value={f.bio||""} onChange={e=>set("bio",e.target.value)} style={{...inp,minHeight:160,resize:"vertical",lineHeight:1.7}}/>
        </div>
        <div>
          <label style={lbl}>Interests (comma separated)</label>
          <input value={(f.interests||[]).join(",")} onChange={e=>set("interests",e.target.value.split(",").map(s=>s.trim()).filter(Boolean))} style={inp}/>
        </div>
      </div>
    </div>
  );
}

/* GALLERY */
function GallerySection({T,gallery,setGallery,isAuthor,setLightbox,showToast}) {
  const ref=useRef();
  const upload=e=>{
    const files=Array.from(e.target.files);let done=0;
    files.forEach(f=>{const r=new FileReader();r.onload=ev=>{setGallery(g=>[...g,{src:ev.target.result,caption:f.name.replace(/\.[^.]+$/,""),date:new Date().toISOString().split("T")[0]}]);done++;if(done===files.length)showToast(`${files.length} photo${files.length>1?"s":""} added 📸`);};r.readAsDataURL(f);});
    e.target.value="";
  };
  return (
    <div style={{animation:"fadeUp .4s ease forwards"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32,flexWrap:"wrap",gap:16}}>
        <div>
          <h2 className="serif" style={{fontSize:"1.7rem",fontWeight:600,color:T.text}}>Photo Gallery</h2>
          <p style={{fontSize:".82rem",color:T.text3,marginTop:4}}>{gallery.length} photo{gallery.length!==1?"s":""}</p>
        </div>
        {isAuthor && <button onClick={()=>ref.current.click()} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",borderRadius:10,background:T.accent,color:"#fff",fontWeight:600,fontSize:".875rem",boxShadow:`0 4px 14px ${T.accent}44`}}>📸 Upload Photos</button>}
      </div>
      <input ref={ref} type="file" accept="image/*" multiple style={{display:"none"}} onChange={upload}/>
      {gallery.length===0 ? (
        <div style={{textAlign:"center",padding:"80px 20px",color:T.text3}}>
          <div style={{fontSize:"3rem",marginBottom:16}}>🖼️</div>
          <h3 className="serif" style={{fontSize:"1.2rem",color:T.text2,marginBottom:8}}>Gallery coming soon</h3>
          {isAuthor && <button onClick={()=>ref.current.click()} style={{marginTop:14,padding:"10px 22px",borderRadius:10,background:T.accent,color:"#fff",fontWeight:600}}>Upload First Photo</button>}
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
          {gallery.map((item,i)=>(
            <GCard key={i} T={T} item={item} isAuthor={isAuthor} onView={()=>setLightbox(item.src)} onDelete={()=>{setGallery(g=>g.filter((_,j)=>j!==i));showToast("Photo removed");}}/>
          ))}
        </div>
      )}
    </div>
  );
}
function GCard({T,item,isAuthor,onView,onDelete}) {
  const [h,setH]=useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onView}
      style={{position:"relative",borderRadius:14,overflow:"hidden",aspectRatio:"4/3",border:`1px solid ${T.border}`,cursor:"pointer",transition:"all .22s",transform:h?"scale(1.02)":"scale(1)",boxShadow:h?`0 10px 36px ${T.shadow2}`:"none"}}>
      <img src={item.src} alt={item.caption} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform .4s",transform:h?"scale(1.06)":"scale(1)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.55) 0%,transparent 55%)",opacity:h?1:0,transition:"opacity .22s",display:"flex",alignItems:"flex-end",padding:14}}>
        <span style={{color:"#fff",fontSize:".82rem",fontWeight:500}}>{item.caption}</span>
      </div>
      {isAuthor && <div style={{position:"absolute",top:10,right:10}} onClick={e=>{e.stopPropagation();onDelete();}}>
        <button style={{width:30,height:30,borderRadius:7,background:"rgba(220,38,38,.88)",color:"#fff",fontSize:".75rem",display:"flex",alignItems:"center",justifyContent:"center"}}>🗑️</button>
      </div>}
    </div>
  );
}

/* EDITOR */
function Editor({T,editingId,posts,setPosts,onClose,showToast}) {
  const ex=editingId?posts.find(p=>p.id===editingId):null;
  const [title,setTitle]=useState(ex?.title||"");
  const [lang,setLang]=useState(ex?.lang||"en");
  const [cat,setCat]=useState(ex?.category||"");
  const [excerpt,setExcerpt]=useState(ex?.excerpt||"");
  const [tags,setTags]=useState((ex?.tags||[]).join(", "));
  const [body,setBody]=useState(ex?.content||"");
  const [img,setImg]=useState(ex?.image||null);
  const [emo,setEmo]=useState(false);
  const ta=useRef();
  const ins=(b,a="")=>{const el=ta.current;if(!el)return;const s=el.selectionStart,e=el.selectionEnd;const sel=body.substring(s,e);setBody(body.substring(0,s)+b+sel+a+body.substring(e));setTimeout(()=>{el.focus();el.setSelectionRange(s+b.length,s+b.length+sel.length);},0);};
  const save=()=>{
    if(!title.trim()||!body.trim()){showToast("Title and content required!","error");return;}
    const tArr=tags.split(",").map(t=>t.trim()).filter(Boolean);
    const rt=Math.max(1,Math.round(body.split(/\s+/).length/200))+" min";
    if(editingId){setPosts(p=>p.map(x=>x.id===editingId?{...x,title,lang,category:cat||"Misc",excerpt:excerpt||body.slice(0,110)+"…",tags:tArr,content:body,readTime:rt,image:img||""}:x));showToast("Updated! ✅");}
    else{setPosts(p=>[{id:uid(),title,lang,category:cat||"Misc",excerpt:excerpt||body.slice(0,110)+"…",tags:tArr,content:body,readTime:rt,date:new Date().toISOString().split("T")[0],image:img||"",featured:p.length===0},...p]);showToast("Published! 🚀");}
    onClose();
  };
  const inp={width:"100%",padding:"11px 14px",borderRadius:10,border:`1px solid ${T.border}`,background:T.surface,color:T.text,fontSize:".95rem",outline:"none"};
  const lbl={display:"block",fontSize:".78rem",fontWeight:600,color:T.text3,marginBottom:7,textTransform:"uppercase",letterSpacing:".05em"};
  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:T.bg,overflowY:"auto",animation:"fadeIn .2s"}}>
      <div style={{position:"sticky",top:0,zIndex:10,background:T.surface,borderBottom:`1px solid ${T.border}`,padding:"0 20px",height:60,display:"flex",alignItems:"center",gap:14}}>
        <span className="serif" style={{fontSize:"1.05rem",fontWeight:600,flex:1,color:T.text}}>{editingId?"✏️ Edit":"✍️ New Post"}</span>
        <button onClick={onClose} style={{padding:"7px 16px",borderRadius:8,border:`1px solid ${T.border}`,color:T.text2,fontSize:".875rem"}}>Discard</button>
        <button onClick={save} style={{padding:"8px 20px",borderRadius:8,background:T.accent,color:"#fff",fontWeight:600,fontSize:".875rem"}}>Publish 🚀</button>
      </div>
      <div style={{maxWidth:780,margin:"0 auto",padding:"36px 20px"}}>
        <div style={{marginBottom:20}}><label style={lbl}>Title *</label><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Write a compelling title…" style={{...inp,fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",fontWeight:600}}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
          <div><label style={lbl}>Language</label><select value={lang} onChange={e=>setLang(e.target.value)} style={{...inp,cursor:"pointer"}}><option value="en">🇬🇧 English</option><option value="mr">🇮🇳 Marathi</option></select></div>
          <div><label style={lbl}>Category</label><input value={cat} onChange={e=>setCat(e.target.value)} placeholder="Life, Travel…" style={inp}/></div>
        </div>
        <div style={{marginBottom:20}}><label style={lbl}>Excerpt</label><input value={excerpt} onChange={e=>setExcerpt(e.target.value)} placeholder="Short summary…" style={inp}/></div>
        <div style={{marginBottom:20}}><label style={lbl}>Tags (comma separated)</label><input value={tags} onChange={e=>setTags(e.target.value)} placeholder="travel, food, culture" style={inp}/></div>
        <div style={{marginBottom:20}}>
          <label style={lbl}>Cover Image</label>
          {img ? <div style={{position:"relative"}}><img src={img} style={{width:"100%",height:200,objectFit:"cover",borderRadius:10}}/><button onClick={()=>setImg(null)} style={{position:"absolute",top:10,right:10,width:32,height:32,borderRadius:8,background:"rgba(0,0,0,.6)",color:"#fff"}}>✕</button></div>
          : <label style={{display:"block",border:`2px dashed ${T.border2}`,borderRadius:10,padding:28,textAlign:"center",cursor:"pointer",background:T.bg2}}>
              <div style={{fontSize:"1.8rem",marginBottom:8}}>🖼️</div>
              <div style={{fontSize:".875rem",color:T.text2}}>Click to upload</div>
              <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setImg(ev.target.result);r.readAsDataURL(f);}}/>
            </label>}
        </div>
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
            <label style={{...lbl,marginBottom:0}}>Content *</label>
            <div style={{position:"relative"}}>
              <button onClick={()=>setEmo(e=>!e)} style={{padding:"5px 12px",borderRadius:7,border:`1px solid ${T.border}`,fontSize:".78rem",color:T.text2,background:T.bg2}}>+ Emoji</button>
              {emo && <div style={{position:"absolute",top:"100%",right:0,zIndex:50,background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:10,display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:3,boxShadow:`0 8px 28px ${T.shadow2}`,minWidth:260}}>
                {EMOJIS.map(em=><button key={em} onClick={()=>{ins(em);setEmo(false);}} style={{width:30,height:30,borderRadius:6,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>{em}</button>)}
              </div>}
            </div>
          </div>
          <div style={{display:"flex",gap:3,flexWrap:"wrap",padding:8,border:`1px solid ${T.border}`,borderBottom:"none",borderRadius:"10px 10px 0 0",background:T.bg2}}>
            {[["B","**","**"],["I","*","*"],["H2","\n## ",""],["H3","\n### ",""],["❝","\n> ",""],["•","\n- ",""]].map(([l,b,a])=>(
              <button key={l} onClick={()=>ins(b,a)} style={{width:30,height:30,borderRadius:6,fontSize:".78rem",fontWeight:600,color:T.text2,background:"transparent"}}>{l}</button>
            ))}
            <button onClick={()=>{const u=prompt("URL:","https://");const t=prompt("Link text:","Click here");if(u&&t)ins(`[${t}](${u})`);}} style={{padding:"0 8px",height:30,borderRadius:6,fontSize:".78rem",color:T.text2,background:"transparent"}}>🔗</button>
          </div>
          <textarea ref={ta} value={body} onChange={e=>setBody(e.target.value)}
            placeholder={"Write your story…\n\n## Heading\n**bold** *italic*\n> blockquote\n- list"}
            style={{width:"100%",padding:"14px 16px",border:`1px solid ${T.border}`,borderRadius:"0 0 10px 10px",background:T.surface,color:T.text,fontSize:".95rem",outline:"none",resize:"vertical",minHeight:320,lineHeight:1.8,fontFamily:"inherit"}}/>
        </div>
      </div>
    </div>
  );
}

/* AUTH */
function AuthModal({T,onClose,onLogin}) {
  const [u,setU]=useState(""),[p,setP]=useState(""),[err,setErr]=useState(false);
  const go=()=>{if(u==="abhishek"&&p==="writes@2025"){onLogin();}else{setErr(true);setP("");}};
  return (
    <Overlay onClose={onClose}>
      <div style={{background:T.surface,borderRadius:22,padding:38,width:"100%",maxWidth:390,border:`1px solid ${T.border}`,boxShadow:`0 24px 70px ${T.shadow2}`,animation:"scaleIn .25s ease"}} onClick={e=>e.stopPropagation()}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <img src={LOGO_SRC} alt="Logo" style={{width:64,height:64,borderRadius:16,objectFit:"cover",margin:"0 auto 14px"}}/>
          <h2 className="serif" style={{fontSize:"1.5rem",fontWeight:600,marginBottom:4,color:T.text}}>Author Login</h2>
          <p style={{fontSize:".82rem",color:T.text3}}>Sign in to manage your blog</p>
        </div>
        {err && <div style={{padding:"9px 14px",borderRadius:8,background:"#fef2f2",color:"#dc2626",fontSize:".82rem",marginBottom:14,border:"1px solid #fecaca"}}>Incorrect credentials.</div>}
        <div style={{marginBottom:16}}><label style={{display:"block",fontSize:".8rem",fontWeight:500,color:T.text2,marginBottom:6}}>Username</label><input value={u} onChange={e=>setU(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Username" autoFocus style={{width:"100%",padding:"10px 13px",borderRadius:10,border:`1px solid ${T.border}`,background:T.inputBg,color:T.text,fontSize:".9rem",outline:"none"}}/></div>
        <div style={{marginBottom:22}}><label style={{display:"block",fontSize:".8rem",fontWeight:500,color:T.text2,marginBottom:6}}>Password</label><input type="password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Password" style={{width:"100%",padding:"10px 13px",borderRadius:10,border:`1px solid ${T.border}`,background:T.inputBg,color:T.text,fontSize:".9rem",outline:"none"}}/></div>
        <button onClick={go} style={{width:"100%",padding:13,borderRadius:11,background:T.accent,color:"#fff",fontWeight:700,fontSize:".9rem"}}>Sign In ✍️</button>
        <button onClick={onClose} style={{width:"100%",padding:11,borderRadius:11,border:`1px solid ${T.border}`,color:T.text2,fontSize:".875rem",marginTop:10}}>Cancel</button>
      </div>
    </Overlay>
  );
}

/* CONFIRM */
function ConfirmDlg({T,onCancel,onConfirm}) {
  return (
    <Overlay onClose={onCancel}>
      <div style={{background:T.surface,borderRadius:18,padding:30,maxWidth:360,width:"calc(100% - 40px)",border:`1px solid ${T.border}`,textAlign:"center",animation:"scaleIn .22s ease"}} onClick={e=>e.stopPropagation()}>
        <div style={{fontSize:"2.2rem",marginBottom:10}}>🗑️</div>
        <h3 className="serif" style={{fontSize:"1.2rem",fontWeight:600,marginBottom:8,color:T.text}}>Delete Post?</h3>
        <p style={{fontSize:".875rem",color:T.text2,marginBottom:22,lineHeight:1.6}}>This cannot be undone.</p>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <button onClick={onCancel} style={{padding:"10px 22px",borderRadius:8,border:`1px solid ${T.border}`,color:T.text2,fontSize:".875rem"}}>Cancel</button>
          <button onClick={onConfirm} style={{padding:"10px 22px",borderRadius:8,background:"#dc2626",color:"#fff",fontWeight:600,fontSize:".875rem"}}>Delete</button>
        </div>
      </div>
    </Overlay>
  );
}

/* FOOTER */
function Footer({T,go,about}) {
  const socials=[
    {icon:<WaIcon/>,color:"#25D366",href:`https://wa.me/${(about.whatsapp||"").replace(/[^0-9]/g,"")}`,label:"WhatsApp"},
    {icon:<TwIcon/>,color:"#1a1a2e",href:`https://twitter.com/${(about.twitter||"").replace("@","")}`,label:"Twitter"},
    {icon:<IgIcon/>,color:"#E1306C",href:`https://instagram.com/${(about.instagram||"").replace("@","")}`,label:"Instagram"},
    {icon:<span>✉️</span>,color:"#ea4335",href:`mailto:${about.email}`,label:"Email"},
    {icon:<span>🌐</span>,color:"#0ea5e9",href:about.website,label:"Website"},
  ];
  return (
    <footer style={{background:T.surface,borderTop:`1px solid ${T.border}`,padding:"56px 24px 36px",width:"100%"}}>
      <div style={{maxWidth:1440,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:44,marginBottom:44}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,cursor:"pointer"}} onClick={()=>go("home")}>
              <img src={LOGO_SRC} alt="Logo" style={{width:40,height:40,borderRadius:10,objectFit:"cover"}}/>
              <span className="serif" style={{fontSize:"1.3rem",fontWeight:700,color:T.text}}>Abhishek <span style={{color:T.accent}}>Writes</span></span>
            </div>
            <p style={{fontSize:".875rem",color:T.text3,lineHeight:1.72,marginBottom:22,maxWidth:270}}>A personal blog exploring life, culture, and stories in English and Marathi.</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {socials.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener" title={s.label}
                  style={{width:40,height:40,borderRadius:10,background:s.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",transition:"all .2s",textDecoration:"none",fontSize:"1rem"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 6px 16px ${s.color}55`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>{s.icon}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="serif" style={{fontSize:"1rem",fontWeight:600,marginBottom:14,color:T.text}}>Explore</div>
            {[["🏠 Home","home"],["🇬🇧 English","english"],["🇮🇳 मराठी","marathi"],["🖼️ Gallery","gallery"],["👤 About","about"]].map(([l,t])=>(
              <div key={t} onClick={()=>go(t)} style={{fontSize:".875rem",color:T.text3,marginBottom:10,cursor:"pointer",transition:"color .18s"}} onMouseEnter={e=>e.currentTarget.style.color=T.accent} onMouseLeave={e=>e.currentTarget.style.color=T.text3}>{l}</div>
            ))}
          </div>
          <div>
            <div className="serif" style={{fontSize:"1rem",fontWeight:600,marginBottom:14,color:T.text}}>Contact</div>
            {[["✉️",about.email],["📍",about.location],["💬",about.whatsapp],["🌐",about.website?.replace("https://","")]].map(([icon,val])=>val&&(
              <div key={val} style={{display:"flex",gap:9,fontSize:".875rem",color:T.text3,marginBottom:11,alignItems:"flex-start"}}>
                <span style={{color:T.accent,flexShrink:0}}>{icon}</span>{val}
              </div>
            ))}
          </div>
        </div>
        <div style={{paddingTop:24,borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,fontSize:".78rem",color:T.text3}}>
          <span>© 2025 Abhishek Writes. Made with ❤️ in Maharashtra.</span>
          <a href={about.website} target="_blank" rel="noopener" style={{color:T.blue}}>{about.website?.replace("https://","")}</a>
        </div>
      </div>
    </footer>
  );
}

/* MISC COMPONENTS */
function Overlay({onClose,children}) {
  return <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn .2s",padding:20}}>{children}</div>;
}
function Lightbox({src,onClose}) {
  return <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:600,background:"rgba(0,0,0,.92)",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn .2s"}}>
    <img src={src} style={{maxWidth:"90vw",maxHeight:"90vh",objectFit:"contain",borderRadius:8}}/>
    <button onClick={onClose} style={{position:"absolute",top:20,right:20,width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,.15)",color:"#fff",fontSize:"1.2rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
  </div>;
}
function Toast({T,msg,type}) {
  return <div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"12px 22px",display:"flex",alignItems:"center",gap:10,boxShadow:`0 8px 28px ${T.shadow2}`,zIndex:999,fontSize:".875rem",whiteSpace:"nowrap",animation:"fadeUp .35s cubic-bezier(.34,1.56,.64,1) forwards"}}>
    <span>{type==="success"?"✅":"❌"}</span><span style={{color:T.text}}>{msg}</span>
  </div>;
}
function ReadingProgress({T}) {
  const [pct,setPct]=useState(0);
  useEffect(()=>{const fn=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;setPct(h>0?(window.scrollY/h)*100:0);};window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return <div style={{position:"fixed",top:0,left:0,right:0,height:3,background:`linear-gradient(to right,${T.accent},${T.accent2})`,transformOrigin:"left",transform:`scaleX(${pct/100})`,zIndex:201,transition:"transform .1s"}}/>;
}
function Fab({T,onClick}) {
  const [h,setH]=useState(false);
  return <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{position:"fixed",bottom:32,right:32,zIndex:150,width:56,height:56,borderRadius:"50%",background:T.accent,color:"#fff",fontSize:"1.6rem",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 8px 24px ${T.accent}66`,transition:"transform .2s",transform:h?"scale(1.1) rotate(90deg)":"scale(1) rotate(0deg)"}}>+</button>;
}
function Empty({T,isAuthor}) {
  return <div style={{textAlign:"center",padding:"80px 20px",color:T.text3}}>
    <div style={{fontSize:"3rem",marginBottom:16}}>✍️</div>
    <h3 className="serif" style={{fontSize:"1.2rem",color:T.text2,marginBottom:8}}>No posts found</h3>
    <p style={{fontSize:".875rem",color:T.text3}}>{isAuthor?"Tap + to write your first post!":"Check back soon."}</p>
  </div>;
}
