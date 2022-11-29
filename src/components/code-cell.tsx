import { useState } from "react";
import { CodeEditor } from "./code-editor";
import { Preview } from "./preview";
import bundle from "../bundler";

export const CodeCell = () => {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')

  async function onClick() {
    // Bundling process
    const output = await bundle(input)
    setCode(output)
  }


  return (
    <div>
      <CodeEditor
        initialValue="const a = 1"
        onChange={(value) => setInput(value)} />

      <div>
        <button onClick={onClick}>Submit</button>
      </div>

      <Preview code={code} />

    </div>
  );
}




