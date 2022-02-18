import { AxiosInstance } from 'axios';
import { GetAlertsResult } from '@notifi-network/notifi-core';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

const QUERY_STRING = `query getAlerts {
  alert {
    id
    name
  }
}`;

const getAlertsImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter
): Promise<GetAlertsResult> => {
  return makeAuthenticatedQuery(axios, jwtGetter, {}, QUERY_STRING, 'alert');
};

export default getAlertsImpl;
