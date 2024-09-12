"use client";
import { CreateGradeForm } from "@/components/create-grade-form";
import { EditGradeForm } from "@/components/edit-grade-form";
import { PassingStatus } from "@/components/passing-filter-combobox";
import { usePreferences } from "@/components/preferences-provider";
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
import { MediaQueries, useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { doesGradePass } from "@/lib/services/notAsyncLogic";
import { Bird, FilterX } from "lucide-react";
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
  const preferences = usePreferences().preferences!;

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const isDesktop = useMediaQuery(MediaQueries.xxl);
  const isTablet = useMediaQuery(MediaQueries.xl) && !isDesktop;
  const isMobile = !isTablet && !isDesktop;

  const [originalGrade, setOriginalGrade] = useState<Grade | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<PassingStatus | null>({
    value: "all",
    label: t("common.show-all"),
    icon: <FilterX className="size-4 mr-2" />,
  });

  const getGradesForStatus = (status: PassingStatus | null) => {
    if (status?.value === "passing") {
      return data.filter((grade) =>
        doesGradePass(grade.grades.value!, preferences)
      );
    }

    if (status?.value === "failing") {
      return data.filter(
        (grade) => !doesGradePass(grade.grades.value!, preferences)
      );
    }

    return data;
  };

  if (isDesktop) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("common.grades.all-grades")}</CardTitle>
          <CardDescription>
            {t("common.grades.all-grades-desc")}
          </CardDescription>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>{t("common.grades.add")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("common.grades.add")}</DialogTitle>
                <DialogDescription>
                  {t("common.grades.add-desc")}
                </DialogDescription>
              </DialogHeader>
              <CreateGradeForm refresh={refresh} setDrawerOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {data.length === 0 ? (
            <Alert>
              <Bird className="h-4 w-4" />
              <AlertTitle>{t("common.errors.not-enough-data-yet")}</AlertTitle>
              <AlertDescription>
                {t("common.errors.not-enough-data-yet-grade", { count: 1 })}
              </AlertDescription>
            </Alert>
          ) : (
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DataTable
                columns={columns(refresh, setOriginalGrade)}
                data={getGradesForStatus(selectedStatus)}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t("common.edit-grade")}</DialogTitle>
                  <DialogDescription>
                    {t("common.change-the-grade-details-here")}{" "}
                  </DialogDescription>
                </DialogHeader>
                <EditGradeForm
                  refresh={refresh}
                  setDrawerOpen={setEditOpen}
                  originalGrade={originalGrade}
                />
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
        <CardTitle>{t("common.grades.all-grades")}</CardTitle>
        <CardDescription>{t("common.grades.all-grades-desc")}</CardDescription>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>{t("common.grades.add")}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{t("common.grades.add")}</DrawerTitle>
              <DrawerDescription>
                {t("common.grades.add-desc")}
              </DrawerDescription>
            </DrawerHeader>
            <CreateGradeForm refresh={refresh} setDrawerOpen={setOpen} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">{t("common.actions.cancel")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <Alert>
            <Bird className="h-4 w-4" />
            <AlertTitle>{t("common.errors.not-enough-data-yet")}</AlertTitle>
            <AlertDescription>
              {t("common.errors.not-enough-data-yet-grade", { count: 1 })}
            </AlertDescription>
          </Alert>
        ) : (
          <Drawer open={editOpen} onOpenChange={setEditOpen}>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>{t("common.edit-grade-0")}</DrawerTitle>
                <DrawerDescription>
                  {t("common.change-the-grade-details-here-0")}{" "}
                </DrawerDescription>
              </DrawerHeader>
              <EditGradeForm
                refresh={refresh}
                setDrawerOpen={setEditOpen}
                originalGrade={originalGrade}
              />
              <DrawerFooter className="pt-2">
                <DrawerClose asChild>
                  <Button variant="outline">
                    {t("common.actions.cancel")}
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
            <DataTable
              columns={columns(refresh, setOriginalGrade)}
              data={getGradesForStatus(selectedStatus)}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </Drawer>
        )}
      </CardContent>
    </Card>
  );
}
