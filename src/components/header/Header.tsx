"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function Header() {
  const router = useRouter();
  return (
    <div>
      <header className="  bg-primary text-primary-foreground px-4 lg:px-6 py-4 flex items-center justify-between hover:cursor-pointer">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="px-4 flex items-center gap-2 text-lg font-semibold"
        >
          <BriefcaseIcon className="h-6 w-6" />
          <span>Talent Nexus</span>
        </div>
        <nav className="hidden lg:flex gap-6">
          <Link href="#" className="font-medium hover:underline">
            Features
          </Link>
          <Link href="#" className="font-medium hover:underline">
            About
          </Link>
          <Link href="#" className="font-medium hover:underline">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2 lg:ml-auto">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
            <Button
              onClick={() => {
                router.push("/profile");
              }}
            >
              Profile
            </Button>
          </SignedIn>
        </div>
      </header>
    </div>
  );
}
