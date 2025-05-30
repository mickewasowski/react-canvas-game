import {CircleType, Circle, Rectangle, RectangleType} from './types/CanvasTypes.ts';

export function drawCircle(
  context: CanvasRenderingContext2D,
  circleX: number,
  circleY: number,
  circleRadius: number,
  circleType: CircleType,
  circleColor: string,
): void {
  context.beginPath();
  context.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
  switch (circleType) {
    case CircleType.FILL:
      context.fillStyle = circleColor;
      context.fill();
      break;
    case CircleType.STROKE:
      context.strokeStyle = circleColor;
      context.stroke();
      break;
  }
};

export function drawRectangle(rectangle: Rectangle, rectangleType: RectangleType) {
  context.beginPath();
}

export function detectCircleCollisionOfTwoCircles(circle1: Circle, circle2: Circle): boolean {
  const {x1, y1, r1} = circle1;
  const {x2, y2, r2} = circle2;

  const distanceX = x1 - x2;
  const distanceY = y1 - y2;
  const distanceSquaredSum = distanceX * distanceX + distanceY * distanceY;
  const radiiSum = r1 + r2;
  const radiiSumSquared = radiiSum * radiiSum;

  return distanceSquaredSum <= radiiSumSquared;
};

