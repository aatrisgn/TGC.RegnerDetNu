import { Component, OnInit } from '@angular/core';
import { WheatherResponseDTO } from '../Models/WeatherResponseDTO';
import { OpenWeatherApiClient } from '../Services/OpenWeatherApiClient';
import { OpenWeahterTranslator } from '../Services/OpenWeatherTranslator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[OpenWeatherApiClient, OpenWeahterTranslator],
  standalone: false
})
export class HomeComponent implements OnInit {

  private _openWeatherApiClient:OpenWeatherApiClient;
  private _openWeahterTranslator:OpenWeahterTranslator;

  public IsItRainingText:string = "";
  public weatherType:string = "";
  public estimatedArea:string = "";
  public showEstimatedArea:boolean = false;
  public lat:number = 0;
  public lng:number = 0;
  public geoLocationAvailable:boolean = false;

  private currentWeather:WheatherResponseDTO = new WheatherResponseDTO();

  constructor(openWeatherApiClient:OpenWeatherApiClient, openWeahterTranslator:OpenWeahterTranslator) {
    this._openWeatherApiClient = openWeatherApiClient;
    this._openWeahterTranslator = openWeahterTranslator;
  }

  ngOnInit(): void {
    this.getLocation();
  }

  GetCurrentRainingSituation():void{
    if(this.geoLocationAvailable == false){
      this.estimatedArea = "Ingen anelse.";
      this.showEstimatedArea = true;
    } else {
      this.getLocation();
      this.estimatedArea = this.currentWeather.name;
      this.showEstimatedArea = true;

      let currentWeatherProperty = this.currentWeather.weather[0];

      let translatedDescription = this._openWeahterTranslator.TranslateWeatherDescription(currentWeatherProperty.id);

      if(currentWeatherProperty.description.includes("rain")){
        this.IsItRainingText = "Jep, kammerat. Internettet siger "+translatedDescription;
        this.weatherType = "rain";
      } else {
        this.IsItRainingText = "Nope! Du kan bare gå ud. Umiddelbart er det "+translatedDescription+"...";
        this.weatherType = "not rain";
      }
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this._openWeatherApiClient.GetWeatherByCoordinates(this.lat, this.lng).subscribe(response => {
            this.currentWeather = response;
            this.geoLocationAvailable = true;
          });
        }
      }, (geolocationPositionError) => this.callbackForMissingPermissions(geolocationPositionError) );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  callbackForMissingPermissions(geolocationPositionError: GeolocationPositionError ) : void {
    this.weatherType = "rain";
    if(geolocationPositionError.code == geolocationPositionError.PERMISSION_DENIED){
      this.IsItRainingText = "Du skal give adgang til din lokalitet. Ellers kan vi ikke tjekke vejret."
    } else if (geolocationPositionError.code == geolocationPositionError.POSITION_UNAVAILABLE){
      this.IsItRainingText = "Vi kunne desværre ikke bestemme din position præcist nok til at tjekke om det regner. Beklager."; 
    }
  }
}
