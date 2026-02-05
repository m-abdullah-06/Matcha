import React from "react";

const WinMessage = ({ moves, time }) => {
  return (
    <div className="win-message">
      <h2>
        🎉 You Matched Everything! <br></br> 🏆 Perfect Memory!
      </h2>
      <p>
        You won in {moves} moves in {time} seconds!
      </p>
    </div>
  );
};

export default WinMessage;
