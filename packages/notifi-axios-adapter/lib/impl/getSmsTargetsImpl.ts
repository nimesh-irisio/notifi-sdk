import { AxiosInstance } from 'axios';
import { GetSmsTargetsResult } from '@notifi-network/notifi-core';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

const QUERY_STRING = `query getSmsTargets {
  smsTarget {
    id
    name
  }
}`;

const getSmsTargetsImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter
): Promise<GetSmsTargetsResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    {},
    QUERY_STRING,
    'smsTarget'
  );
};

export default getSmsTargetsImpl;
