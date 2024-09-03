import { productsPath } from "@/constants/paths";
import { api } from "@/services";
import { GetServerSideProps } from "next";
import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import Card from "@/components/Card";
import { Pagination } from "@/components/Pagination";
import { Product } from "@/types/products";

interface ProductProps {
  /**
   * Lista de produtos a serem exibidos na página.
   */
  products: Product[];
}

export default function Home({ products }: ProductProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(products.length / 8);

  /**
   * @description
   * Utiliza o useMemo para calcular a lista de produtos que devem ser exibidos
   * na página atual, com base na paginação. Calcula e retorna os produtos
   * correspondentes à página atual
   *
   * O cálculo será refeito somente quando a página atual (currentPage) ou a lista
   * completa de produtos (products) for alterada, otimizando a performance do componente.
   *
   * @returns `Product[]` - Lista de produtos a serem exibidos na página atual.
   */
  const currentPosts = useMemo(() => {
    return products.slice((currentPage - 1) * 8, currentPage * 8);
  }, [currentPage, products]);

  /**
   * Atualiza o estado da página atual com o número da página selecionada pelo
   * usuário, controlando a navegação entre as páginas.
   * @param pageNumber
   */
  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Home</title>

        <link rel="canonical" href="" />
      </Helmet>

      <div className={styles.productsWrapper}>
        <Card products={currentPosts} />
      </div>

      <div className={styles.totalItensAndPagination}>
        <p className={styles.quantityWrapper}>
          Mostrando {currentPosts.length} de {products.length} itens
        </p>

        <Pagination
          onChangePage={handlePagination}
          currentPage={currentPage}
          pagesQuantity={totalPages}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<Product[]>(productsPath);

  const productsFormatted = response.data.map((product) => {
    const titleFormatted = product.title.split(" ").slice(0, 3).join(" ");

    const priceFormatted = product.price;

    return {
      id: product.id,
      title: titleFormatted,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(priceFormatted),
      category: product.category,
      description: product.description,
      image: product.image,
    };
  });

  return {
    props: {
      products: productsFormatted,
    },
  };
};
