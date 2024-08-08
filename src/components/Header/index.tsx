import { useContext } from "react";
import { Button, message } from "antd";
import {
  MoonOutlined,
  SunOutlined,
  ShareAltOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import copy from "copy-to-clipboard";
import styles from "./index.module.scss";
import { PlaygroundContext } from "../../context";
import { downloadFiles } from "../../utils";

export default function Header() {
  const { theme, setTheme, files } = useContext(PlaygroundContext);
  const handleOpenUrl = () => {
    window.open("https://github.com/leilei405/lucky-code-playground", "_blank");
  };
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img
          alt="logo"
          src="https://lucky-file-project.oss-cn-hangzhou.aliyuncs.com/react.svg"
        />
        <span>React Playground</span>
        <Button onClick={handleOpenUrl} size="large" type="link">
          源码地址
        </Button>
      </div>
      <div className={styles.links}>
        <Button
          icon={<ShareAltOutlined />}
          type="link"
          onClick={() => {
            copy(window.location.href);
            message.success("分享链接已复制。");
          }}
        >
          分享
        </Button>

        <Button
          icon={<DownloadOutlined />}
          type="link"
          onClick={async () => {
            await downloadFiles(files);
            message.success("下载完成");
          }}
        >
          下载代码
        </Button>

        {theme === "light" && (
          <Button
            icon={<MoonOutlined />}
            className={styles.theme}
            onClick={() => setTheme("dark")}
            type="link"
          >
            切换夜间模式
          </Button>
        )}
        {theme === "dark" && (
          <Button
            icon={<SunOutlined />}
            className={styles.theme}
            onClick={() => setTheme("light")}
            type="link"
          >
            切换日间模式
          </Button>
        )}
      </div>
    </div>
  );
}
