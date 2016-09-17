import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CURSOR_OFFSET, HEADER_OFFSET, getSidenavOffsetLeft } from '../../shared';
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
    Observable.fromEvent(document, 'click')
      .map(event => {
        const offsetLeft = getSidenavOffsetLeft(event.path);

        return {x: event.clientX - offsetLeft - CURSOR_OFFSET, y: event.pageY - HEADER_OFFSET - CURSOR_OFFSET};
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
