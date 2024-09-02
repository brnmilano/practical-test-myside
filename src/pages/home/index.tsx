import { api } from "@/services";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const onLoadScreen = async () => {
    try {
      const response = await api.get("products/1");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onLoadScreen();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>

        <link rel="canonical" href="" />
      </Helmet>

      <div>
        <h1>Hello World</h1>
      </div>
    </>
  );
}
