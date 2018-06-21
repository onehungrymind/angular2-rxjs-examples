import { Component } from '@angular/core';

@Component({
    selector: 'app-counter',
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
          <app-counter-master></app-counter-master>
        </mat-card>
        <mat-card>
            <app-counter-client></app-counter-client>
        </mat-card>
    </div>
    `
})
export class CounterComponent {}
