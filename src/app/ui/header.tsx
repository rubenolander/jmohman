import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full mb-16">
      <nav className="px-8 w-fit">
        <Link href="/">
          <h2>Home</h2>
        </Link>
        <Link href="/contact">
          <h2>Contact us!</h2>
        </Link>
      </nav>
    </header>
  );
}
