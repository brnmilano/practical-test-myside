import Image from "next/image";
import styles from "./styles.module.scss";
import LogoImg from "../../../public/myside-logo.svg";
import LocalMallIcon from "@mui/icons-material/LocalMall";

export default function Header() {
  return (
    <header className={styles.container}>
      <Image src={LogoImg} alt="logo" width={118} height={41} />

      <LocalMallIcon />
    </header>
  );
}
