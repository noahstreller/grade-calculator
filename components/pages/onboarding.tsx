"use client";
import { usePreferences } from "@/components/preferences-provider";
import { SettingsFormForOnboarding } from "@/components/settings-modal";
import { TemplateSelector } from "@/components/template-selector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Highlight } from "@/components/ui/card-stack";
import { useDevice } from "@/lib/hooks/useMediaQuery";
import { PreferencesTranslations } from "@/lib/translationObjects";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function Onboarding() {
  const t = useTranslations();
  const preferences = usePreferences();
  const { isMobile, isTablet, isDesktop } = useDevice();

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

  const [selectedTemplate, setSelectedTemplate] = useState<string>();

  if (preferences.isDefault)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-start bg-background z-50 pt-8 overflow-scroll">
        <div className="items-center gap-8 flex flex-col">
          <h1 className="text-4xl font-bold tracking-tight text-white-900 sm:text-6xl">
            <span className="text-muted-foreground">Grades</span>
            <br />
            Onboarding
          </h1>
        </div>
        <div
          className={cn(
            "pt-12 flex items-start",
            selectedTemplate && "gap-x-20 gap-y-12",
            isMobile ? "flex-col" : "flex-row"
          )}
        >
          <TemplateSelector setSelectedTemplate={setSelectedTemplate} />
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            {selectedTemplate && (
              <Card className={cn(isMobile ? "max-w-80" : "max-w-md")}>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>
                    Hit <Highlight>Save</Highlight> to apply your changes and
                    complete the onboarding.
                    <br /> You can change this in the settings at any time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SettingsFormForOnboarding
                    selectedTemplate={selectedTemplate || "percentage"}
                    translations={preferencesTranslations}
                  />
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    );
}
