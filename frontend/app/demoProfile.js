export const DEMO_EMAIL = "vishalgupta25980@gmail.com";

export const createDemoProfile = ({ uid, username }) => ({
  uid,
  username,
  email: DEMO_EMAIL,
  name: "Vishal Gupta",
  title: "UI/UX Designer & Frontend Developer",
  company: "NexCard Studio",
  phone: "+91 98765 43210",
  about: "I design polished digital products, landing pages, dashboards, and brand systems for fast-moving startups. This demo NexCard shows how one smart visiting card can carry profile details, services, media, payments, links, and lead actions in a single shareable page.",
  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
  address: "Bandra Kurla Complex, Mumbai, Maharashtra 400051",
  website: "https://nexcard.app",
  calendarUrl: "https://calendly.com/vishalgupta25980/intro-call",
  googleReviewsUrl: "https://g.page/r/demo-nexcard/review",
  social: {
    instagram: "https://instagram.com/nexcard.app",
    linkedin: "https://linkedin.com/in/vishalgupta25980",
    twitter: "https://x.com/nexcardapp",
    facebook: "https://facebook.com/nexcardapp",
    youtube: "https://youtube.com/@nexcardapp"
  },
  payment: {
    upi: "vishalgupta25980@upi",
    link: "https://rzp.io/l/nexcard-demo",
    bankDetails: "Bank Name: HDFC Bank\nAccount Name: Vishal Gupta\nAccount No: 123456789012\nIFSC: HDFC0001234",
    qrCode: ""
  },
  services: [
    "UI/UX Product Design",
    "Responsive Website Design",
    "Next.js Frontend Development",
    "Brand Identity Systems",
    "Digital Visiting Cards",
    "Startup MVP Prototypes"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop"
  ],
  videos: [
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/ysz5S6PUM-U"
  ],
  customLinks: [
    { title: "View Portfolio", url: "https://nexcard.app/portfolio" },
    { title: "Download Company Brochure", url: "https://nexcard.app/brochure.pdf" },
    { title: "Book a Free Consultation", url: "https://calendly.com/vishalgupta25980/intro-call" },
    { title: "WhatsApp Quick Chat", url: "https://wa.me/919876543210" }
  ],
  theme: {
    primary: "#4F46E5",
    background: "#F8FAFC",
    layout: "modern",
    font: "font-sans",
    radius: "1.5rem",
    cardStyle: "glass",
    avatarStyle: "circle",
    bgEffect: "mesh",
    defaultQr: "share",
    bgGradient: "sunset",
    textAlign: "center",
    shadowDepth: "glow",
    bannerSize: "tall",
    avatarBorder: "thick",
    socialStyle: "colored",
    qrLogo: "avatar",
    actionAnimation: "float",
    bioFontSize: "standard",
    cardBorderPattern: "none",
    formAesthetic: "pill",
    cardBg: "#FFFFFF",
    textPrimary: "#0F172A",
    textSecondary: "#64748B",
    cardText: "#1E293B",
    btnBg: "#4F46E5",
    btnText: "#FFFFFF",
    inputBg: "#F1F5F9",
    inputText: "#0F172A",
    gradientStart: "#4F46E5",
    gradientEnd: "#EC4899"
  },
  demoReady: true
});
