import { useRef, useEffect } from "react";
import {
  detectCircleCollisionOfTwoCircles,
  drawCircle,
  drawRectangle,
} from "../utilities/CanvasUtils";
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
  let playerRadius = player.initialRadius;
  let playerSpeed = 1;
  const readyItems = items.map((x) => {
    return {
      r: x.radius,
      color: x.color,
      speedIncremet: x.playerSpeedIncrement,
      radiusIncrement: x.playerRadiusIncrement,
      x: Math.random() * 185 + 100,
      y: Math.random() * 320 + 160,
      isCollected: false,
    };
  });

  const checkPlayerItemsCollision = () => {
    const filteredItems = readyItems.filter((x) => !x.isCollected);
    filteredItems.forEach((item) => {
      const collides = detectCircleCollisionOfTwoCircles(
        {
          x: playerX,
          y: playerY,
          r: playerRadius,
          color: player.color,
        },
        {
          x: item.x,
          y: item.y,
          r: item.r,
          color: item.color,
        },
      );

      if (collides) {
        playerRadius += item.radiusIncrement;
        playerSpeed += item.speedIncremet;
        item.isCollected = true;
        renderGame();
      }
    });
  };

  const renderGame = () => {
    // clear the canvas to preserve the slight transparency
    const canvas = canvasRef.current;
    context!.clearRect(0, 0, canvas!.width, canvas!.height);

    // draw the background with slight transparency for the game board
    drawRectangle(
      context!,
      { x: 0, y: 0, a: 600, b: 600, color: "#00808057" },
      RectangleType.FILL,
    );

    // draw the items
    readyItems
      .filter((x) => !x.isCollected)
      .forEach((x) => {
        drawCircle(context!, CircleType.FILL, {
          x: x.x,
          y: x.y,
          r: x.r,
          color: x.color,
        });
      });

    // draw the player in the bottom right corner
    drawCircle(context!, CircleType.FILL, {
      x: playerX,
      y: playerY,
      r: playerRadius,
      color: player.color,
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
        r: playerRadius,
        color: player.color,
      });

      // implement logic to check if on the current position there are items and if the player collides with them
      checkPlayerItemsCollision();

      requestAnimationFrame(loop);
    };
    loop();
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "w":
        playerY -= 5 + playerSpeed;
        break;
      case "a":
        playerX -= 5 + playerSpeed;
        break;
      case "s":
        playerY += 5 + playerSpeed;
        break;
      case "d":
        playerX += 5 + playerSpeed;
        break;
      default:
        return;
    }

    renderGame();
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
