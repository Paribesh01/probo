import { Gamepad2 } from "lucide-react";
import { Button } from "./ui/button";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Probo</span>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a href="/trade" className="text-sm font-medium">
            Games
          </a>
          <a href="/trade" className="text-sm font-medium">
            Tournaments
          </a>
          <a href="/trade" className="text-sm font-medium">
            Leaderboard
          </a>
          <a href="/trade" className="text-sm font-medium">
            How to Play
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <a href="#">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </a>
          <a href="#">
            <Button size="sm">Sign up</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
