"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/supabase";
import { useRouter } from "next/navigation";
import type { Apartment } from "@/app/lib/types";

const myFrom = process.env.NEXT_PUBLIC_SUPABASE_TABLE as string;
const myFetchString = process.env.NEXT_PUBLIC_SUPABASE_FROM as string;

export default function AddApartment() {
  const [newApartment, setNewApartment] = useState<Apartment>({
    building_name: "",
    adress_line: "",
    apartment_number: null,
    rent: null,
    size: "",
  });
  const [isLoading, setLoading] = useState<boolean>(true);

  const router = useRouter();
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
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewApartment((values) => ({ ...values, [name]: value }));
  };

  const addApartment = async () => {
    const { data, error } = await supabase.from(myFrom).insert([
      {
        building_name: newApartment.building_name,
        adress_line: newApartment.adress_line,
        apartment_number: newApartment.apartment_number,
        rent: newApartment.rent,
        size: `${newApartment.rent}m2`,
      },
    ]);
  };

  if (isLoading) {
    return <main className="px-8">Laddar ..</main>;
  }

  return (
    <main className="px-8">
      <div>
        <p>Lägg till ny lägenhet i databasen.</p>
      </div>
      <form onSubmit={addApartment}>
        <input
          className="placeholder:font-light"
          placeholder="Fastighetsbetäckning"
          type="text"
          name="building_name"
          onChange={handleInput}
          value={newApartment.building_name}
        />
        <input
          className="placeholder:font-light"
          placeholder="Address"
          type="text"
          name="adress_line"
          onChange={handleInput}
          value={newApartment.adress_line}
        />
        <input
          className="placeholder:font-light"
          placeholder="Lägenhetsnummer"
          type="integer"
          name="apartment_number"
          onChange={handleInput}
          value={newApartment.apartment_number ?? ""}
        />
        <input
          className="placeholder:font-light"
          placeholder="Hyra/avgift"
          type="number"
          name="rent"
          onChange={handleInput}
          value={newApartment.rent ?? ""}
        />
        <input
          className="placeholder:font-light"
          placeholder="Storlek"
          type="number"
          name="size"
          onChange={handleInput}
          value={newApartment.size}
        />
        <button type="submit">Lägg till lägenhet.</button>
      </form>
    </main>
  );
}
