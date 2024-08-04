import logoSvg from "../../icons/logo.svg";
import styles from "./index.module.scss";
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
    </div>
  );
}
