import { Component, OnInit, NgZone, inject, signal } from '@angular/core';
import { SeoService } from '../Services/SeoService';
import { AnonymousAuthenticationProvider } from "@microsoft/kiota-abstractions";
import { FetchRequestAdapter } from "@microsoft/kiota-http-fetchlibrary";
import { createApiClient } from '../auto_generated/client/apiClient';
import { ConfigurationLoaderService } from '../Services/ConfigurationLoader.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NgbModule, CommonModule],
  standalone: true
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);
  private readonly ngZone = inject(NgZone);
  private readonly configurationLoaderService = inject(ConfigurationLoaderService);

  protected readonly isItRainingText = signal('');
  protected readonly weatherType = signal('');
  protected readonly estimatedArea = signal('');
  protected readonly showEstimatedArea = signal(false);

  private readonly lat = signal(0);
  private readonly lng = signal(0);
  private readonly geoLocationAvailable = signal(false);

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Regner det nu? Tjek vejret i realtid',
      'RegnerDet.nu svarer på det vigtigste spørgsmål: Regner det nu? Få real-time vejropdatering baseret på præcis din placering – hurtigt og nemt.',
      '/'
    );
    this.getLocation();
  }

  protected getCurrentRainingSituation(): void {
    if (!this.geoLocationAvailable()) {
      this.estimatedArea.set('Ingen anelse.');
      this.showEstimatedArea.set(true);
    } else {
      this.fetchCurrentWeather(this.lat(), this.lng());
    }
  }

  private fetchCurrentWeather(latitude: number, longitude: number): void {
    //This initialization part should probably be fixed
    const authProvider = new AnonymousAuthenticationProvider();
    const adapter = new FetchRequestAdapter(authProvider);
    adapter.baseUrl = this.configurationLoaderService.apiBaseUrl;
    const client = createApiClient(adapter);

    client.api.weather.current
      .byLongitude(longitude.toString())
      .byLatitude(latitude.toString())
      .get()
      .then(response => {
        this.estimatedArea.set(response?.area ?? 'Ingen anelse.');
        this.showEstimatedArea.set(true);

        if (response?.doesItRain) {
          this.isItRainingText.set(`Jep, kammerat. Internettet siger ${response.weatherDescription}`);
          this.weatherType.set('rain');
        } else {
          this.isItRainingText.set(`Nope! Du kan bare gå ud. Umiddelbart er det ${response?.weatherDescription}...`);
          this.weatherType.set('not rain');
        }
      });
  }

  private getLocation(): void {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => this.ngZone.run(() => {
        this.lat.set(position.coords.latitude);
        this.lng.set(position.coords.longitude);
        this.geoLocationAvailable.set(true);
      }),
      (error) => this.ngZone.run(() => this.handleGeolocationError(error))
    );
  }

  private handleGeolocationError(error: GeolocationPositionError): void {
    this.weatherType.set('rain');
    if (error.code === error.PERMISSION_DENIED) {
      this.isItRainingText.set('Du skal give adgang til din lokalitet. Ellers kan vi ikke tjekke vejret.');
    } else if (error.code === error.POSITION_UNAVAILABLE) {
      this.isItRainingText.set('Vi kunne desværre ikke bestemme din position præcist nok til at tjekke om det regner. Beklager.');
    }
  }
}
