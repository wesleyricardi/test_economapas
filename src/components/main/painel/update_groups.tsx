import app from "../../../config/general.json";
import { useEffect, useState } from "react";
import styles from "../../../styles/components/main/painel/createGroups.module.css";
import { useForm } from "react-hook-form";

type Props = {
  changeState_bt_createGroups: (bool: boolean) => void;
  updateGroup: Group;
};

type Cities = {
  id: number;
  name: string;
  uf: {
    name: string;
  };
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

type dataForm = {
  name: string;
  city_1: string;
  city_2: string;
  city_3?: string;
  city_4?: string;
  city_5?: string;
};

export default function UpdateGroups({
  changeState_bt_createGroups,
  updateGroup,
}: Props) {
  const [grupoName, setgrupoName] = useState<string>(updateGroup.name);
  const [selectCities, setSelectCities] = useState<JSX.Element[]>();
  const [cities, setCities] = useState<[Cities] | null>(null);
  const { register, handleSubmit } = useForm();

  function SelectCity({
    name,
    cities,
    actual,
  }: {
    name: string;
    cities: [Cities];
    actual?: string;
  }) {
    return (
      <select {...register(name)} placeholder=" " required name={name}>
        <option value="">Selecione um cidade</option>
        {cities?.map((city, index) =>
          city.name === actual ? (
            <option selected key={"option_" + index} value={city.id}>
              {city.name + "-" + city.uf.name}
            </option>
          ) : (
            <option key={"option_" + index} value={city.id}>
              {city.name + "-" + city.uf.name}
            </option>
          )
        )}
      </select>
    );
  }

  useEffect(() => {
    async function getCities(): Promise<void> {
      const req = await fetch(app.API + "cidades");
      const res = await req.json();
      setCities(res);

      const selectscities = updateGroup.cities.map((city, key) => {
        return (
          <SelectCity
            name={"city_" + key}
            key={"city_" + key}
            cities={res}
            actual={city.name}
          />
        );
      });

      setSelectCities(selectscities);
    }

    getCities();
  }, []);

  async function handleCreate(data: dataForm): Promise<void> {
    let cities = [];
    let index = 0;

    for (const [key, city] of Object.entries(data)) {
      if (key !== "name") {
        cities[index] = city;
        index++;
      }
    }
    const group = {
      id: updateGroup.id,
      name: data.name,
      cities: cities,
    };

    try {
      const req = await fetch(app.API + "modificargrupo", {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(group),
      });

      if (req.status === 201) {
        alert("Grupo modificado com sucesso");
        changeState_bt_createGroups(false);
      } else {
        const { code } = await req.json();
        if (code === 1062) alert("Já existe um grupo com esse nome");
        else alert("Falha ao modificar o grupo");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function addMoreCities() {
    if (selectCities && cities)
      if (selectCities.length < app.max_cities_group)
        setSelectCities([
          ...selectCities,
          <SelectCity
            key={"city_" + (selectCities.length + 1)}
            name={"city_" + (selectCities.length + 1)}
            cities={cities}
          />,
        ]);
  }

  return (
    <div
      onClick={() => changeState_bt_createGroups(false)}
      className={styles.main}
    >
      {selectCities && (
        <div onClick={(e) => e.stopPropagation()}>
          <h2>Modificar o grupo</h2>
          <h4>inclua até {app.max_cities_group} cidades no grupo</h4>
          <form onSubmit={handleSubmit(handleCreate)}>
            <div>
              <input
                {...register("name")}
                required
                type="text"
                name="name"
                id="input_name"
                placeholder=" "
                value={grupoName}
                onChange={(e) => setgrupoName(e.target.value)}
              />
              <label htmlFor="input_name">Nome do grupo</label>
            </div>
            {selectCities.map((selectCity) => selectCity)}
            {selectCities.length < app.max_cities_group && (
              <a onClick={addMoreCities}>Adicionar mais cidades</a>
            )}
            <button>MODIFICAR</button>
          </form>
        </div>
      )}
    </div>
  );
}
