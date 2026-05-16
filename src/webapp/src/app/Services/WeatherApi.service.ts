import { Injectable, inject } from '@angular/core';
import { AnonymousAuthenticationProvider } from '@microsoft/kiota-abstractions';
import { FetchRequestAdapter } from '@microsoft/kiota-http-fetchlibrary';
import { createApiClient } from '../auto_generated/client/apiClient';
import { GetCurrentWeatherQueryResponse } from '../auto_generated/client/models';
import { ConfigurationLoaderService } from './ConfigurationLoader.service';

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
  private readonly config = inject(ConfigurationLoaderService);

  private _client: ReturnType<typeof createApiClient> | undefined;

  private get client() {
    if (!this._client) {
      const adapter = new FetchRequestAdapter(new AnonymousAuthenticationProvider());
      adapter.baseUrl = this.config.apiBaseUrl;
      this._client = createApiClient(adapter);
    }
    return this._client;
  }

  getCurrentWeather(latitude: number, longitude: number): Promise<GetCurrentWeatherQueryResponse | undefined> {
    return this.client.api.weather.current
      .byLongitude(longitude.toString())
      .byLatitude(latitude.toString())
      .get();
  }
}
