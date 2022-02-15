import {useParameterlessAuthenticatedQuery} from './useAuthenticatedQuery';

export type Result = ReadonlyArray<{
  id: string | null;
  name: string | null;
}>;

const QUERY_STRING = `query getSourceGroups {
  sourceGroup {
    id
    name
  }
}`

const useGetSourceGroups = (): (() => Promise<Result>) => {
  return useParameterlessAuthenticatedQuery(QUERY_STRING, 'sourceGroup');
};

export default useGetSourceGroups;
