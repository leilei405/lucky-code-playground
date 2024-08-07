import classnames from "classnames";
import React, { useEffect, useState } from "react";

import styles from "./index.module.scss";

export interface MessageProps {
  type: "error" | "warn";
  content: string;
}

export const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  return visible ? (
    <div className={classnames(styles.msg, styles[type])}>
      <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
      <button className={styles.dismiss} onClick={() => setVisible(false)}>
        ✕
      </button>
    </div>
  ) : null;
};

// 传入两个参数，type 是 error 还是 warn，还有错误内容 content。

// 这里 content 要作为 html 的方式设置到 pre 标签的标签体。

// React 里设置 html 要用 dangerouslySetInnerHTML={{_html: 'xxx'}} 的方式。

// 用 visible 的 state 控制显示隐藏，当传入内容的时候，设置 visible 为 true。
