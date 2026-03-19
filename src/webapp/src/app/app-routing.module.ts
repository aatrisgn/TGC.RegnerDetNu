import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MissionComponent } from './mission/mission.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'mission', component: MissionComponent},
  {path:'om-os', component: AboutComponent},
  {path:'karriere', component: CareersComponent},
  {path:'kontakt', component: ContactComponent},
  // Redirects for old English routes
  {path:'making-the-world-a-better-place', redirectTo: 'mission', pathMatch: 'full'},
  {path:'know-the-people', redirectTo: 'om-os', pathMatch: 'full'},
  {path:'your-path-in-live', redirectTo: 'karriere', pathMatch: 'full'},
  {path:'reach-out', redirectTo: 'kontakt', pathMatch: 'full'},
  {path:'home', redirectTo: '', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
