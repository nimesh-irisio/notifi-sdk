import { AxiosInstance } from 'axios';
import { NotifiService } from '@notifi-network/notifi-core';

import {
  JwtGetter,
  logInFromDaoImpl,
  getSourceGroupsImpl,
  createSourceGroupImpl
} from './impl';

export { JwtGetter } from './impl';

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
