export type EmailTarget = Readonly<{
  id: string | null;
  name: string | null;
  value: string;
}>;

export type GetEmailTargetsResult = ReadonlyArray<EmailTarget>;

export type CreateEmailTargetPayload = Readonly<{
  name: string;
  value: string;
}>;

export type CreateEmailTargetResult = EmailTarget;

export type EmailTargetsService = Readonly<{
  getEmailTargets(): Promise<GetEmailTargetsResult>;
  createEmailTarget(
    payload: CreateEmailTargetPayload
  ): Promise<CreateEmailTargetResult>;
}>;
