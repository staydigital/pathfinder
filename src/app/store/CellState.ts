export enum CellMode {
  CELL = 'cell',
  BLOCK = 'block',
  START = 'start',
  END = 'end',
  FINISH = 'finish'
}

export class CellState {
  x: number
  y: number
  hcost: number
  gcost: number
  totalCost: number
  mode: CellMode
  precessor: string
}
