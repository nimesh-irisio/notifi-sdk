import { AxiosInstance } from 'axios';
import { JwtGetter } from './makeAuthenticatedQuery';
import makeAuthenticatedQuery from './makeAuthenticatedQuery';

export type CreateSourceGroupPayload = Readonly<{
  name: string;
  sourceIds: string[];
}>;

export type CreateSourceGroupResult = ReadonlyArray<{
  id: string | null;
  name: string | null;
}>;

const QUERY_STRING = `mutation createSourceGroup(
  $name: String!
  $sourceIds: [String!]!
) {
  createSourceGroup(sourceGroupInput: {
    name: $name
    sourceIds: $sourceIds
  }) {
    id
    name
  }
}`;

const createSourceGroupImpl = async (
  axios: AxiosInstance,
  jwtGetter: JwtGetter,
  payload: CreateSourceGroupPayload
): Promise<CreateSourceGroupResult> => {
  return makeAuthenticatedQuery<
    CreateSourceGroupPayload,
    CreateSourceGroupResult
  >(axios, jwtGetter, payload, QUERY_STRING, 'createSourceGroup');
};

export default createSourceGroupImpl;
