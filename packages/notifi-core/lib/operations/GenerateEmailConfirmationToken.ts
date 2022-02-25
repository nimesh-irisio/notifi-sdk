import { Operation } from '../models';

export type GenerateEmailConfirmationTokenInput = Readonly<{
  email: string;
}>;

export type GenerateEmailConfirmationTokenResult = Readonly<{
  success: boolean;
}>;

export type GenerateEmailConfirmationTokenService = Readonly<{
  generateEmailConfirmationToken: Operation<
    GenerateEmailConfirmationTokenInput,
    GenerateEmailConfirmationTokenResult
  >;
}>;
