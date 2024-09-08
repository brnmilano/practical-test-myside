import {
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { cartPath, homePath } from "@/constants/paths";
import { useRouter } from "next/router";
import { IoChevronForwardOutline } from "react-icons/io5";
import Image from "next/image";
import Logo from "../../../public/myside-logo.svg";
import styles from "./styles.module.scss";

export default function HeaderMobile() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClickLink = () => {
    onClose();

    router.push(cartPath);
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const handleRedirectToHome = () => {
    router.push(homePath);
  };

  return (
    <div className={styles.mobileContainer}>
      <div className={styles.closedHeader}>
        <div
          className={styles.logoWrapper}
          onClick={() => handleRedirectToHome()}
        >
          <Image src={Logo} alt="logo" width={118} height={41} />
        </div>

        <IconButton
          aria-label="Open Menu"
          icon={<FiAlignJustify fontSize={24} />}
          onClick={onOpen}
          backgroundColor="transparent"
        />
      </div>

      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton top={15} />

          <DrawerHeader>
            <div className={styles.logoWrapper}>
              <Image src={Logo} alt="logo" width={118} height={41} />
            </div>
          </DrawerHeader>

          <Divider borderColor="#000" />

          <div onClick={handleClickLink}>
            <div className={styles.item}>
              Carrinho <IoChevronForwardOutline />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
