import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartComponent } from '../../../displayer/chart.component';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { coronaVirusAffectedByCountry } from './stats';

@Component({
  selector: 'app-map-scale-countries',
  templateUrl: './map-scale-countries.component.html',
  styleUrls: ['./map-scale-countries.component.css']
})
export class MapScaleCountriesComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;

  europejson;


  // set the affected color scale
  readonly color = d3
    .scaleThreshold<number, string>()
    .domain([0, 1, 100, 500, 700, 1000])
    .range([
      '#FFFFF',
      '#FFE8E5',
      '#F88F70',
      '#CD6A4E',
      '#A4472D',
      '#7B240E',
      '#540000'
    ]);

  readonly assignCountryBackgroundColor = (countryName: string) => {
    const item = coronaVirusAffectedByCountry.find(
      item => item.country === countryName
    );
    if (item) {
      console.log(item.affected);
    }
    return item ? this.color(item.affected) : this.color(0);
  };

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/data/europe.json', false);
    request.overrideMimeType('application/json');
    request.send(null);
    this.europejson = JSON.parse(request.responseText);

    this.createSvg();
  }

  ngOnDestroy(): void {
    console.log(this.hostElement.nativeElement.localName + ' destroyed');
  }

  createSvg() {

    const svg = d3
      .select(this.hostElement.nativeElement.localName)
      .append('svg')
      .attr('width', 1024)
      .attr('height', 800)
      .attr('style', 'background-color: #FBFAF0');

    const aProjection = d3
      .geoMercator()
      // Let's make the map bigger to fit in our resolution
      .scale(500)
      // Let's center the map
      .translate([300, 900]);

    const geoPath = d3.geoPath().projection(aProjection);
    const geojson = topojson.feature(
      this.europejson,
      this.europejson.objects.continent_Europe_subunits
    );

    svg
      .selectAll('path')
      .data(geojson['features'])
      .enter()
      .append('path')
      .attr('class', 'country')
      .style('fill', (d: any) => {
        return this.assignCountryBackgroundColor(d.properties.geounit);
      })
      // data loaded from json file
      .attr('d', geoPath as any);

  }


}
