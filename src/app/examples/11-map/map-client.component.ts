import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';

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

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('map/');

    remote$
      .subscribe(line => {
        this.lines = [...this.lines, line];
      });
  }
}