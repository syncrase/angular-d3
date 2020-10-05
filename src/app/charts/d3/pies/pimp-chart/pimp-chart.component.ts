import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { siegesParPartiNov19 } from './data';
import { legendColor } from 'd3-svg-legend';
import { ChartComponent } from '@charts/displayer/chart.component';

@Component({
  selector: 'app-pimp-chart',
  templateUrl: './pimp-chart.component.html',
  styleUrls: ['./pimp-chart.component.css']
})
export class PimpChartComponent implements OnInit, ChartComponent, OnDestroy {

  @Input() data: any;

  readonly svgDimensions = { width: 800, height: 500 };
  readonly margin = { left: 5, right: 5, top: 10, bottom: 10 };
  readonly chartDimensions = {
    width: this.svgDimensions.width - this.margin.left - this.margin.right,
    height: this.svgDimensions.height - this.margin.bottom - this.margin.top
  };

  partiesColor = [];

  readonly rayon = Math.min(this.chartDimensions.width, this.chartDimensions.height) / 2;

  arcs: any;
  tooltip: any;
  /**
   * Contain all graph and tooltip
   */
  container: any;
  /**
   * Contain pie chart and legend
   */
  graphGroup: any;
  pieChart: any;

  constructor(private hostElement: ElementRef) { }

  ngOnInit() {

    this.container = d3.select(this.hostElement.nativeElement.localName)
      .append('div')
      .attr('class', 'container')
      .style('position', 'relative');

    // Init graph group
    this.graphGroup = this.container
      .append('svg')
      .attr('width', this.svgDimensions.width)
      .attr('height', this.svgDimensions.height)
      .attr('style', 'background-color: #FBFAF0');

    this.tooltip =
      this.container
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('left', `500px`)
        .style('top', `200px`);

    this.constructArc();
    this.genererLesCouleursDesEntrees();
    this.createSvg();
    this.createLegend();
  }

  ngOnDestroy(): void {
    console.log(this.hostElement.nativeElement.localName + ' destroyed');
  }

  constructArc() {
    const pieChartFormatting = d3
      .pie()
      .startAngle(Math.PI * 0) // sin = 1 et cos = 0
      .endAngle(Math.PI * 1); // sin = -1 et cos = 0
    const pie = pieChartFormatting(siegesParPartiNov19.map(result => result.sieges));

    this.pieChart = this.graphGroup
      .append('g')
      .attr('width', this.chartDimensions.width)
      .attr('height', this.chartDimensions.height);

    this.arcs = this.pieChart
      .selectAll('slice')
      .data(pie)
      .enter();
  }

  createSvg() {
    this.pieChart.attr('transform', `translate(${this.rayon * 2},${this.rayon})`);

    const arc = d3
      .arc()
      .innerRadius(this.rayon * 0.5)
      .outerRadius(this.rayon);

    this.arcs
      .append('path')
      .text(function (d) { return 'test'; })
      .attr('d', <any>arc)
      .attr('fill', (d: any, i: any) => this.partiesColor[i])
      // .attr('pointer-events', 'all')
      .on('mouseover', this.onMouseover)
      .on('mouseout', this.onMouseOut);

    // Add label at the middle of the section
    this.arcs.append('text')
      .attr('transform', function (d: any) {
        const coordonneesDuCentreDeLarc = arc.centroid(<d3.DefaultArcObject><unknown>d);
        return `translate(${coordonneesDuCentreDeLarc[0]},${coordonneesDuCentreDeLarc[1]})`;
      })
      .attr('text-anchor', 'middle')
      .attr('pointer-events', 'none')
      .text(function (d) { return siegesParPartiNov19[d.index].nom; });
  }

  createLegend() {
    var ordinal = d3
      .scaleOrdinal(this.partiesColor)
      .domain(siegesParPartiNov19.map(parti => parti.nom));

    this.graphGroup
      .append('g')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(legendColor().scale(ordinal))
  }

  genererLesCouleursDesEntrees() {
    siegesParPartiNov19.forEach(t => this.partiesColor[this.partiesColor.length] = this.getRandomColor());
  }

  getRandomColor() {
    // var letters = '0123456789ABCDEF';
    // var color = '#';
    // for (; color.length < 7; color += letters[Math.floor(Math.random() * 16)]);
    return '#' + (Math.random() * 0xFFFFFF1 << 2).toString(16).substr(0, 6);
  }

  readonly onMouseover = (d: any, i: any) => {
    // Be aware of the scope : 'this' is only accessible in an arrow function
    const e = this.arcs.nodes();
    // const index = e.indexOf(this); // --> Argument of type 'this' is not assignable to parameter of type 'EnterElement'
    const index = e.indexOf(e.find(elt => this.shallowEqual((<any>elt).__data__, i)));
    // const pointerEvent = d3.pointer(d) // --> Property 'pointer' does not exist on type 'typeof import('<project_root>/node_modules/@types/d3/index')'

    d3.select(d.currentTarget)
      .transition()
      .duration(200)
      .style('opacity', 0.5)
      .attr('transform', `scale(1.1, 1.1)`);

    d3.select('.tooltip')
      // html() doit se situer AVANT la transition
      .html(
        `<span>${siegesParPartiNov19[i.index].nom}: ${siegesParPartiNov19[i.index].sieges}</span>`
      )
      .transition()
      .duration(200)
      .style('opacity', 0.9)
      .style('left', (a, b, c: any) => {
        // c: Array { div.tooltip (HtmlElement)}
        return `${this.rayon * 2 - c[0].clientWidth / 2}px`;
      })
      .style('top', `${this.rayon}px`);
  }

  readonly onMouseOut = (d: any, i: any) => {
    d3.select(d.currentTarget)
      .transition()
      .duration(200)
      .style('opacity', 1)
      .attr('transform', ``);

    d3.select('.tooltip')
      .transition()
      .duration(200)
      .style('opacity', 0);
  }


  shallowEqual(object1: { [x: string]: any; }, object2: { [x: string]: any; }) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }


}
