import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tailwind.css";
import "./styles/portfolio-theme.css";
import "../scripts/i18n.js";
import "../scripts/main.js";
import Demo from "./components/demo";

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
    <Demo
      language={language}
      onLanguageChange={(next) => window.portfolioI18n.setLanguage(next)}
    />
  );
}
createRoot(document.getElementById("hero-root")!).render(<HeroApp />);
