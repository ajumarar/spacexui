import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsDataService {
  private yearPassed: BehaviorSubject<any>;
  private landingPassed: BehaviorSubject<any>;
  private launchPassed: BehaviorSubject<any>;
  private firstLoad: BehaviorSubject<any>
  public yearPassedObservable: Observable<any>;
  public landingPassedObservable: Observable<any>;
  public launchPassedObservable: Observable<any>;
  public firstLoadPassedObservable: Observable<any>;

  constructor() {
    this.yearPassed = new BehaviorSubject<any>(null);
    this.yearPassedObservable = this.yearPassed.asObservable();

    this.landingPassed = new BehaviorSubject<any>(null);
    this.landingPassedObservable = this.landingPassed.asObservable();

    this.launchPassed = new BehaviorSubject<any>(null);
    this.launchPassedObservable = this.launchPassed.asObservable();

    this.firstLoad = new BehaviorSubject<any>(true);
    this.firstLoadPassedObservable = this.firstLoad.asObservable();
  }


  public setAllPassed(year: any, landing: any, launch: any, ifFirstLoad) {
    this.yearPassed.next(year);
    this.launchPassed.next(launch);
    this.landingPassed.next(landing);
    this.firstLoad.next(ifFirstLoad);
  }
}
