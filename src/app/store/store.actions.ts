import { createAction, props } from '@ngrx/store'
import { CellState } from './cellstate'

export const initGrid = createAction(
  '[Pathfinder] initGrid',
  props<{ cellStates: CellState[] }>()
)
export const clickCell = createAction(
  '[Pathfinder] clickCell',
  props<{ row: number; column: number }>()
)
export const setModeCell = createAction('[Pathfinder] SetModeCell')
export const setModeBlock = createAction('[Pathfinder] SetModeBlock')
export const setModeStart = createAction('[Pathfinder] SetModeStart')
export const setModeEnd = createAction('[Pathfinder] SetModeEnd')
