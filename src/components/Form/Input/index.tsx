/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from "react";
import { Path, Controller, Control, FieldErrors } from "react-hook-form";
import InputMask from "react-input-mask";
import styles from "./styles.module.scss";

interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Esta propriedade é opcional e pode receber um padrão de caracteres para
   * formatar a máscara de entrada:
   * * 9: 0-9
   * * a: A-Z, a-z
   * * *: A-Z, a-z, 0-9
   *
   * Por exemplo: '99/99/9999' para uma máscara de data.
   *
   * @default ""
   * @type `string`
   */
  mask?: string;
  /**
   * Se preenchida, esta propriedade renderiza uma tag <label> acima da entrada,
   * contendo espaço entre elas.
   *
   * @default ""
   * @type `string`
   */
  label?: string;
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
  /**
   * Propriedade utilizada para identificar a entrada do valor do input, também
   * é utilizada no atributo "nome".
   *
   * @type `Path<any>`
   */
  registerField: Path<any>;
}

export const DisplayErrorMessage = (data: any) => {
  return <p>{data?.message || ""}</p>;
};

export function Input(props: InputInterface) {
  const { mask, registerField, control, errors, label, ...rest } = props;

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <Controller
          name={registerField}
          control={control}
          render={({ field }) => (
            <InputMask
              aria-label={label || "input"}
              mask={mask || ""}
              maskChar={null}
              placeholder={label}
              className={`${styles.input} ${
                errors[registerField] && styles.inputError
              }`}
              {...field}
              {...rest}
            />
          )}
        />
      </div>

      <div
        className={`${styles.errorMessage} ${
          errors[registerField] && styles.showingErrorMessage
        }`}
      >
        {DisplayErrorMessage(errors[registerField])}
      </div>
    </div>
  );
}
