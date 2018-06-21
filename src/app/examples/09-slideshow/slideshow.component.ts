import { Component } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  styles: [`
  mat-card {
    width: 100%;
    max-width: 900px;
    box-sizing: border-box;
    margin: 16px;
    overflow: hidden;
  }
  .card-container {
    display: flex;
    flex-flow: row wrap;
  }
  `],
  template: `
  <div class="card-container">
      <mat-card>
        <app-slideshow-master></app-slideshow-master>
      </mat-card>
      <mat-card>
        <app-slideshow-client></app-slideshow-client>
      </mat-card>
  </div>
  `
})
export class SlideshowComponent {}
