import { AlertsService } from '.';
import { EmailTargetsService } from '.';
import { LogInFromDaoService } from '.';
import { SmsTargetsService } from './SmsTargetsService';
import { SourceGroupsService } from './SourceGroupsService';

export type NotifiService = AlertsService &
  EmailTargetsService &
  LogInFromDaoService &
  SmsTargetsService &
  SourceGroupsService;
