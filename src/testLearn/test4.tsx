import React from "react";

// 这里路径后面加个 ?raw 是通过字符串引入（webpack 和 vite 都有这种功能）
// 用 URL.createObjectURL + Blob 生成 blob url 设置到 iframe 的 src 就好了
import iframeRaw from "./iframe.html?raw";

const iframeUrl = URL.createObjectURL(
  new Blob([iframeRaw], { type: "text/html" })
);

const Preview: React.FC = () => {
  return (
    <iframe
      src={iframeUrl}
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        border: "none",
      }}
    />
  );
};

export default Preview;

// 编辑器部分用 @monaco-editor/react 实现，然后用 @babel/standalone 在浏览器里编译。

// 编译过程中用自己写的 babel 插件实现 import 的 source 的修改，变为 URL.createObjectURL + Blob 生成的 blob url，把模块内容内联进去。

// 对于 react、react-dom 这种包，用 import maps 配合 esm.sh 网站来引入。

// 然后用 iframe 预览生成的内容，url 同样是把内容内联到 src 里，生成 blob url。
