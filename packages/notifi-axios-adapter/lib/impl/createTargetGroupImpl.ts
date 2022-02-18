import { AxiosInstance } from 'axios';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

import {
  CreateTargetGroupPayload,
  CreateTargetGroupResult
} from '@notifi-network/notifi-core';

const QUERY_STRING = `mutation createTargetGroup(
  $name: String!
  $emailTargetIds: [String!]!
  $smsTargetIds: [String!]!
  $telegramTargetIds: [String!]!
) {
  createTargetGroup(targetGroupInput: {
    name: $name
    emailTargetIds: $emailTargetIds
    smsTargetIds: $smsTargetIds
    telegramTargetIds: $telegramTargetIds
  }) {
    id
    name
    emailTargets {
      id
      name
      emailAddress
    }
    smsTargets {
      id
      name
      phoneNumber
    }
    telegramTargets {
      id
      name
      telegramId
    }
  }
}`;

const createTargetGroupImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter,
  payload: CreateTargetGroupPayload
): Promise<CreateTargetGroupResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    payload,
    QUERY_STRING,
    'createTargetGroup'
  );
};

export default createTargetGroupImpl;
