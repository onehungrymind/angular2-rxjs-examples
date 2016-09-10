import {Component, OnInit, ViewChild} from '@angular/core';
import 'gsap';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {
  @ViewChild('circle') circle;

  ngOnInit() {
    TweenMax.to(this.circle.nativeElement, 2,
      {alpha: 0, width: 0, height: 0});
  }
}
