import { ResumeTemplate } from "@/types/template";

export const creativeConfig: ResumeTemplate = {
  id: "creative",
  name: "Creative",
  description: "Staggered visual design that brings personality and energy to your resume.",
  thumbnail: "creative",
  layout: "creative",
  colorScheme: {
    primary: "#18181b",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1e293b",
  },
  spacing: {
    sectionGap: 16,
    itemGap: 16,
    contentPadding: 14,
  },
  basic: {
    layout: "left",
  },
  availableSections: ["skills", "experience", "projects", "education", "selfEvaluation", "certificates"],
};
