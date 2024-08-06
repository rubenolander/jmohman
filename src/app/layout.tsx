import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./ui/header";
import "./style.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JM Öhman",
  description: "Apartment listings Västerbotten",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased max-w-full h-full flex flex-col`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
