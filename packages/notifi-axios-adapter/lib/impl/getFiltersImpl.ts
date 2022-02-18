import { AxiosInstance } from 'axios';
import { GetFiltersResult } from '@notifi-network/notifi-core';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

const QUERY_STRING = `query getFilters {
  filter {
    id
    name
  }
}`;

const getFiltersImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter
): Promise<GetFiltersResult> => {
  return makeAuthenticatedQuery(axios, jwtGetter, {}, QUERY_STRING, 'filter');
};

export default getFiltersImpl;
