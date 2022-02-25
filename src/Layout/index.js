import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "../Deck/CreateDeck";
import Home from "../Home/Home";
import Study from "../Deck/Study";
import ViewDeck from "../Deck/ViewDeck";
import EditDeck from "../Deck/EditDeck";
import EditCard from "../Cards/EditCard";
import AddCard from "../Cards/AddCard";

function Layout() {

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <ViewDeck />
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route exact path={"/decks/:deckId/cards/new"}>
            <AddCard />
          </Route>
          <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
