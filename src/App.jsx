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
  const {
    cards,
    score,
    moves,
    time,
    isGameWon,
    initializeGame,
    handleCardClick,
  } = useGameLogic(cardValues);

  return (
    <div className="app">
      <GameHeader
        score={score}
        moves={moves}
        time={time}
        onReset={initializeGame}
      />

      {isGameWon && <WinMessage moves={moves} time={time} />}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
