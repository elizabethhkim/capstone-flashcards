import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckList from "../Deck/DeckList";
import { listDecks } from "../utils/api";

export default function Home() {
  const [decks, setDecks] = useState([]);


  useEffect(() => {
    const abortCon = new AbortController();

    async function loadDecks() {
      try {
        const loadedDecks = await listDecks();
        setDecks([...loadedDecks]);
      } catch (err) {throw err}
    }
    loadDecks();
    return abortCon.abort();
  }, []);


  return (
    <div className="d-flex flex-column">
      <div className="mb-2">
        <Link className="btn btn-secondary" to="/decks/new">
          <i className="fa-solid fa-plus"></i> Create Deck
        </Link>
      </div>

      <div>
        <DeckList decks={decks} />
      </div>
    </div>
  );
}
