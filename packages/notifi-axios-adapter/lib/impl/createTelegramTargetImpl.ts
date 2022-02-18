import { AxiosInstance } from 'axios';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

import {
  CreateTelegramTargetPayload,
  CreateTelegramTargetResult
} from '@notifi-network/notifi-core';

const QUERY_STRING = `mutation createTelegramTarget(
  $name: String!
  $value: String!
) {
  createTelegramTarget(createTargetInput: {
    name: $name
    value: $value
  }) {
    id
    name
    value
  }
}`;

const createSourceGroupImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter,
  payload: CreateTelegramTargetPayload
): Promise<CreateTelegramTargetResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    payload,
    QUERY_STRING,
    'createTelegramTarget'
  );
};

export default createSourceGroupImpl;
