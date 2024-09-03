import { Pagination as PaginationMaterial } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box } from "@mui/material";
import { ChangeEvent } from "react";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import styles from "./styles.module.scss";

interface PaginationProps {
  /**
   * Quantidade de páginas a serem exibidas na paginação.
   */
  pagesQuantity: number;
  /**
   * Atualiza o estado da página atual com o número da página selecionada pelo
   * usuário, controlando a navegação entre as páginas.
   * @param currentPage
   */
  onChangePage: (currentPage: number) => void;
  /**
   * Número da página atual.
   */
  currentPage: number;
}

export default function Pagination({
  onChangePage,
  pagesQuantity,
  currentPage,
}: PaginationProps) {
  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    onChangePage(value);
  };

  return (
    <Box className={styles.container}>
      <Stack spacing={4}>
        <PaginationMaterial
          count={pagesQuantity}
          variant={"outlined"}
          page={currentPage}
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              classes={{
                previousNext: styles.icons,
                page: styles.pageNumber,
                selected: styles.selectedPageNumber,
                disabled: styles.disabled,
              }}
              slots={{ previous: ChevronLeft, next: ChevronRight }}
              {...item}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
