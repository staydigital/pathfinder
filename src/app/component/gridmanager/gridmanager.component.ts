import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { State } from 'src/app/store/store.state'

import { initGrid, setModeStart, setModeEnd } from 'src/app/store/store.actions'
import { CellState, CellMode } from 'src/app/store/CellState'
import { AStarService } from 'src/app/algorithm/astar.service'

@Component({
  selector: 'app-gridmanager',
  templateUrl: './gridmanager.component.html',
  styleUrls: ['./gridmanager.component.scss']
})
export class GridmanagerComponent implements OnInit {
  width = 20
  height = 20

  constructor (
    private store: Store<State>,
    private aStarService: AStarService
  ) {}

  ngOnInit () {
    this.initCellStates()
  }

  initCellStates () {
    let cellStates: CellState[]
    cellStates = []
    for (let row = 0; row < this.width; row++) {
      for (let column = 0; column < this.height; column++) {
        cellStates.push({
          x: row,
          y: column,
          gcost: 0,
          hcost: 0,
          totalCost: 0,
          mode: CellMode.CELL,
          precessor: ''
        })
      }
    }
    this.store.dispatch(initGrid({ cellStates: cellStates }))
  }

  setStartMode () {
    this.store.dispatch(setModeStart())
  }

  setEndMode () {
    this.store.dispatch(setModeEnd())
  }

  evaluateNext () {
    this.aStarService.evaluateNext()
  }
}
