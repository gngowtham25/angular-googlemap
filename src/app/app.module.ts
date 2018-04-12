import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction
import {AppRoutingModule} from './app-module.routing';
import {MapComponent} from './map/map.component';



import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyC9GZjCOYbO0nD_kH1xXFzVTu8tN2VFvVk",
      libraries: ["places"]
    }),
    AgmDirectionModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
