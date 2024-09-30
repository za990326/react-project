import { ReactNode, useContext } from "react";
import logoSvg from "./icons/logo.svg";
import styles from "./index.module.scss";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { PlaygroundContext } from "../../PlayGroundContext";

export default function Header(): ReactNode {
  const { theme, setTheme } = useContext(PlaygroundContext);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logoSvg} alt="logo" />
          <span>React Playground</span>
        </div>
        <div className={styles.links}>
          {theme === "light" && (
            <MoonOutlined
              title="切换暗色主题"
              className={styles.theme}
              onClick={() => setTheme("dark")}
            />
          )}
          {theme === "dark" && (
            <SunOutlined
              title="切换亮色主题"
              className={styles.theme}
              onClick={() => setTheme("light")}
            />
          )}
        </div>
      </div>
    </>
  );
}
