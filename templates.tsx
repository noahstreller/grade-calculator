export type PreferenceTemplate = {
  id: string;
  title: string;
  passingGrade: number | null;
  minimumGrade: number | null;
  maximumGrade: number | null;
  passingInverse: boolean | null;
};

export const templates: PreferenceTemplate[] = [
  {
    id: "custom",
    title: "✒️ Custom",
    passingGrade: 5,
    minimumGrade: 1,
    maximumGrade: 10,
    passingInverse: false,
  },
  {
    id: "percentage",
    title: "🌍 Percentage",
    passingGrade: 50,
    minimumGrade: 0,
    maximumGrade: 100,
    passingInverse: false,
  },
  {
    id: "switzerland",
    title: "🇨🇭 Switzerland",
    passingGrade: 4,
    minimumGrade: 1,
    maximumGrade: 6,
    passingInverse: false,
  },
  {
    id: "germany",
    title: "🇩🇪 Germany",
    passingGrade: 4,
    minimumGrade: 1,
    maximumGrade: 6,
    passingInverse: true,
  },
  {
    id: "poland_hs",
    title: "🇵🇱 Poland",
    passingGrade: 2,
    minimumGrade: 1,
    maximumGrade: 6,
    passingInverse: false,
  },
  {
    id: "poland_he",
    title: "🇵🇱 Poland (Higher Ed.)",
    passingGrade: 3,
    minimumGrade: 2,
    maximumGrade: 5.5,
    passingInverse: false,
  },
  {
    id: "france",
    title: "🇫🇷 France",
    passingGrade: 10,
    minimumGrade: 0,
    maximumGrade: 20,
    passingInverse: false,
  },
  {
    id: "italy_hs",
    title: "🇮🇹 Italy",
    passingGrade: 6,
    minimumGrade: 0,
    maximumGrade: 10,
    passingInverse: false,
  },
  {
    id: "italy_he",
    title: "🇮🇹 Italy (Higher Ed.)",
    passingGrade: 18,
    minimumGrade: 0,
    maximumGrade: 10,
    passingInverse: false,
  },
];
