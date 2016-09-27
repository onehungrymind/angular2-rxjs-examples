import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import 'gsap';

@Component({
  selector: 'app-shot',
  template: `<div #shot class="shot"></div>`,
  styles: [`
    .shot {
      pointer-events: none;
      position: absolute;
      width: 5px;
      height: 10px;
      background: cyan;
      border-radius: 2px;
    }
  `]
})

export class ShotComponent implements OnInit{
  @ViewChild('shot') shot;
  @Output() remove: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    TweenMax.to(this.shot.nativeElement, 2, {top: -1000, onComplete: () => {
      this.remove.emit();
    }});
  }
}
