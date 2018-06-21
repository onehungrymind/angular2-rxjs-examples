import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AngularFireDatabase } from 'angularfire2/database';

const SPACESHIP_OFFSET = 40,
  SHOT_OFFSET = 2;

@Component({
  selector: 'app-game-master',
  template: `
    <div #spaceship class="spaceship"
      [style.left]="spaceshipPosition.x + 'px'"
      [style.top]="spaceshipPosition.y + 'px'">
    </div>
    <app-shot *ngFor="let shot of shots"
      (remove)="removeShot(shot)"
      [style.left]="shot?.x + 'px'"
      [style.top]="shot?.y + 'px'"
    ></app-shot>
  `
})
export class GameMasterComponent implements OnInit {
  spaceshipPosition: Object = {};
  shots: any[] = [];
  shotsRef: any;

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const spaceShipRef = this.db.object('spaceship/'),
      spaceship$ = spaceShipRef.valueChanges(),
      shotsRef = this.db.list('shots/'),
      shots$ = shotsRef.valueChanges();

    this.shotsRef = shotsRef;

    fromEvent(document, 'click')
      .pipe(map(this.parseEvent))
      .subscribe(shot => shotsRef.push(shot));

    fromEvent(document, 'mousemove')
      .pipe(map(this.parseEvent))
      .subscribe(event => spaceShipRef.update(event));

    shots$
      .subscribe(shots => {
        if (shots.length && this.shots.length < shots.length) {
          this.shots.push(shots[shots.length - 1])
        } else {
          this.shots.shift();
        }
      });

    spaceship$
      .subscribe(event => this.spaceshipPosition = event);
  }

  parseEvent(event) {
    const offset = $(event.target).offset(),
      typeOfOffsetLeft = event.type === 'click' ? SHOT_OFFSET : SPACESHIP_OFFSET;

    return {
      x: event.clientX - offset.left - typeOfOffsetLeft,
      y: event.clientY - offset.top - SPACESHIP_OFFSET
    };
  }

  removeShot(shot) {
    if (shot) {
      this.shotsRef.remove(shot.$key);
    }
  }
}
