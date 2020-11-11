import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SpaceXDataService} from '../../../services/space-x-data.service';
import {DetailsDataService} from '../../../services/details-data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.scss']
})
export class DetailsSectionComponent implements OnInit {
  public paramGroup: Params = [];
  public paramValue: any;
  public selectedYearSubscription: Subscription;
  public selectedLandingSubscription: Subscription;
  public selectedLaunchSubscription: Subscription;
  public ifFirstLoadSubscription: Subscription;
  public recievedYear: any;
  public recievedLaunch: any;
  public recievedLanding: any;
  public ifFirstLoad: boolean;
  public detailsData: any[];
  public lazyLoadNumber: any[];
  public lazyLoadActive: boolean;
  @Output() public sendYear = new EventEmitter<number>();
  @Output() public sendLaunch = new EventEmitter<boolean>();
  @Output() public sendLand = new EventEmitter<boolean>();

  constructor(private route: ActivatedRoute,
              private spaceXDataService: SpaceXDataService,
              private detailsDataService: DetailsDataService,
              private router: Router) {
    this.paramGroup = this.route.parent.queryParams;
    this.paramValue = this.paramGroup._value;
    this.detailsData = [];
    this.lazyLoadNumber = [1, 2, 3, 4, 5, 6, 7, 8];
    this.lazyLoadActive = false;
    this.selectedYearSubscription = null;
    this.selectedLandingSubscription = null;
    this.selectedLaunchSubscription = null;
    this.ifFirstLoadSubscription = null;
  }

  ngOnInit() {

    // Selected Year Data
    this.selectedYearSubscription = this.detailsDataService.yearPassedObservable.subscribe((year) => {
      this.recievedYear = year;
    });

    // Landing Data
    this.selectedLandingSubscription = this.detailsDataService.landingPassedObservable.subscribe((landing) => {
      this.recievedLanding = landing;
    });

    // Launch Data
    this.selectedLaunchSubscription = this.detailsDataService.launchPassedObservable.subscribe((launch) => {
      this.recievedLaunch = launch;
    });

    // IfFirstLoad
    this.ifFirstLoadSubscription = this.detailsDataService.firstLoadPassedObservable.subscribe((ifFirstload) => {
      this.ifFirstLoad = ifFirstload;
      if (!ifFirstload) {
        this.detailsData = [];
        if (this.recievedYear !== null && this.recievedLaunch === null && this.recievedLanding === null) {
          this.getDataForThatYearAlone(this.recievedYear);
        } else if (this.recievedYear === null && this.recievedLaunch !== null && this.recievedLanding === null) {
          this.getDataForLaunchSuccessAlone(this.recievedLaunch);
        } else if (this.recievedYear === null && this.recievedLaunch === null && this.recievedLanding !== null) {
          this.getDataForLandSuccessAlone(this.recievedLanding);
        } else if (this.recievedYear !== null && this.recievedLaunch !== null && this.recievedLanding === null) {
          this.getDataForThatYearWithLaunch(this.recievedYear, this.recievedLaunch);
        } else if (this.recievedYear !== null && this.recievedLaunch === null && this.recievedLanding !== null) {
          this.getDataForThatYearWithLand(this.recievedYear, this.recievedLanding);
        } else if (this.recievedYear === null && this.recievedLaunch !== null && this.recievedLanding !== null) {
          this.getDataForThatLaunchAndLand(this.recievedLaunch, this.recievedLanding);
        } else if (this.recievedYear !== null && this.recievedLaunch !== null && this.recievedLanding !== null) {
          this.getDataForThatYear(this.recievedYear, this.recievedLaunch, this.recievedLanding);
        }
      }
    });


    // On refresh getting the datas
    if (this.ifFirstLoad) {
      this.detailsData = [];

      if (Object.getOwnPropertyNames(this.paramValue).length === 0) {
        this.getFullData();
      } else {
        this.sendYear.emit(this.paramValue.years);
        this.sendLaunch.emit(this.paramValue.successfulLaunch);
        this.sendLand.emit(this.paramValue.successfulLanding);
        if (this.paramValue.years !== null && !this.paramValue.successfulLaunch && !this.paramValue.successfulLanding) {
          this.getDataForThatYearAlone(this.paramValue.years);
        } else if (!this.paramValue.years && this.paramValue.successfulLaunch !== null && !this.paramValue.successfulLanding) {
          this.getDataForLaunchSuccessAlone(this.paramValue.successfulLaunch);
        } else if (!this.paramValue.years && !this.paramValue.successfulLaunch && this.paramValue.successfulLanding !== null) {
          this.getDataForLandSuccessAlone(this.paramValue.successfulLaunch);
        } else if (this.paramValue.years !== null && this.paramValue.successfulLaunch !== null && !this.paramValue.successfulLanding) {
          this.getDataForThatYearWithLaunch(this.paramValue.years, this.paramValue.successfulLaunch);
        } else if (this.paramValue.years !== null && !this.paramValue.successfulLaunch && this.paramValue.successfulLanding !== null) {
          this.getDataForThatYearWithLand(this.paramValue.years, this.paramValue.successfulLanding);
        } else if (!this.paramValue.years && this.paramValue.successfulLaunch !== null && this.paramValue.successfulLanding !== null) {
          this.getDataForThatLaunchAndLand(this.paramValue.successfulLaunch, this.paramValue.successfulLanding);
        } else if (this.paramValue.years !== null && this.paramValue.successfulLaunch !== null && this.paramValue.successfulLanding !== null) {
          this.getDataForThatYear(this.paramValue.years, this.paramValue.successfulLaunch, this.paramValue.successfulLanding);
        }
        // this.getDataForThatYear(this.paramValue.years, this.paramValue.successfulLaunch, this.paramValue.successfulLanding);
      }
    }
  }


