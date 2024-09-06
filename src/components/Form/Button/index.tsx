/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonHTMLAttributes } from "react";
import { Spinner } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React from "react";
import clsx from "clsx";

interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Propriedade booleana que indica o estado de carregamento do botão,
   * substituindo o texto por um spinner.
   *
   * @default false
   */
  isloading?: boolean;
  /**
   * Texto exibido dentro do botão.
   * Desativa a operação do botão durante o loading.
   *
   * @type `string | React.ReactNode`
   */
  placeholder: string | React.ReactNode;
  /**
   * Desativa o botão e insira um tema cinza.
   *
   * @default "false"
   * @type `boolean`
   */
  disabled?: boolean;
  /**
   * Define o tema do botão.
   *
   * @default "primary"
   * @type `primary | secondary | icon`
   */
  theme?: "primary" | "secondary" | "icon";
  /**
   * Define o tamanho do botão.
   *
   * @default "small"
   * @type `small | large`
   */
  size?: "small" | "large";
}

export function Button(props: ButtonInterface) {
  const {
    theme = "primary",
    isloading,
    placeholder,
    disabled,
    size = "medium",
    ...rest
  } = props;

  function handleClickOnButton() {
    if (isloading) {
      return;
    }
  }

  return (
    <button
      className={clsx(styles.button, {
        [styles.primary]: theme === "primary",
        [styles.secondary]: theme === "secondary",
        [styles.icon]: theme === "icon",
        [styles.buttonSizeSmall]: size === "small",
        [styles.buttonSizeLarge]: size === "large",
      })}
      disabled={disabled}
      onClick={handleClickOnButton}
      {...rest}
    >
      {isloading ? <Spinner color="#fff" /> : <>{placeholder}</>}
    </button>
  );
}
