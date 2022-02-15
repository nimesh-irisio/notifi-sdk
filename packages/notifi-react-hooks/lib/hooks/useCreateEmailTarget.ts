import useAuthenticatedQuery from "./useAuthenticatedQuery";

export type Payload = Readonly<{
  name: string;
  value: string;
}>;

export type Result = Readonly<{
  id: string | null;
  name: string | null;
}>;

const MUTATION_STRING = `mutation createEmailTarget(
  $name: String!
  $value: String!
) {
  createEmailTarget(createTargetInput: {
    name: $name
    value: $value
  }) {
    id
    name
  }
}`

const useCreateEmailTarget = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(MUTATION_STRING, "createEmailTarget")
};

export default useCreateEmailTarget;