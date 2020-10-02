import React from "react";

function Card({ cardInfo, handleFlip, index, noOfFlippedCards }) {
  return (
    <React.Fragment key={cardInfo.iconId}>
      {cardInfo.isFlipped || cardInfo.isMatched ? (
        <div
          className={
            cardInfo.isFlipped &&
            noOfFlippedCards === 2 &&
            !cardInfo.isMatched ? "visible card loose" : "visible card"
          }
        >
          <i className={cardInfo.icon} />
        </div>
      ) : (
        <div className="hidden card" onClick={() => handleFlip(index)}></div>
      )}
    </React.Fragment>
  );
}

export default Card;
