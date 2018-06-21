import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-animation',
  template: `
  <div class="container">
    <app-circle
      *ngFor="let circle of circles"
      [style.left]="circle.x + 'px'"
      [style.top]="circle.y + 'px'">
    </app-circle>
  </div>
  `
})
export class AnimationComponent implements OnInit {
  circles: any[] = [];

  ngOnInit() {
    const BALL_OFFSET = 25;

    fromEvent(document, 'mousemove')
      .pipe(
        map((event: MouseEvent) => {
          const offset = $(event.target).offset();
          return {
            x: event.clientX - offset.left - BALL_OFFSET,
            y: event.pageY - BALL_OFFSET
          };
        })
      )
      .subscribe(circle => this.circles = [...this.circles, circle])
  }
}
