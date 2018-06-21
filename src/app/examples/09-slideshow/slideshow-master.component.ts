import { Component, OnInit, ViewChild } from '@angular/core';
import { images } from './images';
import { fromEvent, merge } from 'rxjs';
import { map, scan, startWith } from 'rxjs/internal/operators';
import { AngularFireDatabase } from 'angularfire2/database';

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

  constructor(private db: AngularFireDatabase) {}

  ngOnInit() {
    const remoteRef = this.db.object('slideshow/');

    const previous$ = fromEvent(this.getNativeElement(this.previous), 'click')
      .pipe(map(event => {return {shift: -1, direction: 'right'}}));

    const next$ = fromEvent(this.getNativeElement(this.next), 'click')
      .pipe(map(event => {return {shift: +1, direction: 'left'}}));

    merge(previous$, next$)
      .pipe(
        startWith({index: 0} as any),
        scan((acc, curr) => {
          const projectedIndex = acc.index + curr.shift;

          let adjustedIndex = projectedIndex < 0 ? this.images.length - 1
            : projectedIndex >= this.images.length ? 0
              : projectedIndex;

          return {index: adjustedIndex, direction: curr.direction};
        })
      )
      .subscribe(event => remoteRef.update(event));
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
