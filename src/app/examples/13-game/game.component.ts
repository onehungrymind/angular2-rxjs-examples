import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/repeat';

@Component({
  selector: 'app-game',
  styles: [`
  md-card {
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
      <md-card [style.background-position-y]="backgroundPosition + 'px'">
        <app-game-master></app-game-master>
      </md-card>
      <md-card [style.background-position-y]="backgroundPosition + 'px'">
        <app-game-client></app-game-client>
      </md-card>
  </div>
  `
})
export class GameComponent implements OnInit{
  backgroundPosition: number = 0;
  ngOnInit() {
    Observable
      .interval(10)
      .startWith(1100)
      .take(1178)
      .repeat()
      .subscribe(count => this.backgroundPosition = count);
  }
}
