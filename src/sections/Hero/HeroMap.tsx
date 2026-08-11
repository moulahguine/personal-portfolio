"use client";

import dynamic from "next/dynamic";
import { InteractiveMapPlaceholder } from "@/components";
import type { ClassNameProps } from "@/types";

const InteractiveMap = dynamic(
  () => import("@/components/features/InteractiveMap/InteractiveMap"),
  {
    ssr: false,
    loading: () => <InteractiveMapPlaceholder />,
  },
);

export default function HeroMap({ className }: ClassNameProps) {
  return <InteractiveMap className={className} />;
}
