import { useEffect, useState } from "react";
import * as esbuild from 'esbuild-wasm'

function App() {
  const [input, setInput] = useState('')



  useEffect(() => {
    const startService = async () => {
      const service = await esbuild.startService({
        worker: true,
        wasmURL: "/esbuild.wasm"
      })
      console.log(service)
    }
    startService()
  }, [])

  function onClick() {

  }

  return (
    <div >
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre></pre>
    </div>
  );
}

export default App;
