import styles from "../../styles/components/main/login.module.css";

export default function Login() {
  return (
    <section className={styles.main}>
      <div>
        <h2>Login</h2>
        <h4>Entre com usuario e senha para continuar</h4>
        <form>
          <div>
            <input
              required
              type="text"
              name="email"
              id="input_login"
              placeholder=" "
            />
            <label htmlFor="input_login">Usúario</label>
          </div>
          <div>
            <input
              required
              type="password"
              name="senha"
              id="input_senha"
              placeholder=" "
            />
            <label htmlFor="input_senha">Senha</label>
          </div>

          <button>Entrar</button>
        </form>
      </div>
    </section>
  );
}
