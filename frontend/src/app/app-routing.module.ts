import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineChartComponent } from './line-chart/line-chart.component'
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

//const routes: Routes = [
//  { path: "", pathMatch: "full", redirectTo: "data" },
//  { path: "data", component: LineChartComponent }
//];

export class AppRoutingModule { }
