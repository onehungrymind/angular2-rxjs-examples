import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CURSOR_OFFSET, getOffsetLeft, getOffsetTop, getSourceElement } from '../../shared';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-stream-origin',
  templateUrl: './stream-origin.component.html',
  styleUrls: ['./stream-origin.component.css']
})
export class StreamOriginComponent implements OnInit {
  lines: any[] = [];
  ngOnInit() {
    // Observable.fromEvent(document, 'mousemove')
    Observable.fromEvent(getSourceElement(), 'click')
      .map(event => {
        return {
          x: event.clientX - getOffsetLeft(event) - CURSOR_OFFSET,
          y: event.pageY - getOffsetTop(event) - CURSOR_OFFSET
        };
      })
      .pairwise(2)
      .map(positions => {
        const p1 = positions[0];
        const p2 = positions[1];
        return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
      })
      .subscribe(line => {
        this.lines = [...this.lines, line];
      });
  }
}
