import { useForm } from "react-hook-form";
import { setCookie, parseCookies } from "nookies";
import styles from "../../styles/components/main/login.module.css";
import app from "../../config/general.json";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
};

type dataForm = {
  login: string;
  password: string;
};

export default function Login({ setAuthenticated }: Props) {
  const { register, handleSubmit } = useForm();

  async function handleLogin({ login, password }: dataForm): Promise<void> {
    try {
      const req = await fetch(app.API + "login", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "bearer",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const { token } = await req.json();

      if (req.status === 200) {
        setCookie(undefined, app.name + ".token", token, {
          maxAge: 60 * 60 * 2, //2 horas
          path: "/",
        });

        setAuthenticated(true);
      } else {
        alert("Falha ao realizar login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={styles.main}>
      <div>
        <h2>Login</h2>
        <h4>Entre com usuario e senha para continuar</h4>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <input
              {...register("login")}
              required
              type="text"
              name="login"
              id="input_login"
              placeholder=" "
            />
            <label htmlFor="input_login">Usúario</label>
          </div>
          <div>
            <input
              {...register("password")}
              required
              type="password"
              name="password"
              id="input_senha"
              placeholder=" "
            />
            <label htmlFor="input_senha">Senha</label>
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </section>
  );
}
