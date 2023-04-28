import { useState } from "react";

import { useGameContext } from "../../contexts/GameContext";
import { Loader } from "../Shared/Loader/Loader";
import ProductPs4 from "../ProductPs4/ProductPs4";

import styles from "./Catalog.module.css";

export default function Catalog() {
  const { games, loading, searchGamesHandler } = useGameContext();

  const [value, setValues] = useState({
    search: "",
  });

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO set the search parameters in the url
    searchGamesHandler(value.search);
  };

  return (
    <section className="section">
      <h2 className="section-title">Games for ps4</h2>
      <div className="section-divider"></div>

      {/* <!-- Products --> */}
      <div className={styles["product-wrapper"]}>
        {/* <!-- SEARCH FORM --> */}
        <form onSubmit={onSubmit} className={styles["search-form"]}>
          
            <label className={styles["search-label"]} htmlFor="search">
              <span className={styles["search-terms"]}>Title:</span>
              <input
                className={styles["search-input"]}
                id="search"
                type="search"
                autoComplete="off"
                placeholder="Start searching for..."
                name="search"
                value={value.search}
                onChange={onChangeHandler}
              />
            </label>
         
            <button className={"action-bnt edit-btn btn"}>Search</button>
         
        </form>

        {loading && <Loader />}

        <ul className={styles["product-ul"]}>
          {!loading &&
            games.map((game) => <ProductPs4 key={game._id} {...game} />)}
        </ul>

        {!games.length && (
          <h3 className={styles["no-publications"]}>
            No publications yet. Be the first one.
          </h3>
        )}
      </div>
    </section>
  );
}
