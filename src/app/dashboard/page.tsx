"use client";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || !session.access_token) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
    checkSession();
  }, [router]);

  if (isLoading) {
    return <div>Hämtar...</div>;
  }

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  return (
    <main className="px-8">
      <h1>Admin dashboard</h1>
      <p>
        Här kommer man se inställningar för lägenheter, lägga till, ta bort etc.
      </p>
      <button onClick={handleSignout}>Logga ut</button>
    </main>
  );
}
