import { Component, OnInit } from '@angular/core';
import { SeoService } from '../Services/SeoService';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false
})
export class ContactComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Kontakt',
      'Vil du komme i kontakt med RegnerDet.nu? Vi kontakter dig, når tiden er moden. Hold øje med din indbakke.',
      '/kontakt'
    );
  }

}
