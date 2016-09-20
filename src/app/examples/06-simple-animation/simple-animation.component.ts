import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BIG_BALL_OFFSET, CURSOR_OFFSET, getOffsetLeft, getOffsetTop, getSourceElement } from '../../shared';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'gsap';

@Component({
  selector: 'app-simple-animation',
  templateUrl: './simple-animation.component.html',
  styleUrls: ['./simple-animation.component.css']
})
export class SimpleAnimationComponent implements OnInit {

  @ViewChild('ball') ball;

  ngOnInit() {
    Observable.fromEvent(getSourceElement(), 'click')
      .map(event => {

        return {
          x: event.clientX - getOffsetLeft(event, null) - BIG_BALL_OFFSET - CURSOR_OFFSET,
          y: event.pageY - getOffsetTop(event) - BIG_BALL_OFFSET - CURSOR_OFFSET
        };
      })
      .subscribe(props => {
        TweenMax.to(this.ball.nativeElement, 1, props);
      })
  }

}
