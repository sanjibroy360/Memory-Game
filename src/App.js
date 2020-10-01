import React, { Component } from "react";
import Card from "./component/Card";
import { allCards } from "./utils/data";
import has from "lodash";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flippedCards: [],
      cards: [],
      score: 0,
    };
  }

  handleFlip = (cardId, index) => {
    let { cards, flippedCards } = this.state;
    cards = cards.map((card) => {
      if (card.cardId === cardId) {
        card.isFlipped = true;
      }
      return card;
    });
    this.setState({ cards, flippedCards: [...flippedCards, cardId] });
  };

  componentDidUpdate() {
    let { flippedCards, cards, score } = this.state;
    let card1Index = cards.findIndex((card) => card.cardId === flippedCards[0]);
    let card2Index = cards.findIndex((card) => card.cardId === flippedCards[1]);

    if (flippedCards.length === 2) {
      if (cards[card1Index].iconId === cards[card2Index].iconId) {
        cards[card1Index].isMatched = true;
        cards[card2Index].isMatched = true;
        cards = this.hideAllCards(cards);
        score++;
        return this.setState({
          cards,
          score,
          flippedCards: [],
        });
      } else {
        cards = this.hideAllCards(cards);
        return setTimeout(
          () =>
            this.setState({
              cards,
              score,
              flippedCards: [],
            }),
          425
        );
      }
    }
  }

  componentDidMount() {
    let cards = has.cloneDeep(allCards);
    let shuffeledCards = this.shuffleCards(cards);
    this.setState({ cards: shuffeledCards });
  }

  hideAllCards = (cards) => {
    return cards.map((card) => ({ ...card, isFlipped: false }));
  };

  restartGame = () => {
    let cards = has.cloneDeep(allCards);
    let shuffeledCards = this.shuffleCards(cards);
    this.setState({ cards: shuffeledCards, flippedCards: [], score: 0 });
  };

  shuffleCards = (cards) => {
    for (let i = 0; i < cards.length; i++) {
      let randomIndex = Math.floor(Math.random() * i);
      [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
    }
    return cards;
  };

  render() {
    let { cards, flippedCards, score } = this.state;
    return (
      <div className="container">
        <h1 className="title">Memory Game</h1>
        <div className="score_board">
          <p>Score : {score > 1 ? score + " points" : score + " point"}</p>
          <button className="restart_btn" onClick={this.restartGame}>
            <i className="fas fa-redo-alt" /> Restart
          </button>
        </div>
        <ul className="card_container">
          {cards.map((card, index) => {
            return (
              <li className="card" key={"card" + card.cardId}>
                <Card
                  cardInfo={card}
                  handleFlip={this.handleFlip}
                  index={index}
                  noOfFlippedCards={flippedCards.length}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
