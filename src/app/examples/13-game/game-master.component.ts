import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

const SPACESHIP_OFFSET = 50,
  SHOT_OFFSET = 2;

@Component({
  selector: 'app-game-master',
  template: `
    <div #spaceship class="spaceship"
      [style.left]="spaceshipPosition.x + 'px'"
      [style.top]="spaceshipPosition.y + 'px'">
    </div>
    <app-shot *ngFor="let shot of shots"
      (remove)="removeShotFromDom(shot)"
      [style.left]="shot?.x + 'px'"
      [style.top]="shot?.y + 'px'"
    ></app-shot>
  `
})
export class GameMasterComponent implements OnInit {
  spaceshipPosition: Object = {};
  shots: any[] = [];
  shots$: any;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const spaceship$ = this.af.database.object('spaceship/'),
      shots$ = this.af.database.list('shots/');

    this.shots$ = shots$;

    Observable.fromEvent(document, 'click')
      .map(this.parseEvent)
      .subscribe(shot => shots$.push(shot));

    Observable.fromEvent(document, 'mousemove')
      .map(this.parseEvent)
      .subscribe(event => spaceship$.update(event));

    shots$
      .subscribe(shots => this.shots.push(shots[shots.length - 1]));

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

  removeShotFromDom(shot) {
    if (shot) {
      this.shots$.remove(shot.$key);
    }
  }
}
