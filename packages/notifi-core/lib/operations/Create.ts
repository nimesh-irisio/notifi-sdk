import { Operation, User } from '../models';

export type CreateInput = Readonly<{
  email: string;
  password: string;
  isDirectAccessAccount: boolean;
}>;

export type CreateResult = User;

export type CreateService = Readonly<{
  create: Operation<CreateInput, CreateResult>;
}>;
