import { useState } from "react";

function App() {
  const [input, setInput] = useState('')

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
