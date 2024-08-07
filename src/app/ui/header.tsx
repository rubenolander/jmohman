"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
export default function Header() {
  const pathname = usePathname();
  return (
    <header className="w-screen mb-16 p-4 bg-slate-100">
      <nav className="px-8 w-fit flex items-center justify-between gap-8">
        <Link className={`${pathname === "/" ? "active" : ""}`} href="/">
          <Image
            width={200}
            height={100}
            src="/logo.png"
            alt="J M Öhmanlogga"
          />
        </Link>
        <Link className={""} href="/contact">
          <button
            className={`p-2 bg-slate-500 rounded-xl ${
              pathname === "/contact" ? " shadow-lg " : ""
            }`}
          >
            <h3>Kontakt</h3>
          </button>
        </Link>
        <Link className={""} href="/admin">
          <button
            className={`p-2 bg-slate-500 rounded-xl ${
              pathname === "/admin" ? " shadow-lg " : ""
            }`}
          >
            <h3>Admin</h3>
          </button>
        </Link>
      </nav>
    </header>
  );
}
