import { Component, OnInit } from '@angular/core';
import { SeoService } from '../Services/SeoService';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  standalone: false
})
export class PageNotFoundComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Side ikke fundet',
      'Den side du leder efter findes ikke på RegnerDet.nu. Måske er den skyllet væk af regnen.',
      ''
    );
  }

}
