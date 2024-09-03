import { useState, useMemo, useEffect } from "react";
import { GetServerSideProps } from "next";
import { productsPath } from "@/constants/paths";
import { api } from "@/services";
import { Helmet } from "react-helmet-async";
import { Product } from "@/types/products";
import Pagination from "@/components/Pagination";
import styles from "./styles.module.scss";
import Card from "@/components/Card";
import { Input } from "@/components/Form/Input/Input";
import { useForm } from "react-hook-form";
import {
  searchProductsSchema,
  SearchProductsType,
} from "@/models/searchProductsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Form/Button";

interface ProductProps {
  /**
   * Lista de produtos a serem exibidos na página.
   */
  products: Product[];
}

export default function Home({ products }: ProductProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsArray, setProductsArray] = useState<Product[]>(products);
  const [searchProducts, setSearchProducts] = useState<Product[]>(products);

  const productsPerPage = 8;
  const totalPages = useMemo(
    () => Math.ceil(searchProducts.length / productsPerPage),
    [searchProducts]
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchProductsType>({
    resolver: zodResolver(searchProductsSchema),
  });

  const handleSearchProducts = async (data: SearchProductsType) => {
    const filtered = productsArray.filter((product) =>
      product.title.toLowerCase().includes(data.searchProducts.toLowerCase())
    );

    setSearchProducts(filtered);
    setCurrentPage(1); // Resetar para a primeira página após a busca
  };

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  /**
   * @description
   * - alculo da lista de produtos que será exibida na página atual, com base na
   * paginação.
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

  useEffect(() => {
    setProductsArray(products);
    setSearchProducts(products);
  }, [products]);

  return (
    <>
      <Helmet>
        <title>Produtos</title>
        <link
          rel="canonical"
          href="https://practical-test-myside.vercel.app/home"
        />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.searchWrapper}>
          <form
            className={styles.formWrapper}
            onSubmit={handleSubmit(handleSearchProducts)}
          >
            <Input
              control={control}
              errors={errors}
              placeholder="Buscar produtos"
              registerField="searchProducts"
              disabled={isSubmitting}
            />
            <Button type="submit" placeholder="Buscar" size="small" />
          </form>
        </div>

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
