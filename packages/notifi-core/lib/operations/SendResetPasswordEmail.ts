import { Operation } from '../models';

export type SendResetPasswordEmailInput = Readonly<{
  email: string;
}>;

export type SendResetPasswordEmailResult = Readonly<{
  success: boolean;
}>;

export type SendResetPasswordEmailService = Readonly<{
  sendResetPasswordEmail: Operation<
    SendResetPasswordEmailInput,
    SendResetPasswordEmailResult
  >;
}>;
