export type Alert = Readonly<{
  id: string | null;
  name: string | null;
  groupName: string | null;
  filter: Readonly<{
    id: string | null;
    name: string | null;
  }>;
  sourceGroup: Readonly<{
    id: string | null;
    name: string | null;
  }>;
  targetGroup: Readonly<{
    id: string | null;
    name: string | null;
  }>;
}>;

export type GetAlertsResult = ReadonlyArray<Alert>;

export type CreateAlertPayload = Readonly<{
  sourceGroupId: string;
  filterId: string;
  targetGroupId: string;
}>;

export type CreateAlertResult = Alert;

export type AlertsService = Readonly<{
  getAlerts(): Promise<GetAlertsResult>;
  createAlert(payload: CreateAlertPayload): Promise<CreateAlertResult>;
}>;
