import useAuthenticatedQuery from "./useAuthenticatedQuery";

export type Payload = Readonly<{
  name: string;
  value: string;
}>;

export type Result = Readonly<{
  id: string | null;
  name: string | null;
}>;

const MUTATION_STRING = `mutation createSmsTarget(
  $name: String!
  $value: String!
) {
  createSmsTarget(createTargetInput: {
    name: $name
    value: $value
  }) {
    id
    name
  }
}`

const useCreateSmsTarget = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(MUTATION_STRING, "createSmsTarget")
};

export default useCreateSmsTarget;