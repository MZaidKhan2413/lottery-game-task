import { useState } from "react";
import Grid from "./Grid";
import axios from "axios";
import Popup from "./Popup";
import { host_URL } from "../utils/APIroutes";
import "./Home.css"


const validateGrid = (grid) => {
  const number = new Set();
  let validate = true;

  grid.flat().forEach((cell) => {
    const num = parseInt(cell, 10);
    if (num >= 1 && num <= 9) {
      if (number.has(num)) validate = false;
      number.add(num);
    } else if (cell !== "") {
      validate = false;
    }
  });

  return validate && number.size === 9;
};

const Home = () => {
  const [user1Grid, setUser1Grid] = useState(Array(3).fill(Array(3).fill("")));
  const [user2Grid, setUser2Grid] = useState(Array(3).fill(Array(3).fill("")));
  const [gameId, setGameId] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  const handleGridChange = (setGrid, rowIndex, colIndex, value) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, rIndex) =>
        row.map((col, cIndex) =>
          rIndex === rowIndex && cIndex === colIndex ? value : col
        )
      );
      return newGrid;
    });
  };

  const startGame = async () => {
    if (!validateGrid(user1Grid) || !validateGrid(user2Grid)) {
      alert("Each grid must constain uniqe number");
      return;
    }

    try {
      const { data } = await axios.post(`${host_URL}/api/game`, {
        user1Grid,
        user2Grid,
      });
      setGameId(data._id);
      generateRandomNumber(data._id);
    } catch (e) {
      console.error(e);
    }
  };

  const generateRandomNumber = (id) => {
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    const interval = setInterval(async () => {
      if (numbers.length === 0) {
        clearInterval(interval);
        return;
      }
      const number = numbers.splice(
        Math.floor(Math.random() * numbers.length),
        1
      )[0];
      try {
        await axios.put(`${host_URL}/api/game/${id}`, {
          user: "user1",
          number,
        });
        await axios.put(`${host_URL}/api/game/${id}`, {
          user: "user2",
          number,
        });
        const { data } = await axios.get(
          `${host_URL}/api/game/${id}/check-winner`
        );
        if (data.winner) {
          setPopupMessage(`${data.winner} wins!`);
          setGameId(null);
          clearInterval(interval);
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);
  };

  const handlePopupClose = () => {
    setPopupMessage(null);
  };

  return (
    <div className="home-page">
      <div className="game-grid-container">
        <div>
          <h2 className="user">User 1 grid</h2>
          <Grid
            grid={user1Grid}
            onChange={(r, c, v) => handleGridChange(setUser1Grid, r, c, v)}
          />
        </div>
        <div>
          <h2 className="user">User 2 grid</h2>
          <Grid
            grid={user2Grid}
            onChange={(r, c, v) => handleGridChange(setUser2Grid, r, c, v)}
          />
        </div>
      </div>
      <button onClick={startGame} disabled={gameId || popupMessage}>
        Start Game
      </button>
      <Popup message={popupMessage} onClose={handlePopupClose} />
    </div>
  );
};

export default Home;
