import { AxiosInstance } from 'axios';
import { GetAlertsResult } from '@notifi-network/notifi-core';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery, { EmptyPayload } from './makeAuthenticatedQuery';

const QUERY_STRING = `query getSourceGroups {
  sourceGroup {
    id
    name
  }
}`;

const getAlertsImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter
): Promise<GetAlertsResult> => {
  return makeAuthenticatedQuery<EmptyPayload, GetAlertsResult>(
    axios,
    jwtGetter,
    {},
    QUERY_STRING,
    'sourceGroup'
  );
};

export default getAlertsImpl;
