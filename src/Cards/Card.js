import React from "react";

export default function Card({ card, count, index, flipped, flip, next }) {
  const nextButton = (
    <button type="button" className="btn btn-primary" onClick={next}>
      Next
    </button>
  );
  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">
            Card {index} of {count}
          </h4>
          <p className="card-text">{!flipped ? card.front : card.back}</p>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={flip}
          >
            Flip
          </button>
          {flipped && nextButton}
        </div>
      </div>
    </>
  );
}
