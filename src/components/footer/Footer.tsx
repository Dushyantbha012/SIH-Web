"use client";

import { usePathname, useRouter } from "next/navigation";

import { BriefcaseIcon, Link } from "lucide-react";
export default function f() {
  return (
    <footer className="bg-primary text-primary-foreground px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <BriefcaseIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">CareerBridge</span>
      </div>
      <nav className="flex gap-4 md:gap-6 mt-4 md:mt-0">
        <Link href="#" className="font-medium hover:underline">
          Privacy
        </Link>
        <Link href="#" className="font-medium hover:underline">
          Terms
        </Link>
        <Link href="#" className="font-medium hover:underline">
          Contact
        </Link>
      </nav>
    </footer>
  );
}
