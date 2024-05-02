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
import { NewPreferences } from "@/db/schema";
import appGlobals, { defaultAppGlobals } from "@/lib/app.globals";
import { getPreferencesElseGetDefault, savePreferences } from "@/lib/services/preferences-service";
import { PreferencesTranslations } from "@/lib/translationObjects";
import { Empty } from "@/types/types";
import { AlertCircle, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
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
  const { t } = useTranslation("common");
  const [maxLtMin, setMaxLtMin] = useState(false);
  const [passLtMin, setPassLtMin] = useState(false);
  const [passGtMax, setPassGtMax] = useState(false);
  const [decimals, setDecimals] = useState(appGlobals.gradeDecimals);

  type FormValues = {
    gradeDecimals: number | Empty;
    newEntitySheetShouldStayOpen: boolean;
    passingInverse: boolean;
    passingGrade: number;
    minimumGrade: number;
    maximumGrade: number;
  };

  const defaultValues: DefaultValues<FormValues> = async () => await getPreferencesElseGetDefault() as FormValues;

  const FormSchema = z.object({
    gradeDecimals: z.number().gte(0),
    newEntitySheetShouldStayOpen: z.boolean({}),
    passingInverse: z.boolean({}),
    passingGrade: z.number({}),
    minimumGrade: z.number({}),
    maximumGrade: z.number({}),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Grade.get().forEach((grade) => {
    //   if (grade.getValue() < data.minimumGrade)
    //     grade.setValue(data.minimumGrade);
    //   if (grade.getValue() > data.maximumGrade)
    //     grade.setValue(data.maximumGrade);
    // });

    // updateAppGlobals(data);

    const newPreferences = {
      gradeDecimals: data.gradeDecimals,
      newEntitySheetShouldStayOpen: data.newEntitySheetShouldStayOpen,
      passingInverse: data.passingInverse,
      passingGrade: data.passingGrade,
      minimumGrade: data.minimumGrade,
      maximumGrade: data.maximumGrade,
    } satisfies NewPreferences;
    savePreferences(newPreferences).then(() => window.location.reload());
  }

  function onReset(event: any) {
    event.preventDefault();
    form.reset(defaultAppGlobals);
  }

  useEffect(() => {
    form.reset(defaultValues as any);
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
                    step="1"
                    placeholder={translations.gradeDecimalsPlaceholder}
                    {...field}
                    onChange={(e) => {
                      if (e.target.value === "") field.onChange("");
                      else field.onChange(Math.floor(Number(e.target.value)));
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

        <FormField
          control={form.control}
          name="passingInverse"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-0.5">
                <FormLabel>{translations.passingInverse}</FormLabel>
                <FormDescription>
                  {translations.passingInverseDescription}
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
  const session = useSession();
  return session.status === "authenticated" ? (
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
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{translations.alertTitle}</AlertTitle>
            <AlertDescription>{translations.alertDescription}</AlertDescription>
          </Alert>
        </SheetHeader>
        <SettingsModalForm translations={translations} />
      </SheetContent>
    </Sheet>
  ) : null;
}
