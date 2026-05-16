import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, NgbCollapseModule],
  standalone: true
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  title = 'RegnerDet.nu';
  isNavbarCollapsed = true;
  private readonly _destroying$ = new Subject<void>();

  collapseMenu():void{
    this.isNavbarCollapsed = true;
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

}
