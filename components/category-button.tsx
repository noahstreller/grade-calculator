import {
  CreateCategoryForm,
  EditCategoryForm,
} from "@/components/category-form";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderPen, FolderPlus } from "lucide-react";
import { useState } from "react";
import { isMobile } from "react-device-detect";

export function CategoryButton({ action }: { action: "create" | "edit" }) {
  const [open, setOpen] = useState<boolean>(false);

  if (action === "create")
    return isMobile ? (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <FolderPlus className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add category</DrawerTitle>
            <DrawerDescription>
              Categories separate your grades. Useful if you attend multiple
              schools.
            </DrawerDescription>
          </DrawerHeader>
          <CreateCategoryForm setOpen={setOpen} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ) : (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} size={"icon"}>
            <FolderPlus className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add category</DialogTitle>
            <DialogDescription>
              Categories separate your grades. Useful if you attend multiple
              schools.
            </DialogDescription>
          </DialogHeader>
          <CreateCategoryForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  if (action === "edit")
    return isMobile ? (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <FolderPen className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Edit category</DrawerTitle>
            <DrawerDescription>
              Categories separate your grades. Useful if you attend multiple
              schools.
            </DrawerDescription>
          </DrawerHeader>
          <EditCategoryForm setOpen={setOpen} />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ) : (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <FolderPen className="size-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>
              Categories separate your grades. Useful if you attend multiple
              schools.
            </DialogDescription>
          </DialogHeader>
          <EditCategoryForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
}
