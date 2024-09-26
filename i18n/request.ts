import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const locale = cookies().get("locale")?.value || "en";

  const userMessages = (await import(`../messages/${locale}.json`)).default;
  const defaultMessages = (await import(`../messages/en.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    locale,
    messages,
  };
});
