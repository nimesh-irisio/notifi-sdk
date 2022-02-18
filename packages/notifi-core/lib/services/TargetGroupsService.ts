export type TargetGroup = Readonly<{
  id: string | null;
  name: string | null;
  emailTargets: ReadonlyArray<{
    id: string | null;
    name: string | null;
    emailAddress: string | null;
  }>;
  smsTargets: ReadonlyArray<{
    id: string | null;
    name: string | null;
    phoneNumber: string | null;
  }>;
  telegramTargets: ReadonlyArray<{
    id: string | null;
    name: string | null;
    telegramId: string | null;
  }>;
}>;

export type GetTargetGroupsResult = ReadonlyArray<TargetGroup>;

export type CreateTargetGroupPayload = Readonly<{
  name: string;
  emailTargetIds: string[];
  smsTargetIds: string[];
  telegramTargetIds: string[];
}>;

export type CreateTargetGroupResult = TargetGroup;

export type TargetGroupsService = Readonly<{
  getTargetGroups(): Promise<GetTargetGroupsResult>;
  createTargetGroup(
    payload: CreateTargetGroupPayload
  ): Promise<CreateTargetGroupResult>;
}>;
