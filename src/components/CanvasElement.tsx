
import {useRef, useEffect} from 'react';

interface IPlayer {
  color: string;
  initialRadius: number;
}

interface IItem {
  color: string;
  diameter: number;
  playerRadiusIncrement: number;
  playerSpeedIncrement: number;
}

interface IProps {
  player: IPlayer;
  items: IItem[];
}

const CanvasElement = ({player, items}: IProps) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
      if (canvasRef && canvas) {
          const context = canvas.getContext('2d');
          // TODO: draw the game board
          // draw the player in the bottom right corner
          // draw the items
          // write 'click w a s d to start the game'
          // start the timer
          // end the timer once the player collects all the items
          // show start a new game button
      }
  }, []);

  return (
    <canvas ref={canvasRef} />
  );
};

export default CanvasElement;
