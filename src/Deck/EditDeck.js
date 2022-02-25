import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api";
import DeckForm from "./DeckForm";

export default function EditDeck() {
  const [deck, setDeck] = useState({});

  const { deckId } = useParams();

  useEffect(() => {
    const abortCon = new AbortController();
    async function getCurrentDeck() {
      try {
        const currentDeck = await readDeck(deckId, abortCon.signal);
        setDeck({ ...currentDeck });
      } catch (err) {throw err}
    }
    getCurrentDeck();
    return abortCon.abort();
  }, [deckId]);


  return (
    <>
      <div className="d-flex">
        <NavBar
          linkName={deck.name}
          link={`/decks/${deck.id}`}
          pageName={"Edit Deck"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Deck</h2>
        <DeckForm mode="edit" />
      </div>
    </>
  );
}
