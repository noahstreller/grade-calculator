import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export function DashboardButton() {
  return (
    <Link href={"/dashboard"} className={buttonVariants({ variant: "secondary", size: "icon" })}>
      <LayoutDashboard className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      <span className="sr-only">Dashboard</span>
    </Link>
  );
}