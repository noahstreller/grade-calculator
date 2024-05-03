import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FooterItem({href, children, newTab = false}: {href: string, children: React.ReactNode, newTab?: boolean}){
  return (
    <Button className="transition-all opacity-80 hover:opacity-100" variant="link" asChild>
      <Link target={newTab ? "_blank" : "_self"} href={href}>{children}</Link>
    </Button>
  )
}