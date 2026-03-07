import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  title = 'RegnerDet.nu';
  isNavbarCollapsed = true;

  collapseMenu():void{
    this.isNavbarCollapsed = true;
  }
}
