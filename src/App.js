import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const emojiCards = ["👨", "👩", "👧", "👦", "👶", "👵", "👴", "🐶"];

  // Перемешивание карт
  const shuffleCards = () => {
    const shuffledCards = [...emojiCards, ...emojiCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ id: Math.random(), emoji: card, flipped: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Обработка выбора карты
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Сравнение двух выбранных карт
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.emoji === choiceTwo.emoji) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.emoji === choiceOne.emoji) {
              return { ...card, flipped: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Сброс выбора
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // Начальное перемешивание карт
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className={styles.app}>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>Новая игра</button>
      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <button
            className={styles.card}
            key={card.id}
            onClick={() => !disabled && !card.flipped && handleChoice(card)}
            disabled={card.flipped}
          >
            {card.flipped || card === choiceOne || card === choiceTwo
              ? card.emoji
              : "❓"}
          </button>
        ))}
      </div>
      <p>Ходы: {turns}</p>
    </div>
  );
}

export default App;
