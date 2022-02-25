import { Operation } from '../models';

export type ConfirmEmailInput = Readonly<{
  email: string;
  token: string;
}>;

export type ConfirmEmailResult = Readonly<{
  success: boolean;
}>;

export type ConfirmEmailService = Readonly<{
  confirmEmail: Operation<ConfirmEmailInput, ConfirmEmailResult>;
}>;
