import { productsPath } from "@/constants/paths";
import { api } from "@/services";
import { ProductDetails } from "@/types/products";
import { GetStaticPaths, GetStaticProps } from "next";
import { Helmet } from "react-helmet-async";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "@/components/Form/Button";

interface ProductProps {
  product: ProductDetails;
}

export default function Product({ product }: ProductProps) {
  console.log(product);

  const titleFormatted = product.title.split(" ").slice(0, 3).join(" ");

  return (
    <>
      <Helmet>
        <title>{`${titleFormatted}`}</title>

        <link rel="icon" type="image/png" href="./favicon.png" sizes="16x16" />

        <link rel="preload" as="image" href={product.image} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.title}
            width={250}
            height={250}
            priority
          />
        </div>

        <div className={styles.productDetails}>
          <div className={styles.titleAndCategory}>
            <h1>{titleFormatted}</h1>

            <p className={styles.category}>{product.category}</p>
          </div>

          <span className={styles.price}>{product.price}</span>

          <p className={styles.description} title={product.description}>
            {product.description}
          </p>

          <div className={styles.addToCartButton}>
            <Button placeholder="Adicionar ao carrinho" size="large" />
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "1" },
      },
    ],
    fallback: "blocking",
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  const productDetails = await api.get(`${productsPath}/${productId}`);
  const priceFormatted = productDetails.data.price;

  return {
    props: {
      product: {
        id: productDetails.data.id,
        title: productDetails.data.title,
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(priceFormatted),
        description: productDetails.data.description,
        image: productDetails.data.image,
        category: productDetails.data.category,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  };
};
