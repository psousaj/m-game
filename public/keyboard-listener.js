export default function createKeyboardListener(document) {
  const currentPlayer = "player1";
  window.addEventListener("keydown", handleKeyDown);

  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  function handleKeyDown(event) {
    const keyPressed = event.key;

    const command = {
      playerId: currentPlayer,
      keyPressed,
    };

    notifyAll(command);
  }

  return { subscribe };
}
