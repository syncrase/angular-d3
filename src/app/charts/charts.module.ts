import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArcStackComponent } from './d3/pies/arc-stack/arc-stack.component';
import { MultipleSeriesComponent } from './d3/pies/multiple-series/multiple-series.component';
import { PieComponent } from './d3/pies/pie/pie.component';
import { PimpChartComponent } from './d3/pies/pimp-chart/pimp-chart.component';
import { RepartitionRubanStackComponent } from './d3/stacks/repartition-ruban-stack/repartition-ruban-stack.component';
import { RepartitionRubanComponent } from './d3/stacks/repartition-ruban/repartition-ruban.component';
import { ResponsivePathComponent } from './d3/pathes/responsive-path/responsive-path.component';
import { ScatterComponent } from './d3/scatters/scatter/scatter.component';
import { ViewBoxComponent } from './d3/pies/view-box/view-box.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { DisplayerComponent } from './displayer/displayer.component';
import { DisplayerProvider } from './displayer/displayer-provider.service';
import { MapHoverComponent } from './d3/maps/map-hover/map-hover.component';
import { MapScaleCountriesComponent } from './d3/maps/map-scale-countries/map-scale-countries.component';
import { MapPinLocationComponent } from './d3/maps/map-pin-location/map-pin-location.component';
import { MapSpainChloroplethComponent } from './d3/maps/map-spain-chloropleth/map-spain-chloropleth.component';
import { BarComponent } from './d3/histograms/bar/bar.component';
import { Bar2Component } from './d3/histograms/bar2/bar2.component';
import { DisplayedChart } from './displayer/banner/displayed-chart.directive';
import { BannerComponent } from './displayer/banner/banner.component';



@NgModule({
  imports: [
    CommonModule,
    ChartsRoutingModule
  ],
  providers: [DisplayerProvider],
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
    DisplayedChart,
    BannerComponent,
    MapHoverComponent,
    MapScaleCountriesComponent,
    MapPinLocationComponent,
    MapSpainChloroplethComponent
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
    ViewBoxComponent,
    MapHoverComponent,
    MapScaleCountriesComponent,
    MapPinLocationComponent,
    MapSpainChloroplethComponent
  ],
  bootstrap: [DisplayerComponent]
})
export class ChartsModule { }
