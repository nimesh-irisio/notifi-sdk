import { AlertsService } from '.';
import { EmailTargetsService } from '.';
import { LogInFromDaoService } from '.';
import { SourceGroupsService } from './SourceGroupsService';

export type NotifiService = AlertsService &
  EmailTargetsService &
  LogInFromDaoService &
  SourceGroupsService;
