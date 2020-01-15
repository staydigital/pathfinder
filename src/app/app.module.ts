import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { GridCellComponent } from './component/gridcell/gridcell.component'
import { GridmanagerComponent } from './component/gridmanager/gridmanager.component'

@NgModule({
  declarations: [AppComponent, GridmanagerComponent, GridCellComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
