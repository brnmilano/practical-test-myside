/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldErrors } from "react-hook-form";
import { useCart } from "@/hooks/useCart";
import { Input } from "@/components/Form/Input";
import styles from "./styles.module.scss";

interface CompleteYourOrderProps {
  /**
   * Recebe um objeto <Control> da biblioteca React Hook Form para definir o
   * contexto deste formulário.
   *
   * @type `Control<any>`
   */
  control: Control<any>;
  /**
   * Matriz de erros gerada pela biblioteca React Hook Form. É usado para
   * renderizar o erro de entrada, se houver algum.
   *
   * @type `FieldErrors<any>`
   */
  errors: FieldErrors<any>;
}

export default function AddressForm(props: CompleteYourOrderProps) {
  const { control, errors } = props;

  const { cartItems } = useCart();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Endereço para entrega</h3>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.adressText}>
            <h3>Endereço de Entrega</h3>

            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>

          <div className={styles.formWrapper}>
            <div className={styles.item1}>
              <Input
                label="CEP"
                control={control}
                errors={errors}
                registerField="cep"
                mask="99.999-999"
                disabled={cartItems.length === 0}
              />
            </div>

            <div className={styles.item2}>
              <Input
                label="Rua"
                control={control}
                errors={errors}
                registerField="street"
                disabled={cartItems.length === 0}
              />
            </div>

            <div className={styles.item3}>
              <Input
                label="Número"
                control={control}
                errors={errors}
                registerField="number"
                mask="999999"
                disabled={cartItems.length === 0}
              />
            </div>

            <div className={styles.item4}>
              <Input
                label="Complemento"
                control={control}
                errors={errors}
                registerField="complement"
                disabled={cartItems.length === 0}
              />
            </div>

            <div className={styles.item5}>
              <Input
                label="Bairro"
                control={control}
                errors={errors}
                registerField="district"
                disabled={cartItems.length === 0}
              />
            </div>

            <div className={styles.item6}>
              <Input
                label="Cidade"
                control={control}
                errors={errors}
                registerField="city"
                disabled={cartItems.length === 0}
              />
            </div>

            <div className={styles.item7}>
              <Input
                label="UF"
                control={control}
                errors={errors}
                registerField="uf"
                maxLength={2}
                disabled={cartItems.length === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
