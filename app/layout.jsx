import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eventful.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="text-zinc-300 bg-zinc-800">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
