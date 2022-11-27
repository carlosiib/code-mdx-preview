import { useEffect, useState, useRef } from "react";
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { CodeEditor } from "./components/code-editor";
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { Preview } from "./components/preview";

function App() {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')
  const ref = useRef<any>()


  useEffect(() => {
    const startService = async () => {
      ref.current = await esbuild.startService({
        worker: true,
        wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm"
      })
    }

    startService()
  }, [])

  async function onClick() {
    if (!ref.current) return



    // Bundling process
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      },
    })

    setCode(result.outputFiles[0].text)
    console.log(result.outputFiles[0].text)


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
