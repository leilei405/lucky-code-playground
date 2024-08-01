import { useRef, useState } from "react";
import { transform } from "@babel/standalone";

// 进入项目安装 @babel/standalone 和它的 ts 类型
// npm i --save @babel/standalone
// npm i --save-dev @types/babel__standalone
function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  function onClick() {
    if (!textareaRef.current) {
      return;
    }

    const res = transform(textareaRef.current.value, {
      presets: ["react", "typescript"],
      filename: "test1.tsx",
    });
    console.log(res.code);
  }

  const code = `import { useEffect, useState } from "react";

  function App() {
    const [num, setNum] = useState(() => {
      const num1 = 1 + 2;
      const num2 = 2 + 3;
      return num1 + num2
    });
  
    return (
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
  }
  
  export default App;
  `;

  // 在 textarea 输入内容，设置默认值 defaultValue，用 useRef 获取它的 value。
  // 然后点击编译按钮的时候，拿到内容用 babel.transform 编译，指定 typescript 和 react 的 preset。
  // 打印 res.code。
  return (
    <div>
      <textarea
        ref={textareaRef}
        style={{ width: "500px", height: "300px" }}
        defaultValue={code}
      ></textarea>
      <button onClick={onClick}>编译</button>
    </div>
  );
}

export default App;
