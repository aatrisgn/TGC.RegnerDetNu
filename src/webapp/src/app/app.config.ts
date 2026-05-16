import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { ConfigurationLoaderService } from './Services/ConfigurationLoader.service';

export const appConfig: ApplicationConfig = {
  providers: [
    ConfigurationLoaderService,
    provideAppInitializer(() => {
      var configurationService = inject(ConfigurationLoaderService);
      return configurationService.init();
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      MatToolbarModule,
      MatIconModule,
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch())
  ],
};
