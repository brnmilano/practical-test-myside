import { Helmet } from "react-helmet-async";

export default function Home() {
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
