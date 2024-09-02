import { Helmet } from "react-helmet-async";

export default function Product() {
  const product = "Cenoura";

  return (
    <>
      <Helmet>
        <title>{`${product}`}</title>
      </Helmet>

      <main>
        <h1>Product</h1>
      </main>
    </>
  );
}
