import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../Services/SeoService';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],
  standalone: true
})
export class MissionComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPageMeta(
      'Vores Mission',
      'Læs om RegnerDet.nu\'s mission – kampen mod naturen, for klimaet og for et bedre samfund. Vi er dedikerede til at gøre verden til et bedre sted, ét vejr-check ad gangen.',
      '/mission'
    );
  }
}
