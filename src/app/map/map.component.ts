import { Component, OnInit, ViewChild, ElementRef, Input, NgZone, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class MapComponent implements OnInit {

  @ViewChild('sourceSearch') sourceSearch: ElementRef;
  @ViewChild('destSearch') destSearch: ElementRef;


  sourcePlace: string;
  destPlace: string;
  sourceLatitude: number = 13.0827;
  sourceLongitude: number = 80.2707;
  destLatitude: number;
  destLongitude: number;
  zoom: number;
  dir: any;
  transportMode: string = 'DRIVING';
  directionHistory : any = [];

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }


  ngOnInit() {


    if(localStorage.getItem("directionHistory") != null){
      this.directionHistory = localStorage.getItem("directionHistory");
    }


    this.mapsAPILoader.load().then(() => {
      let fromautocomplete = new google.maps.places.Autocomplete(this.sourceSearch.nativeElement, {

      });
      fromautocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place = fromautocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          this.sourceLatitude = place.geometry.location.lat();
          this.sourceLongitude = place.geometry.location.lng();
        });
      });
      let toautocomplete = new google.maps.places.Autocomplete(this.destSearch.nativeElement, {

      });
      toautocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place = toautocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.destLatitude = place.geometry.location.lat();
          this.destLongitude = place.geometry.location.lng();
        });
      });
    });

    //this.setCurrentPosition();

  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.sourceLatitude = position.coords.latitude;
        this.sourceLongitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  setPanel() {
    return document.querySelector('#myPanel');
    
  }

  getDirection() {

    if (this.sourceLatitude && this.sourceLongitude && this.destLatitude && this.destLongitude) {
      this.dir = {
        origin: { lat: this.sourceLatitude, lng: this.sourceLongitude },
        destination: { lat: this.destLatitude, lng: this.destLongitude }
      }
      //this.addDirection(this.dir);
    }
  }

  addDirection(dir : any){

    console.log(this.sourcePlace + " " + this.destPlace);
    this.directionHistory.push(this.dir);
    
   // localStorage.setItem("directionHistory",JSON.stringify(this.directionHistory));

  }

}