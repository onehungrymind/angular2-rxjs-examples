import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
    const OFFSET = 50;

    Observable.fromEvent(document, 'click')
      .map(event => {
        return {x: event.clientX - OFFSET, y: event.clientY - OFFSET}
      })
      .subscribe(props => {
        TweenMax.to(this.ball.nativeElement, 1, props);
      })
  }

}
