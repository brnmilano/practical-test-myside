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
import { FiSearch } from "react-icons/fi";
// import { usePathname, useSearchParams } from "next/navigation";
import CustomCheckbox from "@/components/Form/Checkbox";
import styles from "./styles.module.scss";
import toast from "react-hot-toast";

interface SearchCategoryAndTitleProps {
  searchProducts: string;
  tv: boolean;
  audio: boolean;
  mobile: boolean;
  gaming: boolean;
}

export default function Search() {
  const { productsArray, setSearchProducts } = useSearch();
  const { loading, setLoading } = useCommon();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<SearchProductsType>({
    resolver: zodResolver(searchProductsSchema),
    shouldFocusError: true,
    defaultValues: {
      searchProducts: "",
      tv: false,
      audio: false,
      mobile: false,
      gaming: false,
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
   * @param product - Produto a ser filtrado.
   * @param searchCategory - Categoria dos produtos.
   * @returns Retorna `true` se o produto pertencer a categoria selecionada.
   */
  const filterByCategory = (
    product: Product,
    searchCategory: SearchCategoryAndTitleProps
  ) => {
    const category = product.category.toLowerCase();

    const { tv, audio, mobile, gaming } = searchCategory;

    return (
      (tv && category.includes("tv")) ||
      (audio && category.includes("audio")) ||
      (mobile && category.includes("mobile")) ||
      (gaming && category.includes("gaming"))
    );
  };

  /**
   * @description Faz a busca dos produtos através do titulo e/ou categoria.
   * Simula uma requisição assíncrona com delay de 1 segundo para exibir as
   * funcionalidades de loading. Após a busca ser efeutada, atualiza o estado
   * `searchProducts` com os produtos filtrados e reseta a página atual para 1.
   * @param data - Objeto com os dados para a busca. Ambos opcionais.
   * - searchProducts: Titulo do produto.
   * - tv, audio, mobile e gaming: Categorias dosprodutos.
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
        data.tv || data.audio || data.mobile || data.gaming
          ? filterByCategory(product, data)
          : true;

      return matchesTitle && matchesCategory;
    });

    setSearchProducts(filteredProducts);

    setLoading(false);
  };

  /**
   * @description Limpa o campo de busca e de categoria.
   * @returns Retorna os campos de busca e de categoria vazios e a página atual
   * como 1.
   */
  const handleClearSearch = () => {
    setValue("searchProducts", "");
    setValue("tv", false);
    setValue("audio", false);
    setValue("mobile", false);
    setValue("gaming", false);

    toast.success("Filtros limpos com sucesso!");
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
          />

          <div className={styles.searchButtons}>
            <div className={styles.searchAndClearFilterButtons}>
              <Popover placement="bottom-end">
                <PopoverTrigger>
                  <PopoverButton className={styles.popoverButton}>
                    Categorias
                  </PopoverButton>
                </PopoverTrigger>

                <Portal>
                  <PopoverContent width={210} padding={6} gap={2}>
                    <CustomCheckbox
                      registerField="tv"
                      {...register("tv")}
                      control={control}
                      errors={errors}
                    >
                      TV
                    </CustomCheckbox>

                    <CustomCheckbox
                      registerField="audio"
                      {...register("audio")}
                      control={control}
                      errors={errors}
                    >
                      Áudio
                    </CustomCheckbox>

                    <CustomCheckbox
                      registerField="mobile"
                      {...register("mobile")}
                      control={control}
                      errors={errors}
                    >
                      Mobile
                    </CustomCheckbox>

                    <CustomCheckbox
                      registerField="gaming"
                      {...register("gaming")}
                      control={control}
                      errors={errors}
                    >
                      Gaming
                    </CustomCheckbox>
                  </PopoverContent>
                </Portal>
              </Popover>

              <Button
                placeholder={<FiSearch />}
                type="submit"
                theme="icon"
                isloading={loading}
                data-testid="search-button"
                aria-label="Buscar produtos"
              />
            </div>

            <Button
              placeholder="Limpar"
              theme="secondary"
              onClick={handleClearSearch}
              aria-label="Limpar filtros"
            />
          </div>
        </form>
      </div>
    </>
  );
}
