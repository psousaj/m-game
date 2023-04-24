export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 10,
      height: 10,
    },
  };

  function setState(NewState) {
    Object.assign(state, NewState);
  }

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX =
      "playerX" in command
        ? command.playerX
        : Math.floor(Math.random() * state.screen.width);
    const playerY =
      "playerY" in command
        ? command.playerY
        : Math.floor(Math.random() * state.screen.width);

    state.players[playerId] = {
      x: playerX,
      y: playerY,
    };
  }

  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];
  }

  function addFruit(command) {
    const fruitId = command.fruitId;
    const fruitX = command.fruitX;
    const fruitY = command.fruitY;

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
    };
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
  }

  function movePlayer(command) {
    const acceptedMoves = {
      ArrowUp(player) {
        player.y = Math.max(player.y - 1, 0);
      },
      ArrowDown(player) {
        if (player.y + 1 < state.screen.height) {
          player.y += 1;
        }
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0) {
          player.x -= 1;
        }
      },
      ArrowRight(player) {
        player.x = Math.min(player.x + 1, state.screen.width - 1);
      },
    };

    const keyPressed = command.keyPressed;
    const playerId = command.playerId;
    const player = state.players[playerId];
    const moveFunction = acceptedMoves[keyPressed];

    if (player && moveFunction) {
      moveFunction(player);
      checkForCollision(playerId);
    }

    function checkForCollision(playerId) {
      const player = state.players[playerId];
      for (const fruitId in state.fruits) {
        const fruit = state.fruits[fruitId];

        console.log(`Checking ${playerId} and ${fruitId}`);
        if (player.x === fruit.x && player.y === fruit.y) {
          console.log(`Collision between ${playerId} and ${fruitId}`);
          removeFruit({ fruitId });
        }
      }
    }
    // console.log(`Moving ${command.playerId} with ${command.keyPressed}`)
  }

  return {
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    movePlayer,
    state,
    setState,
  };
}
