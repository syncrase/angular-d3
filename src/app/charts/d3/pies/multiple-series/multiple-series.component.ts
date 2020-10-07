import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {
  resultCollectionSpainNov19,
  resultCollectionSpainApr19,
  ResultEntry
} from './data';
import { legendColor } from 'd3-svg-legend';
import { DisplayerContent } from '@charts/displayer/displayer-content.interface';

@Component({
  selector: 'app-multiple-series',
  templateUrl: './multiple-series.component.html',
  styleUrls: ['./multiple-series.component.css']
})
export class MultipleSeriesComponent implements OnInit, DisplayerContent, OnDestroy {

  @Input() data: any;



  readonly svgDimensions = { width: 800, height: 500 };
  readonly margin = { left: 5, right: 5, top: 10, bottom: 10 };
  readonly chartDimensions = {
    width: this.svgDimensions.width - this.margin.left - this.margin.right,
    height: this.svgDimensions.height - this.margin.bottom - this.margin.top
  };
  readonly totalNumberSeats = resultCollectionSpainNov19.reduce(
    (sum, item) => sum + item.seats,
    0
  );

  readonly politicalPartiesKeys: string[] = [
    'PSOE',
    'PP',
    'VOX',
    'UP',
    'ERC',
    'Cs',
    'JxCat',
    'PNV',
    'Bildu',
    'Más pais',
    'CUP',
    'CC',
    'BNG',
    'Teruel Existe',
    'Compromis'
  ];

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
    '#017252',
    '#DD0000'
  ];

  ordinal = d3
    .scaleOrdinal()
    .domain(this.politicalPartiesKeys)
    .range(this.partiesColor);
  // Legend
  legendOrdinal = legendColor().scale(this.ordinal);

  readonly radius = Math.min(this.chartDimensions.width, this.chartDimensions.height) / 2;
  readonly legendLeft = this.margin.left;
  readonly legendTop = this.radius + 5;

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    this.createSvg();
  }

  ngOnDestroy(): void {
    console.log(this.hostElement.nativeElement.localName + ' destroyed');
  }

  createSvg() {

    const svg = d3
      .select(this.hostElement.nativeElement.localName)
      .append('svg')
      .attr('width', this.svgDimensions.width)
      .attr('height', this.svgDimensions.height)
      .attr('style', 'background-color: #FBFAF0');

    const chartGroup = svg
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .attr('width', this.chartDimensions.width)
      .attr('height', this.chartDimensions.height);

    chartGroup.attr('transform', `translate(${this.radius},${this.radius})`);

    const arc = d3
      .arc()
      .innerRadius(this.radius / 1.7) // We want to have an arc with a propotional width
      .outerRadius(this.radius);

    const pieChart = d3
      .pie()
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180))
      .value(d => d['seats'])
      .sort(null);

    const pie = pieChart(<any>resultCollectionSpainNov19);

    const arcs = chartGroup
      .selectAll('slice')
      .data(pie)
      .enter();

    arcs
      .append('path')
      .attr('d', <any>arc) // Hack typing: https://stackoverflow.com/questions/35413072/compilation-errors-when-drawing-a-piechart-using-d3-js-typescript-and-angular/38021825
      .attr('fill', (d, i) => this.partiesColor[i]); // TODO color ordinal


    const legendGroup = svg
      .append('g')
      .attr('transform', `translate(${this.legendLeft},${this.legendTop})`);

    legendGroup.call(this.legendOrdinal);

    // Buttons and changing data series

    document
      .getElementById('april')
      .addEventListener('click', function handleResultsApril() {
        updateChart(resultCollectionSpainApr19);
      });

    document
      .getElementById('november')
      .addEventListener('click', function handleResultsNovember() {
        updateChart(resultCollectionSpainNov19);
      });

    // Smoother Transition: https://bl.ocks.org/tezzutezzu/c2653d42ffb4ecc01ffe2d6c97b2ee5e
    // Version 1
    const updateChart = (data: ResultEntry[]) => {
      d3.selectAll('path')
        .data(pieChart(<any>data))
        .transition()
        .duration(500)
        .attr('d', <any>arc);
    };


  }
}
