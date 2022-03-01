import { NotifiService } from '@notifi-network/notifi-core';
import axios from 'axios';
import confirmEmailImpl from './mutations/confirmEmailImpl';
import createAlertImpl from './mutations/createAlertImpl';
import createEmailTargetImpl from './mutations/createEmailTargetImpl';
import createImpl from './mutations/createImpl';
import createSmsTargetImpl from './mutations/createSmsTargetImpl';
import createTelegramTargetImpl from './mutations/createTelegramTargetImpl';
import generateEmailConfirmationTokenImpl from './mutations/generateEmailConfirmationTokenImpl';
import logInImpl from './mutations/logInImpl';
import logOutImpl from './mutations/logOutImpl';
import resetPasswordImpl from './mutations/resetPasswordImpl';
import sendResetPasswordEmailImpl from './mutations/sendResetPasswordEmailImpl';

export type NotifiAxiosServiceConfig = Readonly<{
  gqlUrl: string;
  getJwt: () => string | undefined;
}>;

export class NotifiAxiosService implements NotifiService {
  confirmEmail: NotifiService['confirmEmail'];
  create: NotifiService['create'];
  createAlert: NotifiService['createAlert'];
  createEmailTarget: NotifiService['createEmailTarget'];
  createSmsTarget: NotifiService['createSmsTarget'];
  createTelegramTarget: NotifiService['createTelegramTarget'];
  generateEmailConfirmationToken: NotifiService['generateEmailConfirmationToken'];
  logIn: NotifiService['logIn'];
  logOut: NotifiService['logOut'];
  resetPassword: NotifiService['resetPassword'];
  sendResetPasswordEmail: NotifiService['sendResetPasswordEmail'];

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

    this.confirmEmail = confirmEmailImpl.bind(null, a);
    this.create = createImpl.bind(null, a);
    this.createAlert = createAlertImpl.bind(null, a);
    this.createEmailTarget = createEmailTargetImpl.bind(null, a);
    this.createSmsTarget = createSmsTargetImpl.bind(null, a);
    this.createTelegramTarget = createTelegramTargetImpl.bind(null, a);
    this.generateEmailConfirmationToken =
      generateEmailConfirmationTokenImpl.bind(null, a);
    this.logIn = logInImpl.bind(null, a);
    this.logOut = logOutImpl.bind(null, a);
    this.resetPassword = resetPasswordImpl.bind(null, a);
    this.sendResetPasswordEmail = sendResetPasswordEmailImpl.bind(null, a);
  }
}
