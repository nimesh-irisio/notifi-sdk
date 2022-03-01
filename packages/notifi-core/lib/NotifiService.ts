import * as Operations from './operations';

export type NotifiService = Operations.CreateAlertService &
  Operations.CreateEmailTargetService &
  Operations.CreateSmsTargetService &
  Operations.CreateTargetGroupService &
  Operations.CreateTelegramTargetService &
  Operations.GetFiltersService &
  Operations.GetSourceGroupsService &
  Operations.GetTargetGroupsService &
  Operations.LogInFromDaoService &
  Operations.UpdateTargetGroupService;
