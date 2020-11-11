import {environment} from '../../environments/environment';


export const constants = {
  host: getHost()
};

function getHost(): string {
  return 'https://api.spaceXdata.com/v3/launches?limit=100';
}
