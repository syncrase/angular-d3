import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartItem } from '../chart-item';
import { ChartComponent } from '../chart.component';
import { ChartDirective } from './chart.directive';

@Component({
  selector: 'app-chart-banner',
  templateUrl: './chart-banner.component.html',
  styleUrls: ['./chart-banner.component.css']
  // Possible d'ajouter les entreyComponents directement ici?
})
export class ChartBannerComponent implements OnInit, OnDestroy {
  @Input() charts: ChartItem[];
  currentChartIndex = -1;
  @ViewChild(ChartDirective, { static: true }) appChart: ChartDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    // this.automaticSwitching();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentChartIndex = (this.currentChartIndex + 1) % this.charts.length;
    const chartItem = this.charts[this.currentChartIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(chartItem.component);

    const viewContainerRef = this.appChart.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ChartComponent>(componentFactory);
    componentRef.instance.data = chartItem.data;
  }

  // automaticSwitching() {
  //   this.interval = setInterval(() => {
  //     this.loadComponent();
  //   }, 3000);
  // }

  onChange(value: any) {

    const chartItem = this.charts[value];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(chartItem.component);

    const viewContainerRef = this.appChart.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ChartComponent>(componentFactory);
    componentRef.instance.data = chartItem.data;
  }
}
