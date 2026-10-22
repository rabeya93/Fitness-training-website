import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { PlanProvider } from "./context/PlanContext";
import Footer from "./components/Footer";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description:
    "Explore workouts, plan your training, and save your favorite lifts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="flex min-h-screen flex-col bg-[#0b0c0e]">
        <PlanProvider>
          <Suspense fallback={<div className="h-16 bg-[#0b0c0e]" />}>
            <Navbar />
          </Suspense>

          <main className="flex-1">{children}</main>

          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
