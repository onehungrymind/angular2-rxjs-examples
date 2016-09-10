import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
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
  position: any = {};

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const remote$ = this.af.database.object('event/');

    const local$ = Observable.fromEvent(this.getNativeElement(this.right), 'click')
      .map(event => 10)
      .startWith({x: 100, y: 100})
      .scan((acc, curr) => Object.assign({}, acc, {x: acc.x + curr}))
      .do(event => remote$.update(event))
      .subscribe();

    remote$
      .subscribe(result => {
        this.position = result;
      });
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
