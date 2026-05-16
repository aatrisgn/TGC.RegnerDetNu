import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigurationLoaderService {
  private readonly http = new HttpClient(inject(HttpBackend));
  private configs: Configs | undefined;

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get<Configs>('/assets/config/runtime.config.json').pipe(map(res => res))
        .subscribe({
          next: value => {
            this.configs = value;
            resolve(true);
          },
          error: err => reject(err),
        });
    });
  }

  get config(): Configs | undefined {
    return this.configs;
  }

  get apiBaseUrl(): string {
    return this.configs?.ApiBaseURL || '';
  }
}

export interface Configs {
  EnvironmentType: string;
  ApiBaseURL: string;
  ClientId: string;
  Authority: string;
}
