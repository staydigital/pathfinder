export enum CellMode {
  CELL = 'cell',
  BLOCK = 'block',
  START = 'start',
  END = 'end'
}

export class CellState {
  x: number
  y: number
  mode: CellMode
}
