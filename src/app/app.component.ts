import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  examples = [
    { path: '/examples/00-basic-sequence', name: 'Basic Sequence'},
    { path: '/examples/01-maintaining-state', name: 'Maintaining State'},
    { path: '/examples/02-merging-streams', name: 'Merging Streams'},
    { path: '/examples/03-map-to-functions', name: 'Mapping to Functions'},
    { path: '/examples/04-triggers', name: 'Triggers'},
    { path: '/examples/05-stream-origin', name: 'Stream Origins'},
    { path: '/examples/06-simple-animation', name: 'Simple Animation'},
    { path: '/examples/07-animation', name: 'Animation'},
    { path: '/examples/08-counter', name: 'Counter'},
    { path: '/examples/09-slideshow', name: 'Slideshow'},
    { path: '/examples/10-location', name: 'Location'},
    { path: '/examples/11-map', name: 'Map'},
    { path: '/examples/12-annotate', name: 'Annotate'},
    { path: '/examples/13-game', name: 'Game'},
    { path: '/examples/14-slider', name: 'Slider'}
  ];

  // ngOnInit() {}


  // E6
  // circles: any[] = [];
  //
  // ngOnInit() {
  //   const OFFSET = 25;
  //   Observable.fromEvent(document, 'mousemove')
  //     .map(event => {
  //       return {x: event.clientX - OFFSET, y: event.clientY - OFFSET}
  //     })
  //     .subscribe(circle => {
  //       this.circles = [...this.circles, circle];
  //     })
  // }

  // E5
  // @ViewChild('ball') ball;
  // ngOnInit() {
  //   const OFFSET = 50;
  //
  //   Observable.fromEvent(document, 'click')
  //     .map(event => {
  //       return {x: event.clientX - OFFSET, y: event.clientY - OFFSET}
  //     })
  //     .subscribe(props => {
  //       TweenMax.to(this.ball.nativeElement, 1, props);
  //     })
  // }

  // E4
  // Observable.fromEvent(document, 'mousemove')
  // lines: any[] = [];
  // ngOnInit() {
  //   Observable.fromEvent(document, 'mousemove')
  //     .map(event => {
  //       return {x: event.pageX, y: event.pageY};
  //     })
  //     .pairwise(2)
  //     .map(positions => {
  //       const p1 = positions[0];
  //       const p2 = positions[1];
  //       return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
  //     })
  //     .subscribe(line => {
  //       this.lines = [...this.lines, line];
  //     });
  // }

  // E3
  // @ViewChild('ball') ball;
  // position: any;
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
  //     .switchMap(event => move$.takeUntil(up$))
  //     .startWith({ x: 100, y: 100})
  //     .subscribe(result => {
  //       this.position = result;
  //     });
  // }

  // E2
  // increment(obj, prop, value) {
  //   return Object.assign({}, obj, {[prop]: obj[prop] + value})
  // }
  //
  // decrement(obj, prop, value) {
  //   return Object.assign({}, obj, {[prop]: obj[prop] - value})
  // }
  //
  // ngOnInit() {
  //   const leftArrow$ = Observable.fromEvent(document, 'keydown')
  //     .filter(event => event.key === 'ArrowLeft')
  //     .mapTo(position => this.decrement(position, 'x', 10));
  //
  //   const rightArrow$ = Observable.fromEvent(document, 'keydown')
  //     .filter(event => event.key === 'ArrowRight')
  //     .mapTo(position => this.increment(position, 'x', 10));
  //
  //   const upArrow$ = Observable.fromEvent(document, 'keydown')
  //     .filter(event => event.key === 'ArrowUp')
  //     .mapTo(position => this.increment(position, 'x', 10));
  //
  //   const downArrow$ = Observable.fromEvent(document, 'keydown')
  //     .filter(event => event.key === 'ArrowDown')
  //     .mapTo(position => this.decrement(position, 'x', 10));
  //
  //   Observable.merge(leftArrow$, rightArrow$, upArrow$, downArrow$)
  //     .startWith({x: 100, y: 100})
  //     .scan((acc, curr) => curr(acc))
  //     .subscribe(result => {
  //       this.position = result;
  //     });
  // }

  // E1
  // @ViewChild('left') left;
  // @ViewChild('right') right;
  // position: any;
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
  //       this.position = result;
  //     });
  // }
  //
  // getNativeElement(element) {
  //   return element._elementRef.nativeElement;
  // }

  // E0.1
  // @ViewChild('btn') btn;
  // message: string;
  //
  // ngOnInit() {
  //   Observable.fromEvent(this.getNativeElement(this.btn), 'click')
  //     .filter(event => event.shiftKey)
  //     .map(event => 'Beast Mode Activated!')
  //     .subscribe(result => this.message = result);
  // }
  //
  // getNativeElement(element) {
  //   return element._elementRef.nativeElement;
  // }

  // E0.0
  // @ViewChild('btn') btn;
  // message: string;
  //
  // ngOnInit() {
  //   Observable.fromEvent(this.getNativeElement(this.btn), 'click')
  //     .subscribe(result => this.message = 'Beast Mode Activated!');
  // }
  //
  // getNativeElement(element) {
  //   return element._elementRef.nativeElement;
  // }
}
