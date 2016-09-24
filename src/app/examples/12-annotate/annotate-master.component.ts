import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-annotate-master',
  template: `
    <app-line
      *ngFor="let line of lines" [line]="line">
    </app-line>
  `
})
export class AnnotateMasterComponent implements OnInit {
  lines: any[] = [];

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('annotate/');
    const emptyLine: any = { x1: 0, y1: 0, x2: 0, y2: 0 };

    Observable.fromEvent(document, 'mousemove')
      .map((event: MouseEvent) => {
        const offset = $(event.target).offset();

        return {
          x: event.clientX - offset.left,
          y: event.clientY - offset.top
        };
      })
      .pairwise()
      .map(positions => {
        const p1 = positions[0];
        const p2 = positions[1];
        return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
      })
      .startWith(emptyLine)
      .subscribe(event => remote$.update(event));

    remote$
      .subscribe(line => this.lines = [...this.lines, line]);
  }
}
