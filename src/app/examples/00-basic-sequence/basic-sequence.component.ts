import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-basic-sequence',
  templateUrl: './basic-sequence.component.html',
  styleUrls: ['./basic-sequence.component.css']
})
export class BasicSequenceComponent implements OnInit {
  @ViewChild('btn') btn;
  message: string;

  constructor(private af: AngularFire) {}

  ngOnInit() {
    const local$ = Observable.fromEvent(this.getNativeElement(this.btn), 'click')
      // .filter(event => event.shiftKey) // Operator stacking
      .map(event => {return {message: 'Beast Mode Activated!'}})
      .do(event => remote$.update(event))
      .subscribe();

    const remote$ = this.af.database.object('event/');

    remote$
      .do(event => console.log('event', event))
      .subscribe(result => this.message = result.message);
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
