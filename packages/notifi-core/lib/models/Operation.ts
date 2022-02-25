export type Operation<Input, Result> = (input: Input) => Promise<Result>;
