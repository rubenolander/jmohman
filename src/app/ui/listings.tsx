import { supabase } from "../supabase";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Apartment } from "../lib/types";

export default function ApartmentListings({
  errorMessage,
  listingsProp,
}: {
  errorMessage: string | null;
  listingsProp: Apartment[] | [];
}) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [listings, setListings] = useState<Apartment[]>(listingsProp);
  const number: number = 1;
  return (
    <div className="w-full h-fit">
      {isLoading ? "Hämtar data..." : ""}
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div className="w-full">
        <p>Lägenheter</p>
        {listings
          ? listings.map((listing) => (
              <Link
                key={listing.id}
                className="block p-4 rounded-lg border-2 border-amber-500"
                href={`/dashboard/${listing.id}`}
              >
                <button className="">
                  <div className="p-2 rounded-lg">
                    <p>{listing.adressLine}</p>
                  </div>
                </button>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}
