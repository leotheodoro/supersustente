import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocaleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocaleProvider {

  private url: string = "https://maps.googleapis.com/maps/api/geocode/json?";
  private key: string = "AIzaSyCkyE2yG8uEzA_WqpvkWIN1noz1QZSlhmM";

  constructor(public http: Http) {
  }

  getLocaleByLatLng(lat,lon) {
    return this.http.get(`${this.url}latlng=${lat},${lon}&key=${this.key}`)
  }

}
