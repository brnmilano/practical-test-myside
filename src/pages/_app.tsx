import type { AppProps } from "next/app";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../styles/index.scss";
import { Toaster } from "react-hot-toast";
import { CommonProvider } from "@/hooks/useCommon";
import { Inter } from "next/font/google";
import Container from "@/components/Container/Container";
import Header from "@/components/Header";

const inter = Inter({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <CommonProvider>
        <Helmet titleTemplate="%s | Teste MySide"></Helmet>

        <Toaster position="top-center" />

        <Container className={inter.className}>
          <Header />

          <Component {...pageProps} />
        </Container>
      </CommonProvider>
    </HelmetProvider>
  );
}
