import { getRobots } from "@/lib/seo/robots";

export const dynamic = "force-static";

export default function robots() {
  return getRobots();
}
