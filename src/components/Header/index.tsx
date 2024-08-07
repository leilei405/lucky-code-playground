import { useContext } from "react";
import { Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import logoSvg from "../../icons/logo.svg";
import styles from "./index.module.scss";
import { PlaygroundContext } from "../../context";

export default function Header() {
  const { theme, setTheme } = useContext(PlaygroundContext);
  const handleOpenUrl = () => {
    window.open("https://github.com/leilei405/lucky-code-playground", "_blank");
  };
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
        <Button onClick={handleOpenUrl} size="large" type="link">
          源码地址
        </Button>
      </div>
      <div className={styles.links}>
        {theme === "light" && (
          <Button
            icon={<MoonOutlined />}
            className={styles.theme}
            onClick={() => setTheme("dark")}
          >
            切换夜间模式
          </Button>
        )}
        {theme === "dark" && (
          <Button
            icon={<MoonOutlined />}
            className={styles.theme}
            onClick={() => setTheme("light")}
          >
            切换日间模式
          </Button>
        )}
      </div>
    </div>
  );
}
