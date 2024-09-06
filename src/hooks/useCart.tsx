import { productsInCartKey } from "@/types/keys";
import { Product } from "@/types/products";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface useCartProps {
  children: ReactNode;
}

interface CartContextData {
  cartItems: Product[];
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeCartItem: (productId: number) => void;
  checkIfItemAlreadyExists: (productId: number) => boolean;
}

export const CartContext = createContext({} as CartContextData);

function CartProvider({ children }: useCartProps) {
  /**
   * @description Estado que armazena os produtos no carrinho.
   */
  const [cartItems, setCartItems] = useState<Product[]>([]);

  /**
   * @description Calcula o valor total dos itens no carrinho.
   * @param total - Valor total dos itens no carrinho.
   * @param product - Objeto dos produtos a serem somados ao valor total.
   * @returns {number} Retorna o valor somado entre a quantidade de itens e
   * valor dos itens.
   */
  const cartTotal = cartItems.reduce((total, product) => {
    const price = product.price.toString();

    const formattedPrice = parseInt(
      price.replace("R$", "").replace(".", "").replace(",", ".").trim()
    );

    return total + formattedPrice;
  }, 0);

  /**
   * @description Adiciona um novo produto ao carrinho.
   * @param product - Objeto do produto a ser adicionado ao carrinho.
   */
  function addToCart(product: Product) {
    setCartItems((state) => {
      const newProduct = [...state, product];

      localStorage.setItem(productsInCartKey, JSON.stringify(newProduct));

      return newProduct;
    });
  }

  /**
   * @description Remove um produto específico do carrinho.
   * @param productId - ID do produto a ser removido do carrinho.
   */
  function removeCartItem(productId: number) {
    setCartItems((state) => {
      const removeProduct = [...state.filter((item) => item.id !== productId)];

      localStorage.setItem(productsInCartKey, JSON.stringify(removeProduct));

      return removeProduct;
    });
  }

  /**
   * @description Verifica se um produto específico já existe no carrinho.
   * @param productId - ID do produto a ser verificado.
   * @returns {boolean} Retorna true se o produto já existir no carrinho.
   */
  function checkIfItemAlreadyExists(productId: number) {
    return cartItems.some((product) => product.id === productId);
  }

  /**
   * @description Verifica se o objeto window existe, ou seja, está do lado do
   * cliente (navegador). Caso a condição seja true, obtem o valor do localStorage
   * e seta o estado de cartItems com o valor obtido. Caso ocorra algum erro, seta
   * o estado de cartItems com um array vazio.
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storageStateAsJSON = localStorage.getItem(productsInCartKey);

        setCartItems(storageStateAsJSON ? JSON.parse(storageStateAsJSON) : []);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setCartItems([]);
      }
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeCartItem,
        checkIfItemAlreadyExists,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const value = useContext(CartContext);

  return value;
}

export { useCart, CartProvider };
