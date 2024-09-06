import { useRouter } from "next/router";
import { homePath } from "@/constants/paths";
import { IoCart } from "react-icons/io5";
import { useCart } from "@/hooks/useCart";
import { Button } from "../Form/Button";
import Image from "next/image";
import LogoImg from "../../../public/myside-logo.svg";
import styles from "./styles.module.scss";

export default function HeaderDesktop() {
  const router = useRouter();

  const { cartItems } = useCart();

  const handleRedirectToHome = () => {
    router.push(homePath);
  };

  const handleRedirectToCart = () => {
    router.push("/cart");
  };

  return (
    <header className={styles.desktopContainer}>
      <div
        className={styles.logoWrapper}
        onClick={() => handleRedirectToHome()}
      >
        <Image src={LogoImg} alt="logo" width={118} height={41} />
      </div>

      <div className={styles.cartWrapper}>
        <Button
          onClick={handleRedirectToCart}
          placeholder={<IoCart aria-label="Carrinho de compras" />}
          theme="icon"
        />

        {cartItems.length > 0 && (
          <div className={styles.cartItems}>{cartItems.length}</div>
        )}
      </div>
    </header>
  );
}
