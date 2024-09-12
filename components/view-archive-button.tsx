"use client";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoadingSpinner } from "@/components/ui/spinner";
import { ArchiveData } from "@/db/schema";
import { MediaQueries, useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { catchProblem } from "@/lib/problem";
import {
  deleteArchivedata,
  getAllArchivedata,
} from "@/lib/services/archive-service";
import { unarchiveCategory } from "@/lib/services/export-service";
import { exportToJSONFile } from "@/lib/services/notAsyncLogic";
import { getDateOrTime, truncateText } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { Archive, Bird, DownloadIcon, FolderIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export function ViewArchiveButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isDesktop = useMediaQuery(MediaQueries.xxl);
  const isTablet = useMediaQuery(MediaQueries.xl) && !isDesktop;
  const isMobile = !isTablet && !isDesktop;
  const isTiny = !useMediaQuery(MediaQueries.xs);

  const [archiveData, setArchiveData] = useState<ArchiveData[]>([]);
  const [refresher, setRefresher] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    deleteArchivedata(id).then((result) => {
      refresh();
    });
  };

  const handleDownload = (id: number) => {
    let data = archiveData.find((data) => data.id === id);
    data &&
      unarchiveCategory(data.data).then((data) => {
        exportToJSONFile(data, data.category);
      });
  };

  const refresh = () => {
    setRefresher(Math.random());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = catchProblem(await getAllArchivedata());
        if (data)
          setArchiveData([
            ...data.sort(
              (a: ArchiveData, b: ArchiveData) =>
                b.date.getTime() - a.date.getTime()
            ),
          ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [refresher]);

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-full flex-1 flex-shrink-0 gap-2"
          variant={"secondary"}
        >
          <Archive className="size-4" />
          <span>View archive</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Archive</DrawerTitle>
          {archiveData.length ? (
            <DrawerDescription>
              You are now viewing the data you have archived. You can download
              or delete it here.
            </DrawerDescription>
          ) : (
            <DrawerDescription>
              You will be able to view archived data here.
            </DrawerDescription>
          )}
        </DrawerHeader>
        {archiveData.length ? (
          <div className="h-[50svh] mx-2 p-2 overflow-auto">
            <div className="flex flex-col gap-6">
              {archiveData.map((data) => (
                <Card key={data.id}>
                  <CardHeader>
                    <CardTitle className="inline-flex flex-row items-center gap-2">
                      <span className="text-muted-foreground">
                        <FolderIcon className="size-5" />
                      </span>
                      {truncateText(data.category, 20).text}
                    </CardTitle>
                    <CardDescription className="flex-row inline-flex gap-2">
                      Archived: {getDateOrTime(data.date)} (
                      {formatDistance(data.date, new Date(), {
                        addSuffix: true,
                      })}
                      )
                    </CardDescription>
                  </CardHeader>
                  {isTiny ? (
                    <CardContent className="flex flex-row-reverse gap-3">
                      <Button
                        size="icon"
                        onClick={() => handleDownload(data.id)}
                      >
                        <DownloadIcon className="size-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={() => handleDelete(data.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </CardContent>
                  ) : (
                    <CardContent className="flex flex-row-reverse gap-3">
                      <Button onClick={() => handleDownload(data.id)}>
                        <DownloadIcon className="size-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleDelete(data.id)}
                      >
                        <Trash2 className="size-4 mr-2" />
                        Delete
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ) : loading ? (
          <div className="m-auto">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="mx-4">
            <Alert>
              <Bird className="h-4 w-4" />
              <AlertTitle>Woops!</AlertTitle>
              <AlertDescription>
                No data has been archived yet. You can archive categories by
                starting a new term in the settings.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">Back</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant={"secondary"}>
          <Archive className="size-4 mr-2" />
          View archive
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Archive</DialogTitle>
          {archiveData.length ? (
            <DialogDescription>
              You are now viewing the data you have archived. You can download
              or delete it here.
            </DialogDescription>
          ) : (
            <DialogDescription>
              You will be able to view archived data here.
            </DialogDescription>
          )}
        </DialogHeader>
        {archiveData.length ? (
          <ScrollArea className="h-[50svh] m-2 px-4">
            <div className="flex flex-col gap-6">
              {archiveData.map((data) => (
                <Card key={data.id}>
                  <CardHeader>
                    <CardTitle className="inline-flex flex-row items-center gap-2">
                      <span className="text-muted-foreground">
                        <FolderIcon className="size-5" />
                      </span>
                      {truncateText(data.category, 20).text}
                    </CardTitle>
                    <CardDescription className="flex-row inline-flex gap-2">
                      Archived: {getDateOrTime(data.date)} (
                      {formatDistance(data.date, new Date(), {
                        addSuffix: true,
                      })}
                      )
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-row-reverse gap-3">
                    <Button onClick={() => handleDownload(data.id)}>
                      <DownloadIcon className="size-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDelete(data.id)}
                    >
                      <Trash2 className="size-4 mr-2" />
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : loading ? (
          <LoadingSpinner className={"justify-self-center"} />
        ) : (
          <Alert>
            <Bird className="h-4 w-4" />
            <AlertTitle>Woops!</AlertTitle>
            <AlertDescription>
              No data has been archived yet. You can archive categories by
              starting a new term in the settings.
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Back</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
