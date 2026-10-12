/// <reference types="vite/client" />
interface Window {
  portfolioI18n: {
    translate: (key: string) => string;
    setLanguage: (language: "en" | "pt") => void;
  };
}
