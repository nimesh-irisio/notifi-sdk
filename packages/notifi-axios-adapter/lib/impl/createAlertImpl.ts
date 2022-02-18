import { AxiosInstance } from 'axios';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

import {
  CreateAlertPayload,
  CreateAlertResult
} from '@notifi-network/notifi-core';

const QUERY_STRING = `mutation createAlert(
  $sourceGroupId: String!
  $filterId: String!
  $targetGroupId: String!
) {
  createAlert(alertInput: {
    sourceGroupId: $sourceGroupId
    filterId: $filterId
    targetGroupId: $targetGroupId
  }) {
    id
    name
    filter {
      id
      name
    }
    sourceGroup {
      id
      name
    }
    targetGroup {
      id
      name
    }
  }
}`;

const createSourceGroupImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter,
  payload: CreateAlertPayload
): Promise<CreateAlertResult> => {
  return makeAuthenticatedQuery<CreateAlertPayload, CreateAlertResult>(
    axios,
    jwtGetter,
    payload,
    QUERY_STRING,
    'createAlert'
  );
};

export default createSourceGroupImpl;
