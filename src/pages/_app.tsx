/* eslint-disable @typescript-eslint/no-require-imports */
import type { AppProps } from "next/app";
import "../styles/index.scss";
import { Toaster } from "react-hot-toast";
import { CommonProvider } from "@/hooks/useCommon";
import { Inter } from "next/font/google";
import Container from "@/components/Container/Container";
import Header from "@/components/Header";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { SearchProvider } from "@/hooks/useSearch";
import { CartProvider } from "@/hooks/useCart";

const inter = Inter({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={inter.className}>
      <ChakraProvider>
        <CommonProvider>
          <CartProvider>
            <SearchProvider>
              <Toaster position="top-center" />

              <Head>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1"
                />

                <link
                  rel="icon"
                  type="image/png"
                  href="./favicon.png"
                  sizes="16x16"
                />
              </Head>

              <Header />

              <Component {...pageProps} />
            </SearchProvider>
          </CartProvider>
        </CommonProvider>
      </ChakraProvider>
    </Container>
  );
}

/**
 * Warning: viewport meta tags should not be used in _document.tsx <Head>.
 *
 * Adicionar <meta name="viewport"...> em pages/_document.tsx levará a resultados
 * inesperados, pois não pode ser deduplicado. A tag viewport deve ser manipulada
 * por `next/head` no arquivo `pages/_app.tsx`.
 *
 * @see https://nextjs.org/docs/messages/no-document-viewport-meta
 */
