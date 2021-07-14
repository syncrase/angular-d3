import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayerComponent } from './displayer/displayer.component';


const routes: Routes = [
    {
        path: '**',
        component: DisplayerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChartsRoutingModule { }
