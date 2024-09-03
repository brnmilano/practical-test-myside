import { useForm } from "react-hook-form";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input/Input";
import styles from "./styles.module.scss";
import {
  searchProductsSchema,
  SearchProductsType,
} from "@/models/searchProductsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Search() {
  const {
    control,
    //handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchProductsType>({
    resolver: zodResolver(searchProductsSchema),
  });

  return (
    <>
      <div className={styles.searchWrapper}>
        <form
          className={styles.formWrapper}
          //onSubmit={handleSubmit(handleSearchProducts)}
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
    </>
  );
}
