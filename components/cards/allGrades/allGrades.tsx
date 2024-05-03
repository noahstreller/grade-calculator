"use client";
import { CreateGradeForm } from "@/components/create-grade-form";
import { EditGradeForm } from "@/components/edit-grade-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Grade, GradeWithSubject } from "@/db/schema";
import { isMobileDevice } from "@/lib/utils";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export function AllGrades({
  data,
  setData,
  refresh,
}: {
  data: GradeWithSubject[];
  setData: Function;
  refresh: Function;
}) {
  const { t, lang } = useTranslation("common");

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const isDesktop = !isMobileDevice();
  const [originalGrade, setOriginalGrade] = useState<Grade | undefined>();

  if (isDesktop) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("grades.all-grades")}</CardTitle>
          <CardDescription>{t("grades.all-grades-desc")}</CardDescription>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>{t("grades.add")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("grades.add")}</DialogTitle>
                <DialogDescription>{t("grades.add-desc")}</DialogDescription>
              </DialogHeader>
              <CreateGradeForm refresh={refresh} setDrawerOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <Alert>
              <Bird className="h-4 w-4" />
              <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
              <AlertDescription>
                {t("errors.not-enough-data-yet-grade", { count: 1 })}
              </AlertDescription>
            </Alert>
          ) : (
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DataTable columns={columns(refresh, setOriginalGrade)} data={data} />
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Grade</DialogTitle>
                  <DialogDescription>Edit Grade</DialogDescription>
                </DialogHeader>
                <EditGradeForm refresh={refresh} setDrawerOpen={setEditOpen} originalGrade={originalGrade} />
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("grades.all-grades")}</CardTitle>
        <CardDescription>{t("grades.all-grades-desc")}</CardDescription>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>{t("grades.add")}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{t("grades.add")}</DrawerTitle>
              <DrawerDescription>{t("grades.add-desc")}</DrawerDescription>
            </DrawerHeader>
            <CreateGradeForm refresh={refresh} setDrawerOpen={setOpen} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <Alert>
            <Bird className="h-4 w-4" />
            <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
            <AlertDescription>
              {t("errors.not-enough-data-yet-grade", { count: 1 })}
            </AlertDescription>
          </Alert>
        ) : (
          <Drawer open={editOpen} onOpenChange={setEditOpen}>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{t("grades.add")}</DrawerTitle>
                <DrawerDescription>{t("grades.add-desc")}</DrawerDescription>
              </DrawerHeader>
              <EditGradeForm
                refresh={refresh}
                setDrawerOpen={setEditOpen}
                originalGrade={originalGrade}
              />
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
            <DataTable
              columns={columns(refresh, setOriginalGrade)}
              data={data}
            />
          </Drawer>
        )}
      </CardContent>
    </Card>
  );
}
