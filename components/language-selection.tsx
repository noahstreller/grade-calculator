"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, truncateText } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

type Language = {
  name: string;
  key: string;
};

const languages: Language[] = [
  { name: "English", key: "en" },
  { name: "Deutsch", key: "de" },
];

const findByKey = (key: string) => languages.find((l) => l.key === key);

export function LanguageSelection({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Language>();
  const locale = useLocale();
  const isDesktop = !isMobile;

  useEffect(() => {
    setSelected(findByKey(locale) ?? findByKey("en"));
  }, [locale]);

  if (isDesktop) {
    return (
      <div className="pt-4">
        <Label>Language selection</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-between", className)}
            >
              {selected?.name}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <LanguageList
              setOpen={setOpen}
              selected={selected}
              setSelected={setSelected}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        asChild
        className={cn("w-full justify-between", className)}
      >
        <Button variant="outline">
          {selected?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <LanguageList
            setOpen={setOpen}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function LanguageList({
  selected,
  setSelected,
  setOpen,
}: {
  selected: Language | undefined;
  setSelected: (lang: Language) => void;
  setOpen: (open: boolean) => void;
}) {
  const t = useTranslations();
  return (
    <Command>
      <CommandInput placeholder={t("filters.filter-by-language")} />
      <CommandList>
        <CommandEmpty>{t("errors.no-results")}</CommandEmpty>
        <CommandGroup>
          {languages.map((lang) => (
            <CommandItem
              key={lang.name}
              value={lang.name ?? ""}
              onSelect={() => {
                setSelected(lang);
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  lang.key === selected?.key ? "opacity-100" : "opacity-0"
                )}
              />

              {truncateText(lang.name ?? "", 15).text}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
