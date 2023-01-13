import { Fragment } from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div class={styles.ldsRoller}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
