import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import * as d3Composite from 'd3-composite-projections';
import { feature } from 'topojson-client';//deprecated topojson@3.0.2: Use topojson-client 
import { Feature, Geometry } from 'geojson';
import { DisplayerContent } from '@charts/displayer/displayer-content.interface';

@Component({
  selector: 'app-map-spain-chloropleth',
  templateUrl: './map-spain-chloropleth.component.html',
  styleUrls: ['./map-spain-chloropleth.component.css']
})
export class MapSpainChloroplethComponent implements OnInit, DisplayerContent, OnDestroy {

  @Input() data: any;

  spainjson;
  municipalitiesjson;

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {

    console.log(this.hostElement.nativeElement.localName);
    const request = new XMLHttpRequest();
    request.open('GET', '/assets/data/regions.json', false);
    request.overrideMimeType('application/json');
    request.send(null);
    this.spainjson = JSON.parse(request.responseText);

    request.open('GET', '/assets/data/municipalities.json', false);
    request.overrideMimeType('application/json');
    request.send(null);
    this.municipalitiesjson = JSON.parse(request.responseText);

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
      .attr('height', 800);

    const aProjection = d3Composite
      .geoConicConformalSpain()
      // Let's make the map bigger to fit in our resolution
      .scale(3300)
      // Let's center the map
      .translate([500, 400]);

    const geoPath = d3.geoPath().projection(aProjection);
    const geojson = topojson.feature(this.spainjson, this.spainjson.objects.ccaa);

    // Let's add some typings based on TopoJson data structure
    interface Municipality {
      name: string;
      rate: number;
    }

    // Lets implement a scale to assign color to
    // each municipality based on its population density.
    // This time, instead of manually setting the domain,
    // let's compute it dynamically from the data.
    const densities = this.municipalitiesjson.objects.municipios.geometries.map(
      g => g.properties.rate
    );
    const densityExtent = d3.extent(densities);
    const densityScale = d3
      //.scaleLinear()
      //.scaleLog()
      //.scalePow()
      .scaleSqrt() // more info about scales: https://observablehq.com/@d3/continuous-scales
      .exponent(1 / 6)
      .domain(<any>densityExtent)
      .range([0, 1]);
    const colorScale = (density: number) =>
      // Given a number t in the range [0,1], returns the corresponding color from the “Blues” sequential color scheme represented as an RGB string.
      d3.interpolateBlues(densityScale(density || 0)); // e.g. Try interpolateReds, interpolateCool

    // Let's paint first the map
    svg
      .selectAll('path')
      .data(geojson['features'])
      .enter()
      .append('path')
      // .attr('class', 'region')// Doesn't work : style aren't available with dynamic load
      .style('stroke-width', '1')
      .style('stroke', '#2f4858')
      .style('fill', '#008c86')
      // data loaded from json file
      .attr('d', geoPath as any);

    // (*) Lets implement the ENTER pattern for each new municipality
    // to be represented with a SVG path joined to its datum.
    // First, we need to extract the corresponding feature collection.

    // https://www.freecodecamp.org/forum/t/d3-topojson-feature-explanation/235396/2
    // A topojson file contains  a mathematical descripcion of the map and
    // features that links the shapes to a given concept (e.g. countries, regions,
    // municipalities, provinces)
    const municipalities = feature(
      this.municipalitiesjson,
      this.municipalitiesjson.objects.municipios
    );

    const municipalitiesGroup = svg.append('g');

    municipalitiesGroup
      .selectAll('path')
      // In data we get array of features (municipality name and rate value)
      // we pass that array, and in the second parameter we are indicating the key
      // in this case the name field that contains the municipality name
      .data(
        municipalities['features'],
        (d: Feature<Geometry, Municipality>) => d.properties.name
      )
      .enter()
      .append('path')
      .attr('d', geoPath)
      // From the feature object we extract the rate and usig it to fill the current
      // municipality background
      .attr('fill', (d: Feature<Geometry, Municipality>) =>
        colorScale(d.properties.rate)
      );
  }


}
