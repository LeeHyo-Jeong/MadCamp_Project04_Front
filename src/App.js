import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Canvas from "./components/Canvas";
import Ocean from "./components/Ocean";
import Login from "./components/login";
import Belly from "./components/Belly";
import AddDiary from "./components/WriteDiary";

const gradients = [
  "linear-gradient(135deg, #AEECEA, #FAD7E4)",
  "linear-gradient(135deg, #DBC3FC, #93C5FC)",
  "linear-gradient(135deg, #D6A1C4, #FDF6D7)",
  "linear-gradient(135deg, #EAC2FB, #DADDDA)",
];

// add로 되어있는 경로를 wrtie, record, draw 등으로 고치기

function App() {
  const [centerY, setCenterY] = useState(window.innerHeight);

  const handleLoginSuccess = () => {
    const interval = setInterval(() => {
      setCenterY((prevCenterY) => {
        const newCenterY = prevCenterY - 50;  // 수위를 점진적으로 높임
        if (newCenterY <= window.innerHeight / 8) {
          clearInterval(interval);  // 목표 수위에 도달하면 중지
          return window.innerHeight / 8;
        }
        return newCenterY;
      });
    }, 50);  // ms 간격으로 업데이트
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Canvas</Link>
            </li>
            <li>
              <Link to="/ocean">Ocean</Link>
            </li>
            <li>
              <Link to="/belly">Belly</Link>
            </li>
            <li>
              <Link to="/add/1">Add 1</Link>
              <Link to="/add/2">Add 2</Link>
              <Link to="/add/3">Add 3</Link>
              <Link to="/add/4">Add 4</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Canvas centerY={centerY} onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/ocean" element={<Ocean />} />
          <Route path="/belly" element={<Belly />} />
          {gradients.map((gradient, index) => (
            <Route
              key={index}
              path={`/add/${index + 1}`}
              element={<AddDiary gradient={gradient} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="canvas-container">
      <Login />
      <Canvas />
      <div className="home"></div>
    </div>
  );
};

export default App;