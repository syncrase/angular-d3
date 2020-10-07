import { Component, OnInit } from '@angular/core';
import { DisplayedWrapper } from '@charts/displayer/displayed-wrapper';
import { DisplayerProvider } from '@charts/displayer/displayer-provider.service';

@Component({
  selector: 'app-displayer',
  templateUrl: './displayer.component.html'
})
export class DisplayerComponent implements OnInit {

  charts: DisplayedWrapper[];

  constructor(private displayerService: DisplayerProvider) { }

  ngOnInit() {
    this.charts = this.displayerService.getCharts()
  }

}
