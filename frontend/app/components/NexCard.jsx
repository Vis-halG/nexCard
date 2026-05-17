import ModernTheme from "./themes/ModernTheme";
import ClassicTheme from "./themes/ClassicTheme";
import MinimalTheme from "./themes/MinimalTheme";
import GlassTheme from "./themes/GlassTheme";
import BoldTheme from "./themes/BoldTheme";
import NeoTheme from "./themes/NeoTheme";

export default function NexCard({ data, inPreview = false }) {
  const layout = data?.theme?.layout || "modern";

  switch (layout) {
    case "classic":
      return <ClassicTheme data={data} inPreview={inPreview} />;
    case "minimal":
      return <MinimalTheme data={data} inPreview={inPreview} />;
    case "glass":
      return <GlassTheme data={data} inPreview={inPreview} />;
    case "bold":
      return <BoldTheme data={data} inPreview={inPreview} />;
    case "neo":
      return <NeoTheme data={data} inPreview={inPreview} />;
    case "modern":
    default:
      return <ModernTheme data={data} inPreview={inPreview} />;
  }
}
