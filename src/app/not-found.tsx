import type { Metadata } from "next";
import { Link } from "@/components";
import { ROUTES } from "@/data";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <div className="not-found__container">
        <p className="not-found__hint">{metadata.description} </p>
        <Link
          href={ROUTES.home.href}
          variant="primary"
          size="lg"
          label={`Back to ${ROUTES.home.label}`}
        />
      </div>
    </>
  );
}
