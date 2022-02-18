import { AxiosInstance } from 'axios';
import { GetTelegramTargetsResult } from '@notifi-network/notifi-core';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

const QUERY_STRING = `query getTelegramTargets {
  telegramTarget {
    id
    name
  }
}`;

const getTelegramTargetsImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter
): Promise<GetTelegramTargetsResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    {},
    QUERY_STRING,
    'telegramTarget'
  );
};

export default getTelegramTargetsImpl;
