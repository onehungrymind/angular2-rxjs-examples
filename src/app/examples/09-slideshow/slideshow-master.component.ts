import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { images } from './images';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-slideshow-master',
  template: `
  <button #previous md-raised-button color="accent">Previous</button>
  <button #next md-raised-button color="accent">Next</button>
  `
})
export class SlideshowMasterComponent implements OnInit {
  @ViewChild('previous') previous;
  @ViewChild('next') next;
  images: any[] = images;
  position: any;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('slideshow/');

    const previous$ = Observable.fromEvent(this.getNativeElement(this.previous), 'click')
      .map(event => {return {shift: -1, direction: 'right'}});

    const next$ = Observable.fromEvent(this.getNativeElement(this.next), 'click')
      .map(event => {return {shift: +1, direction: 'left'}});

    Observable.merge(previous$, next$)
      .startWith({index: 0})
      .scan((acc, curr) => {
        const projectedIndex = acc.index + curr.shift;

        let adjustedIndex = projectedIndex < 0 ? this.images.length - 1
          : projectedIndex >= this.images.length ? 0
          : projectedIndex;

        return {index: adjustedIndex, direction: curr.direction};
      })
      .do(event => remote$.update(event))
      .subscribe(result => {
        this.position = result;
      });
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
