import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import WinMessage from "./components/WinMessage";
import { useGameLogic } from "./hooks/useGameLogic";

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

function App() {
  const { cards, score, moves, isGameWon, initializeGame, handleCardClick } =
    useGameLogic(cardValues);

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {isGameWon && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
