import Editor, { EditorDidMount, monaco } from "@monaco-editor/react"

interface CodeEditorProps {
  initialValue: string,
  onChange: (value: string) => void

}


export const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())

    })
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
  }

  return (<Editor
    editorDidMount={onEditorDidMount}
    value={initialValue}
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
    }} />)
}