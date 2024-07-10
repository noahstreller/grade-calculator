import { FooterItem } from "@/components/footer-item";
import { Separator } from "@/components/ui/separator";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Cookie, GitBranch, Globe, Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-5 bottom-0 w-11/12 p-2 flex flex-col gap-2">
      <Separator />
      <div className="flex flex-col justify-center gap-0 lg:gap-10 lg:flex-row">
        <FooterItem href="/privacy">
          <Scale className="mr-2 size-4" />
          Privacy Policy
        </FooterItem>
        <FooterItem href="/cookies">
          <Cookie className="mr-2 size-4" />
          Cookie Policy
        </FooterItem>
        <FooterItem href="https://legacy.grades.nstr.dev">
          <Globe className="mr-2 size-4" />
          Legacy Version
        </FooterItem>
        <FooterItem
          newTab
          href="https://github.com/noahstreller/notenrechner-next"
        >
          <SiGithub className="mr-2 size-4" /> Source Code
        </FooterItem>
        <FooterItem
          newTab
          href={
            process.env.npm_package_version
              ? "https://github.com/noahstreller/notenrechner-next/tree/v" +
                process.env.npm_package_version
              : "https://github.com/noahstreller/notenrechner-next"
          }
        >
          <GitBranch className="mr-2 size-4" />{" "}
          {process.env.VERCEL_ENV === "production"
            ? process.env.npm_package_version || "Production"
            : process.env.npm_package_version || "Development"}
        </FooterItem>
      </div>
    </footer>
  );
}
