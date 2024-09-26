import { SignInPageComponent } from "@/components/pages/signin";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <SignInPageComponent />
    </Suspense>
  );
}
