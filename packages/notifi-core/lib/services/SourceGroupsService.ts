export type SourceGroup = Readonly<{
  id: string | null;
  name: string | null;
}>;

export type GetSourceGroupsResult = ReadonlyArray<SourceGroup>;

export type CreateSourceGroupPayload = Readonly<{
  name: string;
  sourceIds: string[];
}>;

export type CreateSourceGroupResult = SourceGroup;

export type SourceGroupsService = Readonly<{
  getSourceGroups(): Promise<GetSourceGroupsResult>;
  createSourceGroup(
    payload: CreateSourceGroupPayload
  ): Promise<CreateSourceGroupResult>;
}>;
