import useAuthenticatedQuery from './useAuthenticatedQuery';

export type Payload = Readonly<{
  name: string;
  value: string;
}>;

export type Result = Readonly<{
  id: string | null;
  name: string | null;
  telegramId: string | null;
}>;

const MUTATION_STRING = `mutation createTelegramTarget(
  $name: String!
  $value: String!
) {
  createTelegramTarget(createTargetInput: {
    name: $name
    value: $value
  }) {
    id
    name
    telegramId
  }
}`;

const useCreateTelegramTarget = (): ((payload: Payload) => Promise<Result>) => {
  return useAuthenticatedQuery(MUTATION_STRING, 'createTelegramTarget');
};

export default useCreateTelegramTarget;
