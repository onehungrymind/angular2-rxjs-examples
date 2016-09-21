import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  emptyLine: any = { x1: 0, y1: 0, x2: 0, y2: 0 };
  ngOnInit() {
    // Observable.fromEvent(document, 'mousemove')
    Observable.fromEvent(document, 'click')
      .map(event => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left,
          y: event.pageY - offset.top
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
