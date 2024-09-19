import { Product } from "@/types/products";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import { productDetailPath } from "@/constants/paths";

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
    router.push(`${productDetailPath}/${productId}`);
  };

  return (
    <>
      {products.map((product, index) => (
        <div
          key={`${product.id} ${index}`}
          data-testid={`${product.id} ${index}`}
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
              fill={true}
              quality={75}
              objectFit="contain"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      ))}
    </>
  );
}
