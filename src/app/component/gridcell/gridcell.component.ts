import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-gridcell',
  templateUrl: './gridcell.component.html',
  styleUrls: ['./gridcell.component.scss']
})
export class GridCellComponent implements OnInit {
  @Input() row: number
  @Input() column: number

  constructor () {}

  ngOnInit () {}
}
