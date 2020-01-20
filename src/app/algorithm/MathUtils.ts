export interface Point {
  x: number
  y: number
}
export abstract class MathUtils {
  static getXY (id: string): Point {
    let coordinates = id.split('_')
    return {
      x: parseInt(coordinates[1], 10),
      y: parseInt(coordinates[0], 10)
    }
  }

  static determineDistance (
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ): number {
    return Math.round(
      Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) * 10
    )
  }
}
