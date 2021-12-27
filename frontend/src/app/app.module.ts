import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LineChartComponent } from './line-chart/line-chart.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LineChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
