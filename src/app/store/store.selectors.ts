import { cellStateEntityAdapter, State } from './store.state'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const cellStateFeatureSelector = createFeatureSelector<State>(
  'pathfinder'
)

export const selectGridReady = state => {
  return state.pathfinder.gridReady
}

export const selectMode = state => {
  return state.pathfinder.mode
}

export const selectLog = state => {
  return state.pathfinder.log
}

const { selectEntities } = cellStateEntityAdapter.getSelectors()

const getCellStateForFeature = createSelector(
  cellStateFeatureSelector,
  selectEntities
)

export const getCellStateWithId = createSelector(
  getCellStateForFeature,
  (cellStates, props) => {
    return cellStates[props.id]
  }
)
