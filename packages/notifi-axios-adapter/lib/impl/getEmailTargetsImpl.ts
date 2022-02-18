import { AxiosInstance } from 'axios';
import { GetEmailTargetsResult } from '@notifi-network/notifi-core';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

const QUERY_STRING = `query getEmailTargets {
  emailTarget {
    id
    name
  }
}`;

const getEmailTargetsImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter
): Promise<GetEmailTargetsResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    {},
    QUERY_STRING,
    'emailTarget'
  );
};

export default getEmailTargetsImpl;
