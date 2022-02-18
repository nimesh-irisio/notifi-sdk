import { AxiosInstance } from 'axios';
import { NotifiService } from '@notifi-network/notifi-core';

import * as i from './impl';

export { JwtGetter } from './impl';

export class AxiosNotifiService implements NotifiService {
  // Queries
  getAlerts;
  getEmailTargets;
  getSmsTargets;
  getSourceGroups;
  getTelegramTargets;

  // Mutations
  createAlert;
  createEmailTarget;
  createSmsTarget;
  createSourceGroup;
  createTelegramTarget;
  logInFromDao;

  constructor(axios: AxiosInstance, jwtGetter: i.JwtGetter) {
    this.getAlerts = i.getAlertsImpl.bind(null, axios, jwtGetter);
    this.getEmailTargets = i.getEmailTargetsImpl.bind(null, axios, jwtGetter);
    this.getSmsTargets = i.getSmsTargetsImpl.bind(null, axios, jwtGetter);
    this.getSourceGroups = i.getSourceGroupsImpl.bind(null, axios, jwtGetter);
    this.getTelegramTargets = i.getTelegramTargetsImpl.bind(
      null,
      axios,
      jwtGetter
    );
    this.createAlert = i.createAlertImpl.bind(null, axios, jwtGetter);
    this.createEmailTarget = i.createEmailTargetImpl.bind(
      null,
      axios,
      jwtGetter
    );
    this.createSmsTarget = i.createSmsTargetImpl.bind(null, axios, jwtGetter);
    this.createTelegramTarget = i.createTelegramTargetImpl.bind(
      null,
      axios,
      jwtGetter
    );
    this.createSourceGroup = i.createSourceGroupImpl.bind(
      null,
      axios,
      jwtGetter
    );
    this.logInFromDao = i.logInFromDaoImpl.bind(null, axios);
  }
}
