import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/card-stack";
import Link from "next/link";

export default function CookiePolicy() {
  return (
    <div className="flex flex-col gap-6 w-5/6 lg:w-2/3 xl:w-2/5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/cookies">Cookie Policy</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold leading-10">
        Cookie Policy
        <span className="hidden lg:inline">
          {" "}
          - <Highlight colorName="blue">grades.nstr.dev</Highlight>
        </span>
      </h1>
      <p>
        This cookie policy will clarify what cookies are saved and what purpose
        they serve.
      </p>
      <p className="text-sm text-muted-foreground">
        I am not really familiar with legal matters, there is probably a lot of
        stuff missing here. If you have any questions, feel free to contact me:
        <Highlight colorName="blue">
          <Link href="mailto:dev@nstr.dev">dev@nstr.dev</Link>
        </Highlight>
      </p>

      <h2 className="text-2xl font-bold">What cookies are saved?</h2>
      <ul className="list-disc pl-6">
        <li>
          <code className="text-muted-foreground font-bold">
            cookieConsent (persistent)
          </code>
          : This cookie is used to display the cookie consent banner.
        </li>
        <li>
          <code className="text-muted-foreground font-bold">
            next-auth.callback-url (session)
          </code>
          : This cookie is used to redirect back to the app after logging in.
        </li>
        <li>
          <code className="text-muted-foreground font-bold">
            next-auth.csrf-token (session)
          </code>{" "}
          and{" "}
          <code className="text-muted-foreground font-bold">
            next-auth.session-token (persistent)
          </code>
          : These cookies are used for authentication.
        </li>
      </ul>

      <p>
        These cookies are necessary for the web app to function properly. All
        cookies are administered by us and are not shared with third parties. We
        do not use any tracking or analytics cookies. Both persistent and
        session cookies are used.
      </p>

      <h2 className="text-2xl font-bold">{"I don't want cookies!"}</h2>
      <p>
        To prevent cookies from being stored, you can disable cookies in your
        browser settings and clear the cookies off your device.
      </p>
      <p>
        Alternatively, you are free to use the legacy version of this web app,
        which does not store any cookies. Note that the legacy version is not
        actively developed.
      </p>
      <Button variant="secondary" className="w-fit self-center" asChild>
        <Link href="https://legacy.grades.nstr.dev">Legacy Version</Link>
      </Button>
    </div>
  );
}
