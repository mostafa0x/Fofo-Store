"use client"
import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./_Components/NavBar";
import Footer from "./_Components/Footer";
import ReactQuery from "./_Components/ReactQuery";
import ProtectRouting from "./_Components/ProtectRouting";
import UserContextProvider from "./_Contexts/UserContext";
import { Toaster } from "react-hot-toast";
import MainContextProvider from "./_Contexts/MainContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from "next-auth/react";
import ProductsContextProvider from "./_Contexts/ProductsContext";
import CartContextProvider from "./_Contexts/CartContext";
import ErrorsPage from "./_Components/ErrorsPage";




const metadata: Metadata = {
  title: "Fofo Store",
  description: "Shoping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ErrorsPage>
      <UserContextProvider>
        <MainContextProvider>
          <CartContextProvider>
            <ProductsContextProvider>
              <SessionProvider>
                <html lang="en">
                  <body className="vsc-initialized">
                    <ReactQuery>
                      <ProtectRouting>
                        <NavBar />
                        {children}
                        <Toaster />
                        <Footer />
                      </ProtectRouting>
                    </ReactQuery>
                  </body>
                </html>
              </SessionProvider >
            </ProductsContextProvider>
          </CartContextProvider>
        </MainContextProvider>
      </UserContextProvider>
    </ErrorsPage>
  );
}
