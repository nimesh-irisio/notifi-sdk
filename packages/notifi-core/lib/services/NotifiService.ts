import { AlertsService } from './AlertsService';
import { EmailTargetsService } from './EmailTargetsService';
import { LogInFromDaoService } from './LogInFromDaoService';
import { SmsTargetsService } from './SmsTargetsService';
import { SourceGroupsService } from './SourceGroupsService';
import { TargetGroupsService } from './TargetGroupsService';
import { TelegramTargetsService } from './TelegramTargetsService';

export type NotifiService = AlertsService &
  EmailTargetsService &
  LogInFromDaoService &
  SmsTargetsService &
  SourceGroupsService &
  TargetGroupsService &
  TelegramTargetsService;
