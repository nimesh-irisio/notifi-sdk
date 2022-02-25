import { Operation, User } from '../models';

export type LogInInput = Readonly<{
  email: string;
  password: string;
}>;

export type LogInResult = User;

export type LogInService = Readonly<{
  logIn: Operation<LogInInput, LogInResult>;
}>;
