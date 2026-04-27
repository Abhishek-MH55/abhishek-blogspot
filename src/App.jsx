import { useState, useEffect, useRef } from "react";

// ── LOGO IMAGE (actual uploaded AM logo) ─────────────────────────────────────
// Place your logo file as: /public/logo.png  (or update LOGO_SRC to match your setup)
const LOGO_SRC = "/public/logo.png";

const AMLogoSVG = ({ size = 40 }) => (
  <img
    src={LOGO_SRC}
    alt="Abhishek Writes logo"
    width={size}
    height={size}
    style={{ objectFit: "contain", display: "block" }}
  />
);

// ── INITIAL DATA ─────────────────────────────────────────────────────────────
const INITIAL_BLOGS = [
  {
    id: 1, lang: "en",
    title: "The Art of Mindful Writing",
    excerpt: "Writing with intention transforms not just the page, but the writer. In a world buzzing with noise, mindful writing becomes an act of resistance.",
    content: `Writing with intention transforms not just the page, but the writer. In a world buzzing with noise, mindful writing becomes an act of resistance — a way to carve silence from chaos.

When we write mindfully, we slow down. We notice the weight of each word, the rhythm of each sentence. We ask: does this need to be said? And if yes, does it need to be said this way?

The practice starts before the first keystroke. Sit with your idea. Let it breathe. Let it grow uncomfortable if needed. The discomfort is where the real writing lives — not in the polished surface, but in the honest depth beneath.

Try writing for ten minutes without editing. Let the raw thoughts spill. Then step back. Read it like a stranger. What surprises you? That surprise is your material.

Mindful writing isn't about perfection. It's about presence. It's about showing up fully to the blank page and trusting that something true will emerge.`,
    date: "April 20, 2026", readTime: "4 min", tags: ["Writing", "Mindfulness"],
    likes: 42, comments: [
      { id: 1, author: "Priya S.", text: "This resonated deeply. The part about discomfort being where real writing lives — so true.", date: "Apr 21" },
      { id: 2, author: "Rohan M.", text: "Beautiful post. Bookmarked to read again before I write.", date: "Apr 22" }
    ]
  },
  {
    id: 2, lang: "en",
    title: "Why Dark Mode Isn't Just Aesthetic",
    excerpt: "The shift to dark interfaces runs deeper than visual preference. It touches on cognition, accessibility, and the psychology of focus.",
    content: `The shift to dark interfaces runs deeper than visual preference. It touches on cognition, accessibility, and the psychology of focus.

Dark mode reduces the blue light emitted from screens, which is linked to disrupted sleep cycles. For night-time readers — a significant chunk of any blog's audience — this matters enormously.

But there's something more subtle at play. Dark interfaces lower the ambient light in a room, creating a cinema-like sense of immersion. The content glows. The world fades. Your attention narrows to the text.

Accessibility is another angle often missed. For users with photosensitivity, migraines, or certain visual conditions, dark mode isn't a preference — it's a necessity. Offering the toggle is an act of inclusion.

From a design perspective, dark surfaces force designers to think differently. Contrast ratios tighten. Hierarchy must be expressed through luminosity, not just size. It's a constraint that often produces better design.

So yes, implement dark mode. But do it because you care about your readers, not just because it looks cool.`,
    date: "April 15, 2026", readTime: "5 min", tags: ["Design", "UX"],
    likes: 67, comments: [
      { id: 1, author: "Ananya K.", text: "Never thought of it from the accessibility angle. Great perspective!", date: "Apr 16" }
    ]
  },
  {
    id: 3, lang: "mr",
    title: "आयुष्याचा प्रवास: एक चिंतन",
    excerpt: "जगणे म्हणजे फक्त श्वास घेणे नाही. जगणे म्हणजे प्रत्येक क्षणात स्वतःला शोधत राहणे, आनंदात आणि दुःखातही.",
    content: `जगणे म्हणजे फक्त श्वास घेणे नाही. जगणे म्हणजे प्रत्येक क्षणात स्वतःला शोधत राहणे, आनंदात आणि दुःखातही.

आयुष्य एखाद्या नदीसारखे आहे — कधी शांत, कधी खळाळते, कधी वाट चुकवते. पण ती नदी थांबत नाही. आणि आपणही थांबायचे नाही.

माझ्या आयुष्यातही असे क्षण आले जेव्हा सारे अंधारून गेले. पण त्या अंधारातच मला माझा स्वतःचा प्रकाश सापडला. कधी एखाद्या पुस्तकात, कधी एखाद्या गाण्यात, कधी फक्त शांत बसून आकाश बघताना.

चिंतन हे आत्म्याचे अन्न आहे. दिवसातून काही वेळ स्वतःसाठी काढा. कागद घ्या, लिहा. काय वाटतंय, काय हवंय, कशापासून दूर व्हायचंय — सगळं उतरवा. ते शब्द तुम्हाला मोकळेपण देतात.

प्रत्येक माणसाची गोष्ट वेगळी असते. तुमची गोष्ट सांगण्यास घाबरू नका. कारण जगात कुठेतरी एखादा माणूस आहे ज्याला त्याच गोष्टीची गरज आहे.`,
    date: "एप्रिल १८, २०२६", readTime: "५ मिनिटे", tags: ["जीवन", "चिंतन"],
    likes: 89, comments: [
      { id: 1, author: "सुनील पाटील", text: "खूप सुंदर लेख. मनाला भावला.", date: "एप्रिल १९" },
      { id: 2, author: "नेहा जोशी", text: "हे वाचून खूप बरं वाटलं. धन्यवाद!", date: "एप्रिल २०" }
    ]
  },
  {
    id: 4, lang: "mr",
    title: "तंत्रज्ञान आणि मराठी भाषा",
    excerpt: "डिजिटल युगात मराठी भाषेचे अस्तित्व टिकवणे ही केवळ भावनिक गरज नाही, तर सांस्कृतिक जबाबदारी आहे.",
    content: `डिजिटल युगात मराठी भाषेचे अस्तित्व टिकवणे ही केवळ भावनिक गरज नाही, तर सांस्कृतिक जबाबदारी आहे.

आज जगभरात असंख्य भाषा लुप्त होत आहेत. तंत्रज्ञानाने एकीकडे जग जोडले, पण दुसरीकडे भाषांमधील विविधता कमी केली. इंग्रजी हे जगाचे व्यापारी माध्यम झाले — आणि त्यामुळे स्थानिक भाषांवर दबाव वाढला.

मराठी भाषेत लिहिणे, बोलणे, विचार करणे — हे केवळ परंपरेचे पालन नाही. हे आपल्या अस्मितेचे जतन आहे. भाषेत संस्कृती असते, इतिहास असतो, पिढ्यांचे अनुभव असतात.

तंत्रज्ञान आता मराठीसाठी वापरणे पूर्वीपेक्षा सोपे झाले आहे. मराठी कीबोर्ड, युनिकोड फॉन्ट्स, आणि AI अनुवाद — या सगळ्या गोष्टी आपल्याला मराठीत डिजिटल जग जगण्यास मदत करतात.

माझी विनंती आहे — आपल्या मुलांशी मराठीत बोला. आपल्या मित्रांना मराठीत मेसेज करा. आणि हो — मराठीत ब्लॉग लिहा!`,
    date: "एप्रिल १०, २०२६", readTime: "६ मिनिटे", tags: ["मराठी", "तंत्रज्ञान"],
    likes: 124, comments: [
      { id: 1, author: "विजय देशमुख", text: "अत्यंत महत्त्वाचा विषय. आभारी आहे!", date: "एप्रिल ११" }
    ]
  }
];

