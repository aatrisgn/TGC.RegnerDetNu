import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WheatherResponseDTO } from '../Models/WeatherResponseDTO';
import { Observable } from 'rxjs';

@Injectable()
export class OpenWeatherApiClient {
    private _httpClient:HttpClient

    constructor(private httpClient: HttpClient) {
        this._httpClient = httpClient;
    }

    public GetWeatherByCoordinates(lattitude:number, longitude:number) : Observable<WheatherResponseDTO> {
        let queryString:string;

        queryString = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=de7f7fe57c69dced8f28fa28a3b2a4e2&units=metric`

        return this._httpClient.get<WheatherResponseDTO>(queryString)
    }
}
