import React from "react";
import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";

const cardValues = [
  "🎮",
  "🎧",
  "🎸",
  "🎥",
  "🚲",
  "✈️",
  "🚗",
  "🚀",
  "🎮",
  "🎧",
  "🎸",
  "🎥",
  "🚲",
  "✈️",
  "🚗",
  "🚀",
];

const App = () => {
  return (
    <div className="app">
      <GameHeader score={3} moves={10} />

      <div className="cards-grid">
        {cardValues.map((card) => (
          <Card card={card} />
        ))}
      </div>
    </div>
  );
};

export default App;
