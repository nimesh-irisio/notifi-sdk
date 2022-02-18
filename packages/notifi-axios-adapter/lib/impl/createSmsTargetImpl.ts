import { AxiosInstance } from 'axios';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

import {
  CreateSmsTargetPayload,
  CreateSmsTargetResult
} from '@notifi-network/notifi-core';

const QUERY_STRING = `mutation createSmsTarget(
  $name: String!
  $value: String!
) {
  createSmsTarget(createTargetInput: {
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
  payload: CreateSmsTargetPayload
): Promise<CreateSmsTargetResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    payload,
    QUERY_STRING,
    'createSmsTarget'
  );
};

export default createSourceGroupImpl;
