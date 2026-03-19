import { Component, OnInit } from '@angular/core';
import { SeoService } from '../Services/SeoService';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css'],
  standalone: false
})
export class CareersComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Ledige stillinger',
      'Se åbne stillinger hos RegnerDet.nu. Vi søger altid dedikerede talenter inden for vejrdata, statistik og softwareudvikling. Er du vores næste medarbejder?',
      '/karriere'
    );
  }

}
