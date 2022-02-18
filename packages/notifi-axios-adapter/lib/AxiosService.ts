import { AxiosInstance } from 'axios';
import { NotifiService } from '@notifi-network/notifi-core';

import {
  JwtGetter,
  createAlertImpl,
  createEmailTargetImpl,
  createSourceGroupImpl,
  getAlertsImpl,
  getEmailTargetsImpl,
  getSourceGroupsImpl,
  logInFromDaoImpl
} from './impl';

export { JwtGetter } from './impl';

export class AxiosNotifiService implements NotifiService {
  // Queries
  getAlerts;
  getEmailTargets;
  getSourceGroups;

  // Mutations
  createAlert;
  createEmailTarget;
  createSourceGroup;
  logInFromDao;

  constructor(axios: AxiosInstance, jwtGetter: JwtGetter) {
    this.getAlerts = getAlertsImpl.bind(null, axios, jwtGetter);
    this.getEmailTargets = getEmailTargetsImpl.bind(null, axios, jwtGetter);
    this.getSourceGroups = getSourceGroupsImpl.bind(null, axios, jwtGetter);
    this.createAlert = createAlertImpl.bind(null, axios, jwtGetter);
    this.createEmailTarget = createEmailTargetImpl.bind(null, axios, jwtGetter);
    this.createSourceGroup = createSourceGroupImpl.bind(null, axios, jwtGetter);
    this.logInFromDao = logInFromDaoImpl.bind(null, axios);
  }
}
