import { AxiosInstance } from 'axios';
import { NotifiService } from '@notifi-network/notifi-core';

import logInFromDaoImpl from './logInFromDaoImpl';

export class AxiosNotifiService implements NotifiService {
  logInFromDao;

  constructor(axios: AxiosInstance) {
    this.logInFromDao = logInFromDaoImpl.bind(null, axios);
  }
}
