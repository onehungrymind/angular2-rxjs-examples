import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-maintaining-state',
  templateUrl: './maintaining-state.component.html',
  styleUrls: ['./maintaining-state.component.css']
})
export class MaintainingStateComponent implements OnInit {
  @ViewChild('left') left;
  @ViewChild('right') right;
  position: any;

  ngOnInit() {
    Observable.fromEvent(this.getNativeElement(this.right), 'click')
      .map(event => 10)
      .startWith({x: 100, y: 150})
      .scan((acc, curr) => Object.assign({}, acc, {x: acc.x + curr}))
      .subscribe(result => {
        this.position = result;
      });
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
