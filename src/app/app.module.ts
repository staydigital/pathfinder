import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GridCellComponent } from './component/gridcell/gridcell.component'
import { GridmanagerComponent } from './component/gridmanager/gridmanager.component'
import { StoreModule } from '@ngrx/store'
import * as fromPathfinderStore from './store/store.reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'

@NgModule({
  declarations: [AppComponent, GridmanagerComponent, GridCellComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ pathfinder: fromPathfinderStore.reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
