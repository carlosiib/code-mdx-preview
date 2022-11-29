import { useState } from "react";
import { CodeEditor } from "./components/code-editor";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { Preview } from "./components/preview";
import bundle from "./bundler";

function App() {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')

  async function onClick() {
    // Bundling process
    const output = await bundle(input)
    setCode(output)
  }


  return (
    <div >
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



export default App;
