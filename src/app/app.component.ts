import { Component } from '@angular/core';
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
}
