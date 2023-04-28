import { useGameContext } from "../../contexts/GameContext";
import { useForm } from "../../hooks/useForm";
import styles from "./Create.module.css";

export default function Create() {
  const { onCreateSubmit } = useGameContext();
  const { values, errors, onChangeHandler, onSubmit, onValidateForm } = useForm(
    {
      title: "",
      genre: "",
      price: "",
      imageUrl: "",
      description: "",
    },
    onCreateSubmit
  );

  return (
    <section className="section">
      <h2 className="section-title">Create new product</h2>
      <div className="section-divider"></div>

      <div className={"action-container"}>
        <div className={styles["edit-img-wrapper"]}>
          <img
            className={styles["create-edit-img"]}
            src={"/static/images/create-product.jpg"}
            alt="create-product.jpg"
          />
        </div>

        <form onSubmit={onSubmit} className={styles["form-container"]}>
          <h3 className={styles["form-container-title"]}>Create Publication</h3>
          <p className={styles["form-container-desc"]}>
            Add your own masterpiece!
          </p>

          {/* <!-- Inputs --> */}
          <div className={styles["input-wrapper"]}>
            <div className={styles["rows-aligned"]}>
              <label className={styles["vertical"]} htmlFor="title">
                <div className={styles["input-label"]}>
                  <span>
                    Title
                    {errors && (
                      <span className={styles["error-message"]}>
                        &nbsp;{errors.title}
                      </span>
                    )}
                  </span>
                </div>
                <input
                  className={styles["input-title"]}
                  type="text"
                  id="title"
                  placeholder="Grand Theft Auto V"
                  name="title"
                  value={values.title}
                  onChange={onChangeHandler}
                  onBlur={onValidateForm}
                />
              </label>
              <label htmlFor="genre">
                <div className={styles["input-label"]}>
                  <span>
                    Genre
                    {errors && (
                      <span className={styles["error-message"]}>
                        &nbsp;{errors.genre}
                      </span>
                    )}
                  </span>
                </div>
                <input
                  className={styles["input-genre"]}
                  type="text"
                  id="genre"
                  placeholder="Action"
                  name="genre"
                  value={values.genre}
                  onChange={onChangeHandler}
                  onBlur={onValidateForm}
                />
              </label>
              <label htmlFor="price">
                <div className={styles["input-label"]}>
                  <span>
                    Price
                    {errors && (
                      <span className={styles["error-message"]}>
                        &nbsp;{errors.price}
                      </span>
                    )}
                  </span>
                </div>
                <input
                  className={styles["input-price"]}
                  type="number"
                  id="price"
                  name="price"
                  value={values.price}
                  onChange={onChangeHandler}
                  onBlur={onValidateForm}
                />
              </label>
              <label htmlFor="imageUrl">
                <div className={styles["input-label"]}>
                  <span>
                    Image
                    {errors && (
                      <span className={styles["error-message"]}>
                        &nbsp;{errors.imageUrl}
                      </span>
                    )}
                  </span>
                </div>
                <input
                  className={styles["input-img-url"]}
                  type="text"
                  id="imageUrl"
                  placeholder="https://"
                  name="imageUrl"
                  value={values.imageUrl}
                  onChange={onChangeHandler}
                  onBlur={onValidateForm}
                />
              </label>
            </div>

            {/* <!-- text area --> */}
            <div className={styles["align-center"]}>
              <label htmlFor="description">
                <div className={styles["input-label"]}>
                  <span>
                    Description
                    {errors && (
                      <span className={styles["error-message"]}>
                        &nbsp;{errors.description}
                      </span>
                    )}
                  </span>
                </div>
                <textarea
                  className={styles["description"]}
                  cols="40"
                  rows="4"
                  placeholder="Grand Theft Auto (usually abbreviated GTA) is a series of games that incorporate driving and action gameplay styles."
                  name="description"
                  value={values.description}
                  onChange={onChangeHandler}
                  onBlur={onValidateForm}
                ></textarea>
              </label>
              <div className={styles["align-center-action"]}>
                <input
                  className={"action-bnt create-btn btn"}
                  type="submit"
                  value="Create"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
