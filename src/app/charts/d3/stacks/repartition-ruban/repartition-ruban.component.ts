import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { resultCollectionSpainNov19 } from './data';
import * as d3 from 'd3';
import { ChartComponent } from '@charts/displayer/chart.component';

@Component({
  selector: 'app-repartition-ruban',
  templateUrl: './repartition-ruban.component.html',
  styleUrls: ['./repartition-ruban.component.css']
})
export class RepartitionRubanComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;

  readonly svgDimensions = { width: 500, height: 500 };
  readonly margin = { left: 5, right: 5, top: 10, bottom: 10 };
  readonly chartDimensions = {
    width: this.svgDimensions.width - this.margin.left - this.margin.right,
    height: this.svgDimensions.height - this.margin.bottom - this.margin.top
  };

  readonly totalNumberSeats = resultCollectionSpainNov19.reduce(
    (sum, item) => sum + item.seats,
    0
  );

  readonly barHeight = 100;

  readonly politicalParties = [
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
  ];

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
    .domain(this.politicalParties);

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

    const xScale = d3
      .scaleLinear()
      .domain([0, this.totalNumberSeats])
      .range([0, this.chartDimensions.width]);
    let currentXPosition = 0;

    chartGroup
      .selectAll('rect')
      .data(resultCollectionSpainNov19)
      .enter()
      .append('rect')
      .attr('width', d => xScale(d.seats))
      .attr('height', this.barHeight)
      .attr('x', (d, i) => {
        const position = currentXPosition;
        currentXPosition += xScale(d.seats);
        return position;
      })
      .attr('y', d => this.chartDimensions.height - this.barHeight)
      .attr('fill', d => this.partiesColorScale(d.party));

  }
}
