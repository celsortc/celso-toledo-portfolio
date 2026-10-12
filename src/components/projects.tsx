import WorksWheel, { type WorksWheelItem } from "@/components/ui/works-wheel";
import axisImage from "../../assets/projects/axis-cover.jpg";
import doaeImage from "../../assets/projects/doae-cover.svg";

export default function Projects({ language }: { language: "en" | "pt" }) {
  const { translate: t } = window.portfolioI18n;
  const items: WorksWheelItem[] = [
    {
      title: "Axis",
      image: axisImage,
      href: "https://github.com/celsortc/Axis",
      description: t("axisDescription"),
      kind: t("personal"),
      status: t("inDevelopment"),
      technologies: ["HTML", "CSS", "JavaScript"],
      notes: [t("axisProblem"), t("axisNext")],
      imageLabel:
        language === "pt"
          ? "Interface real do protótipo · valores de exemplo"
          : "Actual prototype interface · sample values",
    },
    {
      title: "Doae",
      image: doaeImage,
      href: "https://github.com/celsortc/Doae",
      description: t("doaeDescription"),
      kind: t("academic"),
      status: t("inDevelopment"),
      technologies: ["Java", "Swing", "Maven"],
      notes: [t("doaeProblem"), t("doaeNext")],
      imageLabel:
        language === "pt"
          ? "Ilustração conceitual · estoque de doações"
          : "Concept illustration · donation inventory",
    },
  ];
  return (
    <WorksWheel
      items={items}
      label={t("navWork")}
      action={t("viewCode")}
      detailsLabel={t("projectDetails")}
      hint={
        language === "pt"
          ? "Role para explorar entre os projetos"
          : "Scroll to explore the projects"
      }
      previousLabel={
        language === "pt" ? "Projeto anterior" : "Previous project"
      }
      nextLabel={language === "pt" ? "Próximo projeto" : "Next project"}
    />
  );
}
