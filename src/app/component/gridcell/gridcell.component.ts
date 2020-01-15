import { Component, OnInit, Input } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { State } from 'src/app/store/store.state'
import {
  selectGridReady,
  getCellStateWithId
} from 'src/app/store/store.selectors'
import { Observable } from 'rxjs'
import { CellState } from 'src/app/store/cellstate'
import { clickCell } from 'src/app/store/store.actions'

@Component({
  selector: 'app-gridcell',
  templateUrl: './gridcell.component.html',
  styleUrls: ['./gridcell.component.scss']
})
export class GridCellComponent implements OnInit {
  @Input() row: number
  @Input() column: number

  cellState$: Observable<CellState>

  constructor (private store: Store<State>) {}

  ngOnInit () {
    this.store.pipe(select(selectGridReady)).subscribe(gridReady => {
      if (gridReady) {
        this.cellState$ = this.store.pipe(
          select(getCellStateWithId, { id: this.row + '_' + this.column })
        )
      }
    })
  }

  cellClicked () {
    console.log('Test')
    this.store.dispatch(clickCell({ row: this.row, column: this.column }))
  }
}
