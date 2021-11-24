import { useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import app from "../../config/general.json";
import styles from "../../styles/components/main/main.module.css";
import Login from "./login";
import Painel from "./painel/";

export default function Main() {
  const [Authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const { "economaps_test.token": token } = parseCookies();

    async function recover() {
      if (token) {
        try {
          const req = await fetch(app.API + "authlogin", {
            method: "POST",
            mode: "cors",
            headers: {
              Authorization: "bearer",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(token),
          });

          if (req.status === 200) setAuthenticated(true);
        } catch (error) {
          console.log(error);
        }
      }
    }

    recover();
  }, []);

  return (
    <main className={styles.main}>
      {Authenticated ? (
        <Painel />
      ) : (
        <Login setAuthenticated={setAuthenticated} />
      )}
    </main>
  );
}
