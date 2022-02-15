import useAuthenticatedQuery from "./useAuthenticatedQuery";

export type Payload = Readonly<{}>;

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

const useGetFilters = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(QUERY_STRING, "filter");
};

export default useGetFilters;
