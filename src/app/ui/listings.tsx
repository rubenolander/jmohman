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
  return (
    <div className="w-full h-fit">
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div className="w-fit py-2">
        <Link
          className=" box-decoration-slice font-bold text-md hover:text-lg hover:underline"
          href={`/dashboard/add`}
        >
          <h3>Lägg till +</h3>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-4">
        {listingsProp
          ? listingsProp.map((listing) => (
              <Link
                key={listing.id}
                className="block p-4 rounded-lg border-2 border-amber-500"
                href={`/dashboard/${listing.id}`}
              >
                <button className="">
                  <div className="p-2 rounded-lg">
                    <p>{listing.rent}</p>
                    <p>{listing.adress_line}</p>
                  </div>
                </button>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}
