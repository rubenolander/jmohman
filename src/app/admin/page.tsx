"use client";
import { useState } from "react";
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
  const router = useRouter();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      setErrorMessage(error);
    } else {
      const { access_token, refresh_token } = data.session;
      supabase.auth.setSession({ access_token, refresh_token });

      router.push("/dashboard");
    }
  };

  return (
    <main className="px-8">
      <h1>Login Page</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleInput}
            value={credentials.email}
          />
          <input
            placeholder="Lösenord"
            type="password"
            name="password"
            onChange={handleInput}
            value={credentials.password}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      {errorMessage ? <h3 className="">{errorMessage.message}</h3> : null}
    </main>
  );
}
