import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-location-client',
  template: `
    <div #pin class="pin"
      [style.left]="position.x + 'px'"
      [style.top]="position.y + 'px'">
    </div>
  `
})
export class LocationClientComponent implements OnInit {
  position: any;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('location/');

    remote$
      .startWith({x: 100, y: 100})
      .subscribe(result => this.position = result);

  }
}
