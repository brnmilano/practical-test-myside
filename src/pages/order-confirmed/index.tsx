import { Button } from "@/components/Form/Button";
import { useRouter } from "next/router";
import { homePath } from "@/constants/paths";
import styles from "./styles.module.scss";
import Head from "next/head";

export default function OrderConfirmed() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pedido confirmado | MySide</title>
        <meta property="og:title" content="Pedido confirmado | MySide" />

        <meta
          name="description"
          content="Uhu! Pedido confirmado. Agora é só aguardar que logo o café chegará até você"
        />

        <link
          rel="canonical"
          href="https://practical-test-myside.vercel.app/order-confirmed"
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.titleAndSubtitle}>
          <h2>Uhu! Pedido confirmado</h2>

          <p>Agora é só aguardar que logo o café chegará até você</p>
        </div>

        <Button
          placeholder="Voltar ao início"
          onClick={() => router.push(homePath)}
        />
      </div>
    </>
  );
}
