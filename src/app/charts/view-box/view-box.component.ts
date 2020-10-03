import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { resultCollectionSpainNov19 } from './data';

@Component({
  selector: 'app-view-box',
  templateUrl: './view-box.component.html',
  styleUrls: ['./view-box.component.css']
})
export class ViewBoxComponent implements OnInit {


  readonly svgDimensions = { width: 500, height: 250 };
  readonly margin = { left: 5, right: 5, top: 10, bottom: 10 };
  readonly chartDimensions = {
    width: this.svgDimensions.width - this.margin.left - this.margin.right,
    height: this.svgDimensions.height - this.margin.bottom - this.margin.top
  };

  readonly partiesColor = [
    '#ED1D25',
    '#0056A8',
    '#5BC035',
    '#6B2E68',
    '#F3B219',
    '#FA5000',
    '#C50048',
    '#029626',
    '#A3C940',
    '#0DDEC5',
    '#FFF203',
    '#FFDB1B',
    '#E61C13',
    '#73B1E6',
    '#BECD48',
    '#017252'
  ];

  readonly radius = this.chartDimensions.width / 2.3;

  readonly pieMarginLeft = (this.chartDimensions.width - this.radius * 2) / 2;
  readonly pieMarginBottom = this.chartDimensions.height - this.radius;

  constructor() { }

  ngOnInit() {
    this.createSvg();
  }

  createSvg() {

    const svg = d3
      .select('body')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr(
        'viewBox',
        `${this.margin.left} ${this.margin.top} ${this.svgDimensions.width -
        this.margin.right} ${this.svgDimensions.height - this.margin.bottom}`
      );

    svg
      .append('g')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', this.chartDimensions.width)
      .attr('height', this.chartDimensions.height)
      .attr('style', 'fill: #FBFAF0');

    const chartGroup = svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .attr('width', this.chartDimensions.width)
      .attr('height', this.chartDimensions.height);

    chartGroup.attr(
      'transform',
      `translate(${this.pieMarginLeft + this.radius},${this.pieMarginBottom + this.radius})`
    );

    const arc = d3
      .arc()
      .innerRadius(this.radius / 1.7) // We want to have an arc with a propotional width
      .outerRadius(this.radius);

    const pieChart = d3
      .pie()
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));

    const politicalResultsOnlyNumbers: number[] = resultCollectionSpainNov19.map(
      result => result.seats
    );

    const pie = pieChart(politicalResultsOnlyNumbers);

    const arcs = chartGroup
      .selectAll('slice')
      .data(pie)
      .enter();

    arcs
      .append('path')
      .attr('d', <any>arc) // Hack typing: https://stackoverflow.com/questions/35413072/compilation-errors-when-drawing-a-piechart-using-d3-js-typescript-and-angular/38021825
      .attr('fill', (d, i) => this.partiesColor[i]); // TODO color ordinal

  }
}
