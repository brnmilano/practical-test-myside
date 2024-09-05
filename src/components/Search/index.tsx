import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import {
  searchProductsSchema,
  SearchProductsType,
} from "@/models/searchProductsSchema";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Form/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button as PopoverButton } from "@chakra-ui/react";
import { Button } from "@/components/Form/Button";
import { useCommon } from "@/hooks/useCommon";
import { Product } from "@/types/products";
import { useSearch } from "@/hooks/useSearch";
import CustomCheckbox from "@/components/Form/Checkbox";
import styles from "./styles.module.scss";
import { TbFilterSearch } from "react-icons/tb";
import { TbFilterX } from "react-icons/tb";

interface SearchCategoryAndTitleProps {
  searchProducts: string;
  electronics: boolean;
  jewelery: boolean;
  mensClothing: boolean;
  womensClothing: boolean;
}

export default function Search() {
  const { productsArray, setSearchProducts } = useSearch();
  const { loading, setLoading, setCurrentPage } = useCommon();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SearchProductsType>({
    resolver: zodResolver(searchProductsSchema),
    shouldFocusError: true,
    defaultValues: {
      searchProducts: "",
      electronics: false,
      jewelery: false,
      mensClothing: false,
      womensClothing: false,
    },
  });

  /**
   * @description Faz a filtragem dos produtos com base no título.
   * @param product - Produto a ser filtrado.
   * @param searchTitle - String de busca.
   * @returns Retorna `true` se o título do produto contém a string de busca.
   */
  const filterByTitle = (product: Product, searchTitle: string) => {
    return product.title.toLowerCase().includes(searchTitle.toLowerCase());
  };

  /**
   * @description Faz a filtragem dos produtos com base na categoria.
   *
   * @param product - Produto a ser filtrado.
   * @param searchCategory - Categoria dos produtos.
   * @returns Retorna `true` se o produto pertencer a categoria selecionada.
   */
  const filterByCategory = (
    product: Product,
    searchCategory: SearchCategoryAndTitleProps
  ) => {
    const category = product.category.toLowerCase();

    const { electronics, jewelery, mensClothing, womensClothing } =
      searchCategory;

    return (
      (electronics && category.includes("electronics")) ||
      (jewelery && category.includes("jewelery")) ||
      (mensClothing && category.includes("men's clothing")) ||
      (womensClothing && category.includes("women's clothing"))
    );
  };

  /**
   * @description Faz a busca dos produtos através do titulo e/ou categoria.
   * Simula uma requisição assíncrona com delay de 1 segundo para exibir as
   * funcionalidades de loading. Após a busca ser efeutada, atualiza o estado
   * `searchProducts` com os produtos filtrados e reseta a página atual para 1.
   *
   * @param data - Objeto com os dados para a busca. Ambos opcionais.
   *  - searchProducts: Titulo do produto.
   * - electronics, jewelery, mensClothing, womensClothing: Categorias dosprodutos.
   *
   */
  const handleSearchProducts = async (data: SearchProductsType) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const filteredProducts = productsArray.filter((product) => {
      /**
       * @description Verifica se a busca é por título.
       * Se sim, filtra os produtos com base no título.
       */
      const matchesTitle = data.searchProducts
        ? filterByTitle(product, data.searchProducts)
        : true;

      /**
       * @description Verifica se a busca é por categoria.
       * Se sim, filtra os produtos com base na categoria.
       */
      const matchesCategory =
        data.electronics ||
        data.jewelery ||
        data.mensClothing ||
        data.womensClothing
          ? filterByCategory(product, data)
          : true;

      return matchesTitle && matchesCategory;
    });

    setSearchProducts(filteredProducts);
    setCurrentPage(1);

    setLoading(false);
  };

  const handleClearSearch = () => {
    setValue("searchProducts", "");
    setValue("electronics", false);
    setValue("jewelery", false);
    setValue("mensClothing", false);
    setValue("womensClothing", false);

    setCurrentPage(1);
  };

  return (
    <>
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

          <Popover>
            <PopoverTrigger>
              <PopoverButton className={styles.popoverButton}>
                Categorias
              </PopoverButton>
            </PopoverTrigger>

            <Portal>
              <PopoverContent width={210} padding={6} gap={2}>
                <CustomCheckbox
                  registerField="electronics"
                  {...register("electronics")}
                  control={control}
                  errors={errors}
                >
                  Eletrónicos
                </CustomCheckbox>

                <CustomCheckbox
                  registerField="jewelery"
                  {...register("jewelery")}
                  control={control}
                  errors={errors}
                >
                  Jóias
                </CustomCheckbox>

                <CustomCheckbox
                  registerField="mensClothing"
                  {...register("mensClothing")}
                  control={control}
                  errors={errors}
                >
                  Roupas masculinas
                </CustomCheckbox>

                <CustomCheckbox
                  registerField="womensClothing"
                  {...register("womensClothing")}
                  control={control}
                  errors={errors}
                >
                  Roupas femininas
                </CustomCheckbox>
              </PopoverContent>
            </Portal>
          </Popover>

          <Button
            placeholder={<TbFilterSearch />}
            type="submit"
            theme="icon"
            isloading={loading}
          />

          <Button
            placeholder={<TbFilterX />}
            theme="icon"
            onClick={handleClearSearch}
          />
        </form>
      </div>
    </>
  );
}
