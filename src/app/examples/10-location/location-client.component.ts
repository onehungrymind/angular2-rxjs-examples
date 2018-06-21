import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { startWith } from 'rxjs/internal/operators';

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

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remoteRef = this.db.object('location/');
    const remote$ = remoteRef.valueChanges();

    remote$
      .pipe(startWith({x: 100, y: 100}))
      .subscribe(result => this.position = result);
  }
}
