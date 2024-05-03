"use client";
import { columns } from "@/components/cards/allSubjects/columns";
import { CreateSubjectForm } from "@/components/create-subject-form";
import { EditSubjectForm } from "@/components/edit-subject-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { Subject } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { deleteSubject } from "@/lib/services/subject-service";
import { deleteSubjectToast } from "@/lib/toasts";
import { isMobileDevice } from "@/lib/utils";
import { AverageWithSubject } from "@/types/types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Bird } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export function AllSubjects({
  data,
  setData,
  refresh,
}: {
  data: AverageWithSubject[];
  setData: Function;
  refresh: Function;
}) {
  const { t, lang } = useTranslation("common");
  const isDesktop = !isMobileDevice();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
  const [originalSubject, setOriginalSubject] = useState<Subject | undefined>();

  if (isDesktop) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("subjects.all-subjects")}</CardTitle>
          <CardDescription>{t("subjects.all-subjects-desc")}</CardDescription>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">{t("subjects.add")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("subjects.add")}</DialogTitle>
                <DialogDescription>{t("subjects.add-desc")}</DialogDescription>
              </DialogHeader>
              <CreateSubjectForm refresh={refresh} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("subjects.delete.prompt")}</DialogTitle>
                <DialogDescription>
                  {t("subjects.delete.message")}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{t("actions.cancel")}</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={async () => {
                      if (subjectToDelete) {
                        let subjectName = catchProblem(
                          await deleteSubject(subjectToDelete)
                        );
                        deleteSubjectToast(subjectName);
                        setSubjectToDelete(null);
                      }
                      refresh();
                    }}
                    variant="destructive"
                  >
                    {t("actions.danger-continue")}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
            {data.length === 0 ? (
              <Alert>
                <Bird className="h-4 w-4" />
                <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
                <AlertDescription>
                  {t("errors.not-enough-data-yet-subject", { count: 1 })}
                </AlertDescription>
              </Alert>
            ) : (
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Subject</DialogTitle>
                    <DialogDescription>
                      Change the details of the subject
                    </DialogDescription>
                  </DialogHeader>
                  <EditSubjectForm originalSubject={originalSubject} refresh={refresh} setOpen={setEditOpen} />
                </DialogContent>
                <DataTable columns={columns(setSubjectToDelete, setOriginalSubject, setDeleteConfirmOpen, setEditOpen)} data={data} />
              </Dialog>
            )}
          </Dialog>
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
            <Button variant="secondary">{t("subjects.add")}</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{t("grades.add")}</DrawerTitle>
              <DrawerDescription>{t("grades.add-desc")}</DrawerDescription>
            </DrawerHeader>
            <CreateSubjectForm refresh={refresh} setOpen={setOpen} />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">{t("actions.cancel")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </CardHeader>
      <CardContent>
        <Drawer open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>{t("subjects.delete.prompt")}</DrawerTitle>
              <DrawerDescription>
                {t("subjects.delete.message")}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button
                  onClick={async () => {
                    if (subjectToDelete) {
                      let subjectName = catchProblem(
                        await deleteSubject(subjectToDelete)
                      );
                      deleteSubjectToast(subjectName);
                      setSubjectToDelete(null);
                    }
                    refresh();
                  }}
                  variant="destructive"
                >
                  {t("actions.danger-continue")}
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">{t("actions.cancel")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
          {data.length === 0 ? (
            <Alert>
              <Bird className="h-4 w-4" />
              <AlertTitle>{t("errors.not-enough-data-yet")}</AlertTitle>
              <AlertDescription>
                {t("errors.not-enough-data-yet-subject", { count: 1 })}
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable
              columns={columns(
                setSubjectToDelete,
                setOriginalSubject,
                setOpen,
                setEditOpen
              )}
              data={data}
            />
          )}
        </Drawer>
      </CardContent>
    </Card>
  );
}
