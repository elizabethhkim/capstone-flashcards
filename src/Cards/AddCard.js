import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api";


export default function AddCard() {
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});


  useEffect(() => {
    const abortCon = new AbortController();
    async function getDeck() {
      try {
        if (deckId) {
          const gotDeck = await readDeck(deckId, abortCon.signal);
          setCurrentDeck({ ...gotDeck });
        }
      } catch (err) {throw err}
    }
    getDeck();
    return () => abortCon.abort();
  }, [deckId]);


  return (
    <>
      <div className="d-flex">
        <NavBar
          linkName={currentDeck.name}
          link={`decks/${currentDeck.id}`}
          pageName={"Add Card"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>{currentDeck.name}: Add Card</h2>
        <CardForm />
      </div>
    </>
  );
}
