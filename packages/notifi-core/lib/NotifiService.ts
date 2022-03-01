import * as Operations from './operations';

export type NotifiService = Operations.ConfirmEmailService &
  Operations.CreateService &
  Operations.CreateAlertService &
  Operations.CreateEmailTargetService &
  Operations.CreateSmsTargetService &
  Operations.CreateTelegramTargetService &
  Operations.GenerateEmailConfirmationTokenService &
  Operations.LogInService &
  Operations.LogOutService &
  Operations.ResetPasswordService &
  Operations.SendResetPasswordEmailService;
