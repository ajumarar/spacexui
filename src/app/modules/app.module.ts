import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from '../components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HomeComponent} from '../components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SpaceXModule} from './space-x.module';
import {AppRoutingModule} from './app-routing.module';
import {SpaceXDataService} from '../services/space-x-data.service';
import {DetailsSectionComponent} from "../components/home/details-section/details-section.component";
import {DetailsDataService} from "../services/details-data.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsSectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    SpaceXModule,
  ],
  entryComponents: [
  ],
  providers: [
    SpaceXDataService,
    DetailsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

