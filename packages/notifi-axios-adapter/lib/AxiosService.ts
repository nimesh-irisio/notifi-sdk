import { AxiosInstance } from 'axios';
import { NotifiService } from '@notifi-network/notifi-core';

import * as i from './impl';

export { JwtGetter } from './impl';

export class AxiosNotifiService implements NotifiService {
  // Queries
  getAlerts;
  getEmailTargets;
  getFilters;
  getSmsTargets;
  getSourceGroups;
  getTargetGroups;
  getTelegramTargets;

  // Mutations
  createAlert;
  createEmailTarget;
  createSmsTarget;
  createSourceGroup;
  createTargetGroup;
  createTelegramTarget;
  logInFromDao;

  constructor(a: AxiosInstance, j: i.JwtGetter) {
    this.getAlerts = i.getAlertsImpl.bind(null, a, j);
    this.getEmailTargets = i.getEmailTargetsImpl.bind(null, a, j);
    this.getFilters = i.getFiltersImpl.bind(null, a, j);
    this.getSmsTargets = i.getSmsTargetsImpl.bind(null, a, j);
    this.getSourceGroups = i.getSourceGroupsImpl.bind(null, a, j);
    this.getTargetGroups = i.getTargetGroupsImpl.bind(null, a, j);
    this.getTelegramTargets = i.getTelegramTargetsImpl.bind(null, a, j);
    this.createAlert = i.createAlertImpl.bind(null, a, j);
    this.createEmailTarget = i.createEmailTargetImpl.bind(null, a, j);
    this.createSmsTarget = i.createSmsTargetImpl.bind(null, a, j);
    this.createTargetGroup = i.createTargetGroupImpl.bind(null, a, j);
    this.createTelegramTarget = i.createTelegramTargetImpl.bind(null, a, j);
    this.createSourceGroup = i.createSourceGroupImpl.bind(null, a, j);
    this.logInFromDao = i.logInFromDaoImpl.bind(null, a);
  }
}
