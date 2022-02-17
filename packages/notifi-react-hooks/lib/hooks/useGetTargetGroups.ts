import { useParameterlessAuthenticatedQuery } from './useAuthenticatedQuery';

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
}`;

const useGetTargetGroups = (): (() => Promise<Result>) => {
  return useParameterlessAuthenticatedQuery(QUERY_STRING, 'targetGroup');
};

export default useGetTargetGroups;
