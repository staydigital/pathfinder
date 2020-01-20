import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import {
  selectAStarClosedList,
  selectAStarKnownList,
  selectAStarStarted,
  selectAStartUnknownList,
  selectEnd,
  selectStart,
  getAllEntities,
  getAllIds
} from '../store/store.selectors'
import { State } from '../store/store.state'
import {
  setAStarStarted,
  setAStarKnownList,
  setAStarUnknownList,
  setAStarClosedList,
  setAStarCost,
  setAStarPrecessor,
  finishCell
} from '../store/store.actions'
import { Dictionary } from '@ngrx/entity'
import { CellState, CellMode } from '../store/CellState'
import { ArrayUtils } from './ArrayUtils'
import { MathUtils } from './MathUtils'

@Injectable({
  providedIn: 'root'
})
export class AStarService {
  aStarStarted: Boolean
  start: string
  end: string
  knownList: string[]
  unknownList: string[]
  closedList: string[]
  ids: string[]
  cellStates: Dictionary<CellState>

  constructor (private store: Store<State>) {
    this.store
      .pipe(select(selectAStarStarted))
      .subscribe(value => (this.aStarStarted = value))
    this.store
      .pipe(select(selectStart))
      .subscribe(value => (this.start = value))
    this.store.pipe(select(selectEnd)).subscribe(value => (this.end = value))
    this.store
      .pipe(select(selectAStarKnownList))
      .subscribe(value => (this.knownList = value))
    this.store
      .pipe(select(selectAStartUnknownList))
      .subscribe(value => (this.unknownList = value))
    this.store
      .pipe(select(selectAStarClosedList))
      .subscribe(value => (this.closedList = value))
    this.store
      .pipe(select(getAllEntities))
      .subscribe(value => (this.cellStates = value))
    this.store
      .pipe(select(getAllIds))
      .subscribe(value => (this.ids = value as string[]))
  }

  evaluateNext () {
    if (!this.aStarStarted) {
      this.initAStar()
    }

    while (true) {
      let id = this.popBestCandidateFromOpenList()
      if (id === this.end) {
        this.showFinish(id)
        break
      }
      let neightbourCells = this.getNeightbourCells(id)

      this.calculateCosts(id, neightbourCells)
      this.store.dispatch(setAStarClosedList({ closedList: this.closedList }))
      this.store.dispatch(setAStarKnownList({ knownList: this.knownList }))
      this.store.dispatch(
        setAStarUnknownList({ unknownList: this.unknownList })
      )
    }
  }
  showFinish (id: string) {
    if (id === this.start) {
      return
    }
    this.store.dispatch(finishCell({ id: id }))
    this.showFinish(this.cellStates[id].precessor)
  }

  calculateCosts (id: string, neightbourCells: string[]) {
    neightbourCells.forEach(successor => {
      if (this.closedList.includes(successor)) {
        return
      }
      let precessorPoint = MathUtils.getXY(id)
      let successorPoint = MathUtils.getXY(successor)
      let endPoint = MathUtils.getXY(this.end)

      let gcostSuccessor =
        this.cellStates[id].gcost +
        MathUtils.determineDistance(
          precessorPoint.x,
          successorPoint.x,
          precessorPoint.y,
          successorPoint.y
        )

      if (
        this.knownList.includes(successor) &&
        gcostSuccessor >= this.cellStates[successor].gcost
      ) {
        return
      }

      this.putOnKnownList(successor)

      this.store.dispatch(
        setAStarPrecessor({
          id: successor,
          precessor: id
        })
      )
      this.store.dispatch(
        setAStarCost({
          id: successor,
          gcost: gcostSuccessor,
          hcost: MathUtils.determineDistance(
            successorPoint.x,
            endPoint.x,
            successorPoint.y,
            endPoint.y
          )
        })
      )
    })
  }

  initAStar () {
    this.unknownList = ArrayUtils.copyStringArrayAndFilterValues(this.ids, [
      this.start
    ])

    this.store.dispatch(setAStarKnownList({ knownList: [this.start] }))
    this.store.dispatch(setAStarUnknownList({ unknownList: this.unknownList }))
    this.store.dispatch(setAStarStarted())

    this.evaluateNext()
  }

  popBestCandidateFromOpenList (): string {
    let lowestTotalCost = 1000
    let lowestId = ''
    console.log(this.knownList)
    this.knownList.forEach(id => {
      if (lowestTotalCost >= this.cellStates[id].totalCost) {
        lowestTotalCost = this.cellStates[id].totalCost
        lowestId = id
      }
    })

    this.knownList = ArrayUtils.copyStringArrayAndFilterValues(this.knownList, [
      lowestId
    ])
    this.closedList.push(lowestId)
    console.log(
      'Found best candidate from knownList with id ' +
        lowestId +
        ' and totalCost of ' +
        lowestTotalCost
    )
    return lowestId
  }

  getNeightbourCells (id: string): string[] {
    let neightbourCells: string[] = []
    const { x, y } = MathUtils.getXY(id)
    this.checkNeightbourCells(x - 1, y, neightbourCells)
    this.checkNeighbourCellsWithRegion(
      x - 1,
      y - 1,
      x - 1,
      y,
      x,
      y - 1,
      neightbourCells
    )
    this.checkNeightbourCells(x, y - 1, neightbourCells)
    this.checkNeighbourCellsWithRegion(
      x + 1,
      y - 1,
      x,
      y - 1,
      x + 1,
      y,
      neightbourCells
    )
    this.checkNeightbourCells(x + 1, y, neightbourCells)
    this.checkNeighbourCellsWithRegion(
      x + 1,
      y + 1,
      x + 1,
      y,
      x,
      y + 1,
      neightbourCells
    )
    this.checkNeightbourCells(x, y + 1, neightbourCells)
    this.checkNeighbourCellsWithRegion(
      x - 1,
      y + 1,
      x,
      y + 1,
      x - 1,
      y,
      neightbourCells
    )
    return neightbourCells
  }

  checkNeightbourCells (
    xCandidate: number,
    yCandidate: number,
    neightbourCells: String[]
  ) {
    if (
      xCandidate >= 0 &&
      yCandidate >= 0 &&
      xCandidate < 20 &&
      yCandidate < 20
    ) {
      if (
        this.cellStates[yCandidate + '_' + xCandidate].mode !== CellMode.BLOCK
      ) {
        neightbourCells.push(yCandidate + '_' + xCandidate)
      }
    }
  }

  checkNeighbourCellsWithRegion (
    xCandidate: number,
    yCandidate: number,
    xRegion1: number,
    yRegion1: number,
    xRegion2: number,
    yRegion2: number,
    neightbourCells: String[]
  ) {
    if (
      xCandidate >= 0 &&
      yCandidate >= 0 &&
      xCandidate < 20 &&
      yCandidate < 20
    ) {
      if (
        this.cellStates[yCandidate + '_' + xCandidate].mode !== CellMode.BLOCK
      ) {
        if (
          !(
            this.cellStates[yRegion1 + '_' + xRegion1].mode ===
              CellMode.BLOCK &&
            this.cellStates[yRegion2 + '_' + xRegion2].mode === CellMode.BLOCK
          )
        ) {
          neightbourCells.push(yCandidate + '_' + xCandidate)
        }
      }
    }
  }

  putOnKnownList (id: string) {
    if (!this.knownList.includes(id)) {
      this.knownList.push(id)
    }
    if (this.unknownList.includes(id)) {
      this.unknownList = ArrayUtils.copyStringArrayAndFilterValues(
        this.unknownList,
        [id]
      )
    }
  }
}
