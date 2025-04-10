"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl md:text-2xl"
          >
            <span className="text-primary">Opinion</span>
            <span>Pulse</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/market"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Markets
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Profile
          </Link>
          <div className="relative w-48">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search markets..."
              className="w-full rounded-md bg-muted px-8 py-2 text-sm"
            />
          </div>
          {!data?.user ? (
            <Button
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </Button>
          ) : (
            <Button
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 py-3 space-y-3 shadow-md bg-card animate-fade-in">
          <Link
            href="/market"
            className="block py-2 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Markets
          </Link>
          <Link
            href="/profile"
            className="block py-2 text-sm font-medium"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search markets..."
              className="w-full rounded-md bg-muted px-8 py-2 text-sm"
            />
          </div>
          {!data?.user ? (
            <Button
              className="w-full"
              onClick={() => {
                signIn();
              }}
            >
              Sign In
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Button>
          )}{" "}
        </div>
      )}
    </header>
  );
};

export default Header;
