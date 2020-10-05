import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import * as d3Composite from 'd3-composite-projections';
import { latLongCommunities } from './communities';
import { stats } from './stats';
import { ChartComponent } from '@charts/displayer/chart.component';

@Component({
  selector: 'app-map-pin-location',
  templateUrl: './map-pin-location.component.html',
  styleUrls: ['./map-pin-location.component.css']
})
export class MapPinLocationComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;

  spainjson;

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {

    const request = new XMLHttpRequest();
    request.open('GET', '/assets/data/spain.json', false);
    request.overrideMimeType('application/json');
    request.send(null);
    this.spainjson = JSON.parse(request.responseText);

    this.createSvg();
  }

  ngOnDestroy(): void {
    console.log(this.hostElement.nativeElement.localName + ' destroyed');
  }


  createSvg() {
    const maxAffected = stats.reduce(
      (max, item) => (item.value > max ? item.value : max),
      0
    );

    const affectedRadiusScale = d3
      .scaleLinear()
      .domain([0, maxAffected])
      .range([0, 50]); // 50 pixel max radius, we could calculate it relative to width and height

    const calculateRadiusBasedOnAffectedCases = (comunidad: string) => {
      const entry = stats.find(item => item.name === comunidad);

      return entry ? affectedRadiusScale(entry.value) : 0;
    };

    const svg = d3
      .select(this.hostElement.nativeElement.localName)
      .append('svg')
      .attr('width', 1024)
      .attr('height', 800)
      .attr('style', 'background-color: #FBFAF0');

    const aProjection = d3Composite
      .geoConicConformalSpain()
      // Let's make the map bigger to fit in our resolution
      .scale(3300)
      // Let's center the map
      .translate([500, 400]);

    const geoPath = d3.geoPath().projection(aProjection);
    const geojson = topojson.feature(this.spainjson, this.spainjson.objects.ESP_adm1);

    svg
      .selectAll('path')
      .data(geojson['features'])
      .enter()
      .append('path')
      // .attr('class', 'country')// Doesn't work : style aren't available with dynamic load
      .style('stroke-width', '1')
      .style('stroke', '#2f4858')
      .style('fill', '#008c86')
      // data loaded from json file
      .attr('d', geoPath as any);

    svg
      .selectAll('circle')
      .data(latLongCommunities)
      .enter()
      .append('circle')
      // .attr('class', 'affected-marker')// Doesn't work : style aren't available with dynamic load
      .style('stroke', '#bc5b40')
      .style('fill', '#f88f70')
      .style('fill-opacity', '0.7')
      .attr('r', d => calculateRadiusBasedOnAffectedCases(d.name))
      .attr('cx', d => aProjection([d.long, d.lat])[0])
      .attr('cy', d => aProjection([d.long, d.lat])[1]);

  }




}
