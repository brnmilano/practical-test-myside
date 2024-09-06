import { useCart } from "@/hooks/useCart";
import { useCommon } from "@/hooks/useCommon";
import { Button } from "../../Form/Button";
import styles from "./styles.module.scss";
import toast from "react-hot-toast";

export default function FinishOrder() {
  const { cartItems, cartTotal, removeCartItem } = useCart();
  const { loading } = useCommon();

  const deliveryPrice = 50;
  const totalPriceWithDelivery = cartTotal + deliveryPrice;

  const formattedPrice = (price: number) => {
    return price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleRemoveProduct = (id: number) => {
    removeCartItem(id);

    toast.success("Produto removido do carrinho");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Finalize seu pedido</h3>
      </div>

      <div className={styles.confirmProductWrapper}>
        <div>
          <div className={styles.productsInfoWrapper}>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((product, index) => {
                  return (
                    <div
                      className={styles.productsContent}
                      key={`${product.id} ${index}`}
                    >
                      <div className={styles.productItem}>
                        <div>
                          <h3>{product.title}</h3>

                          <h3>{formattedPrice(product.price)}</h3>
                        </div>

                        <div
                          onClick={() => handleRemoveProduct(product.id)}
                          className={styles.removeProduct}
                        >
                          Remover
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className={styles.valuesWrapper}>
                  <div className={styles.totalItensWrapper}>
                    <p>Total de itens</p>

                    <p>{cartItems.length}</p>
                  </div>

                  <div className={styles.deliveryPriceWrapper}>
                    <p>Entrega</p>

                    <p>{formattedPrice(deliveryPrice)}</p>
                  </div>

                  <div className={styles.totalPriceWrapper}>
                    <p>Total</p>

                    {formattedPrice(totalPriceWithDelivery)}
                  </div>
                </div>
              </>
            ) : (
              <h3>Seu carrinho está vazio</h3>
            )}
          </div>
        </div>

        <Button
          type="submit"
          size="small"
          placeholder="Confirmar pedido"
          isloading={loading}
          disabled={cartItems.length === 0}
        />
      </div>
    </div>
  );
}
