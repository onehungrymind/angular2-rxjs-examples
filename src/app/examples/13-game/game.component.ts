import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { repeat, startWith, take } from 'rxjs/internal/operators';

@Component({
  selector: 'app-game',
  styles: [`
  mat-card {
    width: 400px;
    box-sizing: border-box;
    margin: 16px;
    background: white url('assets/stars.jpg') repeat-y 0 0;
    background-size: cover;
    overflow: hidden;
  }
  .card-container {
    display: flex;
    flex-flow: row wrap;
    position: fixed;
    top: 70px;
    bottom: 0;
  }
  `],
  template: `
  <div class="card-container">
      <mat-card [style.background-position-y]="backgroundPosition + 'px'">
        <app-game-master></app-game-master>
      </mat-card>
      <mat-card [style.background-position-y]="backgroundPosition + 'px'">
        <app-game-client></app-game-client>
      </mat-card>
  </div>
  `
})
export class GameComponent implements OnInit{
  backgroundPosition: number = 0;
  ngOnInit() {
    interval(10)
      .pipe(
        startWith(1100),
        take(1178),
        repeat()
      )
      .subscribe(count => this.backgroundPosition = count);
  }
}
