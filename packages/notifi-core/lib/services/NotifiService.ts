import { AlertsService } from './AlertsService';
import { EmailTargetsService } from './EmailTargetsService';
import { FiltersService } from './FiltersService';
import { LogInFromDaoService } from './LogInFromDaoService';
import { SmsTargetsService } from './SmsTargetsService';
import { SourceGroupsService } from './SourceGroupsService';
import { TargetGroupsService } from './TargetGroupsService';
import { TelegramTargetsService } from './TelegramTargetsService';

export type NotifiService = AlertsService &
  EmailTargetsService &
  FiltersService &
  LogInFromDaoService &
  SmsTargetsService &
  SourceGroupsService &
  TargetGroupsService &
  TelegramTargetsService;
