"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <Sidebar>{children}</Sidebar>
        </NextUIProvider>
      </body>
    </html>
  );
}
