import { transform } from "@babel/standalone";
import type { PluginObj } from "@babel/core";

// npm i --save-dev @types/babel__core
// 这里插件的类型用到了 @babel/core 包的类型
// 用 babel 插件的方式对 import 的 source 做了替换
// ImportDeclaration 的 soure 的值改为了 blob url
function App() {
  const code1 = `
    function add(a, b) {
        return a + b;
    }
    export { add };
    `;

  const url = URL.createObjectURL(
    new Blob([code1], { type: "application/javascript" })
  );

  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url;
      },
    },
  };

  const code = `import { add } from './add.ts'; console.log(add(2, 3));`;

  function onClick() {
    const res = transform(code, {
      presets: ["react", "typescript"],
      filename: "test.ts",
      plugins: [transformImportSourcePlugin],
    });
    console.log(res.code);
  }

  return (
    <div>
      <button onClick={onClick}>编译</button>
    </div>
  );
}

export default App;
