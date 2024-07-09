"use client";
import { usePreferences } from "@/components/preferences-provider";
import { SettingsFormForOnboarding } from "@/components/settings-modal";
import { PreferencesTranslations } from "@/lib/translationObjects";
import useTranslation from "next-translate/useTranslation";

export function Onboarding() {
  const { t } = useTranslation("common");
  const preferences = usePreferences();

  const preferencesTranslations: PreferencesTranslations = {
    title: t("preferences.title"),
    description: t("preferences.description"),
    gradeDecimals: t("preferences.grade-decimals"),
    gradeDecimalsDescription: t("preferences.grade-decimals-description"),
    gradeDecimalsPlaceholder: t("preferences.grade-decimals-placeholder"),
    keepModalsOpen: t("preferences.keep-modals-open"),
    keepModalsOpenDescription: t("preferences.keep-modals-open-description"),
    passingGrade: t("preferences.passing-grade"),
    passingGradeDescription: t("preferences.passing-grade-description"),
    passingGradePlaceholder: t("preferences.passing-grade-placeholder"),
    minimumGrade: t("preferences.minimum-grade"),
    minimumGradeDescription: t("preferences.minimum-grade-description"),
    minimumGradePlaceholder: t("preferences.minimum-grade-placeholder"),
    maximumGrade: t("preferences.maximum-grade"),
    maximumGradeDescription: t("preferences.maximum-grade-description"),
    maximumGradePlaceholder: t("preferences.maximum-grade-placeholder"),
    passingInverse: t("preferences.passing-inverse"),
    passingInverseDescription: t("preferences.passing-inverse-description"),
    alertTitle: t("preferences.alert-title"),
    alertDescription: t("preferences.alert-description"),
  };
  if (preferences.isDefault)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <div className="items-center gap-8 flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight text-white-900 sm:text-6xl">
            Grades
            <br />
            Onboarding
          </h1>
        </div>
        <div>
          <SettingsFormForOnboarding translations={preferencesTranslations} />
        </div>
      </div>
    );
}
