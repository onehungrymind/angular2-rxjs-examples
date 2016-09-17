import { Component, OnInit,  trigger, style, transition, animate } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { images } from './images';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-slideshow-client',
  template: `
    <div class="slide-wrapper">
      <div *ngFor="let image of images; let i = index">
        <div 
          class="slide"
          *ngIf="i === currentIndex"
          [@imageChange]="currentDirection" 
          [style.background-image]="'url(' + image + ')'"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    .slide-wrapper {
      height: 50vw;
      max-height: 500px;
    }
    
    .slide {
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
      position: absolute;
      top: 24px;
      bottom: 24px;
      right: 24px;
      left: 24px;
    }
  `],
  animations: [
    trigger('imageChange', [
      transition('void => left', [
        style({transform: 'translateX(100vw)'}),
        animate('300ms ease-in-out')
      ]),
      transition('left => void', [
        animate('300ms ease-in-out', style({transform: 'translateX(-100vw)'}))
      ]),
      transition('void => right', [
        style({transform: 'translateX(-100vw)'}),
        animate('300ms ease-in-out')
      ]),
      transition('right => void', [
        animate('300ms ease-in-out', style({transform: 'translateX(100vw)'}))
      ])
    ])
  ]
})
export class SlideshowClientComponent implements OnInit {
  position: any;
  images: any[] = images;
  currentIndex: number = 0;
  currentDirection: string = 'left';

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('slideshow/');

    remote$
      .startWith({index: 0, direction: 'left'})
      .subscribe(event => {
        this.currentIndex = event.index;
        this.currentDirection = event.direction;
      });
  }
}
