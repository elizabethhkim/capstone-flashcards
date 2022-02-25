import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readCard, updateCard } from "../utils/api";

export default function CardForm({ mode = "create" }) {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const initialFormData = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  useEffect(() => {
    const abortCon = new AbortController();
    async function getEditCard() {
      try {
        const cardToEdit = await readCard(cardId, abortCon.signal);
        setFormData({ ...cardToEdit });
      } catch (err) {throw err}
    }
    if (mode === "edit") {
      getEditCard();
    }
    return () => abortCon.abort();
  }, [cardId, mode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortCon = new AbortController();
    async function addCard() {
      try {
        await createCard(deckId, formData, abortCon.signal);
        setFormData({ ...initialFormData });
      } catch (err) {throw err}
    }
    async function editCard() {
      try {
        await updateCard(formData, abortCon.signal);
        history.push(`/decks/${deckId}`);
      } catch (err) {throw err}
    }
    mode === "edit" ? editCard() : addCard();
  };


  return (
    <div className="d-flex flex-column">
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            placeholder="Front side of card"
          />
        </div>
        <div className="row form-group">
          <label htmlFor="back">Back</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            placeholder="Back side of card"
          />
        </div>
        <div className="row">
          <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
            {mode === "edit" ? "Cancel" : "Done"}
          </Link>
          <button type="submit" className="btn btn-primary">
            {mode === "edit" ? "Submit" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
