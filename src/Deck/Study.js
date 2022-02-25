import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import Card from "../Cards/Card";
import NeedMoreCards from "../Cards/NeedMoreCards";


export default function Study() {
  const [deck, setDeck] = useState({});
  const [count, setCount] = useState(0);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [nextIndex, setNextIndex] = useState(1);
  const [flipped, setFlipped] = useState(false);

  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortCon = new AbortController();
    async function getDeck() {
      try {
        if (deckId) {
          const gotDeck = await readDeck(deckId, abortCon.signal);
          setDeck({ ...gotDeck });
          setCount(gotDeck.cards.length);
          setCards([...gotDeck.cards]);
          setCard({ ...gotDeck.cards[0] });
        }
      } catch (err) {throw err}
    }
    getDeck();
    return () => abortCon.abort();
  }, [deckId]);

  const reset = () => {
    setCard(cards[0]);
    setNextIndex(1);
    handleFlip();
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    if (nextIndex < cards.length) {
      setCard(cards[nextIndex]);
      setNextIndex((currentIndex) => currentIndex + 1);
      handleFlip();
    } else {
      const response = window.confirm(
        "Restart cards\n\n\nClick 'cancel' to return to home page."
      );
      response ? reset() : history.push("/");
    }
  };

  return (
    <>
      <div className="d-flex">
        <NavBar
          linkName={deck.name}
          link={`/decks/${deck.id}`}
          pageName={"Study"}
        />
      </div>
      <h2>{deck.name}: Study</h2>
      {count < 3 || !count ? (
        <NeedMoreCards name={deck.name} id={deck.id} cards={count} />
      ) : (
        <Card
          card={card}
          count={count}
          index={nextIndex}
          flipped={flipped}
          flip={handleFlip}
          next={handleNext}
        />
      )}
    </>
  );
}
