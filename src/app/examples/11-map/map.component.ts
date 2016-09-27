import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  styles: [`
    md-card {
      width: 100%;
      box-sizing: border-box;
      margin: 16px;
      background: #fff url(assets/london-map.jpg) no-repeat center center;
      padding: 0;
    }
    .card-container {
      display: flex;
      flex-flow: row wrap;
      position: fixed;
      top: 70px;
      bottom: 0;
      left: 0;
      right: 0;
    }
    `],
  template: `
    <div class="card-container">
        <md-card>
          <app-map-master></app-map-master>
        </md-card>
        <md-card>
            <app-map-client></app-map-client>
        </md-card>
    </div>
    `
})
export class MapComponent { }
