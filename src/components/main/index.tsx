import styles from "../../styles/components/main/main.module.css";
import Login from "./login";
import Painel from "./painel/";

export default function Main() {
  return (
    <main className={styles.main}>
      {/*  <Login /> */} <Painel />
    </main>
  );
}
