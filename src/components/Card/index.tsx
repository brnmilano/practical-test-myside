import { Product } from "@/types/products";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

interface CardProps {
  /**
   * Lista de produtos a serem exibidos no Card.
   */
  products: Product[];
}

export default function Card(props: CardProps) {
  const router = useRouter();

  const { products } = props;

  const handleProductDetails = (productId: number) => {
    console.log(productId);

    router.push(`/product/${productId}`);
  };

  return (
    <>
      {products.map((product, index) => (
        <div
          key={`${product.id} ${index}`}
          onClick={() => handleProductDetails(product.id)}
          className={styles.productsItems}
        >
          <div className={styles.infoWrapper}>
            <h2 title={product.title}>{product.title}</h2>

            <span className={styles.price}>{product.price}</span>

            <p title={product.description} className={styles.description}>
              {product.description}
            </p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.title}
              width={150}
              height={150}
              priority
            />
          </div>
        </div>
      ))}
    </>
  );
}
