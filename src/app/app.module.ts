import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import { CircleComponent } from './circle/circle.component';
import { LineComponent } from './line/line.component';

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
  CounterClientComponent,
  CounterMasterComponent,
  SlideshowComponent,
  LocationComponent,
  LocationClientComponent,
  LocationMasterComponent,
  MapComponent,
  MapClientComponent,
  MapMasterComponent,
  AnnotateComponent,
  AnnotateClientComponent,
  AnnotateMasterComponent,
  GameComponent,
  SliderComponent
} from './examples';

export const firebaseConfig = {
  apiKey: 'AIzaSyCCaWqJfZuHmVAc7ICV4XA4v_q1fJFkFmM',
  authDomain: 'rxjsbeastmode.firebaseapp.com',
  databaseURL: 'https://rxjsbeastmode.firebaseio.com',
  storageBucket: ''
};

@NgModule({
  declarations: [
    AppComponent,
    CircleComponent,
    LineComponent,
    BasicSequenceComponent,
    BasicSequenceComponent,
    MaintainingStateComponent,
    MergingStreamsComponent,
    MapToFunctionsComponent,
    TriggersComponent,
    StreamOriginComponent,
    SimpleAnimationComponent,
    AnimationComponent,
    CounterComponent,
    CounterClientComponent,
    CounterMasterComponent,
    SlideshowComponent,
    LocationComponent,
    LocationClientComponent,
    LocationMasterComponent,
    MapComponent,
    MapClientComponent,
    MapMasterComponent,
    AnnotateComponent,
    AnnotateClientComponent,
    AnnotateMasterComponent,
    GameComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
