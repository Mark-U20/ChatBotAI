import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Chat } from "./Pages/Chat";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div id="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
