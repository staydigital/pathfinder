import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectAStarClosedList,
  selectAStarKnownList,
  selectAStarStarted,
  selectAStartUnknownList,
  selectEnd,
  selectStart,
  getAllEntities
} from '../store/store.selectors';
import { State } from '../store/store.state';
import { setAStarStarted, setAStarKnownList } from '../store/store.actions';
import { Dictionary } from '@ngrx/entity';
import { CellState } from '../store/CellState';

@Injectable({
  providedIn: 'root'
})
export class AStarService {
  aStarStarted: Boolean;
  start: string;
  end: string;
  knownList: string[];
  unknownList: string[];
  closedList: string[];
  cellStates: Dictionary<CellState>;

  constructor(private store: Store<State>) {
    this.store
      .pipe(select(selectAStarStarted))
      .subscribe(value => (this.aStarStarted = value));
    this.store
      .pipe(select(selectStart))
      .subscribe(value => (this.start = value));
    this.store.pipe(select(selectEnd)).subscribe(value => (this.end = value));
    this.store
      .pipe(select(selectAStarKnownList))
      .subscribe(value => (this.knownList = value));
    this.store
      .pipe(select(selectAStartUnknownList))
      .subscribe(value => (this.unknownList = value));
    this.store
      .pipe(select(selectAStarClosedList))
      .subscribe(value => (this.closedList = value));
    this.store
      .pipe(select(getAllEntities))
      .subscribe(value => (this.cellStates = value));
  }

  evaluateNext() {
    if (!this.aStarStarted) {
      return this.initAStar();
    }
    let id = this.getNextCandidateFromOpenList();
  }

  initAStar() {
    this.store.dispatch(setAStarStarted());
    this.store.dispatch(setAStarKnownList({ knownList: [this.start] }));
    this.evaluateNext();
  }

  getNextCandidateFromOpenList(): string {
    let lowestFCost = 0;
    let lowestId = '';
    this.knownList.forEach(id => {
      if (lowestFCost >= this.cellStates[id].fcost) {
        lowestFCost = this.cellStates[id].fcost;
        lowestId = id;
      }
    });
    console.log(
      'Found lowest fcost of ' + lowestFCost + ' with id ' + lowestId
    );
    return;
  }
}
