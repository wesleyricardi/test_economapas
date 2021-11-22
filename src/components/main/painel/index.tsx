import { useState } from "react";
import styles from "../../../styles/components/main/painel/painel.module.css";
import CreateGroups from "./create_groups";
import Groups from "./groups";

export default function Index() {
  const [bt_createGroups, setBt_createGroups] = useState<boolean>(false);

  function changeState_bt_createGroups(): void {
    if (bt_createGroups === false) setBt_createGroups(true);
    else setBt_createGroups(false);
  }

  return (
    <section className={styles.main}>
      <div
        onClick={changeState_bt_createGroups}
        className={styles.bt_createGroups}
      >
        CLIQUE AQUI PARA CRIAR NOVOS GRUPOS
      </div>
      <Groups />
      {bt_createGroups && (
        <CreateGroups
          changeState_bt_createGroups={changeState_bt_createGroups}
        />
      )}
    </section>
  );
}
