import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ExamplesComponent } from './examples/examples.component';
import { MdButtonModule } from "@angular2-material/button";
import {MdCardModule} from "@angular2-material/card";
import { CircleComponent } from './circle/circle.component';
import { LineComponent } from './line/line.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamplesComponent,
    CircleComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
