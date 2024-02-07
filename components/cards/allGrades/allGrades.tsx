"use client";
import { CreateGradeForm } from "@/components/create-grade-form";
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
import Grade from "@/lib/entities/grade";
import Subjects from "@/lib/entities/subject";
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
  data: Grade[];
  setData: Function;
  refresh: Function;
}) {
  const { t, lang } = useTranslation("common");

  const [open, setOpen] = useState(false);
  const isDesktop = !isMobileDevice();

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
              <CreateGradeForm
                refresh={refresh}
                subjectSet={Subjects.get()}
                setDrawerOpen={setOpen}
              />
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
            <DataTable columns={columns(refresh)} data={data} />
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
            <CreateGradeForm
              refresh={refresh}
              subjectSet={Subjects.get()}
              setDrawerOpen={setOpen}
            />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardHeader>
      <CardContent>
        {
          data.length === 0 ? (
            <Alert>
              <Bird className="h-4 w-4" />
              <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
              <AlertDescription>
                {t("errors.not-enough-data-yet-grade", { count: 1 })}
              </AlertDescription>
            </Alert>
          ) : <DataTable columns={columns(refresh)} data={data} />
        }
        
      </CardContent>
    </Card>
  );
}
