import { SignInPageComponent } from "@/components/pages/signin";
import { Suspense } from "react";

export default function LoginPage() {
  // test
  return (
    <Suspense>
      <SignInPageComponent />
    </Suspense>
  );
}
