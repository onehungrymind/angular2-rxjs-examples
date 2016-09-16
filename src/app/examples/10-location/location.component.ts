import { Component } from '@angular/core';

@Component({
  selector: 'app-location',
  styles: [`
    .card-container {
      position:fixed;
      top: 70px;
      bottom: 0;
    }
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
          <app-location-master></app-location-master>
        </md-card>
        <md-card>
            <app-location-client></app-location-client>
        </md-card>
    </div>
    `
})
export class LocationComponent {}
