import "./App.css";
import CanvasElement from "./components/CanvasElement";
import { useRef, useEffect } from "react";
import { type Circle, CircleType } from "./types/CanvasTypes";
import { drawCircle } from "./utilities/CanvasUtils";

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
    {
      color: "rgb(0, 0, 160)",
      radius: 50,
      playerRadiusIncrement: 8,
      playerSpeedIncrement: 8,
    },
    {
      color: "rgb(0, 0, 180)",
      radius: 3,
      playerRadiusIncrement: 1,
      playerSpeedIncrement: 1,
    },
    {
      color: "rgb(0, 0, 200)",
      radius: 15,
      playerRadiusIncrement: 6,
      playerSpeedIncrement: 2,
    },
    {
      color: "rgb(0, 0, 250)",
      radius: 30,
      playerRadiusIncrement: 5,
      playerSpeedIncrement: 3,
    },
  ];
  {
    /* <> */
  }
  {
    /*   <CanvasElement player={player} items={items} /> */
  }
  {
    /* </> */
  }

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const circle: Circle = {
        x: 590,
        y: 590,
        r: 10,
        color: "rgb(0,255,255)",
      };

      const drawCanvas = () => {
        const context2d = canvas.getContext("2d");
        context2d.fillStyle = "rgb(0,0,0)"; //research why optional chaining asign is not working context2d?.fillStyle
        context2d.fillRect(0, 0, 600, 600);

        drawCircle(context2d, CircleType.FILL, circle);
      };
      // drawCanvas();

      const moveCircle = () => {
        if (circle.x - 0.3 < 0) {
          circle.x = 590;
        } else {
          circle.x -= 0.3;
        }

        if (circle.y + 1 > 600) {
          circle.y = 0;
        } else {
          circle.y += 1;
        }

        drawCanvas();

      };

      // moveCircle();
       setInterval(() => {
         moveCircle();
       }, 1000 / 180);
    }
  }, []);
  return <canvas ref={ref} width={600} height={600} />;
}

export default App;
