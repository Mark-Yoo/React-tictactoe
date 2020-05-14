import React, { useState } from "react";
import "../components/TicCell.css";

function TicCell() {
  const plate = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const bingoLists = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 8],
  ];
  const numOfplayer = {
    playerSelect: {
      player1: "O",
      player2: "X",
    },
  };

  const [player, setPlayer] = useState(numOfplayer.playerSelect.player1);
  const [P1bingolist, setP1Bingolist] = useState([...bingoLists]);
  const [P2bingolist, setP2Bingolist] = useState([...bingoLists]);
  const [P1CheckedNum, setP1Checked] = useState([]);

  const resetCell = (e) => {
    const everyCell = [...e.target.parentNode.firstChild.children];
    everyCell.map((cell) =>
      cell.firstChild !== null ? cell.firstChild.remove() : ""
    );
    setP1Bingolist([]);
    setP2Bingolist([]);
  };

  const mySpot = (e) => {
    plate.forEach((idNum) => {
      if (+e.target.id === idNum) {
        if (e.target.firstChild !== null) return;
        // setP1Checked([...P1CheckedNum, +e.target.id].sort((a, b) => a - b));
        // eslint-disable-next-line no-unused-expressions
        if (player === numOfplayer.playerSelect.player1) {
          setP1Bingolist(
            [...bingoLists].filter((list) => list.includes(+e.target.id))
          );
        } else {
          setP2Bingolist([...P2bingolist, +e.target.id].sort((a, b) => a - b));
        }

        console.log(P1bingolist);
        e.target.append(player);
        setPlayer(
          player === numOfplayer.playerSelect.player1
            ? numOfplayer.playerSelect.player2
            : numOfplayer.playerSelect.player1
        );
      }
    });
  };

  return (
    <>
      <div className="container">
        {plate.map((cellNum) => {
          return (
            <div
              key={cellNum}
              id={cellNum}
              className="cell"
              onClick={mySpot}
            ></div>
          );
        })}
      </div>
      <button onClick={resetCell}>Reset</button>
    </>
  );
}

export default TicCell;
