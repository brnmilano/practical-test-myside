import type { AppProps } from "next/app";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "../styles/index.scss";
import { Toaster } from "react-hot-toast";
import { CommonProvider } from "@/hooks/useCommon";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <CommonProvider>
        <Helmet titleTemplate="%s | Teste MySide"></Helmet>

        <Toaster position="top-center" />

        <Component {...pageProps} />
      </CommonProvider>
    </HelmetProvider>
  );
}
