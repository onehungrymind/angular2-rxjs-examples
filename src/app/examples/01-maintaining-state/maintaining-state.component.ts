import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

interface Coordinate {
  x: number,
  y: number
}

@Component({
  selector: 'app-maintaining-state',
  template: `
  <button #right md-raised-button color="accent">Move Right</button>
  <div class="container">
    <div #ball class="ball"
      [style.left]="position.x + 'px'"
      [style.top]="position.y + 'px'">
    </div>
  </div>
  `
})
export class MaintainingStateComponent implements OnInit {
  @ViewChild('right') right;
  position: any;

  ngOnInit() {
    Observable.fromEvent(this.getNativeElement(this.right), 'click')
      .map(event => 10)
      .scan((acc: Coordinate, curr) => Object.assign({}, acc, {x: acc.x + curr}))
      .startWith({x: 100, y: 150})
      .subscribe(position => this.position = position);
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
