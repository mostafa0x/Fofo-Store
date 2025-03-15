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
import AllFunContextProvider from "./_Contexts/AllFunContext";






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
    <SessionProvider>
      <ErrorsPage>
        <AllFunContextProvider>
          <UserContextProvider>
            <MainContextProvider>
              <CartContextProvider>
                <ProductsContextProvider>
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
                </ProductsContextProvider>
              </CartContextProvider>
            </MainContextProvider>
          </UserContextProvider>
        </AllFunContextProvider>
      </ErrorsPage>
    </SessionProvider >
  );
}
