import React, { useState, useEffect } from "react";
import Card from "./Card";

const generateDeck = () => {
  // Генерация уникальных пар значений для карт
  const cards = ["A", "B", "C", "D", "E", "F", "G", "H"].flatMap((e) => [e, e]);
  return cards.sort(() => Math.random() - 0.5);
};

const Game = () => {
  const [cards, setCards] = useState(generateDeck());
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const onCardClicked = (card) => {
    if (openedCards.length < 2) {
      setOpenedCards([...openedCards, card]);
    }
  };

  useEffect(() => {
    if (openedCards.length === 2) {
      const [firstCard, secondCard] = openedCards;
      if (cards[firstCard] === cards[secondCard]) {
        setMatchedCards([...matchedCards, firstCard, secondCard]);
      }
      setTimeout(() => {
        setOpenedCards([]);
      }, 1000);
      setMoves((moves) => moves + 1);
    }
  }, [openedCards]);

  const isCardOpened = (index) => openedCards.includes(index);
  const isCardMatched = (index) => matchedCards.includes(index);

  return (
    <div>
      <div>Ходов: {moves}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            opened={isCardOpened(index) || isCardMatched(index)}
            onClick={() => onCardClicked(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
