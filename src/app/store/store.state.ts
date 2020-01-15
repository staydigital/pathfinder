import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { CellState, CellMode } from './cellstate'

export interface State extends EntityState<CellState> {
  gridReady: boolean
  mode: CellMode
  log: string[]
  gridWidth: number
  gridHeight: number
}

export function selectCellState (cellState: CellState): string {
  return cellState.x + '_' + cellState.y
}

export const cellStateEntityAdapter: EntityAdapter<CellState> = createEntityAdapter<
  CellState
>({
  selectId: selectCellState,
  sortComparer: false
})

export const initialState: State = cellStateEntityAdapter.getInitialState({
  gridReady: false,
  mode: CellMode.CELL,
  log: ['Initial'],
  gridWidth: 20,
  gridHeight: 20
})
