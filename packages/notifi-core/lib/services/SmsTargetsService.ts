export type SmsTarget = Readonly<{
  id: string | null;
  name: string | null;
  value: string;
}>;

export type GetSmsTargetsResult = ReadonlyArray<SmsTarget>;

export type CreateSmsTargetPayload = Readonly<{
  name: string;
  value: string;
}>;

export type CreateSmsTargetResult = SmsTarget;

export type SmsTargetsService = Readonly<{
  getSmsTargets(): Promise<GetSmsTargetsResult>;
  createSmsTarget(
    payload: CreateSmsTargetPayload
  ): Promise<CreateSmsTargetResult>;
}>;
