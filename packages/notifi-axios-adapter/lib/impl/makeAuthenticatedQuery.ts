import { AxiosInstance } from 'axios';

export type JwtGetter = () => string | null;

type PostResponse<Result extends object> = Readonly<{
  data?: Record<string, Result | null | undefined>;
}>;

const NOTIFI_GQL_URL = 'https://api.notifi.network/api/gql';

const makeAuthenticatedQuery = async <
  Payload extends object,
  Result extends object
>(
  axios: AxiosInstance,
  getJwt: JwtGetter,
  variables: Payload,
  query: string,
  resultKey: string
): Promise<Result> => {
  const jwt = getJwt();
  if (jwt == null) {
    throw new Error('Cannot use authenticated query without jwt');
  }

  const resp = await axios.post<PostResponse<Result>>(
    NOTIFI_GQL_URL,
    {
      query,
      variables
    },
    {
      headers: { Authorization: `Bearer ${jwt}` }
    }
  );

  const result = resp.data.data?.[resultKey];
  if (result == null) {
    throw new Error('No data returned from notifi');
  }

  return result;
};

export default makeAuthenticatedQuery;