const ADMIN_PASS = "am2026";

// ── ICONS ───────────────────────────────────────────────────────────────────
const Icon = {
  Heart: ({ filled }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#E8543A" : "none"} stroke={filled ? "#E8543A" : "currentColor"} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Comment: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Share: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Moon: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  Sun: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Back: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  Admin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Twitter: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  LinkedIn: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
    </svg>
  ),
  GitHub: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  Globe: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Whatsapp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  ),
  Copy: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
  Delete: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  ),
};

// ── SHARE MODAL ──────────────────────────────────────────────────────────────
function ShareModal({ blog, onClose, dark }) {
  const url = `https://amblog.in/blog/${blog.id}`;
  const text = encodeURIComponent(blog.title);
  const [copied, setCopied] = useState(false);

  const platforms = [
    { name: "WhatsApp", icon: <Icon.Whatsapp />, color: "#25D366", href: `https://wa.me/?text=${text}%20${encodeURIComponent(url)}` },
    { name: "Twitter / X", icon: <Icon.Twitter />, color: "#000", href: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}` },
    { name: "LinkedIn", icon: <Icon.LinkedIn />, color: "#0A66C2", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { name: "Copy Link", icon: <Icon.Copy />, color: "#888", action: () => { navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={onClose}>
      <div style={{ background: dark ? "#1a1a2e" : "#fff", borderRadius: 20, padding: "2rem", width: "100%", maxWidth: 360, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: dark ? "#fff" : "#1a1a2e" }}>Share this post</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "#aaa" : "#666", padding: 4 }}><Icon.Close /></button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {platforms.map(p => (
            <a key={p.name} href={p.href || "#"} target={p.href ? "_blank" : undefined} rel="noopener noreferrer"
              onClick={p.action ? (e) => { e.preventDefault(); p.action(); } : undefined}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: dark ? "#252542" : "#f5f5f5", borderRadius: 12, textDecoration: "none", color: dark ? "#e0e0e0" : "#333", fontSize: 14, fontWeight: 500, border: `1px solid ${dark ? "#333" : "#eee"}`, cursor: "pointer", transition: "transform 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <span style={{ color: p.color }}>{p.icon}</span>
              {p.name === "Copy Link" && copied ? "Copied!" : p.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BLOG CARD ─────────────────────────────────────────────────────────────────
function BlogCard({ blog, onOpen, onLike, likedIds, dark }) {
  const [shareOpen, setShareOpen] = useState(false);
  return (
    <>
      <div
        style={{ background: dark ? "#16213e" : "#fff", border: `1px solid ${dark ? "#2a2a4a" : "#ebebeb"}`, borderRadius: 20, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = dark ? "0 12px 40px rgba(0,0,0,0.4)" : "0 12px 40px rgba(0,0,0,0.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
      >
        {/* Card accent stripe */}
        <div style={{ height: 4, background: blog.lang === "mr" ? "linear-gradient(90deg,#E8543A,#f4a261)" : "linear-gradient(90deg,#2E6FA3,#56b4e9)" }} />
        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }} onClick={() => onOpen(blog)}>
          <div style={{ display: "flex", gap: 8, marginBottom: "1rem", flexWrap: "wrap" }}>
            {blog.tags.map(t => (
              <span key={t} style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 50, background: blog.lang === "mr" ? (dark ? "#3a1f15" : "#fff0eb") : (dark ? "#0f2a40" : "#e8f4fd"), color: blog.lang === "mr" ? "#E8543A" : "#2E6FA3" }}>{t}</span>
            ))}
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 50, background: dark ? "#2a2a4a" : "#f0f0f0", color: dark ? "#aaa" : "#888", marginLeft: "auto" }}>{blog.lang === "mr" ? "मराठी" : "EN"}</span>
          </div>
          <h3 style={{ fontFamily: blog.lang === "mr" ? "'Noto Serif Devanagari', 'Noto Sans Devanagari', serif" : "'Playfair Display', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", fontWeight: 700, color: dark ? "#f0f0f0" : "#1a1a2e", lineHeight: 1.35, marginBottom: "0.75rem" }}>{blog.title}</h3>
          <p style={{ fontFamily: blog.lang === "mr" ? "'Noto Sans Devanagari', sans-serif" : "'DM Sans', sans-serif", fontSize: 15, color: dark ? "#b0b0c8" : "#555", lineHeight: 1.7, flex: 1, marginBottom: "1rem" }}>{blog.excerpt}</p>
          <div style={{ fontSize: 12, color: dark ? "#888" : "#aaa", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>{blog.date}</span><span>·</span><span>{blog.readTime} read</span>
          </div>
        </div>
        {/* Action bar */}
        <div style={{ padding: "0.75rem 1.5rem", borderTop: `1px solid ${dark ? "#2a2a4a" : "#f0f0f0"}`, display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button onClick={() => onLike(blog.id)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: likedIds.has(blog.id) ? "#E8543A" : (dark ? "#888" : "#aaa"), fontSize: 13, fontFamily: "'DM Sans', sans-serif", padding: "6px 10px", borderRadius: 8, transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? "#252542" : "#f8f8f8"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <Icon.Heart filled={likedIds.has(blog.id)} /> {blog.likes + (likedIds.has(blog.id) ? 1 : 0)}
          </button>
          <button onClick={() => onOpen(blog)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: dark ? "#888" : "#aaa", fontSize: 13, fontFamily: "'DM Sans', sans-serif", padding: "6px 10px", borderRadius: 8, transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? "#252542" : "#f8f8f8"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <Icon.Comment /> {blog.comments.length}
          </button>
          <button onClick={() => setShareOpen(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: dark ? "#888" : "#aaa", fontSize: 13, fontFamily: "'DM Sans', sans-serif", padding: "6px 10px", borderRadius: 8, transition: "background 0.15s", marginLeft: "auto" }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? "#252542" : "#f8f8f8"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <Icon.Share /> Share
          </button>
        </div>
      </div>
      {shareOpen && <ShareModal blog={blog} onClose={() => setShareOpen(false)} dark={dark} />}
    </>
  );
}

// ── BLOG DETAIL VIEW ─────────────────────────────────────────────────────────
function BlogDetail({ blog, onBack, onLike, likedIds, dark, blogs, setBlogs }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const isMr = blog.lang === "mr";

  const addComment = () => {
    if (!commentText.trim() || !commentName.trim()) return;
    const newComment = { id: Date.now(), author: commentName.trim(), text: commentText.trim(), date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }) };
    setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, comments: [...b.comments, newComment] } : b));
    setCommentText(""); setCommentName("");
  };

  const bodyFont = isMr ? "'Noto Sans Devanagari', sans-serif" : "'DM Sans', sans-serif";
  const headFont = isMr ? "'Noto Serif Devanagari', serif" : "'Playfair Display', serif";

  return (
    <>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1rem" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: dark ? "#aaa" : "#666", fontSize: 14, fontFamily: "'DM Sans', sans-serif", padding: "8px 0", marginBottom: "2rem", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#E8543A"}
          onMouseLeave={e => e.currentTarget.style.color = dark ? "#aaa" : "#666"}
        >
          <Icon.Back /> Back to posts
        </button>

        <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {blog.tags.map(t => (
            <span key={t} style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 50, background: isMr ? (dark ? "#3a1f15" : "#fff0eb") : (dark ? "#0f2a40" : "#e8f4fd"), color: isMr ? "#E8543A" : "#2E6FA3", fontFamily: "'DM Sans', sans-serif" }}>{t}</span>
          ))}
        </div>

        <h1 style={{ fontFamily: headFont, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, color: dark ? "#f5f5f5" : "#1a1a2e", lineHeight: 1.2, marginBottom: "1rem" }}>{blog.title}</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem", borderBottom: `1px solid ${dark ? "#2a2a4a" : "#eee"}`, paddingBottom: "1.5rem" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#E8543A,#2E6FA3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif" }}>AM</div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: dark ? "#e0e0e0" : "#1a1a2e" }}>AM</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: dark ? "#888" : "#aaa" }}>{blog.date} · {blog.readTime} read</div>
          </div>
        </div>

        <div style={{ fontFamily: bodyFont, fontSize: "clamp(16px,1.8vw,17px)", lineHeight: 1.85, color: dark ? "#d0d0e0" : "#333", marginBottom: "3rem", whiteSpace: "pre-line" }}>
          {blog.content}
        </div>

        {/* Interaction bar */}
        <div style={{ display: "flex", gap: "1rem", padding: "1.25rem 1.5rem", background: dark ? "#16213e" : "#f9f9f9", borderRadius: 16, marginBottom: "3rem", border: `1px solid ${dark ? "#2a2a4a" : "#ebebeb"}` }}>
          <button onClick={() => onLike(blog.id)} style={{ display: "flex", alignItems: "center", gap: 8, background: likedIds.has(blog.id) ? (dark ? "#3a1f15" : "#fff0eb") : "none", border: `1px solid ${likedIds.has(blog.id) ? "#E8543A" : (dark ? "#444" : "#ddd")}`, cursor: "pointer", color: likedIds.has(blog.id) ? "#E8543A" : (dark ? "#aaa" : "#666"), fontSize: 14, fontFamily: "'DM Sans', sans-serif", padding: "10px 20px", borderRadius: 50, transition: "all 0.2s" }}>
            <Icon.Heart filled={likedIds.has(blog.id)} /> {blog.likes + (likedIds.has(blog.id) ? 1 : 0)} Likes
          </button>
          <button onClick={() => setShareOpen(true)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: `1px solid ${dark ? "#444" : "#ddd"}`, cursor: "pointer", color: dark ? "#aaa" : "#666", fontSize: 14, fontFamily: "'DM Sans', sans-serif", padding: "10px 20px", borderRadius: 50, transition: "all 0.2s", marginLeft: "auto" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#2E6FA3"; e.currentTarget.style.color = "#2E6FA3"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = dark ? "#444" : "#ddd"; e.currentTarget.style.color = dark ? "#aaa" : "#666"; }}
          >
            <Icon.Share /> Share
          </button>
        </div>

        {/* Comments */}
        <div style={{ marginBottom: "4rem" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: dark ? "#f0f0f0" : "#1a1a2e", marginBottom: "1.5rem" }}>
            {blog.comments.length} {blog.lang === "mr" ? "प्रतिक्रिया" : "Comments"}
          </h3>

          {/* Comment form */}
          <div style={{ background: dark ? "#16213e" : "#fff", border: `1px solid ${dark ? "#2a2a4a" : "#ebebeb"}`, borderRadius: 16, padding: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <input value={commentName} onChange={e => setCommentName(e.target.value)} placeholder={blog.lang === "mr" ? "तुमचे नाव" : "Your name"} style={{ padding: "10px 14px", borderRadius: 10, border: `1px solid ${dark ? "#444" : "#ddd"}`, background: dark ? "#1a2744" : "#f9f9f9", color: dark ? "#e0e0e0" : "#333", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none" }} />
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", color: dark ? "#666" : "#ccc", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>anonymous OK</span>
            </div>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} placeholder={blog.lang === "mr" ? "तुमची प्रतिक्रिया लिहा…" : "Write your thoughts…"} rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${dark ? "#444" : "#ddd"}`, background: dark ? "#1a2744" : "#f9f9f9", color: dark ? "#e0e0e0" : "#333", fontFamily: "'DM Sans', sans-serif", fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box", marginBottom: 12 }} />
            <button onClick={addComment} style={{ background: "#E8543A", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "opacity 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              {blog.lang === "mr" ? "पाठवा" : "Post Comment"}
            </button>
          </div>

          {/* Comment list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {blog.comments.map(c => (
              <div key={c.id} style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: dark ? "#2a2a4a" : "#e8f4fd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#2E6FA3", flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>{c.author[0]}</div>
                <div style={{ background: dark ? "#16213e" : "#f9f9f9", borderRadius: 12, padding: "12px 16px", flex: 1, border: `1px solid ${dark ? "#2a2a4a" : "#ebebeb"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: dark ? "#e0e0e0" : "#333" }}>{c.author}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: dark ? "#666" : "#aaa" }}>{c.date}</span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: dark ? "#b0b0c8" : "#555", margin: 0, lineHeight: 1.6 }}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {shareOpen && <ShareModal blog={blog} onClose={() => setShareOpen(false)} dark={dark} />}
    </>
  );
}

// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ dark }) {
  const socials = [
    { name: "Twitter / X", icon: <Icon.Twitter />, url: "https://twitter.com/", color: "#000" },
    { name: "Instagram", icon: <Icon.Instagram />, url: "https://instagram.com/", color: "#E1306C" },
    { name: "LinkedIn", icon: <Icon.LinkedIn />, url: "https://linkedin.com/in/", color: "#0A66C2" },
    { name: "GitHub", icon: <Icon.GitHub />, url: "https://github.com/", color: dark ? "#e0e0e0" : "#24292e" },
    { name: "Portfolio", icon: <Icon.Globe />, url: "https://amblog.in", color: "#2E6FA3" },
  ];
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1rem" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "4rem" }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg,#E8543A 30%,#2E6FA3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", boxShadow: "0 8px 32px rgba(46,111,163,0.3)" }}>
          <AMLogoSVG size={60} />
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: dark ? "#f5f5f5" : "#1a1a2e", marginBottom: "0.5rem" }}>About the Author</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: dark ? "#888" : "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Writer · Designer · Developer</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: "3rem" }}>
        <div style={{ background: dark ? "#16213e" : "#fff", border: `1px solid ${dark ? "#2a2a4a" : "#ebebeb"}`, borderRadius: 20, padding: "2rem" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: dark ? "#f0f0f0" : "#1a1a2e", marginBottom: "1rem" }}>Hello, I'm AM 👋</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: dark ? "#b0b0c8" : "#555", marginBottom: "1rem" }}>
            I'm a writer, designer, and developer based in Maharashtra, India. I write about technology, design, culture, and the intersection of ideas — in both English and Marathi.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: dark ? "#b0b0c8" : "#555" }}>
            This blog is my space to think out loud, share stories, and connect with readers across languages and borders.
          </p>
        </div>
        <div style={{ background: dark ? "#16213e" : "#fff", border: `1px solid ${dark ? "#2a2a4a" : "#ebebeb"}`, borderRadius: 20, padding: "2rem" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: dark ? "#f0f0f0" : "#1a1a2e", marginBottom: "1.25rem" }}>Connect with me</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, background: dark ? "#1a2744" : "#f9f9f9", textDecoration: "none", color: dark ? "#d0d0e0" : "#333", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, border: `1px solid ${dark ? "#2a2a4a" : "#ebebeb"}`, transition: "transform 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
              >
                <span style={{ color: s.color }}>{s.icon}</span>
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,#E8543A 0%,#2E6FA3 100%)", borderRadius: 20, padding: "2rem", textAlign: "center", color: "#fff" }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontStyle: "italic", margin: 0 }}>
          "Writing is thinking made visible."
        </p>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({ blogs, setBlogs, dark, onClose }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", lang: "en", tags: "", readTime: "3 min" });
  const [isNew, setIsNew] = useState(false);

  const startEdit = (blog) => {
    setEditing(blog.id);
    setIsNew(false);
    setForm({ title: blog.title, excerpt: blog.excerpt, content: blog.content, lang: blog.lang, tags: blog.tags.join(", "), readTime: blog.readTime });
  };
  const startNew = () => {
    setEditing("new");
    setIsNew(true);
    setForm({ title: "", excerpt: "", content: "", lang: "en", tags: "", readTime: "3 min" });
  };
  const save = () => {
    if (!form.title.trim()) return;
    if (isNew) {
      const newBlog = { id: Date.now(), lang: form.lang, title: form.title, excerpt: form.excerpt, content: form.content, date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }), readTime: form.readTime, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), likes: 0, comments: [] };
      setBlogs(prev => [newBlog, ...prev]);
    } else {
      setBlogs(prev => prev.map(b => b.id === editing ? { ...b, title: form.title, excerpt: form.excerpt, content: form.content, lang: form.lang, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), readTime: form.readTime } : b));
    }
    setEditing(null);
  };
  const deleteBlog = (id) => {
    if (window.confirm("Delete this post?")) setBlogs(prev => prev.filter(b => b.id !== id));
  };

  const inputStyle = { width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${dark ? "#444" : "#ddd"}`, background: dark ? "#1a2744" : "#f9f9f9", color: dark ? "#e0e0e0" : "#333", fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 12 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 900, overflowY: "auto" }}>
      <div style={{ maxWidth: 800, margin: "2rem auto", background: dark ? "#0f1729" : "#fff", borderRadius: 24, padding: "2rem", minHeight: "calc(100vh - 4rem)", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ padding: "8px", background: dark ? "#1a2744" : "#e8f4fd", borderRadius: 10, color: "#2E6FA3" }}><Icon.Admin /></div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: dark ? "#f0f0f0" : "#1a1a2e", margin: 0 }}>Admin Panel</h2>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "#aaa" : "#666", padding: 4 }}><Icon.Close /></button>
        </div>

        {editing ? (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: dark ? "#f0f0f0" : "#1a1a2e", marginBottom: "1.5rem" }}>{isNew ? "New Post" : "Edit Post"}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 0 }}>
              <select value={form.lang} onChange={e => setForm(f => ({ ...f, lang: e.target.value }))} style={{ ...inputStyle, marginBottom: 12 }}>
                <option value="en">English</option>
                <option value="mr">मराठी</option>
              </select>
              <input value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} placeholder="Read time (e.g. 4 min)" style={inputStyle} />
            </div>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Post title" style={inputStyle} />
            <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma separated)" style={inputStyle} />
            <textarea value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} placeholder="Short excerpt / summary" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Full post content…" rows={12} style={{ ...inputStyle, resize: "vertical" }} />
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={save} style={{ background: "#E8543A", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Save Post</button>
              <button onClick={() => setEditing(null)} style={{ background: dark ? "#252542" : "#f0f0f0", color: dark ? "#aaa" : "#666", border: "none", padding: "12px 28px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <button onClick={startNew} style={{ display: "flex", alignItems: "center", gap: 8, background: "#E8543A", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", marginBottom: "2rem" }}>
              <Icon.Plus /> New Post
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {blogs.map(b => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "1rem 1.25rem", background: dark ? "#16213e" : "#f9f9f9", borderRadius: 14, border: `1px solid ${dark ? "#2a2a4a" : "#ebebeb"}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 50, background: b.lang === "mr" ? (dark ? "#3a1f15" : "#fff0eb") : (dark ? "#0f2a40" : "#e8f4fd"), color: b.lang === "mr" ? "#E8543A" : "#2E6FA3", fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>{b.lang === "mr" ? "मराठी" : "EN"}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: dark ? "#e0e0e0" : "#333", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: dark ? "#666" : "#aaa", flexShrink: 0 }}>{b.date}</span>
                  <button onClick={() => startEdit(b)} style={{ display: "flex", alignItems: "center", gap: 6, background: dark ? "#1a2744" : "#e8f4fd", border: "none", cursor: "pointer", color: "#2E6FA3", padding: "6px 12px", borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}><Icon.Edit /> Edit</button>
                  <button onClick={() => deleteBlog(b.id)} style={{ display: "flex", alignItems: "center", gap: 6, background: dark ? "#3a1f15" : "#fff0eb", border: "none", cursor: "pointer", color: "#E8543A", padding: "6px 12px", borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}><Icon.Delete /> Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ADMIN LOGIN ──────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess, onClose, dark }) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 950, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: dark ? "#1a1a2e" : "#fff", borderRadius: 20, padding: "2rem", width: "100%", maxWidth: 340, boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ padding: "8px", background: dark ? "#1a2744" : "#e8f4fd", borderRadius: 10, color: "#2E6FA3" }}><Icon.Admin /></div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: dark ? "#f0f0f0" : "#1a1a2e" }}>Admin Access</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "#aaa" : "#666" }}><Icon.Close /></button>
        </div>
        <input type="password" value={pass} onChange={e => { setPass(e.target.value); setErr(false); }} placeholder="Enter password" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${err ? "#E8543A" : (dark ? "#444" : "#ddd")}`, background: dark ? "#1a2744" : "#f9f9f9", color: dark ? "#e0e0e0" : "#333", fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 12 }}
          onKeyDown={e => e.key === "Enter" && (pass === ADMIN_PASS ? onSuccess() : setErr(true))}
        />
        {err && <p style={{ color: "#E8543A", fontFamily: "'DM Sans', sans-serif", fontSize: 13, margin: "0 0 12px" }}>Incorrect password.</p>}
        <button onClick={() => pass === ADMIN_PASS ? onSuccess() : setErr(true)} style={{ width: "100%", background: "#E8543A", color: "#fff", border: "none", padding: "12px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Login</button>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("all");
  const [page, setPage] = useState("home"); // home | about
  const [activeBlog, setActiveBlog] = useState(null);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [likedIds, setLikedIds] = useState(new Set());
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const bg = dark ? "#0a0e1a" : "#faf9f7";
  const textPrimary = dark ? "#f5f5f5" : "#1a1a2e";
  const textSecondary = dark ? "#888" : "#aaa";
  const border = dark ? "#2a2a4a" : "#ebebeb";

  const toggleLike = (id) => setLikedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const openBlog = (blog) => { setActiveBlog(blog); setPage("blog"); window.scrollTo(0, 0); };
  const openAdmin = () => { if (adminAuth) { setAdminOpen(true); } else { setLoginOpen(true); } };

  const filtered = lang === "all" ? blogs : blogs.filter(b => b.lang === lang);
  const enBlogs = blogs.filter(b => b.lang === "en");
  const mrBlogs = blogs.filter(b => b.lang === "mr");

  const navLinks = [
    { id: "home", label: "Blog" },
    { id: "about", label: "About" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'DM Sans', sans-serif", transition: "background 0.3s, color 0.3s" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;600&family=Noto+Serif+Devanagari:wght@700;800&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${dark ? "#3a3a5a" : "#ddd"}; border-radius: 3px; }
        ::selection { background: rgba(232,84,58,0.25); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
        @keyframes shimmer { 0%,100% { opacity:1; } 50% { opacity:0.7; } }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: dark ? "rgba(10,14,26,0.92)" : "rgba(250,249,247,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${border}`, padding: "0 1.5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Logo */}
          <button onClick={() => { setPage("home"); setActiveBlog(null); }} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", textDecoration: "none" }}>
            <AMLogoSVG size={32} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 20, color: textPrimary, letterSpacing: "-0.02em" }}>Abhishek <span style={{ color: "#E8543A" }}>Writes</span></span>
          </button>

          <div style={{ flex: 1 }} />

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, "@media(maxWidth:640px)": { display: "none" } }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => { setPage(l.id); setActiveBlog(null); }} style={{ background: page === l.id && !activeBlog ? (dark ? "#1a2744" : "#e8f4fd") : "none", border: "none", cursor: "pointer", color: page === l.id && !activeBlog ? "#2E6FA3" : textSecondary, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, padding: "8px 16px", borderRadius: 50, transition: "all 0.2s" }}>{l.label}</button>
            ))}
          </div>

          <button onClick={openAdmin} style={{ display: "flex", alignItems: "center", gap: 6, background: dark ? "#1a2744" : "#f0f0f0", border: "none", cursor: "pointer", color: dark ? "#aaa" : "#666", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, padding: "8px 16px", borderRadius: 50 }}>
            <Icon.Admin /> Admin
          </button>
          <button onClick={() => setDark(d => !d)} style={{ background: dark ? "#1a2744" : "#f0f0f0", border: "none", cursor: "pointer", color: textSecondary, padding: "8px", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.3s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "rotate(20deg)"}
            onMouseLeave={e => e.currentTarget.style.transform = "rotate(0)"}
          >
            {dark ? <Icon.Sun /> : <Icon.Moon />}
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
        {/* Blog detail */}
        {activeBlog && page === "blog" && (
          <div className="fade-up">
            <BlogDetail
              blog={blogs.find(b => b.id === activeBlog.id) || activeBlog}
              onBack={() => { setPage("home"); setActiveBlog(null); }}
              onLike={toggleLike} likedIds={likedIds} dark={dark}
              blogs={blogs} setBlogs={setBlogs}
            />
          </div>
        )}

        {/* About page */}
        {page === "about" && !activeBlog && (
          <div className="fade-up"><AboutPage dark={dark} /></div>
        )}

        {/* Home / Blog listing */}
        {page === "home" && !activeBlog && (
          <div className="fade-up">
            {/* Hero */}
            <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 4rem" }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                <AMLogoSVG size={56} />
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4rem)", fontWeight: 800, color: textPrimary, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
                Abhishek <span style={{ color: "#E8543A" }}>Writes</span>
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: textSecondary, lineHeight: 1.7 }}>
                Writing about design, technology, and life — in English and Marathi.
              </p>
            </div>

            {/* Language filter */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
              {[{ v: "all", l: "All Posts" }, { v: "en", l: "English" }, { v: "mr", l: "मराठी" }].map(opt => (
                <button key={opt.v} onClick={() => setLang(opt.v)} style={{ background: lang === opt.v ? (opt.v === "mr" ? "#E8543A" : opt.v === "en" ? "#2E6FA3" : textPrimary) : (dark ? "#16213e" : "#fff"), color: lang === opt.v ? "#fff" : textSecondary, border: `1.5px solid ${lang === opt.v ? "transparent" : border}`, padding: "9px 22px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>{opt.l}</button>
              ))}
            </div>

            {/* Two-section layout when showing all */}
            {lang === "all" ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
                {/* EN section */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, background: dark ? "#0f2a40" : "#e8f4fd", color: "#2E6FA3", fontFamily: "'DM Sans', sans-serif" }}>English</span>
                    <div style={{ flex: 1, height: 1, background: border }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {enBlogs.map((b, i) => <div key={b.id} style={{ animationDelay: `${i * 0.08}s` }} className="fade-up"><BlogCard blog={b} onOpen={openBlog} onLike={toggleLike} likedIds={likedIds} dark={dark} /></div>)}
                  </div>
                </div>
                {/* MR section */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, background: dark ? "#3a1f15" : "#fff0eb", color: "#E8543A", fontFamily: "'DM Sans', sans-serif" }}>मराठी</span>
                    <div style={{ flex: 1, height: 1, background: border }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {mrBlogs.map((b, i) => <div key={b.id} style={{ animationDelay: `${i * 0.08}s` }} className="fade-up"><BlogCard blog={b} onOpen={openBlog} onLike={toggleLike} likedIds={likedIds} dark={dark} /></div>)}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
                {filtered.map((b, i) => <div key={b.id} style={{ animationDelay: `${i * 0.08}s` }} className="fade-up"><BlogCard blog={b} onOpen={openBlog} onLike={toggleLike} likedIds={likedIds} dark={dark} /></div>)}
              </div>
            )}

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "4rem", color: textSecondary, fontFamily: "'DM Sans', sans-serif" }}>No posts yet.</div>
            )}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "2rem 1.5rem", background: dark ? "#070b16" : "#f5f4f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AMLogoSVG size={24} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 16, color: textPrimary }}>Abhishek <span style={{ color: "#E8543A" }}>Writes</span></span>
          </div>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: textSecondary }}>© 2026 Abhishek Writes · Ideas in two voices</span>
          <div style={{ display: "flex", gap: 8 }}>
            {["Twitter", "Instagram", "LinkedIn", "GitHub"].map(s => (
              <a key={s} href="#" style={{ display: "flex", padding: 8, borderRadius: "50%", background: dark ? "#16213e" : "#fff", border: `1px solid ${border}`, color: textSecondary, transition: "color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#E8543A"}
                onMouseLeave={e => e.currentTarget.style.color = textSecondary}
              >
                {s === "Twitter" ? <Icon.Twitter /> : s === "Instagram" ? <Icon.Instagram /> : s === "LinkedIn" ? <Icon.LinkedIn /> : <Icon.GitHub />}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── MODALS ── */}
      {loginOpen && <AdminLogin onSuccess={() => { setAdminAuth(true); setLoginOpen(false); setAdminOpen(true); }} onClose={() => setLoginOpen(false)} dark={dark} />}
      {adminOpen && <AdminPanel blogs={blogs} setBlogs={setBlogs} dark={dark} onClose={() => setAdminOpen(false)} />}
    </div>
  );
}
