import { useEffect, useState, useRef } from "react";
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

function App() {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')
  const ref = useRef<any>()
  const iframe = useRef<any>()

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

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }

  /**
   * Code flow
   * 1. Bundled code
   *   1.1 Emit message from textarea into iframe
   * 2. Transpiled
   * 3. Executed in iframe
   */
  const html = `
  <html>
  <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event)=>{
          eval(event.data)
        }, false)
      </script>
    </body>
  </html>`

  return (
    <div >
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>

      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} title="code" />

    </div>
  );
}



export default App;
