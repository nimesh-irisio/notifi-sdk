import useNotifiConfig from "./useNotifiConfig";
import { useCallback } from "react";
import useNotifiJwt from "./useNotifiJwt";
import axios from "axios";

type PostResponse<Result extends object> = Readonly<{
  data?: Record<string, Result | null | undefined>;
}>;

const useAuthenticatedQuery = <Variables extends object, Result extends object>(
  query: string,
  resultKey: string
): ((variables: Variables) => Promise<Result>) => {
  const { gqlUrl } = useNotifiConfig();
  const { jwtRef } = useNotifiJwt();
  const invoke = useCallback(
    async (variables: Variables) => {
      if (jwtRef.current == null) {
        throw new Error("Cannot use authenticated query without jwt");
      }

      const resp = await axios.post<PostResponse<Result>>(gqlUrl, {
        query,
        variables,
      }, {
        headers: { Authorization: `Bearer ${jwtRef.current}` },
      });

      const result = resp.data.data?.[resultKey];
      if (result == null) {
        throw new Error("No data returned from notifi");
      }

      return result;
    },
    [gqlUrl, jwtRef]
  );

  return invoke;
};

export const useParameterlessAuthenticatedQuery = <Result extends object>(
  query: string,
  resultKey: string,
): () => Promise<Result> => {
  const authenticatedQuery = useAuthenticatedQuery<Record<string, never>, Result>(query, resultKey);
  const invoke = useCallback(() => {
    return authenticatedQuery({});
  }, [authenticatedQuery]);

  return invoke;
}

export default useAuthenticatedQuery;
