import { ReactNode } from "react";
import logoSvg from "./icons/logo.svg";
import styles from "./index.module.scss";

export default function Header(): ReactNode {
  return (
    <>
      <div className={styles.header}>
        <img src={logoSvg} alt="logo" />
        <span>React-Playground</span>
      </div>
    </>
  );
}
