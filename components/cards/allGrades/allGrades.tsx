"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Grade from "@/lib/entities/grade";
import { columns } from "./columns";
import useTranslation from "next-translate/useTranslation";
import { DataTable } from "./data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import {  Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import {isMobile} from 'react-device-detect';
import { ComboboxForm } from "@/components/create-grade-form";
import Subjects from "@/lib/entities/subject";

export function AllGrades({ data, setData, refresh }: { data: Grade[], setData: Function, refresh: Function}) {
    const { t, lang } = useTranslation('common');

    const [open, setOpen] = useState(false)
    const isDesktop = !isMobile;
 
  if (isDesktop) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>All Grades</CardTitle>
                <CardDescription>All recent grades are listed here</CardDescription>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                    <Button>{t("grades.add")}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t("grades.add")}</DialogTitle>
                        <DialogDescription>{t("grades.add-desc")}</DialogDescription>
                    </DialogHeader>

                    <ComboboxForm refresh={refresh} subjectSet={Subjects.get()} />

                    </DialogContent>
                </Dialog>


            </CardHeader>
            <CardContent>
                <DataTable columns={columns()} data={data} /> 
            </CardContent>
        </Card>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when youre done.
          </DrawerDescription>
        </DrawerHeader>
        Hello
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>All Grades</CardTitle>
//                 <CardDescription>All recent grades are listed here</CardDescription>
//                 <Button onClick={() => {new Grade(Math.random() + 3.5, "Naturwissenschaften und Technik"); refresh();}}>{t("grades.add") + " nt"}</Button>
//                 <Button onClick={() => {new Grade(Math.random() + 3.5, "Mathematik"); refresh();}}>{t("grades.add") + " ma"}</Button>
//                 <Button onClick={() => {new Grade(Math.random() + 3.5, "Englisch"); refresh();}}>{t("grades.add") + " en"}</Button>


//             </CardHeader>
//             <CardContent>
//                 <DataTable columns={columns()} data={data} /> 
//             </CardContent>
//         </Card>
//     )
// }