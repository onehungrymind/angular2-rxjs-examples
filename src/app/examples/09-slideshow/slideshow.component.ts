import { Component } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  styles: [`
  md-card {
    width: 100%;
    max-width: 900px;
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
        <app-slideshow-master></app-slideshow-master>
      </md-card>
      <md-card>
        <app-slideshow-client></app-slideshow-client>
      </md-card>
  </div>
  `
})
export class SlideshowComponent {}
