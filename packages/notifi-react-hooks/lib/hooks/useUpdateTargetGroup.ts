import useAuthenticatedQuery from './useAuthenticatedQuery';

export type Payload = Readonly<{
  targetGroupId: string;
  name: string;
  emailTargetIds: string[];
  smsTargetIds: string[];
  telegramTargetIds: string[];
}>;

export type Result = Readonly<{
  id: string | null;
  name: string | null;
}>;

const MUTATION_STRING = `mutation updateTargetGroup(
  $targetGroupId: String!
  $name: String!
  $emailTargetIds: [String!]!
  $smsTargetIds: [String!]!
  $telegramTargetIds: [String!]!
) {
  createTargetGroup(targetGroupInput: {
    id: $targetGroupId
    name: $name
    emailTargetIds: $emailTargetIds
    smsTargetIds: $smsTargetIds
    telegramTargetIds: $telegramTargetIds
  }) {
    id
    name
  }
}`;

const useUpdateTargetGroup = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(MUTATION_STRING, 'createTargetGroup');
};

export default useUpdateTargetGroup;
