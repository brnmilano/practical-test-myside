import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="robots" content="index, follow" />

        <link rel="icon" type="image/png" href="./favicon.png" sizes="16x16" />

        <meta
          name="description"
          content="A MySide é um Personal Shopper Imobiliário. Enquanto o chefe do corretor é o vendedor do imóvel, o chefe do Personal Shopper é VOCÊ, o comprador."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
