"use client";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
type Credentials = {
  email: string;
  password: string;
};

export default function AdminPage() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<AuthError | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.access_token) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    }
    checkSession();
  }, [router]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      setErrorMessage(error);
      setLoading(false);
    } else {
      const { access_token, refresh_token } = data.session;
      supabase.auth.setSession({ access_token, refresh_token });
      router.push("/dashboard");
    }
  };

  if (isLoading) {
    return <main className="px-8">Hämtar...</main>;
  }

  return (
    <main className="px-8 flex justify-center items-start">
      <div className="h-1/3 flex flex-col w-full border-2 border-black rounded-md p-4">
        <h2 className="mb-2">Logga in till adminvy</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="placeholder:font-light"
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleInput}
            value={credentials.email}
          />
          <input
            className="placeholder:font-light"
            placeholder="Lösenord"
            type="password"
            name="password"
            onChange={handleInput}
            value={credentials.password}
          />
          {errorMessage ? (
            <h3 className="text-red-400 font-semibold">
              {errorMessage.message}
            </h3>
          ) : null}
          <button
            disabled={isLoading}
            className="w-content p-2 h-content mt-8 bg-slate-500 rounded-lg disabled:text-red-500"
            type="submit"
          >
            {isLoading ? "Loggar in .. " : "Logga in"}
          </button>
        </form>
      </div>
    </main>
  );
}
