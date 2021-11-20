import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import Main from "../components/main";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Desafio Economapas</title>
        <meta
          name="description"
          content="Desafio realizado por Wesley Ricardi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </>
  );
};

export default Home;
