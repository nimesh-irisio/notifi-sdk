import * as Operations from './operations';

export type NotifiService = Operations.ConfirmEmailService &
  Operations.CreateService &
  Operations.CreateAlertService &
  Operations.GenerateEmailConfirmationTokenService &
  Operations.LogInService &
  Operations.LogOutService &
  Operations.ResetPasswordService &
  Operations.SendResetPasswordEmailService;
