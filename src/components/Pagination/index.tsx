import { HStack, Button, ButtonGroup } from "@chakra-ui/react";
import { MdOutlineChevronLeft } from "react-icons/md";
import { MdOutlineChevronRight } from "react-icons/md";
import styles from "./styles.module.scss";

interface PaginationProps {
  /**
   * Define a quantidade de páginas a serem exibidas.
   *
   * @default 1
   * @type number
   */
  pagesQuantity: number;
  /**
   * Define se a paginação está desabilitada.
   *
   * @default false
   * @type boolean
   */
  disabled?: boolean;
  /**
   * Função responsável por fazer a mudança de página.
   *
   * @type function
   */
  onChangePage: (currentPage: number) => void;
  /**
   * Define a página atual.
   *
   * @type
   * @default 1
   */
  currentPage: number;
}

export const Pagination = ({
  onChangePage,
  pagesQuantity,
  currentPage,
  disabled,
}: PaginationProps) => {
  const handleChangePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagesQuantity) {
      onChangePage(newPage);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    for (let page = 1; page <= pagesQuantity; page++) {
      items.push(
        <Button
          key={page}
          onClick={() => handleChangePage(page)}
          isDisabled={disabled || page === currentPage}
          variant={page === currentPage ? "solid" : "outline"}
        >
          {page}
        </Button>
      );
    }
    return items;
  };

  return (
    <div className={styles.container}>
      <HStack spacing={2}>
        <button
          className={styles.button}
          onClick={() => handleChangePage(currentPage - 1)}
          disabled={disabled || currentPage === 1}
        >
          <MdOutlineChevronLeft />
        </button>

        <ButtonGroup
          className={styles.buttonGroup}
          isAttached
          variant="outline"
        >
          {renderPaginationItems()}
        </ButtonGroup>

        <button
          className={styles.button}
          onClick={() => handleChangePage(currentPage + 1)}
          disabled={disabled || currentPage === pagesQuantity}
        >
          <MdOutlineChevronRight />
        </button>
      </HStack>
    </div>
  );
};
