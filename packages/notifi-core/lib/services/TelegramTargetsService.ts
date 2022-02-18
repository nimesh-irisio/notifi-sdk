export type TelegramTarget = Readonly<{
  id: string | null;
  name: string | null;
  value: string;
}>;

export type GetTelegramTargetsResult = ReadonlyArray<TelegramTarget>;

export type CreateTelegramTargetPayload = Readonly<{
  name: string;
  value: string;
}>;

export type CreateTelegramTargetResult = TelegramTarget;

export type TelegramTargetsService = Readonly<{
  getTelegramTargets(): Promise<GetTelegramTargetsResult>;
  createTelegramTarget(
    payload: CreateTelegramTargetPayload
  ): Promise<CreateTelegramTargetResult>;
}>;
