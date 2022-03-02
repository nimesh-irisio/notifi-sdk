import { NotifiService } from '@notifi-network/notifi-core';
import axios from 'axios';
import createAlertImpl from './mutations/createAlertImpl';
import createEmailTargetImpl from './mutations/createEmailTargetImpl';
import createSmsTargetImpl from './mutations/createSmsTargetImpl';
import createTargetGroupImpl from './mutations/createTargetGroupImpl';
import createTelegramTargetImpl from './mutations/createTelegramTargetImpl';
import getFiltersImpl from './queries/getFiltersImpl';
import getSourceGroupsImpl from './queries/getSourceGroupsImpl';
import getTargetGroupsImpl from './queries/getTargetGroupsImpl';
import logInFromDaoImpl from './mutations/logInFromDaoImpl';
import updateTargetGroupImpl from './mutations/updateTargetGroupImpl';

export type NotifiAxiosServiceConfig = Readonly<{
  gqlUrl: string;
  getJwt: () => string | undefined;
}>;

export class NotifiAxiosService implements NotifiService {
  createAlert: NotifiService['createAlert'];
  createEmailTarget: NotifiService['createEmailTarget'];
  createSmsTarget: NotifiService['createSmsTarget'];
  createTargetGroup: NotifiService['createTargetGroup'];
  createTelegramTarget: NotifiService['createTelegramTarget'];
  getFilters: NotifiService['getFilters'];
  getSourceGroups: NotifiService['getSourceGroups'];
  getTargetGroups: NotifiService['getTargetGroups'];
  logInFromDao: NotifiService['logInFromDao'];
  updateTargetGroup: NotifiService['updateTargetGroup'];

  constructor(c: NotifiAxiosServiceConfig) {
    const a = axios.create({
      baseURL: c.gqlUrl
    });
    a.interceptors.request.use((config) => {
      const jwt = c.getJwt();
      if (jwt !== undefined) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${jwt}`
          }
        };
      }

      return config;
    });

    this.createAlert = createAlertImpl.bind(null, a);
    this.createEmailTarget = createEmailTargetImpl.bind(null, a);
    this.createSmsTarget = createSmsTargetImpl.bind(null, a);
    this.createTargetGroup = createTargetGroupImpl.bind(null, a);
    this.createTelegramTarget = createTelegramTargetImpl.bind(null, a);
    this.getFilters = getFiltersImpl.bind(null, a);
    this.getSourceGroups = getSourceGroupsImpl.bind(null, a);
    this.getTargetGroups = getTargetGroupsImpl.bind(null, a);
    this.logInFromDao = logInFromDaoImpl.bind(null, a);
    this.updateTargetGroup = updateTargetGroupImpl.bind(null, a);
  }
}
