import {Component, OnInit, ViewChild} from '@angular/core';
import {SpaceXDataService} from '../../services/space-x-data.service';
import {DetailsSectionComponent} from './details-section/details-section.component';
import {DetailsDataService} from '../../services/details-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public yearsOfSpaceX: number[];
  public booleanFilter: any[];
  public selectedYear: any;
  public selectedLanding: any;
  public selectedLaunch: any;
  public selectedIndexLand: any[];
  @ViewChild(DetailsSectionComponent, {static: false}) detailsSectionComponent: DetailsSectionComponent;

  constructor(private spaceXDataService: SpaceXDataService,
              private detailsDataService: DetailsDataService) {
    this.yearsOfSpaceX = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
    this.booleanFilter = ['true', 'false'];
    this.selectedYear = null;
    this.selectedLaunch = null;
    this.selectedLanding = null;
  }

  ngOnInit() {

  }

  // Get year if in URL
  getYear(year) {
    if (year !== undefined) {
      this.selectedYear = year;
    }
  }

  // Get landing condition if in URL
  getLand(land) {
    if (land !== undefined) {
      this.selectedLanding = land;
    }
  }

  // Get Launching Condition if in URL
  getLaunch(launch) {
    if (launch !== undefined) {
      this.selectedLaunch = launch;
    }
  }

  // Select Year frm filter
  selectYear(years) {
    this.selectedYear = years;
    this.getDataForThatYearInDetail(false);
  }

  // Select Launching frm filter
  selectLaunch(value) {
    this.selectedLaunch = value;
    this.getDataForThatYearInDetail(false);
  }

  // Select Launching frm filter
  selectLand(value) {
    this.selectedLanding = value;
    this.getDataForThatYearInDetail(false);
  }

  // For active class in year filter
  isSelectedYears(item): boolean {
    return this.selectedYear == item;
  }

  // For active class in launch filter
  isSelectedLaunch(item): boolean {
    return this.selectedLaunch === item;
  }

  // For active class in land filter
  isSelectedLand(item): boolean {
    return this.selectedLanding === item;
  }

  // To pass data to details section
  getDataForThatYearInDetail(firstLoad) {
    this.detailsDataService.setAllPassed(this.selectedYear, this.selectedLanding, this.selectedLaunch, firstLoad);
  }

}
