import { AxiosInstance } from 'axios';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

import {
  CreateEmailTargetPayload,
  CreateEmailTargetResult
} from '@notifi-network/notifi-core';

const QUERY_STRING = `mutation createEmailTarget(
  $name: String!
  $value: String!
) {
  createEmailTarget(createTargetInput: {
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
  payload: CreateEmailTargetPayload
): Promise<CreateEmailTargetResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    payload,
    QUERY_STRING,
    'createEmailTarget'
  );
};

export default createSourceGroupImpl;
