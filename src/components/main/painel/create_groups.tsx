import app from "../../../config/general.json";
import { useEffect, useState } from "react";
import styles from "../../../styles/components/main/painel/createGroups.module.css";

type Props = {
  changeState_bt_createGroups: () => void;
};

type Cities = {
  id: number;
  name: string;
  uf: {
    name: string;
  };
};

export default function CreateGroups({ changeState_bt_createGroups }: Props) {
  const [selectCities, setSelectCities] = useState<JSX.Element[]>([
    <select placeholder=" " required name="select">
      <option value="">Selecione um cidade</option>
    </select>,
    <select placeholder=" " required name="select">
      <option value="">Selecione um cidade</option>
    </select>,
  ]);

  function SelectCity({ cities }: { cities: [Cities] }) {
    return (
      <select placeholder=" " required name="select">
        <option value="">Selecione um cidade</option>
        {cities?.map((city, index) => (
          <option key={"option_" + index} value={city.id}>
            {city.name + "-" + city.uf.name}
          </option>
        ))}
      </select>
    );
  }

  useEffect(() => {
    async function getCities(): Promise<void> {
      const req = await fetch(app.API + "cidades");
      const res = await req.json();
      setSelectCities([
        <SelectCity cities={res} />,
        <SelectCity cities={res} />,
      ]);
    }

    getCities();
  }, []);

  function addMoreCities() {
    if (selectCities)
      if (selectCities.length < 5)
        setSelectCities([...selectCities, selectCities[0]]);
  }

  return (
    <div onClick={changeState_bt_createGroups} className={styles.main}>
      <div onClick={(e) => e.stopPropagation()}>
        <h2>CRIAR NOVO GRUPO</h2>
        <h4>inclua até 5 cidades no grupo</h4>
        <form>
          <div>
            <input
              required
              type="text"
              name="name"
              id="input_name"
              placeholder=" "
            />
            <label htmlFor="input_name">Nome do grupo</label>
          </div>
          {selectCities.map((selectCity) => selectCity)}
          <a onClick={addMoreCities}>Adicionar mais cidades</a>
          <button>Salvar</button>
        </form>
      </div>
    </div>
  );
}
