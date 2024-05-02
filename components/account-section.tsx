"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function AccountSection() {
  const session = useSession();
  return (
    <div className="py-5">
      <Avatar>
        <AvatarImage src={session.data?.user.image || ""} />
        <AvatarFallback>{getInitials(session.data?.user.name || "User")}</AvatarFallback>
      </Avatar>
      <Button />
    </div>
  );
}