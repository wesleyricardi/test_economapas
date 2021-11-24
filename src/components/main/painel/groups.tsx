import { useEffect, useState } from "react";
import styles from "../../../styles/components/main/painel/groups.module.css";
import app from "../../../config/general.json";

type Props = {
  setUpdateGroup: (id: Group) => void;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
};

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

export default function Groups({ setUpdateGroup, groups, setGroups }: Props) {
  async function deleteGroup(group: Group): Promise<void> {
    const accepted = confirm(
      `tem certeza que desejar deletar o grupo ${group.name}?`
    );
    if (accepted)
      try {
        const req = await fetch(app.API + `excluirgrupo/${group.id}`, {
          method: "DELETE",
        });
        if (req.status === 200) {
          const newList = groups.filter((gp) => {
            if (gp.id !== group.id) return group;
          });
          setGroups(newList);
          alert("Grupo excluido com sucesso");
        } else alert("Falha ao excluir o grupo");
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className={styles.main}>
      {groups?.map((group, key) => (
        <div key={key}>
          <h4>{group.name}</h4>
          <ul>
            {group.cities.map((city, key) => (
              <ol key={"ol_" + key}>
                {city.name} - {city.uf.name}
              </ol>
            ))}
          </ul>
          <div>
            <span onClick={() => setUpdateGroup(group)}>Modificar</span>
            <span onClick={() => deleteGroup(group)}>Excluir</span>
          </div>
        </div>
      ))}
    </div>
  );
}
