import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGameContext } from "../../contexts/GameContext";
import { getById } from "../../services/gameService";
import styles from "../Create/Create.module.css";

export default function DeleteProduct() {
  const { gameId } = useParams();
  const { onDeleteSubmit } = useGameContext();
  const [values, setValues] = useState({
    title: "",
    genre: "",
    price: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    getById(gameId)
      .then((res) => {
        setValues(res);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [gameId]);

  const onSubmit = (e) => {
    e.preventDefault();
    onDeleteSubmit(values);
  };

  return (
    <section className="section">
      <h2 className="section-title">Delete product</h2>
      <div className="section-divider"></div>

      <div className={"action-container"}>
        <div className={styles["edit-img-wrapper"]}>
          <img
            className={styles["create-edit-img"]}
            src={values.imageUrl}
            alt={`${values.title}.jpg`}
          />
        </div>

        <form onSubmit={onSubmit} className={styles["form-container"]}>
          <h3
            className={`${styles["form-container-title"]} ${styles["delete-title"]}`}
          >
            Delete {values.title}
          </h3>
          <p className={styles["form-container-desc"]}>
            Are you sure you want to delete this "{values.title}" game?
          </p>

          {/* <!-- Inputs --> */}
          <div className={styles["input-wrapper"]}>
            <div className={styles["rows-aligned"]}>
              <label className={styles["vertical"]} htmlFor="title">
                <div className={styles["input-label"]}>
                  <span>Title</span>
                </div>
                <input
                  className={styles["input-title"]}
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  disabled={true}
                />
              </label>
              <label htmlFor="genre">
                <div className={styles["input-label"]}>
                  <span>Genre</span>
                </div>
                <input
                  className={styles["input-genre"]}
                  type="text"
                  id="genre"
                  name="genre"
                  value={values.genre}
                  disabled={true}
                />
              </label>
              <label htmlFor="price">
                <div className={styles["input-label"]}>
                  <span>Price</span>
                </div>
                <input
                  className={styles["input-price"]}
                  type="number"
                  id="price"
                  name="price"
                  value={values.price}
                  disabled={true}
                />
              </label>
              <label htmlFor="imageUrl">
                <div className={styles["input-label"]}>
                  <span>Image Url</span>
                </div>
                <input
                  className={styles["input-img-url"]}
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={values.imageUrl}
                  disabled={true}
                />
              </label>
            </div>

            {/* <!-- text area --> */}
            <div className={styles["align-center"]}>
              <label htmlFor="description">
                <div className={styles["input-label"]}>
                  <span>Description</span>
                </div>
                <textarea
                  className={styles["description"]}
                  cols="40"
                  rows="4"
                  name="description"
                  value={values.description}
                  disabled={true}
                ></textarea>
              </label>
              <div className={styles["align-center-action"]}>
                <input
                  className={"action-bnt delete-btn btn"}
                  type="submit"
                  value="Delete"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
