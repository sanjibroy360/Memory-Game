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

  handleFlip = (index) => {
    let { cards, flippedCards } = this.state;
    cards[index].isFlipped = true;
    this.setState({ cards, flippedCards: [...flippedCards, index] });
  };

  componentDidUpdate() {
    let { flippedCards, cards, score } = this.state;
    let card1 = cards[flippedCards[0]];
    let card2 = cards[flippedCards[1]];
    let blankFlippedCardContainer = [];
    if (flippedCards.length === 2) {
      if (card1.iconId === card2.iconId) {
        cards[flippedCards[0]].isMatched = true;
        cards[flippedCards[1]].isMatched = true;
        score++;
        return this.setState({
          cards,
          score,
          flippedCards: blankFlippedCardContainer,
        });
      } else {
        cards[flippedCards[0]].isFlipped = false;
        cards[flippedCards[1]].isFlipped = false;
        return setTimeout(
          () =>
            this.setState({
              cards,
              score,
              flippedCards: blankFlippedCardContainer,
            }),
          750
        );
      }
    }
  }

  componentDidMount() {
    let cards = has.cloneDeep(allCards);
    let shuffeledCards = this.shuffleCards(cards);
    this.setState({ cards: shuffeledCards });
  }

  restartGame = () => {
    let cards = has.cloneDeep(allCards);
    let shuffeledCards = this.shuffleCards(cards);
    this.setState({ cards: shuffeledCards, flippedCards: [] });
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
              <li className="card" key={"card"+card.cardId}>
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
