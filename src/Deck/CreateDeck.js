import React from "react";
import NavBar from "../Layout/NavBar";
import DeckForm from "./DeckForm";

export default function CreateDeck() {

  return (
    <>
      <div className="d-flex">
        <NavBar pageName="Create Deck" />
      </div>
      <div className="d-flex flex-column">
        <h2>Create Deck</h2>
        <DeckForm mode="create" />
      </div>
    </>
  );
}
