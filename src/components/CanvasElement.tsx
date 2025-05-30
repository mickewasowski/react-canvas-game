import { useRef, useEffect } from "react";
import { drawCircle, drawRectangle } from "../utilities/CanvasUtils";
import { CircleType, RectangleType } from "../types/CanvasTypes";

interface IPlayer {
  color: string;
  initialRadius: number;
}

interface IItem {
  color: string;
  radius: number;
  playerRadiusIncrement: number;
  playerSpeedIncrement: number;
}

interface IProps {
  player: IPlayer;
  items: IItem[];
}
const CanvasElement = ({ player, items }: IProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let context: CanvasRenderingContext2D | null = null;
  let playerX = 500;
  let playerY = 500;

  const renderGame = () => {
    drawRectangle(
      context!,
      { x: 0, y: 0, a: 600, b: 600, color: "#00808057" },
      RectangleType.FILL,
    );

    // draw the items
    items.forEach((x) => {
      const itemX = Number(Math.random() * 380) + 50 + x.radius;
      const itemY = Number(Math.random() * 255) + 50 + x.radius;
      drawCircle(context!, CircleType.FILL, {
        x: itemX,
        y: itemY,
        r: x.radius,
        color: x.color,
      });
    });

    const loop = () => {
      // draw the game board
      drawRectangle(
        context!,
        { x: 50, y: 50, a: 500, b: 500, color: "rgb(100, 100, 0)" },
        RectangleType.STROKE,
      );

      // draw the player in the bottom right corner
      drawCircle(context!, CircleType.FILL, {
        x: playerX,
        y: playerY,
        r: player.initialRadius,
        color: player.color,
      });

      // write 'click w a s d to start the game'
      // start the timer
      // end the timer once the player collects all the items
      // show start a new game button

      requestAnimationFrame(loop);
    };
    loop();
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case "w":
        playerY -= 5;
        break;
      case "a":
        playerX -= 5;
        break;
      case "s":
        playerY += 5;
        break;
      case "d":
        playerX += 5;
        break;
    }

    renderGame();
    // drawRectangle(
    //   context!,
    //   { x: 0, y: 0, a: 600, b: 600, color: "#00808057" },
    //   RectangleType.FILL,
    // );
  };

  useEffect(() => {
    if (canvasRef && canvasRef.current && !context) {
      const canvas = canvasRef.current;
      canvas.width = 600;
      canvas.height = 600;
      context = canvasRef.current.getContext("2d");
    }
    renderGame();

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return <canvas ref={canvasRef} />;
};

export default CanvasElement;
