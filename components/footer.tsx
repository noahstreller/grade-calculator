import { FooterItem } from "@/components/footer-item";
import { Separator } from "@/components/ui/separator";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Globe, Scale } from "lucide-react";

export function Footer (){
  return (
    <footer className="mt-5 bottom-0 w-11/12 p-2 flex flex-col gap-2">
      <Separator />
      <div className="flex flex-col justify-center gap-0 md:gap-10 md:flex-row">
        <FooterItem href="/privacy">
          <Scale className="mr-2 size-4" />
          Privacy Policy
        </FooterItem>
        <FooterItem href="https://legacy.grades.nstr.dev">
          <Globe className="mr-2 size-4" />
          Legacy Version
        </FooterItem>
        <FooterItem newTab href="https://github.com/noahstreller/notenrechner-next">
          <SiGithub className="mr-2 size-4" /> Source Code
        </FooterItem>
      </div>
    </footer>
  );
}