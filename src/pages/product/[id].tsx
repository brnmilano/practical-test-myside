import { GetStaticPaths, GetStaticProps } from "next";
import { productsPath } from "@/constants/paths";
import { api } from "@/services";
import { Product, ProductDetails } from "@/types/products";
import { Button } from "@/components/Form/Button";
import Image from "next/image";
import styles from "./styles.module.scss";
import Head from "next/head";
import { useCart } from "@/hooks/useCart";
import toast from "react-hot-toast";

interface ProductProps {
  /**
   * Informações detalhadas do produto a ser exibido na página.
   */
  productDetails: ProductDetails;
}

export default function ViewProduct({ productDetails }: ProductProps) {
  const { id, title, category, price, description, image } = productDetails;

  const { addToCart, cartItems } = useCart();

  const checkIfItemAlreadyExists = (productId: number) => {
    return cartItems.some((item) => item.id === productId);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);

    toast.success("Produto adicionado ao carrinho.");
  };

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
              quality={75}
            
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
            <Button
              onClick={() => handleAddToCart(productDetails)}
              placeholder="Adicionar ao carrinho"
              size="large"
              disabled={checkIfItemAlreadyExists(id)}
            />
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

  const response = await api.get<{ product: Product }>(
    `${productsPath}/${productId}`
  );

  const { product } = response.data;

  const titleFormatted = product.title.split(" ").slice(0, 3).join(" ");

  const productDetails = {
    id: product.id,
    title: titleFormatted,
    price: product.price,
    description: product.description,
    image: product.image,
    category: product.category,
  };

  return {
    props: {
      productDetails,
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
