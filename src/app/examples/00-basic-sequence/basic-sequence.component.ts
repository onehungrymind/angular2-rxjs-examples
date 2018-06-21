import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-basic-sequence',
  template: `
  <button #btn mat-raised-button color="accent">Click me!</button>
  <div class="container">
    <h1>{{message}}</h1>
  </div>
  `
})
export class BasicSequenceComponent implements OnInit {
  @ViewChild('btn') btn;
  message: string;

  ngOnInit() {
    fromEvent(this.getNativeElement(this.btn), 'click')
      .pipe(
        // filter((event: KeyboardEvent) => event.shiftKey), // Operator stacking
        map(event => 'Beast Mode Activated!')
      )
      .subscribe(result => this.message = result);
  }

  getNativeElement(element) {
    return element._elementRef.nativeElement;
  }
}
