import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartComponent } from '../../displayer/chart.component';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html'
})
export class ScatterComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;


  private jsonData = [
    { 'Framework': 'Vue', 'Stars': '166443', 'Released': '2014' },
    { 'Framework': 'React', 'Stars': '150793', 'Released': '2013' },
    { 'Framework': 'Angular', 'Stars': '62342', 'Released': '2016' },
    { 'Framework': 'Backbone', 'Stars': '27647', 'Released': '2010' },
    { 'Framework': 'Ember', 'Stars': '21471', 'Released': '2011' },
  ];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    this.createSvg();
    this.drawPlot();
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

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
      .domain([2009, 2017])
      .range([0, this.width]);
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll('dot')
      .data(this.jsonData)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.Released))
      .attr('cy', d => y(d.Stars))
      .attr('r', 7)
      .style('opacity', .5)
      .style('fill', '#69b3a2');

    // Add labels
    dots.selectAll('text')
      .data(this.jsonData)
      .enter()
      .append('text')
      .text(d => d.Framework)
      .attr('x', d => x(d.Released))
      .attr('y', d => y(d.Stars))
  }
}
