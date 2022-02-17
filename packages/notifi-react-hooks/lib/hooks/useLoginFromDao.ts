import axios from 'axios';
import { useCallback } from 'react';
import useNotifiJwt from './useNotifiJwt';

export type Payload = Readonly<{
  walletPublicKey: string;
  tokenAddress: string;
  timestamp: number;
  signature: string;
}>;

export type Result = Readonly<{
  email: string | null;
  emailConfirmed: boolean;
  token: string | null;
}>;

type PostResponse = Readonly<{
  data?: Readonly<{
    logInFromDao?: Result | null;
  }>;
}>;

const NOTIFI_GQL_URL = 'https://api.notifi.network/api/gql';

const MUTATION_STRING = `mutation logInFromDao(
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

const useLoginFromDao = (): ((payload: Payload) => Promise<Result>) => {
  const { setJwt } = useNotifiJwt();

  const loginFromDao = useCallback(
    async (payload: Payload) => {
      const { walletPublicKey, tokenAddress, timestamp, signature } = payload;

      const resp = await axios.post<PostResponse>(NOTIFI_GQL_URL, {
        query: MUTATION_STRING,
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

      setJwt(result.token);

      return result;
    },
    [setJwt]
  );

  return loginFromDao;
};

export default useLoginFromDao;
