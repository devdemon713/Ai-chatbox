import React, { useState } from "react";
// Correct the path based on where App.js is located
import { GeminiAssistant } from "./components/ai/GeminiAssistant";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-lg border">
        <h1 className="text-4xl font-black text-orange-900 mb-4">Konark Sun Temple</h1>
        <p className="text-slate-700">
          The Konark Sun Temple is a 13th-century CE Sun temple at Konark in Odisha, India. 
          It was built by King Narasimhadeva I...
        </p>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 bg-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-xl"
      >
        {isOpen ? "Close Assistant" : "Ask Guide"}
      </button>

      {isOpen && <GeminiAssistant onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default App;