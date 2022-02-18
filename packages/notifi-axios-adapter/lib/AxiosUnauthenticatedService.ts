import { AxiosInstance } from 'axios';

import {
  UnauthenticatedService,
  LogInFromDaoPayload,
  LogInFromDaoResult
} from '@notifi-network/notifi-core';

const NOTIFI_GQL_URL = 'https://api.notifi.network/api/gql';

const LOG_IN_FROM_DAO = `mutation logInFromDao(
  $walletPublicKey: String!
  $tokenAddress: String!
  $timestamp: Long!
  $signature: String!
) {
  logInFromDao(daoLogInInput: {
    walletPublicKey: $walletPublicKey
    tokenAddress: $tokenAddress
    timestamp: $timestamp
  }, signature: $signature) {
    email
    emailConfirmed
    token
  }
}`;

type PostResponse = Readonly<{
  data?: Readonly<{
    logInFromDao?: LogInFromDaoResult | null;
  }>;
}>;

export class AxiosUnauthenticatedService implements UnauthenticatedService {
  constructor(private axios: AxiosInstance) {}

  async logInFromDao(
    payload: LogInFromDaoPayload
  ): Promise<LogInFromDaoResult> {
    const { walletPublicKey, tokenAddress, timestamp, signature } = payload;

    const resp = await this.axios.post<PostResponse>(NOTIFI_GQL_URL, {
      query: LOG_IN_FROM_DAO,
      variables: {
        walletPublicKey,
        tokenAddress,
        timestamp,
        signature
      }
    });
    const result = resp.data.data?.logInFromDao;
    if (result == null) {
      throw new Error('No data returned from notifi');
    }

    return result;
  }
}
