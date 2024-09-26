"use client";
import { useCategory } from "@/components/category-provider";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/card-stack";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MediaQueries, useMediaQuery } from "@/lib/hooks/useMediaQuery";
import {
  archiveCategory,
  prepareDataForExport,
} from "@/lib/services/export-service";
import { exportToJSONFile } from "@/lib/services/notAsyncLogic";
import {
  clearUserGrades,
  clearUserSubjectsGrades,
} from "@/lib/services/user-service";
import { CalendarPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const NewSemesterButton = ({
  expanded = true,
}: {
  expanded?: boolean;
}) => {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keepSubjects, setKeepSubjectsState] = useState<boolean>(true);
  const [keepGrades, setKeepGradesState] = useState<boolean>(false);
  const [exportData, setExportData] = useState<boolean>(true);
  const [archiveData, setArchiveData] = useState<boolean>(true);
  const categoryState = useCategory();

  const isDesktop = useMediaQuery(MediaQueries.xxl);
  const isTablet = useMediaQuery(MediaQueries.xl) && !isDesktop;
  const isMobile = !isTablet && !isDesktop;

  const setKeepSubjects = (value: boolean) => {
    if (!value) setKeepGradesState(false);
    setKeepSubjectsState(value);
  };

  const setKeepGrades = (value: boolean) => {
    if (value) setKeepSubjectsState(true);
    setKeepGradesState(value);
  };

  const handleSubmit = async () => {
    try {
      const data = await prepareDataForExport(
        categoryState.category?.name ?? "",
        categoryState.category?.id
      );
      if (exportData) exportToJSONFile(data, categoryState.category?.name);
      if (archiveData) {
        await archiveCategory(data);
      }
      if (!keepSubjects) await clearUserSubjectsGrades();
      if (!keepGrades && keepSubjects) await clearUserGrades();
    } finally {
      setIsOpen(false);
      window.location.reload();
    }
  };

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-full flex-1 flex-shrink-0 gap-2"
          variant={"secondary"}
        >
          <CalendarPlus className="size-4" />
          <span>{t("semesters.actions.create.title")}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("semesters.actions.create.title")}</DrawerTitle>
          <DrawerDescription>
            {t("semesters.actions.create.description")}
          </DrawerDescription>
        </DrawerHeader>
        <div className="m-5 flex flex-col gap-6">
          <div className="flex flex-row items-center gap-4">
            <Switch checked={keepSubjects} onCheckedChange={setKeepSubjects} />
            <Label>
              {t.rich("semesters.actions.create.options.keep-subjects", {
                highlight: (children) => (
                  <Highlight colorName="yellow">{children}</Highlight>
                ),
              })}
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={keepGrades} onCheckedChange={setKeepGrades} />
            <Label>
              {t.rich("semesters.actions.create.options.keep-grades", {
                highlight: (children) => <Highlight>{children}</Highlight>,
              })}
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={exportData} onCheckedChange={setExportData} />
            <Label>
              {t.rich("semesters.actions.create.options.export-to-file", {
                highlight: (children) => (
                  <Highlight colorName="blue">{children}</Highlight>
                ),
              })}
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={archiveData} onCheckedChange={setArchiveData} />
            <Label>
              {t.rich("semesters.actions.create.options.archive", {
                highlight: (children) => (
                  <Highlight colorName="blue">{children}</Highlight>
                ),
              })}
            </Label>
          </div>
        </div>

        <DrawerFooter>
          {!(exportData || archiveData || keepGrades) && (
            <span className="text-muted-foreground self-center">
              {t("warnings.irreversible")}
            </span>
          )}
          <Button
            variant={
              exportData || archiveData || keepGrades
                ? "default"
                : "destructive"
            }
            onClick={handleSubmit}
          >
            {t("generic.doit")}
          </Button>
          <DrawerClose asChild>
            <Button variant="secondary">{t("actions.cancel")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"secondary"}>
          <CalendarPlus className="size-4 mr-2" />
          {t("semesters.actions.create.title")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("semesters.actions.create.title")}</DialogTitle>
          <DialogDescription>
            {t("semesters.actions.create.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-4">
            <Switch checked={keepSubjects} onCheckedChange={setKeepSubjects} />
            <Label>
              {t.rich("semesters.actions.create.options.keep-subjects", {
                highlight: (children) => (
                  <Highlight colorName="yellow">{children}</Highlight>
                ),
              })}
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={keepGrades} onCheckedChange={setKeepGrades} />
            <Label>
              {t.rich("semesters.actions.create.options.keep-grades", {
                highlight: (children) => <Highlight>{children}</Highlight>,
              })}
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={exportData} onCheckedChange={setExportData} />
            <Label>
              {t.rich("semesters.actions.create.options.export-to-file", {
                highlight: (children) => (
                  <Highlight colorName="blue">{children}</Highlight>
                ),
              })}
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={archiveData} onCheckedChange={setArchiveData} />
            <Label>
              {t.rich("semesters.actions.create.options.archive", {
                highlight: (children) => (
                  <Highlight colorName="blue">{children}</Highlight>
                ),
              })}
            </Label>
          </div>
        </div>
        <DialogFooter>
          {!(exportData || archiveData || keepGrades) && (
            <span className="text-muted-foreground self-center">
              {t("warnings.irreversible")}
            </span>
          )}
          <DialogClose asChild>
            <Button variant="secondary">{t("actions.cancel")}</Button>
          </DialogClose>
          <Button
            variant={
              exportData || archiveData || keepGrades
                ? "default"
                : "destructive"
            }
            onClick={handleSubmit}
          >
            {t("generic.doit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
