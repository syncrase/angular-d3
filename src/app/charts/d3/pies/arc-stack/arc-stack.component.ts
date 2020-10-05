import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartComponent } from '../../../displayer/chart.component';
import { resultCollectionSpainNov19 } from './data';

@Component({
  selector: 'app-arc-stack',
  templateUrl: './arc-stack.component.html',
  styleUrls: ['./arc-stack.component.css']
})
export class ArcStackComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;

  readonly svgDimensions = { width: 800, height: 500 };
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


  readonly radius = Math.min(this.chartDimensions.width, this.chartDimensions.height) / 2;




  readonly politicalResultsOnlyNumbers: number[] = resultCollectionSpainNov19.map(
    result => result.seats
  );




  constructor(private hostElement: ElementRef) { }

  ngOnDestroy(): void {
    console.log(this.hostElement.nativeElement.localName + " destroyed");
  }

  ngOnInit() {
    this.createSvg();
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
      .innerRadius(this.radius / 1.7)
      .outerRadius(this.radius);

    const pieChart = d3
      .pie()
      .startAngle(-90 * (Math.PI / 180))
      .endAngle(90 * (Math.PI / 180));
    const pie = pieChart(this.politicalResultsOnlyNumbers);

    const arcs = chartGroup
      .selectAll('slice')
      .data(pie)
      .enter();

    arcs
      .append('path')
      .attr('d', <any>arc)
      .attr('fill', (d, i) => this.partiesColor[i]);

  }

}
