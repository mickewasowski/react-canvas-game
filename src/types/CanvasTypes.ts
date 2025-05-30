export type Circle = {
  x: number;
  y: number;
  r: number;
}

export enum CircleType {
  FILL = 'FILL',
  STROKE = 'STROKE',
}

export enum RectangleType {
  FILL = 'FILL',
  STROKE = 'STROKE',
}

export type Rectangle = {
  x: number;
  y: number;
  a: number;
  b: number;
  color?: string;
}
