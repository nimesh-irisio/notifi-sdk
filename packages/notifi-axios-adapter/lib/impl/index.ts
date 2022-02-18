import { JwtGetter } from './makeAuthenticatedQuery';

import createAlertImpl from './createAlertImpl';
import createEmailTargetImpl from './createEmailTargetImpl';
import createSmsTargetImpl from './createSmsTargetImpl';
import createSourceGroupImpl from './createSourceGroupImpl';
import createTargetGroupImpl from './createTargetGroupImpl';
import createTelegramTargetImpl from './createTelegramTargetImpl';
import getAlertsImpl from './getAlertsImpl';
import getEmailTargetsImpl from './getEmailTargetsImpl';
import getSmsTargetsImpl from './getSmsTargetsImpl';
import getSourceGroupsImpl from './getSourceGroupsImpl';
import getTargetGroupsImpl from './getTargetGroupImpl';
import getTelegramTargetsImpl from './getTelegramTargetsImpl';
import logInFromDaoImpl from './logInFromDaoImpl';

export {
  JwtGetter,
  createAlertImpl,
  createEmailTargetImpl,
  createSmsTargetImpl,
  createSourceGroupImpl,
  createTargetGroupImpl,
  createTelegramTargetImpl,
  getAlertsImpl,
  getEmailTargetsImpl,
  getSmsTargetsImpl,
  getSourceGroupsImpl,
  getTargetGroupsImpl,
  getTelegramTargetsImpl,
  logInFromDaoImpl
};
