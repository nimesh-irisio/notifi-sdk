import { AlertsService } from '.';
import { EmailTargetsService } from '.';
import { LogInFromDaoService } from '.';
import { SmsTargetsService } from './SmsTargetsService';
import { SourceGroupsService } from './SourceGroupsService';
import { TelegramTargetsService } from './TelegramTargetsService';

export type NotifiService = AlertsService &
  EmailTargetsService &
  LogInFromDaoService &
  SmsTargetsService &
  SourceGroupsService &
  TelegramTargetsService;
