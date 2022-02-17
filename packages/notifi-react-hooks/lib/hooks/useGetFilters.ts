import { useParameterlessAuthenticatedQuery } from './useAuthenticatedQuery';

export type Result = ReadonlyArray<{
  id: string | null;
  name: string | null;
}>;

const QUERY_STRING = `query getFilters {
  filter {
    id
    name
  }
}`;

const useGetFilters = (): (() => Promise<Result>) => {
  return useParameterlessAuthenticatedQuery(QUERY_STRING, 'filter');
};

export default useGetFilters;
