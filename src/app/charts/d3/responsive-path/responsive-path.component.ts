import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartComponent } from '../../displayer/chart.component';

class Data {
  year: number; aData: number; bData: number
}

/**
 * reference : https://medium.com/@louisemoxy/a-simple-way-to-make-d3-js-charts-svgs-responsive-7afb04bc2e4b
 */
@Component({
  selector: 'app-responsive-path',
  templateUrl: './responsive-path.component.html'
})
export class ResponsivePathComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;


  // Fake data
  readonly jsonData: Data[] = [
    {
      year: 2000,
      aData: 50,
      bData: 50
    },
    {
      year: 2001,
      aData: 150,
      bData: 50
    },
    {
      year: 2002,
      aData: 200,
      bData: 50
    },
    {
      year: 2003,
      aData: 130,
      bData: 50
    },
    {
      year: 2004,
      aData: 240,
      bData: 50
    },
    {
      year: 2005,
      aData: 380,
      bData: 50
    },
    {
      year: 2006,
      aData: 420,
      bData: 50
    }
  ];
  readonly color = ['lightgreen', 'lightblue'];

  readonly strokeWidth = 1.5;
  readonly margin = { top: 0, bottom: 20, left: 30, right: 20 };
  private svg;

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {
    this.createSvg();
    this.drawBars(this.jsonData);
  }

  ngOnDestroy(): void {
    console.log(this.hostElement.nativeElement.localName + ' destroyed');
  }

  private createSvg(): void {
    // Create SVG and padding for the chart
    this.svg = d3
      .select(this.hostElement.nativeElement.localName)
      .append('svg')
      .attr('height', 300)
      .attr('width', 600);
  }

  private drawBars(data: any[]): void {

    const chart = this.svg.append('g').attr('transform', `translate(${this.margin.left},0)`);

    const width = +this.svg.attr('width') - this.margin.left - this.margin.right - this.strokeWidth * 2;
    const height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    const grp = chart
      .append('g')
      .attr('transform', `translate(-${this.margin.left - this.strokeWidth},-${this.margin.top})`);

    // Create stack
    const stack = d3.stack().keys(['aData', 'bData']);
    const stackedValues = stack(data);
    // console.log(stackedValues)
    const stackedData = [];
    // Copy the stack offsets back into the data.
    stackedValues.forEach((layer, index) => {
      const currentStack = [];
      layer.forEach((d, i) => {
        currentStack.push({
          values: d,
          year: data[i].year
        });
      });
      stackedData.push(currentStack);
    });

    // Create scales
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(stackedValues[stackedValues.length - 1], dp => dp[1])]);
    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain(d3.extent(data, dataPoint => dataPoint.year));




    const area = d3
      .area()
      .x(dataPoint => {
        return xScale((<any>dataPoint).year);
      })
      .y0(dataPoint => yScale(dataPoint.values[0]))
      .y1(dataPoint => yScale(dataPoint.values[1]));




    const series = grp
      .selectAll('.series')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('class', 'series');

    series
      .append('path')
      .attr('transform', `translate(${this.margin.left},0)`)
      .style('fill', (d, i) => this.color[i])
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', this.strokeWidth)
      .attr('d', d => area(d));

    // Add the X Axis
    chart
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(data.length));

    // Add the Y Axis
    chart
      .append('g')
      .attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(yScale));
  }


}
