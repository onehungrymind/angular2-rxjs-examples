import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/takeUntil';
import 'gsap';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent implements OnInit {
  // ngOnInit() {}
  circles: any[] = [];

  ngOnInit() {
    const OFFSET = 25;
    Observable.fromEvent(document, 'mousemove')
      .map(event => {
        return { x: event.clientX, y: event.clientY}
      })
      .subscribe(event => {
        this.circles = [...this.circles, { x: event.x - OFFSET, y: event.y - OFFSET}];
      })
  }

  // @ViewChild('ball') ball;
  // ngOnInit() {
  //   const OFFSET = 50;
  //
  //   // Observable.fromEvent(document, 'click')
  //   Observable.fromEvent(document, 'mousemove')
  //     .map(event => {
  //       return {x: event.clientX - OFFSET, y: event.clientY - OFFSET}
  //     })
  //     .subscribe(event => {
  //       TweenMax.to(this.ball.nativeElement, 1, {x: event.x, y: event.y});
  //     })
  // }

  // ngOnInit() {
  //
  //   // Observable.fromEvent(document, 'click')
  //   Observable.fromEvent(document, 'mousemove')
  //     .map(event => {
  //       return {x: event.pageX, y: event.pageY};
  //     })
  //     .pairwise(2)
  //     .subscribe(coordinates => {
  //       const c1 = coordinates[0];
  //       const c2 = coordinates[1];
  //       const line = $(`
  //         <svg style="position: absolute" width="1000" height="1000">
  //           <line x1="${c1.x}" y1="${c1.y}"
  //             x2="${c2.x}" y2="${c2.y}"
  //             style="stroke:rgb(255,0,0);stroke-width:2" />
  //         </svg>
  //       `);
  //       $('.container').append(line);
  //     });
  // }

  // ngOnInit() {
  //   Observable.fromEvent(document, 'mousemove')
  //     .map(event => {
  //       return { x: event.clientX, y: event.clientY}
  //     })
  //     .subscribe(event => {
  //       const circle = $(`<span class="circle"></span>`);
  //       circle.css({
  //         left:event.x,
  //         top:event.y
  //       })
  //       $('.container').append(circle);
  //     })
  // }

  // @ViewChild('ball') ball;
  //
  // coordinates = {
  //   x: 100,
  //   y: 100
  // };
  //
  // ngOnInit() {
  //   const OFFSET = 50;
  //   const move$ = Observable.fromEvent(document, 'mousemove')
  //     .map(event => {
  //       return {x: event.pageX - OFFSET, y: event.pageY - OFFSET};
  //     });
  //
  //   const down$ = Observable.fromEvent(this.ball.nativeElement, 'mousedown');
  //   const up$ = Observable.fromEvent(document, 'mouseup');
  //
  //   down$
  //     .mergeMap(event => move$.takeUntil(up$))
  //     .subscribe(result => {
  //       this.coordinates = result;
  //     });
  // }

  // ngOnInit() {
  //   const leftArrow$ = Observable.fromEvent(document, 'keydown')
  //     .filter(event => event.key === 'ArrowLeft')
  //     .mapTo(coordinates => Object.assign({}, coordinates, {x: coordinates.x - 10}));
  //
  //   const rightArrow$ = Observable.fromEvent(document, 'keydown')
  //     .filter(event => event.key === 'ArrowRight')
  //     .mapTo(coordinates => Object.assign({}, coordinates, {x: coordinates.x + 10}));
  //
  //   const upArrow$ = Observable.fromEvent(document, 'keydown')
  //     .filter(event => event.key === 'ArrowUp')
  //     .mapTo(coordinates => Object.assign({}, coordinates, {y: coordinates.y - 10}));
  //
  //   const downArrow$ = Observable.fromEvent(document, 'keydown')
  //     .filter(event => event.key === 'ArrowDown')
  //     .mapTo(coordinates => Object.assign({}, coordinates, {y: coordinates.y + 10}));
  //
  //   Observable.merge(leftArrow$, rightArrow$, upArrow$, downArrow$)
  //     .startWith({x: 100, y: 100})
  //     .scan((acc, curr) => curr(acc))
  //     .subscribe(result => {
  //       this.coordinates = result;
  //     });
  // }

  // @ViewChild('left') left;
  // @ViewChild('right') right;
  // @ViewChild('ball') ball;
  //
  // ngOnInit() {
  //   const left$ = Observable.fromEvent(this.getNativeElement(this.left), 'click')
  //     .map(event => -10);
  //
  //   const right$ = Observable.fromEvent(this.getNativeElement(this.right), 'click')
  //     .map(event => 10);
  //
  //   Observable.merge(left$, right$)
  //     .startWith({x: 100, y: 100})
  //     .scan((acc, curr) => Object.assign({}, acc, {x: acc.x + curr}))
  //     .subscribe(result => {
  //       this.coordinates = result;
  //     });
  // }
  //
  // getNativeElement(element) {
  //   return element._elementRef.nativeElement;
  // }
}
