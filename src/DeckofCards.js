import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

class DeckofCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deckId: "",
      remaining: 0,
      drawnCards: [],
    };

    this.drawCard = this.drawCard.bind(this);
  }

  async componentDidMount() {
    let deckId = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/"
    );
    this.setState({
      deckId: deckId.data.deck_id,
      remaining: deckId.data.remaining,
    });
  }

  async drawCard() {
    let card = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/`
    );
    const drawnCards = [
      ...this.state.drawnCards,
      [card.data.cards[0].code, card.data.cards[0].image],
    ];
    this.setState((prevState) => ({
      drawnCards: drawnCards,
      remaining: prevState.remaining - 1,
    }));
  }

  render() {
    const cards = this.state.drawnCards.map((card) => {
      return <Card key={card[0]} srcImg={card[1]} altText={card[0]} />;
    });

    const buttonRender =
      this.state.remaining === 0 ? (
        "No More Cards"
      ) : (
        <button onClick={this.drawCard}>Draw Card</button>
      );

    return (
      <div>
        {buttonRender}
        {cards}
      </div>
    );
  }
}

export default DeckofCards;
