"use client";
import { Home, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

export function DashboardButton() {
  const pathname = usePathname();
  const session = useSession();

  const isDashboard = (pathname: string) => {
    return pathname === "/dashboard";
  }

  const getDashboardUrl = () => { 
    if (pathname === "/dashboard") return "/";
    return "/dashboard";
  }

  return (
    session.status === "authenticated" ? 
    <Link href={getDashboardUrl()} className={buttonVariants({ variant: "secondary", size: "icon" })}>

      {
        isDashboard(pathname) ?
          <Home className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all hover:rotate-[360]" />
          :
          <LayoutDashboard className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      }
      <span className="sr-only">Dashboard switcher</span>
    </Link> : null
  );
}