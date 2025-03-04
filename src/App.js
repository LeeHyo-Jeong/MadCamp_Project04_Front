import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Canvas from "./components/Canvas";
import Ocean from "./components/Ocean";
import Belly from "./components/Belly";
import Login from "./components/login";
import WriteDiary from "./components/WriteDiary";
import DrawingDiary from "./components/DrawingDiary";
import RecordingDiary from "./components/RecordingDiary";
import Diary from "./components/Diary";
import EditDiary from "./components/EditDiary";

function App() {
  const [centerY, setCenterY] = useState(window.innerHeight);

  const handleLoginSuccess = () => {
    const interval = setInterval(() => {
      setCenterY((prevCenterY) => {
        const newCenterY = prevCenterY - 50; // 수위를 점진적으로 높임
        if (newCenterY <= window.innerHeight / 8) {
          clearInterval(interval); // 목표 수위에 도달하면 중지
          return window.innerHeight / 8;
        }
        return newCenterY;
      });
    }, 50); // ms 간격으로 업데이트
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Canvas centerY={centerY} onLoginSuccess={handleLoginSuccess} />
            }
          />
          <Route path="/ocean" element={<Ocean />} />
          <Route path="/belly" element={<Belly />} />
          <Route path="/add/text" element={<WriteDiary />} />
          <Route path="/add/draw" element={<DrawingDiary />} />
          <Route path="/add/audio" element={<RecordingDiary />} />
          <Route path="/diary/:type/:id" element={<Diary />} />
          <Route path="/edit-diary/:type/:id" element={<EditDiary />} />
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
