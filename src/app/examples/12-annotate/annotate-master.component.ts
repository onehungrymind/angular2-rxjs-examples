import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, pairwise, startWith } from 'rxjs/internal/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-annotate-master',
  template: `
    <app-line
      *ngFor="let line of lines" [line]="line">
    </app-line>
    <app-doc></app-doc>
  `
})
export class AnnotateMasterComponent implements OnInit {
  lines: any[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remoteRef = this.db.object('annotate/');
    const remote$ = remoteRef.valueChanges();
    const emptyLine: any = { x1: 0, y1: 0, x2: 0, y2: 0 };

    fromEvent(document, 'mousemove')
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
      .subscribe(event => remoteRef.update(event));

    remote$
      .subscribe(line => this.lines = [...this.lines, line]);
  }
}
