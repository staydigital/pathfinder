import { createReducer, on, Action } from '@ngrx/store'
import {
  initGrid,
  setModeCell,
  setModeBlock,
  setModeStart,
  setModeEnd,
  clickCell
} from './store.actions'
import { CellMode, CellState } from './cellstate'
import { initialState, cellStateEntityAdapter, State } from './store.state'
import { getCellStateWithId } from './store.selectors'
import { Update } from '@ngrx/entity'

const pathfinderReducer = createReducer(
  initialState,
  on(initGrid, (state, { cellStates }) => {
    let stateAfterInit = cellStateEntityAdapter.addMany(cellStates, state)
    return { ...stateAfterInit, gridReady: true }
  }),
  on(setModeCell, state => ({
    ...state,
    mode: CellMode.CELL,
    log: [...state.log, 'setModeCell']
  })),
  on(setModeBlock, state => ({
    ...state,
    mode: CellMode.BLOCK,
    log: [...state.log, 'setModeBlock']
  })),
  on(setModeStart, state => ({
    ...state,
    mode: CellMode.START,
    log: [...state.log, 'setModeStart']
  })),
  on(setModeEnd, state => ({
    ...state,
    mode: CellMode.END,
    log: [...state.log, 'setModeEnd']
  })),
  on(clickCell, (state, { row, column }) => {
    const cellUpdate: Update<CellState> = {
      id: row + '_' + column,
      changes: { mode: CellMode.BLOCK }
    }
    return cellStateEntityAdapter.updateOne(cellUpdate, state)
  })
)

export function reducer (state: State | undefined, action: Action) {
  return pathfinderReducer(state, action)
}
