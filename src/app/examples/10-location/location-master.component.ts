import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-location-master',
  template: `
    <div #pin class="pin"
      [style.left]="position.x + 'px'"
      [style.top]="position.y + 'px'">
    </div>
  `
})
export class LocationMasterComponent implements OnInit {
  @ViewChild('pin') pin;
  position: any;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('location/'),
      PIN_OFFSET_X = 26,
      PIN_OFFSET_Y = 16;

    const move$ = Observable.fromEvent(document, 'mousemove')
      .map((event: MouseEvent) => {
        const offset = $(event.target).offset();
        return {
          x: event.clientX - offset.left - PIN_OFFSET_X,
          y: event.clientY - offset.top - PIN_OFFSET_Y
        };
      });

    const down$ = Observable.fromEvent(this.pin.nativeElement, 'mousedown')
      .do(event => this.pin.nativeElement.style.pointerEvents = 'none');

    const up$ = Observable.fromEvent(document, 'mouseup')
      .do(event => this.pin.nativeElement.style.pointerEvents = 'all');

    down$
      .switchMap(event => move$.takeUntil(up$))
      .startWith({ x: 100, y: 100})
      .subscribe(event => remote$.update(event));

    remote$
      .startWith({x: 100, y: 100})
      .subscribe(result => this.position = result);
  }
}
