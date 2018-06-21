import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, startWith, switchMap, takeUntil, tap } from 'rxjs/internal/operators';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remoteRef = this.db.object('location/'),
      remote$ = remoteRef.valueChanges(),
      PIN_OFFSET_X = 26,
      PIN_OFFSET_Y = 16;

    const move$ = fromEvent(document, 'mousemove')
      .pipe(
        map((event: MouseEvent) => {
          const offset = $(event.target).offset();
          return {
            x: event.clientX - offset.left - PIN_OFFSET_X,
            y: event.clientY - offset.top - PIN_OFFSET_Y
          };
        })
      );

    const down$ = fromEvent(this.pin.nativeElement, 'mousedown')
      .pipe(tap(event => this.pin.nativeElement.style.pointerEvents = 'none'));

    const up$ = fromEvent(document, 'mouseup')
      .pipe(tap(event => this.pin.nativeElement.style.pointerEvents = 'all'));

    down$
      .pipe(
        switchMap(event => move$.pipe(takeUntil(up$))),
        startWith({ x: 100, y: 100})
      )
      .subscribe(event => remoteRef.update(event));

    remote$
      .pipe(startWith({x: 100, y: 100}))
      .subscribe(result => this.position = result);
  }
}
