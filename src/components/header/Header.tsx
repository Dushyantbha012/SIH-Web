"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
          <span>CareerBridge</span>
        </div>
        <nav className="hidden lg:flex gap-6">
          <Link href="#" className="font-medium hover:underline">
            Features
          </Link>
          <Link href="#" className="font-medium hover:underline">
            About
          </Link>
          <div className="font-medium hover:underline">
            <DropdownMenu>
              <DropdownMenuTrigger>Jobs</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/jobs/private");
                  }}
                >
                  Private
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/jobs/government");
                  }}
                >
                  Government
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
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
