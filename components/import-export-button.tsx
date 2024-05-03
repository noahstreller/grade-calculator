"use client";
import { prepareDataForExport } from "@/lib/services/export-service";
import { exportToClipboard, exportToJSONFile, importFromJSON, importFromText } from "@/lib/services/notAsyncLogic";
import { ClipboardCopy, ClipboardPaste, Database, FileInput, FileOutput, FolderInput, FolderOutput } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ImportExportButton() {
  const session = useSession();
  const [purge, setPurge] = useState(true);

  return session.status === "authenticated" ? (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Database className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-inherit" />
            <span className="sr-only">Manage data</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Manage data</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={purge} onCheckedChange={setPurge}>
            Replace existing data
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderInput className="size-4 mr-2" /> Import data
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => importFromText(purge)}>
                  <ClipboardPaste className="size-4 mr-2" />
                  Text (Clipboard)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => importFromJSON(purge)}>
                  <FileOutput className="size-4 mr-2" />
                  JSON (File)
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderOutput className="size-4 mr-2" />
              Export data
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={async () =>
                    exportToClipboard(await prepareDataForExport())
                  }
                >
                  <ClipboardCopy className="size-4 mr-2" />
                  Text (Clipboard)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () =>
                    exportToJSONFile(await prepareDataForExport())
                  }
                >
                  <FileInput className="size-4 mr-2" />
                  JSON (File)
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : null;
}
