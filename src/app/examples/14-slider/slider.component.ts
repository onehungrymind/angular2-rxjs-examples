import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  styles: [`
  md-card {
    width: 400px;
    box-sizing: border-box;
    margin: 16px;
  }
  .card-container {
    display: flex;
    flex-flow: row wrap;
  }
  `],
  template: `
  <div class="card-container">
      <md-card>
        <app-slider-master></app-slider-master>
      </md-card>
      <md-card>
        <app-slider-client></app-slider-client>
      </md-card>
  </div>
  `
})
export class SliderComponent{}
