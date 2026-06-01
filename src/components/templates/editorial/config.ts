import { ResumeTemplate } from "@/types/template";

export const editorialConfig: ResumeTemplate = {
  id: "editorial",
  name: "Editorial",
  description: "High-end editorial style combining large serif display type with condensed sans-serif, with an exclusive side timeline — exudes luxury.",
  thumbnail: "editorial",
  layout: "editorial",
  colorScheme: {
    primary: "#000000",
    secondary: "#666666",
    text: "#1a1a1a",
    background: "#FFFFFF",
  },
  spacing: {
    sectionGap: 32,
    itemGap: 16,
    contentPadding: 36,
  },
  basic: {
    layout: "left",
  },
  availableSections: ["basic", "experience", "education", "projects", "skills", "selfEvaluation", "certificates", "languages", "custom"],
};
