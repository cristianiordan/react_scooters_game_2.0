import React, { useState, useEffect } from "react";

export const ScootersContext = React.createContext({
  scooters: [],
  lastId: 10,
  choseGame: () => {},
  chargeScooter: (id) => {},
  dischargeScooter: () => {},
  addScooter: () => {},
  startGame: () => {},
  stopGame: () => {},
  changeGameType: () => {},
  stoppedGameType: "mixed",
  gameType: "mixed",
  gameIsChosen: false,
  gameIsStopped: false,
  gameIsLosed: false,
});
const randomPercentage = () => (Math.floor(Math.random() * 10) + 1) * 10;
const randomColor = () => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  if (randomNumber === 1) {
    return "red";
  } else if (randomNumber === 2) {
    return "green";
  } else {
    return "blue";
  }
};
const generateRandomInteger = (max) => {
  return Math.floor(Math.random() * max) + 1;
};
export default (props) => {
  const [scootersList, setScootersList] = useState([
    {
      id: 0,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 1,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 2,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 3,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 4,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 5,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 6,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 7,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 8,
      color: randomColor(),
      percentage: randomPercentage(),
    },
    {
      id: 9,
      color: randomColor(),
      percentage: randomPercentage(),
    },
  ]);

  const [lastId, setLastId] = useState(10);

  const [gameIsChosen, setGameIsChosen] = useState(false);

  const [gameIsStopped, setGameIsStopped] = useState(false);

  const [gameIsLosed, setGameIsLosed] = useState(false);

  const [gameType, setGameType] = useState("mixed");

  const [stoppedGameType, setStoppedGameType] = useState("mixed");

  const changeGameType = () => {
    setGameType((prevGameType) =>
      prevGameType === "mixed" ? "by color" : "mixed"
    );
  };

  const choseGame = () => {
    setGameIsChosen(true);
  };

  const stopGame = () => {
    setGameIsStopped(true);
    setStoppedGameType(gameType);
  };

  const startGame = () => {
    setScootersList([
      {
        id: 1,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 2,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 3,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 4,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 5,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 6,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 7,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 8,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 9,
        color: randomColor(),
        percentage: randomPercentage(),
      },
      {
        id: 10,
        color: randomColor(),
        percentage: randomPercentage(),
      },
    ]);
    setGameIsStopped(false);
    setGameIsLosed(false);
    setGameIsChosen(true);
  };

  const chargeScooter = (scooterId) => {
    setScootersList((currentScooterList) => {
      const scooterIndex = currentScooterList.findIndex(
        (s) => s.id === scooterId
      );
      const updatedScooters = [...currentScooterList];
      updatedScooters[scooterIndex] = {
        ...currentScooterList[scooterIndex],
        percentage: 100,
      };
      return updatedScooters;
    });
  };

  const dischargeScooter = () => {
    setScootersList((currentScooterList) => {
      const copyCurrentScooterList = [...currentScooterList];
      const percentageScooterList = copyCurrentScooterList.map((scooter) => {
        const newPercentage = scooter.percentage - 10;
        return {
          ...scooter,
          percentage: newPercentage,
        };
      });
      const updatedScooters = percentageScooterList.filter(
        (scooter) => scooter.percentage > 0
      );
      if (updatedScooters.length === 0) {
        setGameIsLosed(true);
      }

      return updatedScooters.sort(() => Math.random() - 0.5);
    });
  };

  const addScooter = () => {
    setScootersList((currentScooterList) => {
      const updatedScooterList = [...currentScooterList];
      updatedScooterList.splice(generateRandomInteger(lastId + 1), 0, {
        id: lastId + 1,
        color: randomColor(),
        percentage: randomPercentage(),
      });
      setLastId(lastId + 1);
      return updatedScooterList;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dischargeScooter();
    }, 1000);

    if (gameIsStopped || gameIsLosed || !gameIsChosen) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameIsStopped, gameIsLosed, gameIsChosen]);

  return (
    <ScootersContext.Provider
      value={{
        scooters: scootersList,
        lastId: lastId,
        choseGame: choseGame,
        changeGameType: changeGameType,
        chargeScooter: chargeScooter,
        dischargeScooter: dischargeScooter,
        addScooter: addScooter,
        startGame: startGame,
        stopGame: stopGame,
        stoppedGameType: stoppedGameType,
        gameType: gameType,
        gameIsChosen: gameIsChosen,
        gameIsStopped: gameIsStopped,
        gameIsLosed: gameIsLosed,
      }}
    >
      {props.children}
    </ScootersContext.Provider>
  );
};
