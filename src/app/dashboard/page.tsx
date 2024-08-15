"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../supabase";
import { useRouter } from "next/navigation";
import type { Apartment } from "../lib/types";
import ApartmentListings from "../ui/listings";

const myFrom = process.env.NEXT_PUBLIC_SUPABASE_TABLE as string;
const myFetchString = process.env.NEXT_PUBLIC_SUPABASE_FROM as string;

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [showListings, toggleListings] = useState<boolean>(false);
  const [listings, setListings] = useState<Apartment[]>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session || !session.access_token) {
        router.push("/");
      } else {
        setLoading(false);

        let { data: apartments, error } = await supabase
          .from(myFrom)
          .select(myFetchString);

        if (error) {
          setErrorMessage(error.message);
        }
        if (apartments === null) {
          setErrorMessage("No apartments found.");
        } else {
          const typedApartments: Apartment[] = apartments.map(
            (apartment: any) => ({
              id: apartment.id,
              buildingName: apartment.building_name,
              adressLine: apartment.adress_line,
              apartmentNumber: apartment.apartment_number,
              rent: apartment.rent,
              size: apartment.size,
            })
          );
          console.log(apartments);
          setListings(typedApartments);
          setErrorMessage(null);
        }
      }
    }
    checkSession();
  }, [router]);

  if (isLoading) {
    return <main className="px-8">Hämtar...</main>;
  }

  const handleToggleListings = () => {
    toggleListings(!showListings);
  };

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
  };

  return (
    <main className="px-8 flex flex-col">
      <div className="self-end flex gap-4">
        <Link className={""} href="/dashboard/studio">
          <button className={`p-2 bg-slate-500 rounded-xl`}>
            <h3>Sanity Studio</h3>
          </button>
        </Link>
        <button
          onClick={handleSignout}
          className={`p-2 bg-slate-500 rounded-xl`}
        >
          Logga ut
        </button>
      </div>

      <div className="flex flex-col w-full gap-4">
        <h1 className="font-bold text-2xl">Välkommen admin</h1>
        <button className="underline w-fit" onClick={handleToggleListings}>
          Hantera lägenheter
        </button>
        {showListings ? (
          <ApartmentListings
            errorMessage={errorMessage}
            listingsProp={listings || []}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
