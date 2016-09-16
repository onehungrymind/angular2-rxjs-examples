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
    <div 
      [@imageChange]="currentImage" 
      [style.background-image]="'url(' + currentImage + ')'"
    ></div>
  `,
  styles: [`
    div {
      width: 100%;
      height: 50vw;
      max-height: 500px;
      background-size: cover;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  `],
  animations: [
    trigger('imageChange', [
      transition('* => *', [
        style({opacity: 0}),
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class SlideshowClientComponent implements OnInit {
  position: any;
  images: any[] = images;
  currentImage: string = '';

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('slideshow/');

    remote$
      .startWith({index: 0})
      .subscribe(event => this.currentImage = this.images[event.index]);
  }
}
