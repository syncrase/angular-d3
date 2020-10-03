import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './charts/bar/bar.component';
import { PieComponent } from './charts/pie/pie.component';
import { ScatterComponent } from './charts/scatter/scatter.component';
import { ResponsivePathComponent } from './charts/responsive-path/responsive-path.component';
import { Bar2Component } from './charts/bar2/bar2.component';
import { RepartitionRubanComponent } from './charts/repartition-ruban/repartition-ruban.component';
import { RepartitionRubanStackComponent } from './charts/repartition-ruban-stack/repartition-ruban-stack.component';
import { ArcStackComponent } from './charts/arc-stack/arc-stack.component';
import { PimpChartComponent } from './charts/pimp-chart/pimp-chart.component';
import { MultipleSeriesComponent } from './charts/multiple-series/multiple-series.component';
import { ViewBoxComponent } from './charts/view-box/view-box.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    ResponsivePathComponent,
    Bar2Component,
    RepartitionRubanComponent,
    RepartitionRubanStackComponent,
    ArcStackComponent,
    PimpChartComponent,
    MultipleSeriesComponent,
    ViewBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
