import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-game-client',
  template: `
    <div #spaceship class="spaceship"
      [style.left]="spaceshipPosition.x + 'px'"
      [style.top]="spaceshipPosition.y + 'px'">
    </div>
    <app-shot *ngFor="let shot of shots"
      [style.left]="shot?.x + 'px'"
      [style.top]="shot?.y + 'px'"
    ></app-shot>
  `
})
export class GameClientComponent implements OnInit {
  spaceshipPosition: Object = {};
  shots: any[] = [];

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const spaceship$ = this.db.object('spaceship/').valueChanges(),
      shots$ = this.db.list('shots/').valueChanges();

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
}
