import {constants} from './constants';

export let endpoints = {
   getFullSpaceExData: () => `${constants.host}`,
   getDataBasedOnYear: (year, launch, land) => `${constants.host}&launch_success=${launch}&land_success=${land}&launch_year=${year}`,
    getDataYearAlone: (year) => `${constants.host}&launch_year=${year}`,
    getDataLaunchAlone: (launch) => `${constants.host}&launch_success=${launch}`,
    getDataLandAlone: (land) => `${constants.host}&land_success=${land}`,
    getDataYearAloneWithLaunch: (year, launch) => `${constants.host}&launch_success=${launch}&launch_year=${year}`,
    getDataYearAloneWithLand: (year, land) => `${constants.host}&land_success=${land}&launch_year=${year}`,
    getDataLandAndLaunch: (launch, land) => `${constants.host}&launch_success=${launch}&land_success=${land}`,
};
