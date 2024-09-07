import { AddressProps } from "@/types/address";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface useCommonProps {
  children: ReactNode;
}

interface CommonContextData {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  shippingAddress: AddressProps;
  setShippingAddress: Dispatch<SetStateAction<AddressProps>>;
}

export const CommonContext = createContext({} as CommonContextData);

function CommonProvider({ children }: useCommonProps) {
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<AddressProps>(
    {} as AddressProps
  );

  const currentPage = Number(searchParams.get("page") || 1);

  /**
   * Atualiza a URL da página atual adicionando o valor do parâmetro para "page".
   *
   * @param {number} pageNumber - O número da página que deve ser definida na URL.
   *
   * @example Se a página atual for 2, a URL será: /home?page=2
   *
   * @see https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams
   */
  const setCurrentPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", pageNumber.toString());

    router.push(pathname + "?" + params.toString());
  };

  return (
    <CommonContext.Provider
      value={{
        loading,
        setLoading,
        currentPage,
        setCurrentPage,
        shippingAddress,
        setShippingAddress,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}

function useCommon() {
  return useContext(CommonContext);
}

// eslint-disable-next-line react-refresh/only-export-components
export { useCommon, CommonProvider };
