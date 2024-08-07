import { Button } from "antd";
import logoSvg from "../../icons/logo.svg";
import styles from "./index.module.scss";
export default function Header() {
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
    </div>
  );
}
