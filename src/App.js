import React, { Component } from "react";
import Card from "./component/Card";
import { allCards } from "./utils/data";
import _ from "lodash";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flippedCards: [],
      cards: [],
      score: 0,
    };
    this.timeoutId = 0;
  }

  componentDidUpdate() {
    let { flippedCards, cards, score } = this.state;
    let card1Index = flippedCards[0];
    let card2Index = flippedCards[1];

    if (flippedCards.length === 2) {
      if (cards[card1Index].iconId === cards[card2Index].iconId) {
        cards[card1Index].isMatched = true;
        cards[card2Index].isMatched = true;
        score++;
        return this.setState({
          cards,
          score,
          flippedCards: [],
        });
      } else {
        cards[card1Index].isFlipped = false;
        cards[card2Index].isFlipped = false;
        this.timeoutId = setTimeout(
          () => {
            this.setState({
              cards,
              score,
              flippedCards: [],
            })
            return this.clearTimer();
          }, 
          1000  
        );
        
      }
    }
  }

  clearTimer = () => {
    clearTimeout(this.timeoutId)
  }

  componentDidMount() {
    let cards = _.cloneDeep(allCards);
    let shuffeledCards = this.shuffleCards(cards);
    return this.setState({ cards: shuffeledCards });
  }

  handleFlip = (index) => {
    let { cards, flippedCards } = this.state;
    if (flippedCards.length < 2) {
      cards[index].isFlipped = true;
      return this.setState({ cards, flippedCards: [...flippedCards, index] });
    }
  };

  restartGame = () => {
    let cards = _.cloneDeep(allCards);
    let shuffeledCards = this.shuffleCards(cards);
    return this.setState({ cards: shuffeledCards, flippedCards: [], score: 0 });
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
