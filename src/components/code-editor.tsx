import Editor from "@monaco-editor/react"

export const CodeEditor = () => {
  return <Editor
    language="javascript"
    theme="dark"
    height="400px"
    options={{
      wordWrap: 'on',
      minimap: { enabled: true },
      showUnused: false,
      folding: false,
      lineNumbersMinChars: 3,
      fontSize: 16,
      scrollBeyondLastLine: false,
      automaticLayout: true,
    }} />
}