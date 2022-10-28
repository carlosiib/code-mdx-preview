import { useEffect, useState, useRef } from "react";
import * as esbuild from 'esbuild-wasm'

function App() {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const ref = useRef<any>()

  useEffect(() => {
    const startService = async () => {
      ref.current = await esbuild.startService({
        worker: true,
        wasmURL: "/esbuild.wasm"
      })

    }
    startService()
  }, [])

  async function onClick() {
    if (!ref.current) return

    // Transpile value from text area
    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015'
    })

    setCode(result.code)
  }

  return (
    <div >
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
