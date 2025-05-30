import "./App.css";
import CanvasElement from "./components/CanvasElement";

function App() {
  const player = {
    color: "rgb(255, 0, 0)",
    initialRadius: 20,
  };
  const items = [
    {
      color: "rgb(0, 0, 100)",
      radius: 10,
      playerRadiusIncrement: 2,
      playerSpeedIncrement: 1,
    },
    {
      color: "rgb(0, 0, 150)",
      radius: 20,
      playerRadiusIncrement: 5,
      playerSpeedIncrement: 2,
    },
  ];

  return (
    <>
      <CanvasElement player={player} items={items} />
    </>
  );
}

export default App;
