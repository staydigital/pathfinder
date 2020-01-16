import { cellStateEntityAdapter, State } from './store.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const cellStateFeatureSelector = createFeatureSelector<State>(
  'pathfinder'
);

export const selectGridReady = state => {
  return state.pathfinder.gridReady;
};

export const selectMode = state => {
  return state.pathfinder.mode;
};

export const selectLog = state => {
  return state.pathfinder.log;
};

export const selectStart = state => {
  return state.pathfinder.start;
};

export const selectEnd = state => {
  return state.pathfinder.end;
};

const { selectEntities } = cellStateEntityAdapter.getSelectors();

const getCellStateForFeature = createSelector(
  cellStateFeatureSelector,
  selectEntities
);

export const getAllEntities = getCellStateForFeature;

export const getCellStateWithId = createSelector(
  getCellStateForFeature,
  (cellStates, props) => {
    return cellStates[props.id];
  }
);

// Here goes AStar stuff
export const selectAStarStarted = state => {
  return state.pathfinder.a_star_started;
};

export const selectAStartUnknownList = state => {
  return state.pathfinder.a_star_unknown_list;
};

export const selectAStarKnownList = state => {
  return state.pathfinder.a_star_known_list;
};

export const selectAStarClosedList = state => {
  return state.pathfinder.a_star_closed_list;
};
