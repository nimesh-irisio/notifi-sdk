import useAuthenticatedQuery from "./useAuthenticatedQuery";

export type Payload = Readonly<{
  name: string;
  emailTargetIds: string[];
  smsTargetIds: string[];
  telegramTargetIds: string[];
}>;

export type Result = Readonly<{
  id: string | null;
  name: string | null;
}>;

const MUTATION_STRING = `mutation createTargetGroup(
  $name: String!
  $emailTargetIds: [String!]!
  $smsTargetIds: [String!]!
  $telegramTargetIds: [String!]!
) {
  createTargetGroup(targetGroupInput: {
    name: $name
    emailTargetIds: $emailTargetIds
    smsTargetIds: $smsTargetIds
    telegramTargetIds: $telegramTargetIds
  }) {
    id
    name
  }
}`

const useCreateTargetGroup = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(MUTATION_STRING, "createTargetGroup")
};

export default useCreateTargetGroup;