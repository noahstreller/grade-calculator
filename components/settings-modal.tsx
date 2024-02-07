"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import appGlobals, { defaultAppGlobals, updateAppGlobals } from "@/lib/app.globals";
import Grade from "@/lib/entities/grade";
import { PreferencesTranslations } from "@/lib/translationObjects";
import { Settings } from "lucide-react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export function SettingsModalForm({
  translations,
}: {
  translations: PreferencesTranslations;
}) {
  const { t, lang } = useTranslation("common");
  const [maxLtMin, setMaxLtMin] = useState(false);
  const [passLtMin, setPassLtMin] = useState(false);
  const [passGtMax, setPassGtMax] = useState(false);
  const [decimals, setDecimals] = useState(appGlobals.gradeDecimals);

  type FormValues = {
    gradeDecimals: number;
    newEntitySheetShouldStayOpen: boolean;
    passingGrade: number;
    minimumGrade: number;
    maximumGrade: number;
  };

  const defaultValues: DefaultValues<FormValues> = {
    gradeDecimals: appGlobals.gradeDecimals,
    newEntitySheetShouldStayOpen: appGlobals.newEntitySheetShouldStayOpen,
    passingGrade: appGlobals.passingGrade,
    minimumGrade: appGlobals.minimumGrade,
    maximumGrade: appGlobals.maximumGrade,
  };

  const FormSchema = z.object({
    gradeDecimals: z.number({}),
    newEntitySheetShouldStayOpen: z.boolean({}),
    passingGrade: z.number({}),
    minimumGrade: z.number({}),
    maximumGrade: z.number({}),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    Grade.get().forEach((grade) => {
      if (grade.getValue() < data.minimumGrade)
        grade.setValue(data.minimumGrade);
      if (grade.getValue() > data.maximumGrade)
        grade.setValue(data.maximumGrade);
    });

    updateAppGlobals(data);
    window.location.reload();
  }

  function onReset(event: any) {
    event.preventDefault();
    form.reset(defaultAppGlobals)
  }

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m-5">
        <FormField
          control={form.control}
          name="gradeDecimals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {translations.gradeDecimals}
                <FormDescription>
                  {translations.gradeDecimalsDescription}
                </FormDescription>
              </FormLabel>
              <div className="flex gap-5">
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder={translations.gradeDecimalsPlaceholder}
                    {...field}
                    onChange={(e) => {
                      if (e.target.value === "") field.onChange("");
                      else field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Slider
                    onValueChange={(value) => field.onChange(value[0])}
                    defaultValue={[decimals]}
                    max={10}
                    step={1}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newEntitySheetShouldStayOpen"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>{translations.keepModalsOpen}</FormLabel>
                <FormDescription>
                  {translations.keepModalsOpenDescription}
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="minimumGrade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {translations.minimumGrade}
                <FormDescription>
                  {translations.minimumGradeDescription}
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder={translations.minimumGradePlaceholder}
                  {...field}
                  onChange={(e) => {
                    if (e.target.value === "") field.onChange("");
                    else {
                      field.onChange(Number(e.target.value));
                      if (
                        Number(e.target.value) >= form.getValues().maximumGrade
                      )
                        setMaxLtMin(true);
                      else setMaxLtMin(false);

                      if (
                        Number(e.target.value) > form.getValues().passingGrade
                      )
                        setPassLtMin(true);
                      else setPassLtMin(false);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maximumGrade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {translations.maximumGrade}
                <FormDescription>
                  {translations.maximumGradeDescription}
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder={translations.maximumGradePlaceholder}
                  {...field}
                  onChange={(e) => {
                    if (e.target.value === "") field.onChange("");
                    else {
                      field.onChange(Number(e.target.value));
                      if (
                        Number(e.target.value) <= form.getValues().minimumGrade
                      )
                        setMaxLtMin(true);
                      else setMaxLtMin(false);

                      if (
                        Number(e.target.value) < form.getValues().passingGrade
                      )
                        setPassGtMax(true);
                      else setPassGtMax(false);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {maxLtMin ? <FormMessage>{t("errors.max-lt-min")}</FormMessage> : null}
        <FormField
          control={form.control}
          name="passingGrade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {translations.passingGrade}
                <FormDescription>
                  {translations.passingGradeDescription}
                </FormDescription>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="any"
                  placeholder={translations.passingGradePlaceholder}
                  {...field}
                  onChange={(e) => {
                    if (e.target.value === "") field.onChange("");
                    else {
                      field.onChange(Number(e.target.value));
                      if (
                        Number(e.target.value) > form.getValues().maximumGrade
                      )
                        setPassGtMax(true);
                      else setPassGtMax(false);

                      if (
                        Number(e.target.value) < form.getValues().minimumGrade
                      )
                        setPassLtMin(true);
                      else setPassLtMin(false);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {passLtMin ? (
          <FormMessage>{t("errors.pass-lt-min")}</FormMessage>
        ) : null}
        {passGtMax ? (
          <FormMessage>{t("errors.pass-gt-max")}</FormMessage>
        ) : null}

        <Separator />
        <Button
          disabled={passGtMax || passLtMin || maxLtMin}
          className="w-full"
          type="submit"
        >
          {t("actions.save")}
        </Button>

        <Button className="w-full" variant="outline" onClick={onReset}>
          {t("actions.reset")}
        </Button>
        <SheetClose asChild>
          <Button variant="outline" className="w-full">
            {t("actions.cancel")}
          </Button>
        </SheetClose>
      </form>
    </Form>
  );
}

export function SettingsModal({
  translations,
}: {
  translations: PreferencesTranslations;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{translations.title}</SheetTitle>
          <SheetDescription>{translations.description}</SheetDescription>
        </SheetHeader>
        <SettingsModalForm translations={translations} />
      </SheetContent>
    </Sheet>
  );
}
