/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useEffect } from "react";
import { GetServerSideProps } from "next";
import { Pagination } from "@/components/Pagination";
import { useSearch } from "@/hooks/useSearch";
import { productsPath } from "@/constants/paths";
import { api } from "@/services";
import { Product, ProductsProps } from "@/types/products";
import { useCommon } from "@/hooks/useCommon";
import Head from "next/head";
import Card from "@/components/Card";
import styles from "./styles.module.scss";
import Search from "@/components/Search";

interface ProductProps {
  /**
   * Lista de produtos a serem exibidos na página.
   */
  products: Product[];
}

export default function Home({ products }: ProductProps) {
  const { currentPage, setCurrentPage } = useCommon();
  const { searchProducts, setProductsArray, setSearchProducts } = useSearch();

  const productsPerPage = 8;
  const totalPages = Math.ceil(searchProducts.length / productsPerPage);

  /**
   * @description Cálculo da lista de produtos que será exibida na página atual,
   * com base na paginação.
   *
   * - O hook `useMemo` é utilizado para evitar re-renderizações desncessárias do
   * componente de paginação, uma vez que a lista de produtos exibidos na página
   * não é alterada.
   * O cálculo será refeito somente quando a página atual (`currentPage`) ou a
   * a lista de produtos filtrados (`searchProducts`) forem alterados.
   *
   * @returns Lista de produtos a serem exibidos na página atual.
   */
  const currentPosts = useMemo(() => {
    return searchProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
  }, [currentPage, searchProducts]);

  /**
   * @description Função de controle para a paginação.
   * @param pageNumber - Número da página a ser exibida.
   */
  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setProductsArray(products);
    setSearchProducts(products);
  }, [products]);

  return (
    <>
      <Head>
        <title>Produtos | MySide</title>
        <meta property="og:title" content="Produtos | MySide" />

        <meta
          name="description"
          content="A MySide é um Personal Shopper Imobiliário. Enquanto o chefe do corretor é o vendedor do imóvel, o chefe do Personal Shopper é VOCÊ, o comprador."
        />

        <link
          rel="canonical"
          href="https://practical-test-myside.vercel.app/home"
        />
      </Head>

      <Search />

      <div className={styles.container}>
        <div className={styles.productsWrapper}>
          <Card products={currentPosts} />
        </div>

        <div className={styles.totalItensAndPagination}>
          <p className={styles.quantityWrapper}>
            Mostrando {currentPosts.length} de {searchProducts.length} itens
          </p>

          <Pagination
            onChangePage={handlePagination}
            currentPage={currentPage}
            pagesQuantity={totalPages}
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get<ProductsProps>(productsPath);

  const { data } = response;

  /**
   * @description Formatação do título do produto.
   * - Coloca o titulo em um array
   * - Retorna apenas as duas primeiras palavras do título.
   * - Remove os caracteres `-` do título.
   * - Junta as palavras do array em uma nova string.
   * - Remove os caracteres especiais, especialmente o hífen.
   */
  const productsFormatted = data.products.map((product) => {
    const titleFormatted = product.title
      .split(" ")
      .slice(0, 2)
      .join(" ")
      .replace(/-/g, " ");

    return {
      id: product.id,
      title: titleFormatted,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(product.price),
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
