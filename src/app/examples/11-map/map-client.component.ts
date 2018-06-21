import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-map-client',
  template: `
  <div class="container">
    <app-line
      *ngFor="let line of lines" [line]="line">
    </app-line>
  </div>
  `
})
export class MapClientComponent implements OnInit {
  lines: any[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remote$ = this.db.object('map/').valueChanges();

    remote$
      .subscribe(line => this.lines = [...this.lines, line]);
  }
}
