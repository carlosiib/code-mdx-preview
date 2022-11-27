import { useRef } from 'react'
import Editor, { EditorDidMount } from "@monaco-editor/react"
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
  initialValue: string,
  onChange: (value: string) => void

}


export const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())

    })
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
  }

  const onFormatClick = () => {
    //get current editor value
    const unformatted = editorRef.current.getModel().getValue()
    console.log(unformatted)

    //format that value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: false,
      singleQuote: true,
    })

    //set the formatted value to editor
    editorRef.current.setValue(formatted)
  }

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <Editor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language="javascript"
        theme="dark"
        height="400px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }} />
    </div>)
}