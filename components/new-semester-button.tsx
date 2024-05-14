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
import { prepareDataForExport } from "@/lib/services/export-service";
import { exportToJSONFile } from "@/lib/services/notAsyncLogic";
import {
  clearUserGrades,
  clearUserSubjectsGrades,
} from "@/lib/services/user-service";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import { isMobile } from "react-device-detect";

export const NewSemesterButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keepSubjects, setKeepSubjectsState] = useState<boolean>(true);
  const [keepGrades, setKeepGradesState] = useState<boolean>(false);
  const [exportData, setExportData] = useState<boolean>(true);
  const categoryState = useCategory();

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
        categoryState.category?.id,
      );
      if (exportData) exportToJSONFile(data);
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
        <Button className="w-full" variant={"secondary"}>
          <CalendarPlus className="size-5 " />
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
        <div className="flex flex-col m-5 space-y-5">
          <Switch checked={keepSubjects} onCheckedChange={setKeepSubjects} />
          <Label>
            Keep current <Highlight colorName="yellow">subjects</Highlight>
          </Label>
          <Switch checked={keepGrades} onCheckedChange={setKeepGrades} />
          <Label>
            Keep current <Highlight>grades</Highlight>
          </Label>
          <Switch checked={exportData} onCheckedChange={setExportData} />
          <Label>Export your current data to a file</Label>
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
        <Switch checked={keepSubjects} onCheckedChange={setKeepSubjects} />
        <Label>
          Keep current <Highlight colorName="yellow">subjects</Highlight>
        </Label>
        <Switch checked={keepGrades} onCheckedChange={setKeepGrades} />
        <Label>
          Keep current <Highlight>grades</Highlight>
        </Label>
        <Switch checked={exportData} onCheckedChange={setExportData} />
        <Label>
          Export your current data to a{" "}
          <Highlight colorName="blue">file</Highlight>
        </Label>
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
