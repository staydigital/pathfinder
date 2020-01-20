import { createAction, props } from '@ngrx/store'
import { CellState } from './CellState'

export const initGrid = createAction(
  '[Pathfinder] initGrid',
  props<{ cellStates: CellState[] }>()
)
export const clickCell = createAction(
  '[Pathfinder] clickCell',
  props<{ row: number; column: number }>()
)
export const resetCell = createAction(
  '[Pathfinder] resetCell',
  props<{ row: number; column: number }>()
)
export const finishCell = createAction(
  '[Pathfinder] finishCell',
  props<{ id: string }>()
)

export const setModeCell = createAction('[Pathfinder] SetModeCell')
export const setModeBlock = createAction('[Pathfinder] SetModeBlock')
export const setModeStart = createAction('[Pathfinder] SetModeStart')
export const setModeEnd = createAction('[Pathfinder] SetModeEnd')

// Here comes AStar Stuff
export const setAStarStarted = createAction(
  '[Pathfinder AStar] SetAStarStarted'
)
export const setAStarKnownList = createAction(
  '[Pathfinder AStar] SetAStarKnownList',
  props<{ knownList: string[] }>()
)

export const setAStarUnknownList = createAction(
  '[Pathfinder AStar] SetAStarUnknownList',
  props<{ unknownList: string[] }>()
)

export const setAStarClosedList = createAction(
  '[Pathfinder AStar] SetAStarClosedList',
  props<{ closedList: string[] }>()
)

export const setAStarCost = createAction(
  '[Pathfinder AStar] SetAStarCost',
  props<{ id: string; gcost: number; hcost: number }>()
)

export const setAStarPrecessor = createAction(
  '[Pathfinder AStar] SetAStarPrecessor',
  props<{ id: string; precessor: string }>()
)
