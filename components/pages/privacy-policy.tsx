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

export default function PrivacyPolicy() {
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
              <Link href="/privacy">Privacy Policy</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold leading-10">
        Privacy Policy
        <span className="hidden lg:inline">
          {" "}
          - <Highlight colorName="blue">grades.nstr.dev</Highlight>
        </span>
      </h1>
      <p>
        This privacy policy will clarify how your data is stored, and which
        purpose it serves.
      </p>
      <p className="text-sm text-muted-foreground">
        I am not really familiar with legal matters, there is probably a lot of
        stuff missing here. If you have any questions, feel free to contact me:
        <Highlight colorName="blue">
          <Link href="mailto:dev@nstr.dev">dev@nstr.dev</Link>
        </Highlight>
      </p>

      <h2 className="text-2xl font-bold">What data is collected?</h2>
      <ul className="list-disc pl-6">
        <li>
          Your username{" "}
          <span className="text-muted-foreground">
            (that you use on the service provider you sign in with, e. g.
            Discord)
          </span>
        </li>
        <li>Your email address</li>
        <li>Your avatar</li>
        <li>
          Your grades, subjects and settings{" "}
          <span className="text-muted-foreground">
            (the stuff you add on this web app)
          </span>
        </li>
      </ul>

      <h2 className="text-2xl font-bold">How is your data used?</h2>
      <p>
        Your data is used to provide you with the services offered on this web
        app. It is stored securely and will not be shared with any third party.
      </p>

      <h2 className="text-2xl font-bold">How is your data stored?</h2>
      <p>
        Your data is stored in a database, hosted on a server located in
        Austria.
      </p>

      <h2 className="text-2xl font-bold">
        Can I delete my account and all associated data?
      </h2>
      <p>
        Yes, you can delete your account and all associated data at any time
        inside the web app, by clicking on <b>Settings</b>, and then choosing{" "}
        <b>Delete Account</b>. This will <b>immediately remove all your data</b>{" "}
        and is irreversible! You can also request a data deletion by contacting
        me via email:{" "}
        <Highlight colorName="blue">
          <Link href="mailto:dev@nstr.dev">dev@nstr.dev</Link>
        </Highlight>
      </p>

      <h2 className="text-2xl font-bold">
        Your code is not secure enough for my needs and I do not trust you with
        my data.
      </h2>
      <p>
        You are free to use the legacy version of this web app, which does not
        store any data on a server.
      </p>
      <Button variant="secondary" className="w-fit self-center" asChild>
        <Link href="https://legacy.grades.nstr.dev">Legacy Version</Link>
      </Button>
    </div>
  );
}
