import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartComponent } from '../../displayer/chart.component';
import { resultCollectionSpainNov19 } from './data';

@Component({
  selector: 'app-repartition-ruban-stack',
  templateUrl: './repartition-ruban-stack.component.html',
  styleUrls: ['./repartition-ruban-stack.component.css']
})
export class RepartitionRubanStackComponent implements OnInit, ChartComponent, OnDestroy {

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

  readonly barHeight = 100;

  readonly politicalPartiesKeys: string[] = resultCollectionSpainNov19.map(
    item => item.party
  );

  readonly partiesColorScale = d3
    .scaleOrdinal([
      "#ED1D25",
      "#0056A8",
      "#5BC035",
      "#6B2E68",
      "#F3B219",
      "#FA5000",
      "#C50048",
      "#029626",
      "#A3C940",
      "#0DDEC5",
      "#FFF203",
      "#FFDB1B",
      "#E61C13",
      "#73B1E6"
    ])
    .domain(this.politicalPartiesKeys);


  // Since we are going to use stack layout
  // We are going to format the data in the following format
  // {
  //   PSOE: 120,
  //   PP: 88,
  //   VOX: 52
  //   ...
  // }
  // This will represent a serie for a single entry (in this
  // case we are handling a single bar, an example of multiple
  // bar would be showing result elections of several years)
  readonly singleElectionResult = resultCollectionSpainNov19.reduce(
    (total, item) => ({
      ...total,
      [item.party]: item.seats
    }),
    {}
  );

  // Stack Layout will expect an array of objects
  // In this case we are going to display only one bar
  // we just wrap it in an array
  readonly jsonData = [this.singleElectionResult];

  // Let's create our stack layout
  // we are going to pass the keys (PSOE, PP, VOX, UP, Cs...)
  // to have them attached on every item
  readonly stack = d3.stack().keys(this.politicalPartiesKeys);

  constructor() { }

  ngOnInit() {
    this.createSvg();
  }

  ngOnDestroy(): void {
    console.log("RepartitionRubanStackComponent destroyed");
  }

  createSvg() {

    const svg = d3
      .select("app-repartition-ruban-stack")
      .append("svg")
      .attr("width", this.svgDimensions.width)
      .attr("height", this.svgDimensions.height)
      .attr("style", "background-color: #FBFAF0");

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
      .attr("width", this.chartDimensions.width)
      .attr("height", this.chartDimensions.height);

    const xScale = d3
      .scaleLinear()
      .domain([0, this.totalNumberSeats])
      .range([0, this.chartDimensions.width]);

    // Now we get the data formatted in the follwing way:
    //[
    //  [[0,120]] // PSOE entry (seats), starts on 0 ends on 120
    //  [[120,208]] // PP entry (88), but starts on previous items 120 (PSOE)
    //  [[208, 260]] // VOX Entry
    //]
    const series = this.stack(this.jsonData);

    chartGroup
      .selectAll("rect")
      .data(series)
      .enter()
      .append("rect")
      .attr("width", d => {
        // To get the width of the current item we have to substract
        // the final stack value - the initial stack value
        return xScale(d[0][1] - d[0][0]);
      })
      .attr("height", this.barHeight)
      .attr("x", (d, i) => {
        // We take as starting point the first coordinate
        // e.g. PP 120, 208 -> we start at 120 (where PSOE ended, and on the width param sum up that value)
        return xScale(d[0][0]);
      })
      .attr("y", d => this.chartDimensions.height - this.barHeight)
      .attr("fill", (d, i) => this.partiesColorScale(d.key));


  }
}
