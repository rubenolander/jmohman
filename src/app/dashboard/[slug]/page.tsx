"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  const [editField, setEditField] = useState<string | null>(null);

  const toggleEdit = (field: string) => {
    setEditField(editField === field ? null : field);
  };

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
  }, [router, params.slug]);

  const editApartment = async () => {
    if (apartmentData) {
      const { data, error } = await supabase
        .from(myFrom)
        .update([
          {
            building_name: apartmentData.building_name,
            adress_line: apartmentData.adress_line,
            apartment_number: apartmentData.apartment_number,
            rent: apartmentData.rent,
            size: `${apartmentData.rent}m2`,
          },
        ])
        .eq("id", params.slug)
        .select();
    }
  };

  const deleteApartment = async () => {
    if (apartmentData) {
      const { data, error } = await supabase
        .from(myFrom)
        .delete()
        .eq("id", params.slug);
      router.push("/dashboard");
    }
  };

  if (isLoading) {
    return (
      <main className="px-8">
        <Link href="/dashboard">Tillbaka</Link>
        <div>Hämtar data ...</div>
      </main>
    );
  }

  console.log(apartmentData);
  return (
    <main className="px-8 flex flex-col gap-4">
      <Link href="/dashboard">Tillbaka</Link>
      <div>
        <p>Hello you made it here.</p>
      </div>
      {apartmentData ? (
        <div className="w-full flex flex-col gap-4 p-4 rounded-lg border-2 border-amber-500">
          {editField === "adress" ? (
            <input
              type="text"
              value={apartmentData.adress_line}
              onChange={(e) =>
                setApartmentData({
                  ...apartmentData,
                  adress_line: e.target.value,
                })
              }
            />
          ) : (
            <>
              <p className="">{apartmentData.adress_line}</p>
              <button onClick={() => toggleEdit("adress")}>Edit</button>
            </>
          )}

          <p>{apartmentData.building_name}</p>
          <p>{apartmentData.rent}</p>
          <p>{apartmentData.size}</p>
          <button onClick={editApartment}>SAVE</button>
          <button onClick={deleteApartment}>DELETE</button>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}
