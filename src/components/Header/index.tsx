import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    setScrollY(window.scrollY);
  }

  return (
    <>
      <div className={styles.headerDesktopContainer}>
        <HeaderDesktop />
      </div>

      <div className={styles.headerMobileContainer}>
        <HeaderMobile />
      </div>
    </>
  );
}
