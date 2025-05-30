import {
  CircleType,
  type Circle,
  type Rectangle,
  RectangleType,
} from "../types/CanvasTypes.ts";

export function drawCircle(
  context: CanvasRenderingContext2D,
  circleType: CircleType,
  circle: Circle,
): void {
  context.beginPath();
  context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
  switch (circleType) {
    case CircleType.FILL:
      context.fillStyle = circle.color;
      context.fill();
      break;
    case CircleType.STROKE:
      context.strokeStyle = circle.color;
      context.stroke();
      break;
  }
  context.closePath();
}

export function drawRectangle(
  context: CanvasRenderingContext2D,
  rectangle: Rectangle,
  rectangleType: RectangleType,
): void {
  switch (rectangleType) {
    case RectangleType.FILL:
      context.fillStyle = rectangle.color;
      context.fillRect(rectangle.x, rectangle.y, rectangle.a, rectangle.b);
      break;
    case RectangleType.STROKE:
      context.strokeStyle = rectangle.color;
      context.strokeRect(rectangle.x, rectangle.y, rectangle.a, rectangle.b);
      break;
  }
}

export function detectCircleCollisionOfTwoCircles(
  circle1: Circle,
  circle2: Circle,
): boolean {
  const distanceX = circle1.x - circle2.x;
  const distanceY = circle1.y - circle2.y;
  const distanceSquaredSum = distanceX * distanceX + distanceY * distanceY;
  const radiiSum = circle1.r + circle2.r;
  const radiiSumSquared = radiiSum * radiiSum;

  return distanceSquaredSum <= radiiSumSquared;
}
