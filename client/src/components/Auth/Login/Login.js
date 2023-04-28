import styles from "../Register/Register.module.css";

import { useAuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";

export default function Login() {
  const { onLoginSubmit } = useAuthContext();

  const { values, errors, onChangeHandler, onSubmit, onValidateForm } = useForm(
    {
      email: "",
      password: "",
    },
    onLoginSubmit
  );

  return (
    <section className="section">
      <h2 className="section-title">Sign In</h2>
      <div className="section-divider"></div>

      <div className={`${styles["login"]} action-container`}>
        <div className={styles["login-img-wrapper"]}>
          <img
            className={styles["login-img"]}
            src="/static/images/register-login.jpg"
            alt="login.jpg"
          />
        </div>

        <form onSubmit={onSubmit} className={styles["login-form"]}>
          <h3 className={styles["form-container-title"]}>Welcome back</h3>

          {/* <!-- Inputs --> */}
          <div className={styles["input-login"]}>
            <label htmlFor="email">
              <span>
                Email
                {errors && (
                  <span className={styles["error-message"]}>
                    &nbsp;{errors.email}
                  </span>
                )}
              </span>
              <input
                className={styles["email"]}
                type="email"
                id="email"
                placeholder="peter@abv.bg"
                name="email"
                value={values.email}
                onChange={onChangeHandler}
                onBlur={onValidateForm}
              />
            </label>

            <label htmlFor="password">
              <span>
                Password
                {errors && (
                  <span className={styles["error-message"]}>
                    &nbsp;{errors.password}
                  </span>
                )}
              </span>
              <input
                className={styles["password"]}
                type="password"
                id="password"
                placeholder="*****"
                name="password"
                value={values.password}
                onChange={onChangeHandler}
                onBlur={onValidateForm}
              />
            </label>

            <button className={"form-btn btn"}>Sign in</button>
          </div>
        </form>
      </div>
    </section>
  );
}
