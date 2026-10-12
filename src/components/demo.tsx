import Component from "@/components/ui/portfolio-hero";
import portraitUrl from "../../assets/celso-profile.jpg";

export default function Demo({
  language,
  onLanguageChange,
}: {
  language: "en" | "pt";
  onLanguageChange: (language: "en" | "pt") => void;
}) {
  const { translate } = window.portfolioI18n;
  return (
    <Component
      firstName="CELSO"
      lastName="TOLEDO"
      signature="C"
      portraitUrl={portraitUrl}
      tagline={translate("heroTagline")}
      navigation={[
        {
          label: translate("navWork").toUpperCase(),
          href: "#work",
          highlight: true,
        },
        { label: translate("navAbout").toUpperCase(), href: "#about" },
        { label: translate("navContact").toUpperCase(), href: "#contact" },
      ]}
      language={language}
      onLanguageChange={onLanguageChange}
    />
  );
}
