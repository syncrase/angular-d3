import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { siegesParPartiNov19 } from './data';
import { legendColor } from 'd3-svg-legend';

@Component({
  selector: 'app-pimp-chart',
  templateUrl: './pimp-chart.component.html',
  styleUrls: ['./pimp-chart.component.css']
})
export class PimpChartComponent implements OnInit {


  readonly svgDimensions = { width: 800, height: 500 };
  readonly margin = { left: 5, right: 5, top: 10, bottom: 10 };
  readonly chartDimensions = {
    width: this.svgDimensions.width - this.margin.left - this.margin.right,
    height: this.svgDimensions.height - this.margin.bottom - this.margin.top
  };


  partiesColor = [];

  readonly svg = d3
    .select('body')
    .append('svg')
    .attr('width', this.svgDimensions.width)
    .attr('height', this.svgDimensions.height)
    .attr('style', 'background-color: #FBFAF0');

  readonly chartGroup = this.svg
    .append('g')
    // .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
    .attr('width', this.chartDimensions.width)
    .attr('height', this.chartDimensions.height);

  readonly rayon = Math.min(this.chartDimensions.width, this.chartDimensions.height) / 2;


  arcs: d3.Selection<d3.EnterElement, d3.PieArcDatum<number | { valueOf(): number; }>, SVGGElement, unknown>;
  div =
    d3
      .select('body')
      // this.svg
      .append('div')
      .attr('class', 'tooltip')
      // .attr('height', '100px')
      // .attr('width', '100px')
      // .attr('style', 'background-color: red')// .attr style doit être AVANT .style
      // .style('height', '100px')
      // .style('width', '100px')
      // .style('z-index', '9999')
      // .style("position", "absolute")
      .attr('left', `500px`)// d3.event.pageX
      .attr('top', `500px`)// d3.event.pageY;
      // .attr('transform', `translate(200, 200)`)
      // .text(
      //   `<span>olala</span>`
      // );
      .text(
        `I'm at the wrong place!`
      );
  // .style('height', '100px')
  // .style('width', '100px');
  // .text('hello');
  // .style('opacity', 0)
  // .style('left', `500px`)// d3.event.pageX
  // .style('top', `500px`);// d3.event.pageY;
  // .attr('transform', `translate(500,500)`);


  constructor() { }

  ngOnInit() {
    this.constructArc();
    this.genererLesCouleursDesEntrees();
    this.createSvg();
    this.createLengend();

  }

  constructArc() {


    const pieChart = d3
      .pie()
      // .startAngle(-90 * (Math.PI / 180))
      .startAngle(Math.PI * 0) // sin = 1 et cos = 0
      // .endAngle(90 * (Math.PI / 180));
      .endAngle(Math.PI * 1); // sin = -1 et cos = 0

    const pie = pieChart(siegesParPartiNov19.map(result => result.sieges));

    this.arcs = this.chartGroup
      .selectAll('slice')
      .data(pie)
      .enter();
  }

  createSvg() {
    this.chartGroup.attr('transform', `translate(${this.rayon * 2},${this.rayon})`);

    const arc = d3
      .arc()
      .innerRadius(this.rayon * 0.5)
      .outerRadius(this.rayon);

    this.arcs
      .append('path')
      .text(function (d) { return 'test'; })
      .attr('d', <any>arc) // Hack typing: https://stackoverflow.com/questions/35413072/compilation-errors-when-drawing-a-piechart-using-d3-js-typescript-and-angular/38021825
      .attr('fill', (d, i) => this.partiesColor[i]) // TODO color ordinal
      .on('mouseover', this.leCurseurSurvoleLaZone)
      .on('mouseout', this.leCurseurSortDeLaZone);

    this.arcs.append('text')
      .attr('transform', function (d) {
        const coordonneesDuCentreDeLarc = arc.centroid(<d3.DefaultArcObject><unknown>d);
        return `translate(${coordonneesDuCentreDeLarc[0]},${coordonneesDuCentreDeLarc[1]})`;
      })
      .attr('text-anchor', 'middle')
      .attr('pointer-events', 'none')
      .text(function (d) { return siegesParPartiNov19[d.index].nom; });
  }

  createLengend() {
    var ordinal = d3
      .scaleOrdinal(this.partiesColor)
      .domain(siegesParPartiNov19.map(parti => parti.nom));

    this.svg
      .append('g')
      // ${this.rayon - 20}
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(legendColor().scale(ordinal))
  }

  genererLesCouleursDesEntrees() {
    siegesParPartiNov19.forEach(t => this.partiesColor[this.partiesColor.length] = this.getRandomColor());
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  leCurseurSurvoleLaZone(d: any, i: any, n: any) {
    d3.select(d.currentTarget)
      .transition()
      .duration(200)
      .style('opacity', 0.5)
      .attr('transform', `scale(1.1, 1.1)`);

    d3.select('.tooltip')
      // html() doit se situer AVANT la transition
      .html(
        `<span>${siegesParPartiNov19[i.index].nom}: ${siegesParPartiNov19[i.index].sieges}</span>`
      );
    // .transition()
    // .duration(200)
    // .style('opacity', 0.9)
    // .style('left', `500px`)// d3.event.pageX
    // .style('top', `${d.clientY - 28}px`)// d3.event.pageY;

    // .style('height', `50px`)
    // .style('width', `100px`);

  }

  /**
   *
   */
  leCurseurSortDeLaZone(d: any, i: any) {
    d3.select(d.currentTarget)
      .transition()
      .duration(200)
      .style('opacity', 1)
      .attr('transform', ``);

    // d3.select('.tooltip')
    // .transition()
    // .duration(200)
    // .style('opacity', 0);
  }
}
