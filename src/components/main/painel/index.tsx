import { useEffect, useState } from "react";
import app from "../../../config/general.json";
import styles from "../../../styles/components/main/painel/painel.module.css";
import CreateGroups from "./create_groups";
import Groups from "./groups";
import UpdateGroups from "./update_groups";

type Group = {
  id: number;
  name: string;
  cities: [
    {
      id: number;
      name: string;
      uf: {
        name: string;
      };
    }
  ];
};

export default function Index() {
  const [bt_createGroups, setBt_createGroups] = useState<boolean>(false);
  const [updateGroup, setUpdateGroup] = useState<Group | null>(null);
  const [groups, setGroups] = useState<Group[] | null>(null);

  function changeState_bt_createGroups(bool: boolean): void {
    if (bool === false) {
      setBt_createGroups(false);
      setUpdateGroup(null);
    } else if (bool === true) setBt_createGroups(true);
  }

  useEffect(() => {
    async function getGroups() {
      const req = await fetch(app.API + "grupos");
      const res = await req.json();
      setGroups(res);
    }
    getGroups();
  }, [bt_createGroups, updateGroup]);

  return (
    <section className={styles.main}>
      <div
        onClick={() => changeState_bt_createGroups(true)}
        className={styles.bt_createGroups}
      >
        CLIQUE AQUI PARA CRIAR NOVOS GRUPOS
      </div>
      {groups && (
        <Groups
          setUpdateGroup={setUpdateGroup}
          groups={groups}
          setGroups={setGroups}
        />
      )}
      {updateGroup && (
        <UpdateGroups
          changeState_bt_createGroups={changeState_bt_createGroups}
          updateGroup={updateGroup}
        />
      )}
      {bt_createGroups && (
        <CreateGroups
          changeState_bt_createGroups={changeState_bt_createGroups}
        />
      )}
    </section>
  );
}
