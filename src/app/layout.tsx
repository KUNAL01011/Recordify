import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme";
import { ClerkProvider } from "@clerk/nextjs";
// import ReactQueryProvider from "@/react-query";
const manrope = Manrope({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Recordify",
  description:
    "Share AI powered videos with your friendsGenerated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${manrope.className} bg-[#171717]`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
