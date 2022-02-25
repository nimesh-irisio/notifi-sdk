import { Operation } from '../models';

export type ResetPasswordInput = Readonly<{
  email: string;
  password: string;
  tfaCode: string;
}>;

export type ResetPasswordResult = Readonly<{
  success: boolean;
}>;

export type ResetPasswordService = Readonly<{
  resetPassword: Operation<ResetPasswordInput, ResetPasswordResult>;
}>;
