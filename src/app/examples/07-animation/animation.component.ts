import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SMALL_BALL_OFFSET, getOffsetLeft, getSourceElement } from '../../shared';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {
  circles: any[] = [];

  ngOnInit() {
    Observable.fromEvent(getSourceElement(), 'mousemove')
      .map(event => {
        return {
          x: event.clientX - getOffsetLeft(event) - SMALL_BALL_OFFSET,
          y: event.pageY - SMALL_BALL_OFFSET
        };
      })
      .subscribe(circle => {
        this.circles = [...this.circles, circle];
      })
  }
}
