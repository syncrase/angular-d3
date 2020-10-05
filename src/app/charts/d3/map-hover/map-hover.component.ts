import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { ChartComponent } from '../../displayer/chart.component';

@Component({
  selector: 'app-map-hover',
  templateUrl: './map-hover.component.html',
  styleUrls: ['./map-hover.component.css']
})
export class MapHoverComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;

  europejson;
  // readonly europejson = JSON.parse('./europe.json');
  // readonly europejson = require('./europe.json');

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

    debugger;
    const map = svg
      .selectAll('path')
      .data(geojson['features'])
      .enter()
      .append('path')
      // .attr('class', 'country')// Doesn't work : style aren't available with dynamic load
      .style('stroke-width', '1')
      .style('stroke', '#2f4858')
      .style('fill', '#008c86')
      // data loaded from json file
      .attr('d', geoPath as any)
      .on('mouseover', function (d, i) {
        // d3.select(this).attr('class', 'selected-country');// Doesn't work : style aren't available with dynamic load
        d3.select(this)
          .style('stroke', '#bc5b40')
          .style('fill', '#f88f70');
      })
      .on('mouseout', function (d, i) {
        //   d3.select(this).attr('class', 'country');// Doesn't work : style aren't available with dynamic load
        d3.select(this)
          .style('stroke', '#2f4858')
          .style('fill', '#008c86');
      });
  }



}
