import { AxiosInstance } from 'axios';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

import {
  UpdateTargetGroupPayload,
  UpdateTargetGroupResult
} from '@notifi-network/notifi-core';

const QUERY_STRING = `mutation updateTargetGroup(
  $targetGroupId: String!
  $name: String!
  $emailTargetIds: [String!]!
  $smsTargetIds: [String!]!
  $telegramTargetIds: [String!]!
) {
  updateTargetGroup(targetGroupInput: {
    targetGroupId: $targetGroupId
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

const updateTargetGroupImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter,
  payload: UpdateTargetGroupPayload
): Promise<UpdateTargetGroupResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    payload,
    QUERY_STRING,
    'updateTargetGroup'
  );
};

export default updateTargetGroupImpl;
