import { Component, OnInit } from '@angular/core';
import { SeoService } from '../Services/SeoService';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Om os',
      'Hvem står bag RegnerDet.nu? Det er et godt spørgsmål. Vi er en gruppe dedikerede vejrentusiaster med stor passion for nedbørsdata og lav tolerance for at blive våd.',
      '/om-os'
    );
  }

}
