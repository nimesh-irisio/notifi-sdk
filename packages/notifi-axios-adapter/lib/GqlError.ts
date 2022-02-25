export default class GqlError extends Error {
  constructor(
    public operationName: string,
    public errors: ReadonlyArray<unknown>
  ) {
    super(`GQL Errors occurred during ${operationName}`);
  }
}
