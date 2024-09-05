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
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const CommonContext = createContext({} as CommonContextData);

function CommonProvider({ children }: useCommonProps) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <CommonContext.Provider
      value={{
        loading,
        setLoading,
        currentPage,
        setCurrentPage,
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