  // Get full data without filter
  getFullData() {
    const getSpaceXFullData = this.spaceXDataService.getSpaceXFullData();
    this.lazyLoadActive = true;
    getSpaceXFullData.then(response => {
      this.detailsData = response;
    }).then(arg => {
      setTimeout(() => {
        this.lazyLoadActive = false;
      }, 1000);

    });
  }

// Getting the data for that year
  getDataForThatYear(year, launch, land) {
    const getDataBasedOnYear = this.spaceXDataService.getSpaceXDataOnYear(year, launch, land);
    this.lazyLoadActive = true;
    getDataBasedOnYear.then(response => {
      this.detailsData = response;
    }).then(arg => {
      setTimeout(() => {
        this.lazyLoadActive = false;
      }, 1000);

    });
  }

// Getting the data for that year only

  getDataForThatYearAlone(year) {
    const getDataBasedOnYear = this.spaceXDataService.getDataYearAlone(year);
    this.lazyLoadActive = true;
    getDataBasedOnYear.then(response => {
      this.detailsData = response;
    }).then(arg => {
      setTimeout(() => {
        this.lazyLoadActive = false;
      }, 1000);

    });
  }

// Getting the data for that launch Success only
  getDataForLaunchSuccessAlone(launch) {
    const getDataBasedOnYear = this.spaceXDataService.getDataLaunchAlone(launch);
    this.lazyLoadActive = true;
    getDataBasedOnYear.then(response => {
      this.detailsData = response;
    }).then(arg => {
      setTimeout(() => {
        this.lazyLoadActive = false;
      }, 1000);

    });
  }
  // Getting the data for that launch Success only
  getDataForLandSuccessAlone(land) {
    const getDataBasedOnYear = this.spaceXDataService.getDataLandAlone(land);
    this.lazyLoadActive = true;
    getDataBasedOnYear.then(response => {
      this.detailsData = response;
    }).then(arg => {
      this.lazyLoadActive = false;

    });
  }

// Getting the data for that year and launch only

  getDataForThatYearWithLaunch(year, launch) {
    const getDataBasedOnYear = this.spaceXDataService.getDataYearAloneWithLaunch(year, launch);
    this.lazyLoadActive = true;
    getDataBasedOnYear.then(response => {
      this.detailsData = response;
    }).then(arg => {
      this.lazyLoadActive = false;
    });
  }

  // Getting the data for that year and land only

  getDataForThatYearWithLand(year, land) {
    const getDataBasedOnYear = this.spaceXDataService.getDataYearAloneWithLand(year, land);
    this.lazyLoadActive = true;
    getDataBasedOnYear.then(response => {
      this.detailsData = response;
    }).then(arg => {
      this.lazyLoadActive = false;
    });
  }

  // Getting the data for that launch and land only

  getDataForThatLaunchAndLand(launch, land) {
    const getDataBasedOnYear = this.spaceXDataService.getDataLandAndLaunch(launch, land);
    this.lazyLoadActive = true;
    getDataBasedOnYear.then(response => {
      this.detailsData = response;
    }).then(arg => {
      this.lazyLoadActive = false;
    });
  }
}
