import { ResumeTemplate } from "@/types/template";

export const leftRightConfig: ResumeTemplate = {
  id: "left-right",
  name: "Bold Headers",
  description: "Vivid section header backgrounds for a distinctive, polished look.",
  thumbnail: "leftRight",
  layout: "left-right",
  colorScheme: {
    primary: "#000000",
    secondary: "#9ca3af",
    background: "#ffffff",
    text: "#212529",
  },
  spacing: {
    sectionGap: 24,
    itemGap: 16,
    contentPadding: 32,
  },
  basic: {
    layout: "left",
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"],
};
