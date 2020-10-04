import { Injectable } from '@angular/core';
import { ArcStackComponent } from '../d3/arc-stack/arc-stack.component';
import { BarComponent } from '../d3/bar/bar.component';
import { Bar2Component } from '../d3/bar2/bar2.component';
import { MapHoverComponent } from '../d3/map-hover/map-hover.component';
import { MapPinLocationComponent } from '../d3/map-pin-location/map-pin-location.component';
import { MapScaleCountriesComponent } from '../d3/map-scale-countries/map-scale-countries.component';
import { MapSpainChloroplethComponent } from '../d3/map-spain-chloropleth/map-spain-chloropleth.component';
import { MultipleSeriesComponent } from '../d3/multiple-series/multiple-series.component';
import { PieComponent } from '../d3/pie/pie.component';
import { PimpChartComponent } from '../d3/pimp-chart/pimp-chart.component';
import { RepartitionRubanStackComponent } from '../d3/repartition-ruban-stack/repartition-ruban-stack.component';
import { RepartitionRubanComponent } from '../d3/repartition-ruban/repartition-ruban.component';
import { ResponsivePathComponent } from '../d3/responsive-path/responsive-path.component';
import { ScatterComponent } from '../d3/scatter/scatter.component';
import { ViewBoxComponent } from '../d3/view-box/view-box.component';
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
