import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  styles: [`
  mat-card {
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
      <mat-card>
        <app-slider-master></app-slider-master>
      </mat-card>
      <mat-card>
        <app-slider-client></app-slider-client>
      </mat-card>
  </div>
  `
})
export class SliderComponent{}
