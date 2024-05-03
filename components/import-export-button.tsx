"use client";
import { prepareDataForExport } from "@/lib/services/export-service";
import { exportToClipboard, exportToJSONFile, importFromJSON, importFromText } from "@/lib/services/notAsyncLogic";
import { Database } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Import data</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={importFromText}>
                  Text (Clipboard)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={importFromJSON}>
                  JSON (File)
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Export data</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={async () =>
                    exportToClipboard(await prepareDataForExport())
                  }
                >
                  Text (Clipboard)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () =>
                    exportToJSONFile(await prepareDataForExport())
                  }
                >
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
