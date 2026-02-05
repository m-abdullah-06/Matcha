import React from "react";
import faviconImg from "../assets/fav.png";

export const GameHeader = ({ score, moves, onReset, time }) => {
  return (
    <div className="game-header">
      <div className="header-title">
        <img src={faviconImg} alt="favicon" className="header-logo" />
        <h1>Matcha</h1>
      </div>
      <div className="stats">
        <div className="stat-item">
          <span className="stat-label">Score:</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time:</span>
          <span className="stat-value">{time}s</span>
        </div>
      </div>
      <button className="reset-btn" onClick={onReset}>
        New Game
      </button>
    </div>
  );
};
