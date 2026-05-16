import { ApplicationConfig, importProvidersFrom, inject, NgModule, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MissionComponent } from './mission/mission.component';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { ConfigurationLoaderService } from './Services/ConfigurationLoader.service';


//TODO: This should be changed to new angular format
// @NgModule({
//   declarations: [
//     AppComponent,
//     HomeComponent,
//     MissionComponent,
//     AboutComponent,
//     CareersComponent,
//     ContactComponent,
//     PageNotFoundComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     NgbModule,
//     MatToolbarModule,
//     MatIconModule,
//     HttpClientModule
//   ],
//   providers: [
//     {
//       provide: ConfigurationLoaderService,
//       useFactory: () => {
//         var configurationService = inject(ConfigurationLoaderService);
//         return configurationService.init();
//       }
//     }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


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
