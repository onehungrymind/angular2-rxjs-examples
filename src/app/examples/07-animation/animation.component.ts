import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
    const OFFSET = 25;
    Observable.fromEvent(document, 'mousemove')
      .map(event => {
        return {x: event.clientX - OFFSET, y: event.clientY - OFFSET}
      })
      .subscribe(circle => {
        this.circles = [...this.circles, circle];
      })
  }
}
