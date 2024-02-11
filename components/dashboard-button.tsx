"use client";
import { Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export function DashboardButton() {
  const pathname = usePathname();

  const isDashboard = (pathname: string) => {
    return pathname === "/dashboard";
  }

  const getDahsboardUrl = () => { 
    if (pathname === "/dashboard") return "/";
    return "/dashboard";
  }

  return (
    <Link href={getDahsboardUrl()} className={buttonVariants({ variant: "secondary", size: "icon" })}>

      {
        isDashboard(pathname) ?
          <Home className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hover:rotate-[360]" />
          :
          <LayoutDashboard className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      }
      <span className="sr-only">Dashboard switcher</span>
    </Link>
  );
}