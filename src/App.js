import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [images, setImages] = useState([]);

  // Загрузка картинок
  useEffect(() => {
    const loadImages = async () => {
      let loadedImages = [];
      try {
        for (let i = 1; i <= 16; i++) {
          const image = await import(`./images/${i}.png`);
          loadedImages.push(image.default);
        }
      } catch {
        console.log("All images loaded or some images are missing");
      }
      setImages(loadedImages);
    };

    loadImages();
  }, []);

  // Перемешивание карт
  useEffect(() => {
    if (images.length > 0) {
      shuffleCards();
    }
  }, [images]);

  const shuffleCards = () => {
    // Выбираем случайный набор картинок
    const selectedImages = images.sort(() => 0.5 - Math.random()).slice(0, 8);

    const shuffledCards = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, src: image, flipped: false }));

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
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
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
            {card.flipped || card === choiceOne || card === choiceTwo ? (
              <img src={card.src} alt="card" className={styles.cardImage} />
            ) : (
              "❓"
            )}
          </button>
        ))}
      </div>
      <p>Ходы: {turns}</p>
    </div>
  );
}

export default App;
