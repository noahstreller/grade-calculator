import { FooterItem } from "@/components/footer-item";
import { Separator } from "@/components/ui/separator";

export function Footer (){
  return (
    <footer className="mt-5 bottom-0 w-11/12 p-2 flex flex-col gap-2">
      <Separator />
      <div className="flex flex-col justify-center gap-0 md:gap-5 md:flex-row">
        <FooterItem href="/privacy">Privacy Policy</FooterItem>
        <FooterItem href="https://legacy.grades.nstr.dev">
          Legacy Version
        </FooterItem>
        <FooterItem href="https://github.com/noahstreller/notenrechner-next">
          Source Code
        </FooterItem>
      </div>
    </footer>
  );
}