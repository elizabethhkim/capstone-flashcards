import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import NavBar from "../Layout/NavBar";
import CardList from "../Cards/CardList";


export default function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
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

  async function handleDelete(id) {
    try {
      const result = window.confirm(
        "Delete this deck?\n\n\nYou will not be able to recover it."
      );
      if (result) {
        const abortCon = new AbortController();
        await deleteDeck(id, abortCon.signal);
        history.push("/");
      }
    } catch (err) {throw err}
  }


  return (
    <>
      <NavBar pageName={deck.name} />
      {!deck.id ? (
        <>
          <h2>Loading deck...</h2>
        </>
      ) : (
        <>
          <div className="d-flex flex-column">
            <div className="d-flex flex-column">
              <h2>{deck.name}</h2>
              <p>{deck.description}</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="flex-item">
                <Link
                  className="btn btn-secondary mr-2"
                  to={`/decks/${deck.id}/edit`}
                >
                  <i className="fa-solid fa-pencil"></i> Edit
                </Link>
                <Link
                  className="btn btn-primary  mr-2"
                  to={`/decks/${deck.id}/study`}
                >
                  <i className="fa-solid fa-book mr-1"></i> Study
                </Link>
                <Link className="btn btn-primary" to={`${url}/cards/new`}>
                  <i className="fa-solid fa-plus"></i> Add Cards
                </Link>
              </div>
              <div className="flex-item">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDelete(deck.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mt-4">
            <h2>Cards</h2>
            <CardList cards={deck.cards} />
          </div>
        </>
      )}
    </>
  );
}
