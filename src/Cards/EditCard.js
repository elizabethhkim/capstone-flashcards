import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortCon = new AbortController();
    async function getDeck() {
      try {
        if (deckId) {
          const gotDeck = await readDeck(deckId, abortCon.signal);
          setDeck({ ...gotDeck });
        }
      } catch (err) {throw err}
    }
    getDeck();
    return () => abortCon.abort();
  }, [deckId]);


  return (
    <div>
      <div className="d-flex">
        <NavBar
          linkName={`Deck ${deck.name}`}
          link={`/decks/${deck.id}`}
          pageName={`Edit Card ${cardId}`}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Card</h2>
        <CardForm mode="edit" />
      </div>
    </div>
  );
}
