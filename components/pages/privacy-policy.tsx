import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/card-stack";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PrivacyPolicy() {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-6 w-5/6 lg:w-2/3 xl:w-2/5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{t("generic.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/privacy">{t("external.privacy-policy")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold leading-10">
        {t("external.privacy-policy")}
        {" - "}
        <span className="hidden lg:inline">
          <Highlight colorName="blue">grades.nstr.dev</Highlight>
        </span>
      </h1>
      <p>{t("privacy-policy.subtitle")}</p>
      <p className="text-sm text-muted-foreground">
        {t.rich("privacy-policy.legal-note", {
          maillink: () => (
            <Highlight colorName="blue">
              <Link href="mailto:dev@nstr.dev">dev@nstr.dev</Link>
            </Highlight>
          ),
        })}
      </p>

      <h2 className="text-2xl font-bold">
        {t("privacy-policy.what-is-collected.title")}
      </h2>
      <ul className="list-disc pl-6">
        <li>
          {t.rich("privacy-policy.what-is-collected.username", {
            note: (children) => (
              <span className="text-muted-foreground">{children}</span>
            ),
          })}
        </li>
        <li>{t("privacy-policy.what-is-collected.email")}</li>
        <li>{t("privacy-policy.what-is-collected.avatar")}</li>
        <li>
          {t.rich("privacy-policy.what-is-collected.grades", {
            note: (children) => (
              <span className="text-muted-foreground">{children}</span>
            ),
          })}
        </li>
      </ul>

      <h2 className="text-2xl font-bold">
        {t("privacy-policy.data-usage.title")}
      </h2>
      <p>{t("privacy-policy.data-usage.description")}</p>

      <h2 className="text-2xl font-bold">
        {t("privacy-policy.storage.title")}
      </h2>
      <p>{t("privacy-policy.storage.description")}</p>

      <h2 className="text-2xl font-bold">
        {t("privacy-policy.deletion.title")}
      </h2>
      <p>
        {t.rich("privacy-policy.deletion.description", {
          maillink: () => (
            <Highlight colorName="blue">
              <Link href="mailto:dev@nstr.dev">dev@nstr.dev</Link>
            </Highlight>
          ),
          b: (children) => <b>{children}</b>,
        })}
      </p>

      <h2 className="text-2xl font-bold">
        {t("privacy-policy.security.title")}
      </h2>
      <p>{t("privacy-policy.security.description")}</p>
      <Button variant="secondary" className="w-fit self-center" asChild>
        <Link href="https://legacy.grades.nstr.dev">
          {t("external.legacy-version")}
        </Link>
      </Button>
    </div>
  );
}
