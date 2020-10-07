import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DisplayedWrapper } from '@charts/displayer/displayed-wrapper';
import { DisplayerContent } from '@charts/displayer/displayer-content.interface';
import { DisplayedChart } from '@charts/displayer/banner/displayed-chart.directive';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html'
  // Possible d'ajouter les entryComponents directement ici?
})
export class BannerComponent implements OnInit, OnDestroy {
  @Input() charts: DisplayedWrapper[];
  private currentChartIndex = -1;
  @ViewChild(DisplayedChart, { static: true }) displayedChart: DisplayedChart;
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

    const viewContainerRef = this.displayedChart.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<DisplayerContent>(componentFactory);
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

    const viewContainerRef = this.displayedChart.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<DisplayerContent>(componentFactory);
    componentRef.instance.data = chartItem.data;
  }
}
