import { AxiosInstance } from 'axios';
import { GetSourceGroupsResult } from '@notifi-network/notifi-core';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

type Payload = Record<string, never>;

const QUERY_STRING = `query getSourceGroups {
  sourceGroup {
    id
    name
  }
}`;

const getSourceGroupsImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter
): Promise<GetSourceGroupsResult> => {
  return makeAuthenticatedQuery<Payload, GetSourceGroupsResult>(
    axios,
    jwtGetter,
    {},
    QUERY_STRING,
    'sourceGroup'
  );
};

export default getSourceGroupsImpl;
