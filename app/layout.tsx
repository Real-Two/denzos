import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ThemeScript from "@/components/ui/ThemeScript";

export const metadata: Metadata = {
  title: {
    default: "Denzos — Maison de Parfum | Premium Indian Perfumery",
    template: "%s | Denzos — Maison de Parfum",
  },
  description:
    "Denzos Maison de Parfum crafts exceptional Indian fragrances using the finest ingredients — oud, saffron, mogra, and sandalwood. Discover our inaugural collection with 50% off.",
  keywords: ["Indian perfume", "luxury fragrance", "oud", "attar", "EDP", "Denzos"],
  openGraph: {
    title: "Denzos — Maison de Parfum",
    description: "Premium Indian perfumery. Crafted with intention, composed for those who linger.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppButton />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
