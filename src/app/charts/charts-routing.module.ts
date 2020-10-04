import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PimpChartComponent } from './pimp-chart/pimp-chart.component';


const routes: Routes = [
    {
        path: '**',
        component: PimpChartComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsRoutingModule { }
