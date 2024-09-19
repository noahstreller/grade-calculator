/* eslint-disable @next/next/no-img-element */
import { CategoryGroup } from "@/components/category-group";
import { LoggedInAvatar } from "@/components/logged-in-avatar";
import { Button } from "@/components/ui/button";
import {
  ClearDataTranslations,
  PreferencesTranslations,
} from "@/lib/translationObjects";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { ClearDataButton } from "./clear-data-button";
import { DashboardButton } from "./dashboard-button";
import { ImportExportButton } from "./import-export-button";
import { SettingsModal } from "./settings-modal";
import { ThemeSwitcher } from "./theme-switcher";

export default function HeaderComponent() {
  const t = useTranslations();

  const clearDataTranslations: ClearDataTranslations = {
    prompt: t("actions.clear-data.prompt"),
    message: t("actions.clear-data.message"),
    cancel: t("actions.cancel"),
    dangerContinue: t("actions.danger-continue"),
    actions: {
      clearGradesOnly: t("actions.clear-grades-only"),
    },
  };

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

  return (
    <header className="h-[64px] py-[10px] px-[20px] flex justify-between fixed top-0 left-0 w-[100dvw] bg-transparent z-[10] backdrop-blur-[20px]">
      <Link
        href="/"
        className="flex items-center text-center opacity-80 gap-1 hover:opacity-100 hover:translate-x-[10px] transition-all"
      >
        <img
          src="/icon.png"
          alt="Logo"
          className="h-[100%] dark:invert opacity-80 drag-none select-none"
        />
        <h1
          className={
            "hidden md:inline-block xl:inline-block lg:inline-block sm:inline-block text-3xl font-bold text-foreground whitespace-nowrap select-none"
          }
        >
          {t("app.title")}
        </h1>
        <h1
          className={
            "hidden xs:inline-block  sm:hidden text-3xl font-bold text-foreground whitespace-nowrap select-none"
          }
        >
          {t("app.short-title")}
        </h1>
      </Link>
      {isMobile ? null : (
        <div className="hidden lg:flex">
          <CategoryGroup />
        </div>
      )}
      <div className="flex gap-3">
        <DashboardButton />
        <div className="hidden md:flex gap-3">
          <ClearDataButton translations={clearDataTranslations}>
            <Button
              size="icon"
              variant="outline"
              className="hover:text-red-400"
            >
              <Trash2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-inherit" />
            </Button>
          </ClearDataButton>
          <ImportExportButton />
          <ThemeSwitcher />
        </div>
        <SettingsModal
          clearDataTranslations={clearDataTranslations}
          translations={preferencesTranslations}
        />
        <LoggedInAvatar />
      </div>
    </header>
  );
}
