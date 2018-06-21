import { Component } from '@angular/core';

@Component({
  selector: 'app-annotate',
  styles: [`
  mat-card {
    width: 400px;
    box-sizing: border-box;
    margin: 16px;
  }
  .card-container {
    position:fixed;
    top: 70px;
    bottom: 0;
    display: flex;
    flex-flow: row wrap;
  }
  `],
  template: `
  <div class="card-container">
      <mat-card>
        <app-annotate-master></app-annotate-master>
      </mat-card>
      <mat-card>
          <app-annotate-client></app-annotate-client>
      </mat-card>
  </div>
  `
})
export class AnnotateComponent { }
