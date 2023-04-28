import { useAuthContext } from "../../../contexts/AuthContext";
import { useForm } from "../../../hooks/useForm";
import styles from "./Register.module.css";

export default function Register() {
  const { onRegisterSubmit } = useAuthContext();

  const { values, errors, onChangeHandler, onSubmit, onValidateForm } = useForm(
    {
      email: "",
      username: "",
      tel: "",
      password: "",
      repass: "",
    },
    onRegisterSubmit
  );

  return (
    <section className="section">
      <h2 className="section-title">Sign Up</h2>
      <div className="section-divider"></div>

      <div className={`${styles["register"]} action-container`}>
        <div className={styles["register-img-wrapper"]}>
          <img
            className={styles["register-img"]}
            src="/static/images/register-login.jpg"
            alt="register.jpg"
          />
        </div>

        <form onSubmit={onSubmit} className={styles["register-form"]}>
          <h3 className={styles["form-container-title"]}>
            Create your account today
          </h3>

          {/* <!-- Inputs --> */}
          <div className={styles["input-register"]}>
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

            <label htmlFor="username">
              <span>
                Username
                {errors && (
                  <span className={styles["error-message"]}>
                    &nbsp;{errors.username}
                  </span>
                )}
              </span>
              <input
                className={styles["username"]}
                type="text"
                id="username"
                placeholder="Peter"
                name="username"
                value={values.username}
                onChange={onChangeHandler}
                onBlur={onValidateForm}
              />
            </label>

            <label htmlFor="tel">
              <span>Telephone</span>
              <input
                className={styles["tel"]}
                type="text"
                id="tel"
                placeholder="+359885888888"
                name="tel"
                value={values.tel}
                onChange={onChangeHandler}
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

            <label htmlFor="repass">
              <span>
                Repeat
                {errors && (
                  <span className={styles["error-message"]}>
                    &nbsp;{errors.repass}
                  </span>
                )}
              </span>
              <input
                className={styles["repass"]}
                type="password"
                id="repass"
                placeholder="*****"
                name="repass"
                value={values.repass}
                onChange={onChangeHandler}
                onBlur={onValidateForm}
              />
            </label>

            <button className={"form-btn btn"}>Sign Up</button>
          </div>
        </form>
      </div>
    </section>
  );
}
