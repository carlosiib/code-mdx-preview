import Editor from "@monaco-editor/react"

export const CodeEditor = () => {
  return <Editor
    language="javascript"
    theme="dark"
    height="400px"
    options={{
      wordWrap: 'on'
    }} />
}