import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Josefin_Sans } from "next/font/google";
import AuthProvider from "./contexts/AuthProvider";

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SolutionSphere",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${josefin.className} font-medium`} style={{ margin: 0, padding: 0 }}>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
