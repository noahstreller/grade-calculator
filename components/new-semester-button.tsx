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
import { prepareDataForExport } from "@/lib/services/export-service";
import { exportToJSONFile } from "@/lib/services/notAsyncLogic";
import {
  clearUserGrades,
  clearUserSubjectsGrades,
} from "@/lib/services/user-service";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";

export const NewSemesterButton = ({
  expanded = false,
}: {
  expanded?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keepSubjects, setKeepSubjectsState] = useState<boolean>(true);
  const [keepGrades, setKeepGradesState] = useState<boolean>(false);
  const [exportData, setExportData] = useState<boolean>(true);
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
          {expanded && <span>New Term</span>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>New Term</DrawerTitle>
          <DrawerDescription>
            You can start a new term and export your current grades, as well as
            decide what data you wish to keep
          </DrawerDescription>
        </DrawerHeader>
        <div className="m-5 flex flex-col gap-6">
          <div className="flex flex-row items-center gap-4">
            <Switch checked={keepSubjects} onCheckedChange={setKeepSubjects} />
            <Label>
              Keep current <Highlight colorName="yellow">subjects</Highlight>
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={keepGrades} onCheckedChange={setKeepGrades} />
            <Label>
              Keep current <Highlight>grades</Highlight>
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={exportData} onCheckedChange={setExportData} />
            <Label>
              Export your current data to a{" "}
              <Highlight colorName="blue">file</Highlight>
            </Label>
          </div>
        </div>

        <DrawerFooter>
          {!(exportData || keepGrades) && (
            <span className="text-muted-foreground self-center">
              This action is irreversible
            </span>
          )}
          <Button
            variant={exportData || keepGrades ? "default" : "destructive"}
            onClick={handleSubmit}
          >
            Do it!
          </Button>
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"secondary"}>
          <CalendarPlus className="size-5 mr-2" />
          New Term
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Term</DialogTitle>
          <DialogDescription>
            You can start a new term and export your current grades, as well as
            decide what data you wish to keep
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-4">
            <Switch checked={keepSubjects} onCheckedChange={setKeepSubjects} />
            <Label>
              Keep current <Highlight colorName="yellow">subjects</Highlight>
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={keepGrades} onCheckedChange={setKeepGrades} />
            <Label>
              Keep current <Highlight>grades</Highlight>
            </Label>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Switch checked={exportData} onCheckedChange={setExportData} />
            <Label>
              Export your current data to a{" "}
              <Highlight colorName="blue">file</Highlight>
            </Label>
          </div>
        </div>
        <DialogFooter>
          {!(exportData || keepGrades) && (
            <span className="text-muted-foreground self-center">
              This action is irreversible
            </span>
          )}
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant={exportData || keepGrades ? "default" : "destructive"}
            onClick={handleSubmit}
          >
            Do it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
