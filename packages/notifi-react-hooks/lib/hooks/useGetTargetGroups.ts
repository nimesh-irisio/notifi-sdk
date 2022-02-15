import axios from 'axios';
import { useCallback } from 'react';
import useAuthenticatedQuery from './useAuthenticatedQuery';
import useNotifiJwt from './useNotifiJwt';

export type Payload = Readonly<{}>;

export type Result = ReadonlyArray<{
  id: string | null;
  name: string | null;
  emailTargets: ReadonlyArray<{
    id: string | null;
    name: string | null;
    emailAddress: string | null;
  }>;
  smsTargets: ReadonlyArray<{
    id: string | null;
    name: string | null;
    phoneNumber: string | null;
  }>;
  telegramTargets: ReadonlyArray<{
    id: string | null;
    name: string | null;
    telegramId: string | null;
  }>;
}>;

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
}`

const useGetTargetGroups = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(QUERY_STRING, 'targetGroup');
};

export default useGetTargetGroups;
