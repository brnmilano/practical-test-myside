import { Product } from "@/types/products";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface useSearchProps {
  children: ReactNode;
}

interface SearchContextData {
  productsArray: Product[];
  setProductsArray: Dispatch<SetStateAction<Product[]>>;
  searchProducts: Product[];
  setSearchProducts: Dispatch<SetStateAction<Product[]>>;
}

export const SearchContext = createContext({} as SearchContextData);

function SearchProvider({ children }: useSearchProps) {
  const [productsArray, setProductsArray] = useState<Product[]>([]);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);

  return (
    <SearchContext.Provider
      value={{
        productsArray,
        setProductsArray,
        searchProducts,
        setSearchProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

function useSearch() {
  return useContext(SearchContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { useSearch, SearchProvider };
