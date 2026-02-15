import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { DataProvider } from "@/lib/DataContext";
import Header from "@/components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Drug Development Portfolio Dashboard",
  description:
    "Clinical R&D portfolio management system for drug development programs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        <AuthProvider>
          <DataProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
          </DataProvider>
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
