"use client";
import { CreateSubjectForm } from "@/components/create-subject-form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { GradeAverage } from "@/lib/entities/gradeAverage";
import Subjects from "@/lib/entities/subject";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { columns } from "./columns";
import { isMobileDevice } from "@/lib/utils";

export function AllSubjects({
  data,
  setData,
  refresh,
}: {
  data: GradeAverage[];
  setData: Function;
  refresh: Function;
}) {
  const { t, lang } = useTranslation("common");
  const isDesktop = !isMobileDevice();
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Card>
        <CardHeader>
            <CardTitle>{t("subjects.all-subjects")}</CardTitle>
            <CardDescription>{t("subjects.all-subjects-desc")}</CardDescription>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                <Button variant="outline">{t("subjects.add")}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("subjects.add")}</DialogTitle>
                    <DialogDescription>{t("subjects.add-desc")}</DialogDescription>
                </DialogHeader>

                <CreateSubjectForm refresh={refresh} />
                </DialogContent>
            </Dialog>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns()} data={data} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("subjects.all-subjects")}</CardTitle>
        <CardDescription>{t("subjects.all-subjects-desc")}</CardDescription>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">{t("subjects.add")}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{t("grades.add")}</DrawerTitle>
              <DrawerDescription>{t("grades.add-desc")}</DrawerDescription>
            </DrawerHeader>

            <CreateSubjectForm refresh={refresh} />

            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">{t("actions.cancel")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns()} data={data} />
      </CardContent>
    </Card>
  );
}
