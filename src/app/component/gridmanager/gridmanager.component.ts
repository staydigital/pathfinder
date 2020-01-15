import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { State } from 'src/app/store/store.state'
import { CellState, CellMode } from 'src/app/store/cellstate'
import { initGrid } from 'src/app/store/store.actions'

@Component({
  selector: 'app-gridmanager',
  templateUrl: './gridmanager.component.html',
  styleUrls: ['./gridmanager.component.scss']
})
export class GridmanagerComponent implements OnInit {
  width = 100
  height = 100

  constructor (private store: Store<State>) {}

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
          mode: CellMode.CELL
        })
      }
    }
    this.store.dispatch(initGrid({ cellStates: cellStates }))
  }
}
