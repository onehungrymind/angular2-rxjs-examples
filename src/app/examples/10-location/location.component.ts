import { Component } from '@angular/core';

@Component({
  selector: 'app-location',
  styles: [`
    .card-container {
      position:fixed;
      top: 70px;
      bottom: 0;
      left: 0;
      right: 0;
    }
    mat-card {
      width: 100%;
      box-sizing: border-box;
      margin: 16px;
      background: #fff url(assets/london-map.jpg) no-repeat center center;
    }
    .card-container {
      display: flex;
      flex-flow: row wrap;
    }
    `],
  template: `
    <div class="card-container">
        <mat-card>
          <app-location-master></app-location-master>
        </mat-card>
        <mat-card>
            <app-location-client></app-location-client>
        </mat-card>
    </div>
    `
})
export class LocationComponent {}
