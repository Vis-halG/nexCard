import ModernTheme from "./themes/ModernTheme";
import ClassicTheme from "./themes/ClassicTheme";
import MinimalTheme from "./themes/MinimalTheme";
import GlassTheme from "./themes/GlassTheme";
import BoldTheme from "./themes/BoldTheme";
import NeoTheme from "./themes/NeoTheme";

export default function NexCard({ data }) {
  const layout = data?.theme?.layout || "modern";

  switch (layout) {
    case "classic":
      return <ClassicTheme data={data} />;
    case "minimal":
      return <MinimalTheme data={data} />;
    case "glass":
      return <GlassTheme data={data} />;
    case "bold":
      return <BoldTheme data={data} />;
    case "neo":
      return <NeoTheme data={data} />;
    case "modern":
    default:
      return <ModernTheme data={data} />;
  }
}
