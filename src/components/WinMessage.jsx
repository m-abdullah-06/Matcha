import React from "react";

const WinMessage = ({ moves }) => {
  return (
    <div className="win-message">
      <h2>Congrats</h2>
      <p>You won in {moves} moves</p>
    </div>
  );
};

export default WinMessage;
