import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const BASE_URL = 'https://regnerdet.nu';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  setPageMeta(pageTitle: string, description: string, canonicalPath: string = '') {
    const fullTitle = `${pageTitle} – RegnerDet.nu`;
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });

    const canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }
  }
}
