import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-animation',
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
export class AnimationComponent implements OnInit {
  circles: any[] = [];

  ngOnInit() {
    const BALL_OFFSET = 25;

    Observable.fromEvent(document, 'mousemove')
      .map(event => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left - BALL_OFFSET,
          y: event.pageY - BALL_OFFSET
        };
      })
      .subscribe(circle => this.circles = [...this.circles, circle])
  }
}
