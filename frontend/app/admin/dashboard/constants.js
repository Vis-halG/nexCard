export const DEFAULT_THEME = {
  primary: "#0d6efd",
  background: "#ffffff",
  layout: "minimal",
  font: "font-sans",
  radius: "0.375rem",
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
  actionAnimation: "none",
  bioFontSize: "standard",
  cardBorderPattern: "none",
  formAesthetic: "flat",
  cardBg: "#ffffff",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  cardText: "#212529",
  btnBg: "#0d6efd",
  btnText: "#ffffff",
  inputBg: "#ffffff",
  inputText: "#212529",
  gradientStart: "#0d6efd",
  gradientEnd: "#6c757d"
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
      { primary: "#00C2FF", background: "#F7FEFF", accent: "#FFE156" },
      { primary: "#14F195", background: "#F3FFF9", accent: "#00C2FF" },
      { primary: "#FF3D71", background: "#FFF6FA", accent: "#FFE156" },
      { primary: "#FFB000", background: "#FFFBEB", accent: "#00C2FF" },
      { primary: "#7C3AED", background: "#F8F5FF", accent: "#14F195" }
    ]
  },
  {
    name: "Classic Corporate",
    layout: "classic",
    colorCombinations: [
      { primary: "#0078C7", background: "#F2FAFF", accent: "#00C2FF" },
      { primary: "#102033", background: "#F8FAFC", accent: "#FF3D71" },
      { primary: "#0F766E", background: "#F0FDFA", accent: "#14F195" },
      { primary: "#C026D3", background: "#FDF4FF", accent: "#FFB000" },
      { primary: "#E11D48", background: "#FFF1F2", accent: "#00C2FF" }
    ]
  },
  {
    name: "Swiss Minimal",
    layout: "minimal",
    colorCombinations: [
      { primary: "#00C2FF", background: "#FFFFFF", accent: "#FF3D71" },
      { primary: "#111827", background: "#FFFFFF", accent: "#FFE156" },
      { primary: "#14F195", background: "#FBFFFD", accent: "#102033" },
      { primary: "#FFB000", background: "#FFFDF7", accent: "#00C2FF" },
      { primary: "#FF3D71", background: "#FFF9FB", accent: "#111827" }
    ]
  },
  {
    name: "Rose Glass",
    layout: "glass",
    colorCombinations: [
      { primary: "#FF3D71", background: "#FFF6FA", accent: "#FFE156" },
      { primary: "#00C2FF", background: "#F5FDFF", accent: "#14F195" },
      { primary: "#8B5CF6", background: "#FAF7FF", accent: "#FF3D71" },
      { primary: "#14B8A6", background: "#F0FDFA", accent: "#FFE156" },
      { primary: "#FF7A00", background: "#FFF7ED", accent: "#00C2FF" }
    ]
  },
  {
    name: "Bold Luxe",
    layout: "bold",
    colorCombinations: [
      { primary: "#00A6D6", background: "#F7FEFF", accent: "#FFE156" },
      { primary: "#FF6B00", background: "#FFF7ED", accent: "#FF3D71" },
      { primary: "#4F46E5", background: "#F8F5FF", accent: "#14F195" },
      { primary: "#16A34A", background: "#F0FDF4", accent: "#00C2FF" },
      { primary: "#FFB000", background: "#FFFBEB", accent: "#102033" }
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
  },
  {
    name: "Frosted Glass",
    layout: "glass",
    colorCombinations: [
      { primary: "#8B5CF6", background: "#F5F3FF", accent: "#EC4899" },
      { primary: "#06B6D4", background: "#ECFEFF", accent: "#3B82F6" },
      { primary: "#10B981", background: "#ECFDF5", accent: "#F59E0B" },
      { primary: "#EC4899", background: "#FDF2F8", accent: "#8B5CF6" },
      { primary: "#3B82F6", background: "#EFF6FF", accent: "#10B981" }
    ]
  },
  {
    name: "Soft Neumorphic",
    layout: "neumorphism",
    colorCombinations: [
      { primary: "#0078FF", background: "#E8ECF2", accent: "#FF2E93" },
      { primary: "#7928CA", background: "#EAE6F8", accent: "#FF007F" },
      { primary: "#00DF89", background: "#E4F3ED", accent: "#0078FF" },
      { primary: "#FF5E36", background: "#F5EBE6", accent: "#FF2E93" },
      { primary: "#1E293B", background: "#E2E8F0", accent: "#0078FF" }
    ]
  }
];
