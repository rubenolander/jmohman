"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/supabase";
import type { Apartment } from "@/app/lib/types";

const myFrom = process.env.NEXT_PUBLIC_SUPABASE_TABLE as string;
const myFetchString = process.env.NEXT_PUBLIC_SUPABASE_FROM as string;

export default function ApartmentAdminPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [apartmentData, setApartmentData] = useState<Apartment>();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || !session.access_token) {
        router.push("/");
      } else {
        const { data, error } = await supabase
          .from(myFrom)
          .select(myFetchString)
          .eq("id", params.slug)
          .single();

        if (error || !data) {
          setErrorMessage(error?.message || "No apartment found.");
        } else {
          setApartmentData(data as unknown as Apartment);
          setLoading(false);
        }
      }
    }
    checkSession();
  }, [router]);

  if (isLoading) {
    return <div>Hämtar data ...</div>;
  }

  console.log(apartmentData);
  return (
    <main className="px-8">
      Hello you've made it here.
      {apartmentData ? (
        <div>
          <p>{apartmentData.adressLine}</p>
          <p>{apartmentData.buildingName}</p>
          <p>{apartmentData.rent}</p>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
