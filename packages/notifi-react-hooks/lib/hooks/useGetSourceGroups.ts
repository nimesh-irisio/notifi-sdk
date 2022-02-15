import useAuthenticatedQuery from './useAuthenticatedQuery';

export type Payload = Readonly<{}>;

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

const useGetSourceGroups = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(QUERY_STRING, 'sourceGroup');
};

export default useGetSourceGroups;
