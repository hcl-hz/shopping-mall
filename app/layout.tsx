import { Header } from "app/components/common/Header";
import { Footer } from "app/components/common/Footer";
import { QueryProvider } from "app/lib/providers/query-provider";
import { CartProvider } from "app/lib/contexts/cart-context";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-pink-200 min-h-screen">
        <QueryProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
