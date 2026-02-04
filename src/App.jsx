import React, { useState, useEffect } from "react";
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

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = () => {
    // Shuffle the cards
    console.log(cardValues);
    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    console.log(finalCards);
    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setFlippedCards([]);
    setMatchedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    // Don't allow clicking if card is already flipped or already matched or board is locked
    if (card.isFlipped || card.isMatched || isLocked) {
      return;
    }

    // Flip the clicked card
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      }
      return c;
    });
    setCards(newCards);

    // Check if there are two flipped cards
    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    //check for match if two cards are flipped
    if (flippedCards.length === 1) {
      setIsLocked(true);

      const firstCard = cards.find((c) => c.id === flippedCards[0]);
      setTimeout(() => {
        if (firstCard.value === card.value) {
          setMatchedCards((prev) => [...prev, card.id, firstCard.id]);
          setScore((prev) => prev + 1);

          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              }
              return c;
            }),
          );
          setFlippedCards([]);
          setIsLocked(false);
        } else {
          //flip back card 1, card 2
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            }
            return c;
          });
          setCards(flippedBackCards);

          setFlippedCards([]);
          setIsLocked(false);
        }
      }, 500);
      setMoves((prev) => prev + 1);
    }
  };

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
