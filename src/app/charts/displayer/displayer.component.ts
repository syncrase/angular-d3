import { Component, OnInit } from '@angular/core';
import { ChartItem } from '@charts/displayer/chart-item';
import { ChartService } from '@charts/displayer/chart.service';

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
