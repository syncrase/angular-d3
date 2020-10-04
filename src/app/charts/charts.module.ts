import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArcStackComponent } from './d3/arc-stack/arc-stack.component';
import { BarComponent } from './d3/bar/bar.component';
import { Bar2Component } from './d3/bar2/bar2.component';
import { MultipleSeriesComponent } from './d3/multiple-series/multiple-series.component';
import { PieComponent } from './d3/pie/pie.component';
import { PimpChartComponent } from './d3/pimp-chart/pimp-chart.component';
import { RepartitionRubanStackComponent } from './d3/repartition-ruban-stack/repartition-ruban-stack.component';
import { RepartitionRubanComponent } from './d3/repartition-ruban/repartition-ruban.component';
import { ResponsivePathComponent } from './d3/responsive-path/responsive-path.component';
import { ScatterComponent } from './d3/scatter/scatter.component';
import { ViewBoxComponent } from './d3/view-box/view-box.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DisplayerComponent } from './displayer/displayer.component';
import { ChartDirective } from './displayer/chart-banner/chart.directive';
import { ChartService } from './displayer/chart.service';
import { ChartBannerComponent } from './displayer/chart-banner/chart-banner.component';



@NgModule({
  imports: [
    CommonModule,
    ChartsRoutingModule
  ],
  providers: [ChartService],
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
    ViewBoxComponent,
    DisplayerComponent,
    ChartDirective,
    ChartBannerComponent
  ],
  entryComponents: [
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
  bootstrap: [DisplayerComponent]
})
export class ChartsModule { }
