import { AxiosInstance } from 'axios';
import { NotifiService } from '@notifi-network/notifi-core';

import logInFromDaoImpl from './logInFromDaoImpl';
import getSourceGroupsImpl from './getSourceGroupsImpl';
import { JwtGetter } from './makeAuthenticatedQuery';
import createSourceGroupImpl from './createSourceGroupImpl';
export { JwtGetter } from './makeAuthenticatedQuery';

export class AxiosNotifiService implements NotifiService {
  logInFromDao;
  getSourceGroups;
  createSourceGroup;

  constructor(axios: AxiosInstance, jwtGetter: JwtGetter) {
    this.logInFromDao = logInFromDaoImpl.bind(null, axios);
    this.getSourceGroups = getSourceGroupsImpl.bind(null, axios, jwtGetter);
    this.createSourceGroup = createSourceGroupImpl.bind(null, axios, jwtGetter);
  }
}
