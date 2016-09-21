import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { SMALL_BALL_OFFSET } from '../../shared';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-game-master',
  template: `
  <div class="container">
    <app-circle
      *ngFor="let circle of circles"
      [style.left]="circle.x + 'px'"
      [style.top]="circle.y + 'px'">
    </app-circle>
  </div>
  `
})
export class GameMasterComponent implements OnInit {
  circles: any[] = [];

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('animation/');

    Observable.fromEvent(document, 'mousemove')
      .map((event: any) => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left - SMALL_BALL_OFFSET,
          y: event.clientY - offset.top - SMALL_BALL_OFFSET
        };
      })
      .do((event: any) => remote$.update(event))
      .subscribe(circle => {
        this.circles = [...this.circles, circle];
      });
  }
}
