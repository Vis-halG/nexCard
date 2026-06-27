export const DEFAULT_THEME = {
  primary: "#4f46e5",
  background: "#f8fafc",
  layout: "modern",
  font: "font-sans",
  radius: "1rem",
  cardStyle: "standard",
  avatarStyle: "circle",
  bgEffect: "none",
  defaultQr: "share",
  bgGradient: "none",
  textAlign: "center",
  shadowDepth: "subtle",
  bannerSize: "standard",
  avatarBorder: "thick",
  socialStyle: "colored",
  qrLogo: "none",
  actionAnimation: "float",
  bioFontSize: "standard",
  cardBorderPattern: "none",
  formAesthetic: "flat",
  cardBg: "#ffffff",
  textPrimary: "#0f172a",
  textSecondary: "#64748b",
  cardText: "#1e293b",
  btnBg: "#4f46e5",
  btnText: "#ffffff",
  inputBg: "#f1f5f9",
  inputText: "#0f172a",
  gradientStart: "#4f46e5",
  gradientEnd: "#ec4899"
};

export const INITIAL_FORM = {
  name: "",
  title: "",
  company: "",
  phone: "",
  email: "",
  about: "",
  image: "",
  coverImage: "",
  address: "",
  website: "",
  calendarUrl: "",
  googleReviewsUrl: "",
  social: { instagram: "", linkedin: "", twitter: "", facebook: "", youtube: "" },
  payment: { upi: "", link: "", bankDetails: "", qrCode: "" },
  services: [],
  gallery: [],
  customLinks: [],
  videos: [],
  theme: DEFAULT_THEME,
  preferences: {
    showAbout: true,
    showServices: true,
    showSocial: true,
    showGallery: true,
    showVideos: true,
    showCustomLinks: true,
    showPayment: true,
    showLocation: true,
    showContactForm: true,
    showShare: true,
    showSaveContact: true
  }
};

export const DEFAULT_COLOR_INDEXES = {
  modern: 0,
  classic: 0,
  minimal: 0,
  glass: 0,
  bold: 0,
  neo: 0
};

export const DASHBOARD_TABS = [
  { id: "profile", label: "Profile Info", shortLabel: "Profile" },
  { id: "business", label: "Business & Contacts", shortLabel: "Contacts" },
  { id: "social", label: "Social Links", shortLabel: "Social" },
  { id: "media", label: "Media & Arrays", shortLabel: "Media" },
  { id: "themes", label: "Theme Presets", shortLabel: "Themes" },
  { id: "design", label: "Design Settings", shortLabel: "Design" },
  { id: "visibility", label: "Section Visibility", shortLabel: "Visibility" }
];

export const THEME_PRESETS = [
  {
    name: "Modern (Curved)",
    layout: "modern",
    colorCombinations: [
      { primary: "#4F46E5", background: "#F8FAFC", accent: "#6366F1" },
      { primary: "#10B981", background: "#F0FDF4", accent: "#34D399" },
      { primary: "#F43F5E", background: "#FFF1F2", accent: "#FB7185" },
      { primary: "#F59E0B", background: "#FFFBEB", accent: "#FBBF24" },
      { primary: "#7C3AED", background: "#F5F3FF", accent: "#A78BFA" }
    ]
  },
  {
    name: "Classic Corporate",
    layout: "classic",
    colorCombinations: [
      { primary: "#1D4ED8", background: "#EFF6FF", accent: "#3B82F6" },
      { primary: "#0F172A", background: "#F8FAFC", accent: "#475569" },
      { primary: "#800020", background: "#FFFDF9", accent: "#A24857" },
      { primary: "#14532D", background: "#F0FDF4", accent: "#16A34A" },
      { primary: "#0E7490", background: "#ECFEFF", accent: "#06B6D4" }
    ]
  },
  {
    name: "Swiss Minimal",
    layout: "minimal",
    colorCombinations: [
      { primary: "#334155", background: "#FFFFFF", accent: "#475569" },
      { primary: "#000000", background: "#FFFFFF", accent: "#000000" },
      { primary: "#3F6212", background: "#F9FAF8", accent: "#4D7C0F" },
      { primary: "#44403C", background: "#FAF8F5", accent: "#57534E" },
      { primary: "#991B1B", background: "#FFFDFD", accent: "#B91C1C" }
    ]
  },
  {
    name: "Rose Glass",
    layout: "glass",
    colorCombinations: [
      { primary: "#B76E79", background: "#FFF7F3", accent: "#EAB8A6" },
      { primary: "#0D9488", background: "#F0FDFA", accent: "#5EEAD4" },
      { primary: "#8B5CF6", background: "#FAF5FF", accent: "#C084FC" },
      { primary: "#059669", background: "#F0FDF4", accent: "#6EE7B7" },
      { primary: "#EA580C", background: "#FFF7ED", accent: "#FDBA74" }
    ]
  },
  {
    name: "Bold Luxe",
    layout: "bold",
    colorCombinations: [
      { primary: "#0EA5A4", background: "#F7FBF8", accent: "#F4B860" },
      { primary: "#C2410C", background: "#FFF7ED", accent: "#F97316" },
      { primary: "#6366F1", background: "#FAF5FF", accent: "#EC4899" },
      { primary: "#15803D", background: "#F0FDF4", accent: "#22C55E" },
      { primary: "#B45309", background: "#FFFBEB", accent: "#F59E0B" }
    ]
  },
  {
    name: "Cyber Neon",
    layout: "neo",
    colorCombinations: [
      { primary: "#00FFCC", background: "#0A0A0A", accent: "#00ccff" },
      { primary: "#FF007F", background: "#050505", accent: "#7F00FF" },
      { primary: "#39FF14", background: "#030A00", accent: "#00FF00" },
      { primary: "#FFD700", background: "#080700", accent: "#FF8C00" },
      { primary: "#00E5FF", background: "#000A0A", accent: "#0066FF" }
    ]
  }
];
