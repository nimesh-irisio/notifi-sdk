export type GetSourceGroupsResult = ReadonlyArray<{
  id: string | null;
  name: string | null;
}>;

export type CreateSourceGroupPayload = Readonly<{
  name: string;
  sourceIds: string[];
}>;

export type CreateSourceGroupResult = Readonly<{
  id: string | null;
  name: string | null;
}>;

export type SourceGroupsService = Readonly<{
  getSourceGroups(): Promise<GetSourceGroupsResult>;
  createSourceGroup(
    payload: CreateSourceGroupPayload
  ): Promise<CreateSourceGroupResult>;
}>;
