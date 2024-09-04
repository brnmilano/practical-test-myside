import { GetStaticPaths, GetStaticProps } from "next";
import { productsPath } from "@/constants/paths";
import { api } from "@/services";
import { ProductDetails } from "@/types/products";
import { Button } from "@/components/Form/Button";
import Image from "next/image";
import styles from "./styles.module.scss";
import Head from "next/head";

interface ProductProps {
  /**
   * Informações detalhadas do produto a ser exibido na página.
   */
  product: ProductDetails;
}

export default function Product({ product }: ProductProps) {
  const { id, title, category, price, description, image } = product;

  return (
    <>
      <Head>
        <title>{`${title}`}</title>

        <link rel="preload" as="image" href={image} />

        <meta name="description" content={description} />

        <meta property="og:image" content={image} />

        <link
          rel="canonical"
          href={`https://practical-test-myside.vercel.app/product/${id}`}
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContent}>
            <Image
              src={image}
              alt={title}
              fill={true}
              objectFit="contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.productDetails}>
          <div className={styles.titleAndCategory}>
            <h1>{title}</h1>

            <p className={styles.category}>{category}</p>
          </div>

          <span className={styles.price}>{price}</span>

          <p className={styles.description} title={description}>
            {description}
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
    paths: [],
    fallback: "blocking",
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  const response = await api.get(`${productsPath}/${productId}`);

  const { data } = response;

  const titleFormatted = data.title?.split(" ").slice(0, 3).join(" ");

  const product = {
    id: data.id ?? "",
    title: titleFormatted ?? "",
    price: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(data.price),
    description: data.description ?? "",
    image: data.image ?? "",
    category: data.category ?? "",
  };

  return {
    props: {
      product,
    },
    /**
     * Gera a página estática no momento da primeira requisição e a mantém
     * até que o tempo de revalidação seja atingido. Após isso, a próxima pessoa
     * que acessar a página fará uma nova requisição para o servidor e uma nova
     * página estática será gerada.
     *
     * Isso acontecerá de 1 em 1 hora.
     */
    revalidate: 60 * 60 * 1,
  };
};
