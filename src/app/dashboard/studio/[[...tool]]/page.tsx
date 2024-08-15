/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";
import { supabase } from "@/app/supabase";
import { redirect } from "next/navigation";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default async function StudioPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (!session || !session.access_token) {
  //   console.log("redirecting");
  //   redirect("/");
  // }

  return <NextStudio config={config} />;
}
