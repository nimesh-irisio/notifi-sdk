import { Operation } from '../models';

export type LogOutInput = never;

export type LogOutResult = Readonly<{
  success: boolean;
}>;

export type LogOutService = Readonly<{
  logOut: Operation<LogOutInput, LogOutResult>;
}>;
