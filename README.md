## 实现React Playground

### 1.布局：allotment包实现两边区域的变化

```html
<div class="div">
    <span>xxxxxx</span>
	<img src="xxxxx"/>
</div>
	// 行内元素对齐
.div{
	display:inline-flex;
	place-items:center;
}
```



### 2.集成@monaco-editor/react实现编辑器

#### 问题1:解决如何解析JSX代码，并可以利用editor的action做一些快捷键操作

```tsx
import { ReactNode } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";


export default function EditorComponent(): ReactNode {
   // 默认不会解析JSX，需要在编辑器加载完成后，设置其ts的compilerOptions
  const handleEditorDidMount: OnMount = (editor, monaco) => {
      // editor.getSupportedAction可以查看editor支持的行为
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      // 这里设置 jsx 为 preserve，也就是输入 \<div> 输出 \<div>，保留原样。
      // 如果设置为 react 会输出 React.createElement("div")。            	                           
      jsx: monaco.languages.typescript.JsxEmit.Preserve,  

	 // 自动给没有default的包加上default
      esModuleInterop: true,
    });
  };

  const code = `export default function EditorComponent() {
    return <div>xxxxxx</div>;
  }`;
  return (
    <MonacoEditor
      height="100%"
      defaultValue="// some comment"
      path="guang.tsx"
      language={"typescript"}
      value={code}
      options={{
        // 缩略图默认为true
        minimap: {
          enabled: false,
        },
        fontSize: 12,
        // 隐藏滚动条
        scrollbar: {
          vertical: "hidden",
        },
      }}
      onMount={handleEditorDidMount}
    />
  );
}

```

#### 问题2：使用@typescript/ata 包实现了代码改变时自动下载 dts 类型包的功能,解决第三方包的ts提示

```tsx
// 下载这个包时需要停掉项目,依赖es-build 
// pnpm i @typescript/ata --save -f
import { setupTypeAcquisition } from "@typescript/ata";  
import typescript from "typescript";

export function createATA(
  onDownloadFile: (code: string, path: string) => void
) {
  const ata = setupTypeAcquisition({
    projectName: "my-ata",
    typescript: typescript,
    logger: console,
    delegate: {
      receivedFile: (code: string, path: string) => {
        console.log("自动下载的包", path);
        onDownloadFile(code, path);
      },
    },
  });

  return ata;
}

// 在Editor加载完成后添加解析第三包的代码并下载
 const handleEditorDidMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction("editor.action.formatDocument")?.run();
    });

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    // 自动下载依赖
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      ata(editor.getValue());
    });

    ata(editor.getValue());
  };
```



### 

### 3.import文件: 

