import { AxiosInstance } from 'axios';
import GqlError from '../GqlError';

type PostResponse<Result> = Readonly<{
  data?: Record<string, Result | null | undefined> | null;
  errors?: ReadonlyArray<unknown>;
}>;

const makeRequestInternal = async <Input, Result>(
  query: string,
  resultKey: string,
  axiosInstance: AxiosInstance,
  variables: Input
): Promise<Result> => {
  const { data } = await axiosInstance.post<PostResponse<Result>>('/', {
    query,
    variables
  });

  const result = data?.data?.[resultKey];
  const errors = data?.errors;
  if (result != null) {
    return result;
  }

  if (errors != null) {
    throw new GqlError(resultKey, errors);
  }

  throw new Error('Unknown error in makeRequest');
};

const makeRequest = <Input, Result>(
  query: string,
  resultKey: string
): ((axiosInstance: AxiosInstance, variables: Input) => Promise<Result>) => {
  return (axiosInstance, variables) =>
    makeRequestInternal(query, resultKey, axiosInstance, variables);
};

const makeBooleanRequest = <Input>(
  query: string,
  resultKey: string
): ((
  axiosInstance: AxiosInstance,
  variables: Input
) => Promise<
  Readonly<{
    success: boolean;
  }>
>) => {
  return async (axiosInstance, variables) => {
    const success = await makeRequestInternal<Input, boolean>(
      query,
      resultKey,
      axiosInstance,
      variables
    );
    return {
      success
    };
  };
};

export { makeBooleanRequest, makeRequest };
