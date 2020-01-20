import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { CellState, CellMode } from './CellState'

export interface State extends EntityState<CellState> {
  gridReady: boolean
  mode: CellMode
  log: string[]
  gridWidth: number
  gridHeight: number
  start: string
  end: string
  a_star_started: boolean
  a_star_unknown_list: string[]
  a_star_known_list: string[]
  a_star_closed_list: string[]
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
  gridHeight: 20,
  start: '',
  end: '',
  a_star_started: false,
  a_star_unknown_list: [],
  a_star_known_list: [],
  a_star_closed_list: []
})
