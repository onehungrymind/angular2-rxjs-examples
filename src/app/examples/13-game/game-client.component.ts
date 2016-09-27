import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-game-client',
  template: `
    <div #spaceship class="spaceship"
      [style.left]="spaceshipPosition.x + 'px'"
      [style.top]="spaceshipPosition.y + 'px'">
    </div>
    <app-shot *ngFor="let shot of shots"
      (remove)="removeShotFromDom()"
      [style.left]="shot?.x + 'px'"
      [style.top]="shot?.y + 'px'"
    ></app-shot>
  `
})
export class GameClientComponent implements OnInit {
  spaceshipPosition: Object = {};
  shots: any[] = [];

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const spaceship$ = this.af.database.object('spaceship/'),
      shots$ = this.af.database.list('shots/');

    shots$
      .subscribe(shots => {
        if (shots.length && this.shots.length < shots.length) {
          this.shots.push(shots[shots.length - 1])
        } else {
          this.shots.shift();
        }
      });

    spaceship$
      .subscribe(position => this.spaceshipPosition = position);
  }

  removeShotFromDom() {
    this.shots.shift();
  }
}
