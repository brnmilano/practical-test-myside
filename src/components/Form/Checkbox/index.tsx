/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, CheckboxProps, forwardRef } from "@chakra-ui/react";
import { PropsWithChildren, Ref } from "react";
import { Control, Controller, Path } from "react-hook-form";
import styles from "./styles.module.scss";

type CheckboxCustomProps = CheckboxProps & {
  /**
   * Recebe um objeto <Control> da biblioteca React Hook Form para definir o
   * contexto deste formulário.
   */
  control: Control<any>;
  /**
   * Propriedade utilizada para identificar a entrada do valor do input, também
   * é utilizada no atributo "nome".
   */
  registerField: Path<any>;
};

function CheckboxCustom(
  props: PropsWithChildren<CheckboxCustomProps>,
  ref: Ref<"input">
) {
  const { children, control, registerField, ...rest } = props;

  return (
    <Controller
      name={registerField}
      control={control}
      render={({ field: { value } }) => (
        <Checkbox
          className={styles.checkBox}
          ref={ref}
          isChecked={value}
          {...rest}
        >
          {children}
        </Checkbox>
      )}
    />
  );
}

export default forwardRef(CheckboxCustom);
