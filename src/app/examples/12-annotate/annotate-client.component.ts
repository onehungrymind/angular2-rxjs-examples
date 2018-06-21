import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-annotate-client',
  template: `
    <app-line
      *ngFor="let line of lines" [line]="line">
    </app-line>
    <app-doc></app-doc>
  `
})
export class AnnotateClientComponent implements OnInit {
  lines: any[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remote$ = this.db.object('annotate/').valueChanges();

    remote$
      .subscribe(line => this.lines = [...this.lines, line]);
  }
}
