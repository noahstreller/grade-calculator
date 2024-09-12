/* eslint-disable @next/next/no-img-element */
import { CategoryGroup } from "@/components/category-group";
import { LoggedInAvatar } from "@/components/logged-in-avatar";
import { Button } from "@/components/ui/button";
import {
  ClearDataTranslations,
  PreferencesTranslations,
} from "@/lib/translationObjects";
import { Trash2 } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { ClearDataButton } from "./clear-data-button";
import { DashboardButton } from "./dashboard-button";
import { ImportExportButton } from "./import-export-button";
import { SettingsModal } from "./settings-modal";
import { ThemeSwitcher } from "./theme-switcher";

export default function HeaderComponent() {
  const { t } = useTranslation("common");

  const clearDataTranslations: ClearDataTranslations = {
    prompt: t("common.actions.clear-data.prompt"),
    message: t("common.actions.clear-data.message"),
    cancel: t("common.actions.cancel"),
    dangerContinue: t("common.actions.danger-continue"),
  };

  const preferencesTranslations: PreferencesTranslations = {
    title: t("common.preferences.title"),
    description: t("common.preferences.description"),
    gradeDecimals: t("common.preferences.grade-decimals"),
    gradeDecimalsDescription: t(
      "common.preferences.grade-decimals-description"
    ),
    gradeDecimalsPlaceholder: t(
      "common.preferences.grade-decimals-placeholder"
    ),
    keepModalsOpen: t("common.preferences.keep-modals-open"),
    keepModalsOpenDescription: t(
      "common.preferences.keep-modals-open-description"
    ),
    passingGrade: t("common.preferences.passing-grade"),
    passingGradeDescription: t("common.preferences.passing-grade-description"),
    passingGradePlaceholder: t("common.preferences.passing-grade-placeholder"),
    minimumGrade: t("common.preferences.minimum-grade"),
    minimumGradeDescription: t("common.preferences.minimum-grade-description"),
    minimumGradePlaceholder: t("common.preferences.minimum-grade-placeholder"),
    maximumGrade: t("common.preferences.maximum-grade"),
    maximumGradeDescription: t("common.preferences.maximum-grade-description"),
    maximumGradePlaceholder: t("common.preferences.maximum-grade-placeholder"),
    passingInverse: t("common.preferences.passing-inverse"),
    passingInverseDescription: t(
      "common.preferences.passing-inverse-description"
    ),
    alertTitle: t("common.preferences.alert-title"),
    alertDescription: t("common.preferences.alert-description"),
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
          {t("common.app.title")}
        </h1>
        <h1
          className={
            "hidden xs:inline-block  sm:hidden text-3xl font-bold text-foreground whitespace-nowrap select-none"
          }
        >
          Grades
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
              <span className="sr-only">Delete all data</span>
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
