"use client";

import { usePathname, useRouter } from "next/navigation";
import checker from "@/components/Checker";
export default function f() {
  const router = useRouter();
  const path = usePathname();

  if (path === "/profile") {
    return <div>Footer Hello</div>;
  } else {
    return;
  }
}
