import React from "react";
import Loading from "../img/loader.svg";
import styles from "../loading/Loader.module.css";
const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className={styles.loader}>
        <img className={styles.Loading} src={Loading} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
