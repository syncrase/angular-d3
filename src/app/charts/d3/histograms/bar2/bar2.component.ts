import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { resultCollectionSpainNov19 } from './data';
import * as d3 from 'd3';
import { DisplayerContent } from '@charts/displayer/displayer-content.interface';

@Component({
  selector: 'app-bar2',
  templateUrl: './bar2.component.html',
  styleUrls: ['./bar2.component.css']
})
export class Bar2Component implements OnInit, DisplayerContent, OnDestroy {

  @Input() data: any;

  readonly svgDimensions = { width: 500, height: 500 };
  readonly margin = { left: 5, right: 5, top: 10, bottom: 10 };
  readonly chartDimensions = {
    width: this.svgDimensions.width - this.margin.left - this.margin.right,
    height: this.svgDimensions.height - this.margin.bottom - this.margin.top
  };
  readonly maxNumberSeats = resultCollectionSpainNov19.reduce(
    (max, item) => (item.seats > max ? item.seats : max),
    0
  );
  readonly politicalPartiesCount = resultCollectionSpainNov19.length;

  readonly barPadding = 5; // We could calculate this value as well
  readonly barWidth =
    (this.chartDimensions.width - this.barPadding * this.politicalPartiesCount) /
    this.politicalPartiesCount;

  readonly partiesColorScale = d3
    .scaleOrdinal([
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
      '#73B1E6'
    ])
    .domain([
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
      'Teruel Existe'
    ]);

  readonly yScale = d3
    .scaleLinear()
    .domain([0, this.maxNumberSeats])
    .range([0, this.chartDimensions.height]);

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

    chartGroup
      .selectAll('rect')
      .data(resultCollectionSpainNov19)
      .enter()
      .append('rect')
      .attr('width', this.barWidth)
      .attr('height', d => this.yScale(d.seats))
      .attr('x', (d, i) => i * (this.barWidth + this.barPadding))
      .attr('y', d => this.chartDimensions.height - this.yScale(d.seats))
      .attr('fill', d => this.partiesColorScale(d.party));

  }
}
