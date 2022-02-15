import useAuthenticatedQuery from "./useAuthenticatedQuery";

export type Payload = Readonly<{
  sourceGroupId: string;
  filterId: string;
  targetGroupId: string;
}>;

export type Result = Readonly<{
  id: string | null;
  name: string | null;
  groupName: string | null;
  filter: Readonly<{
    id: string | null;
    name: string | null;
  }>;
  sourceGroup: Readonly<{
    id: string | null;
    name: string | null;
  }>;
  targetGroup: Readonly<{
    id: string | null;
    name: string | null;
  }>;
}>;

const MUTATION_STRING = `mutation createAlert(
  $sourceGroupId: String!
  $filterId: String!
  $targetGroupId: String!
) {
  createAlert(alertInput: {
    sourceGroupId: $sourceGroupId
    filterId: $filterId
    targetGroupId: $targetGroupId
  }) {
    id
    name
    filter {
      id
      name
    }
    sourceGroup {
      id
      name
    }
    targetGroup {
      id
      name
    }
  }
}`

const useCreateAlert = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(MUTATION_STRING, "createAlert")
};

export default useCreateAlert;