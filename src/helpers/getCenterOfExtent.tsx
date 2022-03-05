import { Coordinate } from "ol/coordinate";

export function getCenterOfExtent(Extent: number[]): Coordinate {
  let X: number = Extent[0] + (Extent[2]-Extent[0])/2;
  let Y: number = Extent[1] + (Extent[3]-Extent[1])/2;
  return [X, Y];
}