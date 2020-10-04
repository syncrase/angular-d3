import { Component, OnInit } from '@angular/core';
import { ChartItem } from './chart-item';
import { ChartService } from './chart.service';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html'
})
export class DisplayerComponent implements OnInit {

  charts: ChartItem[];

  constructor(private displayerService: ChartService) { }

  ngOnInit() {
    this.charts = this.displayerService.getCharts()
  }

}
