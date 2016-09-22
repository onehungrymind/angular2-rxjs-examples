import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';

declare var jQuery:any;

@Component({
  selector: 'app-map-master',
  template: `
  <app-line
    *ngFor="let line of lines" [line]="line">
  </app-line>
  `
})
export class MapMasterComponent implements OnInit {
  lines: any[] = [];

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('map/');
    const emptyLine: any = { x1: 0, y1: 0, x2: 0, y2: 0 };

    Observable.fromEvent(document, 'click')
      .map(event => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left,
          y: event.clientY - offset.top
        };
      })
      .pairwise(2)
      .map(positions => {
        const p1 = positions[0];
        const p2 = positions[1];
        return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
      })
      .startWith(emptyLine)
      .subscribe(line => remote$.update(line));

    remote$
      .subscribe(line => this.lines = [...this.lines, line]);
  }
}
