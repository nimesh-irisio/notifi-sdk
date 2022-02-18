export type Filter = Readonly<{
  id: string | null;
  name: string | null;
}>;

export type GetFiltersResult = ReadonlyArray<Filter>;

export type FiltersService = Readonly<{
  getFilters(): Promise<GetFiltersResult>;
}>;
