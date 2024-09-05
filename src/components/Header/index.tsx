import { useRouter } from "next/router";
import { homePath } from "@/constants/paths";
import Image from "next/image";
import LogoImg from "../../../public/myside-logo.svg";
import { IoCart } from "react-icons/io5";
import styles from "./styles.module.scss";

export default function Header() {
  const router = useRouter();

  const handleRedirectToHome = () => {
    router.push(homePath);
  };

  return (
    <header className={styles.container}>
      <div
        className={styles.logoWrapper}
        onClick={() => handleRedirectToHome()}
      >
        <Image src={LogoImg} alt="logo" width={118} height={41} />
      </div>

      <IoCart aria-label="Carrinho de compras" />
    </header>
  );
}
