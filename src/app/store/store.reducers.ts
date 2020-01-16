import { Update } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { CellMode, CellState } from './CellState';
import {
  clickCell,
  initGrid,
  setModeBlock,
  setModeCell,
  setModeEnd,
  setModeStart,
  resetCell,
  setAStarStarted,
  setAStarKnownList,
  setAStarUnknownList,
  setAStarClosedList
} from './store.actions';
import { cellStateEntityAdapter, initialState, State } from './store.state';

const pathfinderReducer = createReducer(
  initialState,
  on(initGrid, (state, { cellStates }) => {
    return onInitGrid(state, cellStates);
  }),
  on(setModeCell, (state, {}) => {
    return onSetModeCell(state);
  }),

  on(setModeBlock, (state, {}) => {
    return onSetModeBlock(state);
  }),
  on(setModeStart, (state, {}) => {
    return onSetModeStart(state);
  }),
  on(setModeEnd, (state, {}) => {
    return onSetModeEnd(state);
  }),
  on(clickCell, (state, { row, column }) => {
    return onClickCell(state, row, column);
  }),
  on(resetCell, (state, { row, column }) => {
    return onResetCell(state, row, column);
  }),
  on(setAStarStarted, (state, {}) => {
    return onSetAStarStarted(state);
  }),
  on(setAStarKnownList, (state, { knownList }) => {
    return onSetAStarKnownList(state, knownList);
  }),
  on(setAStarUnknownList, (state, { unknownList }) => {
    return onSetAStarUnknownList(state, unknownList);
  }),
  on(setAStarClosedList, (state, { closedList }) => {
    return onSetAStarClosedList(state, closedList);
  })
);

function onInitGrid(state: State, cellStates: CellState[]): State {
  let stateAfterInit = cellStateEntityAdapter.addMany(cellStates, state);
  return { ...stateAfterInit, gridReady: true, mode: CellMode.BLOCK };
}

function onSetModeCell(state: State) {
  return {
    ...state,
    mode: CellMode.CELL,
    log: [...state.log, 'setModeCell']
  };
}

function onSetModeBlock(state: State) {
  return {
    ...state,
    mode: CellMode.BLOCK,
    log: [...state.log, 'setModeBlock']
  };
}

function onSetModeStart(state: State) {
  return {
    ...state,
    mode: CellMode.START,
    log: [...state.log, 'setModeStart']
  };
}

function onSetModeEnd(state: State) {
  return {
    ...state,
    mode: CellMode.END,
    log: [...state.log, 'setModeEnd']
  };
}

function onClickCell(state: State, row: number, column: number) {
  let cellUpdate: Update<CellState>;
  if (state.mode === CellMode.START) {
    const resetStart: Update<CellState> = {
      id: state.start,
      changes: { mode: CellMode.CELL }
    };

    const setStart: Update<CellState> = {
      id: row + '_' + column,
      changes: { mode: CellMode.START }
    };
    return cellStateEntityAdapter.updateMany([resetStart, setStart], {
      ...state,
      start: row + '_' + column,
      mode: CellMode.BLOCK
    });
  }

  if (state.mode === CellMode.END) {
    const resetEnd: Update<CellState> = {
      id: state.end,
      changes: { mode: CellMode.CELL }
    };

    const setEnd: Update<CellState> = {
      id: row + '_' + column,
      changes: { mode: CellMode.END }
    };
    return cellStateEntityAdapter.updateMany([resetEnd, setEnd], {
      ...state,
      end: row + '_' + column,
      mode: CellMode.BLOCK
    });
  }

  cellUpdate = {
    id: row + '_' + column,
    changes: { mode: state.mode }
  };
  return cellStateEntityAdapter.updateOne(cellUpdate, state);
}

function onResetCell(state: State, row: number, column: number) {
  const cellUpdate: Update<CellState> = {
    id: row + '_' + column,
    changes: { mode: CellMode.CELL }
  };
  return cellStateEntityAdapter.updateOne(cellUpdate, state);
}

// Here comes a star stuff
function onSetAStarStarted(state: State) {
  return {
    ...state,
    a_star_started: true
  };
}

function onSetAStarKnownList(state: State, knownList: string[]) {
  return {
    ...state,
    a_star_known_list: knownList
  };
}

function onSetAStarUnknownList(state: State, unknownList: string[]) {
  return {
    ...state,
    a_star_unknown_list: unknownList
  };
}

function onSetAStarClosedList(state: State, closedList: string[]) {
  return {
    ...state,
    a_star_closed_list: closedList
  };
}

export function reducer(state: State | undefined, action: Action) {
  return pathfinderReducer(state, action);
}
