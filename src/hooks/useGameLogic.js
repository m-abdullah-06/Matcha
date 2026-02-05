import React, { useState, useEffect, useRef } from "react";

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const timerRef = useRef(null);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const initializeGame = () => {
    // Stop existing timer
    stopTimer();

    // Shuffle the cards
    const shuffledCards = [...cardValues];
    shuffleArray(shuffledCards);

    const finalCards = shuffledCards.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setTime(0);
    setFlippedCards([]);
    setMatchedCards([]);

    // Start timer
    startTimer();
  };

  useEffect(() => {
    initializeGame();

    // Cleanup on unmount
    return () => stopTimer();
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

  function launchConfetti() {
    const container = document.querySelector(".confetti-container");
    if (!container) return;

    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");

      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDelay = Math.random() * 2 + "s";

      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 3000);
    }
  }

  // Check if the game is won
  const isGameWon = matchedCards.length === cards.length && cards.length > 0;

  // Stop timer when game is won
  useEffect(() => {
    if (isGameWon) {
      stopTimer();
      launchConfetti();
    }
  }, [isGameWon]);

  return {
    cards,
    flippedCards,
    matchedCards,
    score,
    moves,
    time,
    isLocked,
    handleCardClick,
    isGameWon,
    initializeGame,
  };
};
