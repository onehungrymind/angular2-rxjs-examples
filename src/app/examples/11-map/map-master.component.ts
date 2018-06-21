import { Component, OnInit, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, pairwise, startWith } from 'rxjs/internal/operators';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remoteRef = this.db.object('map/');
    const remote$ = remoteRef.valueChanges();
    const emptyLine: any = { x1: 0, y1: 0, x2: 0, y2: 0 };

    fromEvent(document, 'click')
      .pipe(
        map((event: MouseEvent) => {
          const offset = $(event.target).offset();
          return {
            x: event.clientX - offset.left,
            y: event.clientY - offset.top
          };
        }),
        pairwise(),
        map(positions => {
          const p1 = positions[0];
          const p2 = positions[1];
          return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
        }),
        startWith(emptyLine)
      )
      .subscribe(line => remoteRef.update(line));

    remote$
      .subscribe(line => this.lines = [...this.lines, line]);
  }
}
