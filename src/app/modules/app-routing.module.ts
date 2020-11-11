import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from '../components/home/home.component';
import {DetailsSectionComponent} from "../components/home/details-section/details-section.component";
// Import Components



const appRoutes: Routes = [
  // Landing Page
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'details-section',
        component: DetailsSectionComponent
      },
      // On Incorrect URLS
      {
        path: '',
        redirectTo: 'details-section',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'details-section',
        pathMatch: 'full',
      }
    ]
  },
  // On Incorrect URLS
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
