import { AxiosInstance } from 'axios';
import { GetTargetGroupsResult } from '@notifi-network/notifi-core';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

const QUERY_STRING = `query getTargetGroups {
  targetGroup {
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

const getTargetGroupsImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter
): Promise<GetTargetGroupsResult> => {
  return makeAuthenticatedQuery(
    axios,
    jwtGetter,
    {},
    QUERY_STRING,
    'targetGroup'
  );
};

export default getTargetGroupsImpl;
