import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import {
  BasicSequenceComponent,
  MaintainingStateComponent,
  MergingStreamsComponent,
  MapToFunctionsComponent,
  TriggersComponent,
  StreamOriginComponent,
  SimpleAnimationComponent,
  AnimationComponent,
  CounterComponent,
  SlideshowComponent,
  LocationComponent,
  MapComponent,
  AnnotateComponent,
  GameComponent,
  SliderComponent
} from './examples';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/examples/00-basic-sequence',
    pathMatch: 'full'
  },
  { path: 'examples/00-basic-sequence', component: BasicSequenceComponent },
  { path: 'examples/01-maintaining-state', component: MaintainingStateComponent },
  { path: 'examples/02-merging-streams', component: MergingStreamsComponent },
  { path: 'examples/03-map-to-functions', component: MapToFunctionsComponent },
  { path: 'examples/04-triggers', component: TriggersComponent },
  { path: 'examples/05-stream-origin', component: StreamOriginComponent },
  { path: 'examples/06-simple-animation', component: SimpleAnimationComponent },
  { path: 'examples/07-animation', component: AnimationComponent },
  { path: 'examples/08-counter', component: CounterComponent },
  { path: 'examples/09-slideshow', component: SlideshowComponent },
  { path: 'examples/10-location', component: LocationComponent },
  { path: 'examples/11-map', component: MapComponent },
  { path: 'examples/12-annotate', component: AnnotateComponent },
  { path: 'examples/13-game', component: GameComponent },
  { path: 'examples/14-slider', component: SliderComponent }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);