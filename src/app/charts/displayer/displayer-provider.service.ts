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
import { DisplayedWrapper } from './displayed-wrapper';

@Injectable()
export class DisplayerProvider {

  constructor() { }

  getCharts() {
    return [
      new DisplayedWrapper(ArcStackComponent, { name: 'Arc stack chart', bio: 'autre data' }),
      new DisplayedWrapper(BarComponent, { name: 'Basic bar chart', bio: 'autre data' }),
      new DisplayedWrapper(Bar2Component, { name: 'Basic bar chart 2', bio: 'autre data' }),
      new DisplayedWrapper(MultipleSeriesComponent, { name: 'Multiple series', bio: 'autre data' }),
      new DisplayedWrapper(PieComponent, { name: 'Camenbert', bio: 'autre data' }),
      new DisplayedWrapper(PimpChartComponent, { name: 'Camenbert amélioré', bio: 'autre data' }),
      new DisplayedWrapper(RepartitionRubanComponent, { name: 'Répartition ruban', bio: 'autre data' }),
      new DisplayedWrapper(RepartitionRubanStackComponent, { name: 'Répartition ruban empilé', bio: 'autre data' }),
      new DisplayedWrapper(ResponsivePathComponent, { name: 'Responsive, enfin à la base c\'est ce que je voulais', bio: 'autre data' }),
      new DisplayedWrapper(ScatterComponent, { name: 'Scatter plot ou nuage de point', bio: 'Smart as they come' }),
      new DisplayedWrapper(ViewBoxComponent, { name: 'ViewBox chart', bio: 'autre data' }),
      new DisplayedWrapper(MapHoverComponent, { name: 'MapHoverComponent chart', bio: 'autre data' }),
      new DisplayedWrapper(MapScaleCountriesComponent, { name: 'MapScaleCountriesComponent chart', bio: 'autre data' }),
      new DisplayedWrapper(MapPinLocationComponent, { name: 'MapPinLocationComponent chart', bio: 'autre data' }),
      new DisplayedWrapper(MapSpainChloroplethComponent, { name: 'MapSpainChloroplethComponent chart', bio: 'autre data' }),
    ];
  }

}
