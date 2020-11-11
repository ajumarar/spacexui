import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {endpoints} from '../proprties/endpoints';

@Injectable({
  providedIn: 'root'
})
export class SpaceXDataService {

  constructor(private http: HttpClient) {
  }

  // Get Full SpaceX Data
  public getSpaceXFullData(): Promise<any> {
    return this.http.get(endpoints.getFullSpaceExData(), {observe: 'response'})
      .toPromise().then(this.extractSpaceXData).catch(this.handleError);
  }

  // Get Data on Year filter
  public getSpaceXDataOnYear(year, launch, landing): Promise<any> {
    return this.http.get(endpoints.getDataBasedOnYear(year, launch, landing), {observe: 'response'})
      .toPromise().then(this.extractSpaceXData).catch(this.handleError);
  }

  // get data on year
  public getDataYearAlone(year): Promise<any> {
    return this.http.get(endpoints.getDataYearAlone(year), {observe: 'response'})
      .toPromise().then(this.extractSpaceXData).catch(this.handleError);
  }

  // get data on lanuch
  public getDataLaunchAlone(launch): Promise<any> {
    return this.http.get(endpoints.getDataLaunchAlone(launch), {observe: 'response'})
      .toPromise().then(this.extractSpaceXData).catch(this.handleError);
  }

  // get data on land
  public getDataLandAlone(land): Promise<any> {
    return this.http.get(endpoints.getDataLandAlone(land), {observe: 'response'})
      .toPromise().then(this.extractSpaceXData).catch(this.handleError);
  }

  // get data on year and launch
  public getDataYearAloneWithLaunch(year, launch): Promise<any> {
    return this.http.get(endpoints.getDataYearAloneWithLaunch(year, launch), {observe: 'response'})
      .toPromise().then(this.extractSpaceXData).catch(this.handleError);
  }

  // get Data on year and land
  public getDataYearAloneWithLand(year, land): Promise<any> {
    return this.http.get(endpoints.getDataYearAloneWithLand(year, land), {observe: 'response'})
      .toPromise().then(this.extractSpaceXData).catch(this.handleError);
  }

  // get Data on launch and land
  public getDataLandAndLaunch(launch, land): Promise<any> {
    return this.http.get(endpoints.getDataLandAndLaunch(launch, land), {observe: 'response'})
      .toPromise().then(this.extractSpaceXData).catch(this.handleError);
  }

  private extractSpaceXData(response: HttpResponse<any>): Promise<any> {
    const parsedResponse = response.body;
    return Promise.resolve(parsedResponse);
  }

  private handleError(error: HttpErrorResponse): Promise<any> {
    return Promise.reject(error);
  }
}
