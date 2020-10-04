import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'charts',
    loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
  },
  {
    path: '**',
    redirectTo: '/charts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
