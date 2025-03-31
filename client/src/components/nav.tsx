"use client";
import { Gamepad2, User } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Probo</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/trade" className="text-sm font-medium">
            Games
          </Link>
          <Link href="/trade" className="text-sm font-medium">
            Tournaments
          </Link>
          <Link href="/trade" className="text-sm font-medium">
            Leaderboard
          </Link>
          <Link href="/trade" className="text-sm font-medium">
            How to Play
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/#">
                <User className="h-6 w-6 cursor-pointer text-primary" />
              </Link>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => signIn()}>
                Log in
              </Button>
              <Button size="sm" onClick={() => signIn()}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
