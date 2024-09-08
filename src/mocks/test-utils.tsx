import React, { PropsWithChildren } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { CommonProvider } from "@/hooks/useCommon";
import { CartProvider } from "@/hooks/useCart";
import { SearchProvider } from "@/hooks/useSearch";

/**
 * @description Renderiza todos os providers por padrão para que não seja necessário renderizar
 * novamente em cada arquivo de teste.
 */
const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <CommonProvider>
      <ChakraProvider>
        <CartProvider>
          <SearchProvider>
            <Toaster position="top-center" />

            {children}
          </SearchProvider>
        </CartProvider>
      </ChakraProvider>
    </CommonProvider>
  );
};

const customRender = (ui: React.ReactNode, options: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-exportar tudo
export * from "@testing-library/react";

// Substitui o método Render
export { customRender as render };
