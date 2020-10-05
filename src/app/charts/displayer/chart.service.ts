import { Injectable } from '@angular/core';
import { BarComponent } from '@charts/d3/histograms/bar/bar.component';
import { Bar2Component } from '@charts/d3/histograms/bar2/bar2.component';
import { MapHoverComponent } from '@charts/d3/maps/map-hover/map-hover.component';
import { MapPinLocationComponent } from '@charts/d3/maps/map-pin-location/map-pin-location.component';
import { MapScaleCountriesComponent } from '@charts/d3/maps/map-scale-countries/map-scale-countries.component';
import { MapSpainChloroplethComponent } from '@charts/d3/maps/map-spain-chloropleth/map-spain-chloropleth.component';
import { ResponsivePathComponent } from '@charts/d3/pathes/responsive-path/responsive-path.component';
import { ArcStackComponent } from '@charts/d3/pies/arc-stack/arc-stack.component';
import { MultipleSeriesComponent } from '@charts/d3/pies/multiple-series/multiple-series.component';
import { PieComponent } from '@charts/d3/pies/pie/pie.component';
import { PimpChartComponent } from '@charts/d3/pies/pimp-chart/pimp-chart.component';
import { ViewBoxComponent } from '@charts/d3/pies/view-box/view-box.component';
import { ScatterComponent } from '@charts/d3/scatters/scatter/scatter.component';
import { RepartitionRubanStackComponent } from '@charts/d3/stacks/repartition-ruban-stack/repartition-ruban-stack.component';
import { RepartitionRubanComponent } from '@charts/d3/stacks/repartition-ruban/repartition-ruban.component';
import { ChartItem } from './chart-item';

@Injectable()
export class ChartService {

  constructor() { }

  getCharts() {
    return [
      new ChartItem(ArcStackComponent, { name: 'Arc stack chart', bio: 'autre data' }),
      new ChartItem(BarComponent, { name: 'Basic bar chart', bio: 'autre data' }),
      new ChartItem(Bar2Component, { name: 'Basic bar chart 2', bio: 'autre data' }),
      new ChartItem(MultipleSeriesComponent, { name: 'Multiple series', bio: 'autre data' }),
      new ChartItem(PieComponent, { name: 'Camenbert', bio: 'autre data' }),
      new ChartItem(PimpChartComponent, { name: 'Camenbert amélioré', bio: 'autre data' }),
      new ChartItem(RepartitionRubanComponent, { name: 'Répartition ruban', bio: 'autre data' }),
      new ChartItem(RepartitionRubanStackComponent, { name: 'Répartition ruban empilé', bio: 'autre data' }),
      new ChartItem(ResponsivePathComponent, { name: 'Responsive, enfin à la base c\'est ce que je voulais', bio: 'autre data' }),
      new ChartItem(ScatterComponent, { name: 'Scatter plot ou nuage de point', bio: 'Smart as they come' }),
      new ChartItem(ViewBoxComponent, { name: 'ViewBox chart', bio: 'autre data' }),
      new ChartItem(MapHoverComponent, { name: 'MapHoverComponent chart', bio: 'autre data' }),
      new ChartItem(MapScaleCountriesComponent, { name: 'MapScaleCountriesComponent chart', bio: 'autre data' }),
      new ChartItem(MapPinLocationComponent, { name: 'MapPinLocationComponent chart', bio: 'autre data' }),
      new ChartItem(MapSpainChloroplethComponent, { name: 'MapSpainChloroplethComponent chart', bio: 'autre data' }),
    ];
  }

}
