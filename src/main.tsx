import { useEffect, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { createPortal } from "react-dom";
import "./styles/tailwind.css";
import "./styles/portfolio-theme.css";
import "./styles/works-wheel.css";
import "../scripts/i18n.js";
import "../scripts/main.js";
import Demo from "./components/demo";
import Projects from "./components/projects";

function HeroApp() {
  const [language, setLanguage] = useState<"en" | "pt">(
    document.documentElement.lang.startsWith("pt") ? "pt" : "en",
  );
  useEffect(() => {
    const updateLanguage = () =>
      setLanguage(document.documentElement.lang.startsWith("pt") ? "pt" : "en");
    document.addEventListener("portfolio:languagechange", updateLanguage);
    return () =>
      document.removeEventListener("portfolio:languagechange", updateLanguage);
  }, []);
  return (
    <>
      <Demo
        language={language}
        onLanguageChange={(next) => window.portfolioI18n.setLanguage(next)}
      />
      {createPortal(
        <Projects language={language} />,
        document.getElementById("works-root")!,
      )}
    </>
  );
}
const root: Root =
  import.meta.hot?.data.root ??
  createRoot(document.getElementById("hero-root")!);
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(<HeroApp />);
