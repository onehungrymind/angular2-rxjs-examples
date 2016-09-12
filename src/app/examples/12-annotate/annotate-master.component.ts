import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-annotate-master',
  template: `
  <div class="container">
    <app-line
      *ngFor="let line of lines" [line]="line">
    </app-line>
  </div>
  `
})
export class AnnotateMasterComponent implements OnInit {
  lines: any[] = [];

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('annotate/');
    Observable.fromEvent(document, 'mousemove')
      .map(event => {
        return {x: event.clientX, y: event.clientY};
      })
      .pairwise(2)
      .map(positions => {
        const p1 = positions[0];
        const p2 = positions[1];
        return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
      })
      .do(event => remote$.update(event))
      .subscribe(line => {
        this.lines = [...this.lines, line];
      });
  }
}