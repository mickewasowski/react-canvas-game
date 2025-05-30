export type Circle = {
  x: number;
  y: number;
  r: number;
  color: string;
};

export enum CircleType {
  FILL,
  STROKE,
}

export enum RectangleType {
  FILL,
  STROKE,
}

export type Rectangle = {
  x: number;
  y: number;
  a: number;
  b: number;
  color: string;
};
