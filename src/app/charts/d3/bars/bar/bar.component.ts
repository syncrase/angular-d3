import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartComponent } from '../../../displayer/chart.component';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html'
})
export class BarComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;

  private jsonData = [
    // { 'Framework': 'Vue', 'Stars': '166443', 'Released': '2014' },
    // { 'Framework': 'React', 'Stars': '150793', 'Released': '2013' },
    // { 'Framework': 'Angular', 'Stars': '62342', 'Released': '2016' },
    // { 'Framework': 'Backbone', 'Stars': '27647', 'Released': '2010' },
    // { 'Framework': 'Ember', 'Stars': '21471', 'Released': '2011' },
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    this.createSvg();
    // Parse data from a CSV
    // d3.csv('../../assets/frameworks.csv').then(data => this.drawBars(data));
    // this.drawBars(this.data);
    d3.json('https://api.jsonbin.io/b/5eee6a5397cb753b4d149343').then(data => this.drawBars(<any[]>data));
  }

  ngOnDestroy(): void {
    console.log(this.hostElement.nativeElement.localName + ' destroyed');
  }

  private createSvg(): void {
    this.svg = d3.select(this.hostElement.nativeElement.localName)
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale

    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll('bars')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.Framework))
      .attr('y', d => y(d.Stars))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(d.Stars))
      .attr('fill', '#d04a35');
  }

}
