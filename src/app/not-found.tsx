import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-8">
      <h2>Hoppsan!</h2>
      <p>Resursen kunde inte hittas.</p>
      <button className="">
        <Link href="/">Till startsida</Link>
      </button>
    </main>
  );
}
