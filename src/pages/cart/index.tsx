/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { AddressProps } from "@/types/address";
import { AddressSchema, AddressValidationSchema } from "@/models/addressSchema";
import { useCommon } from "@/hooks/useCommon";
import styles from "./styles.module.scss";
import FinishOrder from "../../components/Cart/FinishOrder";
import AddressForm from "../../components/Cart/AddressForm";
import Head from "next/head";

interface FormProps {
  props?: AddressProps;
}

export default function Cart({ props }: FormProps) {
  const router = useRouter();

  const { setShippingAddress, setLoading } = useCommon();

  const { cep, street, number, complement, district, city, uf } = props || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(AddressValidationSchema),
    shouldFocusError: false,
    defaultValues: {
      cep: cep,
      street: street,
      number: number,
      complement: complement,
      district: district,
      city: city,
      uf: uf,
    },
  });

  const onSubmit = async (data: AddressProps) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 5000));

    setShippingAddress(data);

    setLoading(false);

    router.push("/order-confirmed");
  };

  return (
    <>
      <Head>
        <title>Finalize seu pedido | MySide</title>
        <meta property="og:title" content="Finalize seu pedido | MySide" />
        <meta
          name="description"
          content="Conclua o seu pedido preenchendo as informações necessárias. Garanta uma experiência rápida e segura com a MySide."
        />

        <link
          rel="canonical"
          href="https://practical-test-myside.vercel.app/cart"
        />
      </Head>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <AddressForm control={control} errors={errors} />

        <FinishOrder />
      </form>
    </>
  );
}
