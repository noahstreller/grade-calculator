import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function EmailLoginForm() {
  const [submitting, setSubmitting] = useState(false);

  type FormValues = {
    email: string;
  };

  const FormSchema = z.object({
    email: z
      .string({
        required_error: "This must be a valid e-mail address",
      })
      .email({ message: "This must be a valid e-mail address" })
      .trim()
      .min(1, { message: "This must be a valid e-mail address" })
      .max(255),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmitting(true);
    const email = data.email;
    if (email) signIn("email", { email });
  }

  return (
    <>
      <CardDescription>
        You can also request a magic link to sign in with your email address.
      </CardDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting ? (
              <LoadingSpinner />
            ) : (
              <>
                <Mail className="m-2 size-5" /> Request Link
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
