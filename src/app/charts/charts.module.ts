import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArcStackComponent } from './arc-stack/arc-stack.component';
import { BarComponent } from './bar/bar.component';
import { Bar2Component } from './bar2/bar2.component';
import { MultipleSeriesComponent } from './multiple-series/multiple-series.component';
import { PieComponent } from './pie/pie.component';
import { PimpChartComponent } from './pimp-chart/pimp-chart.component';
import { RepartitionRubanStackComponent } from './repartition-ruban-stack/repartition-ruban-stack.component';
import { RepartitionRubanComponent } from './repartition-ruban/repartition-ruban.component';
import { ResponsivePathComponent } from './responsive-path/responsive-path.component';
import { ScatterComponent } from './scatter/scatter.component';
import { ViewBoxComponent } from './view-box/view-box.component';
import { ChartsRoutingModule } from './charts-routing.module';



@NgModule({
  declarations: [
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
    CommonModule,
    ChartsRoutingModule
  ]
})
export class ChartsModule { }
