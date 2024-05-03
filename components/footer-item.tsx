import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FooterItem({href, children}: {href: string, children: React.ReactNode}){
  return (
    <Button className="transition-all opacity-80 hover:opacity-100" variant="link" asChild>
      <Link target="_blank" href={href}>{children}</Link>
    </Button>
  )
}