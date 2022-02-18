import axios from 'axios';
import { AxiosUnauthenticatedService } from '@notifi-network/notifi-axios-adapter';
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

// TODO: get from Context
const unauthenticatedService = new AxiosUnauthenticatedService(axios);

const useLoginFromDao = (): ((payload: Payload) => Promise<Result>) => {
  const { setJwt } = useNotifiJwt();

  const loginFromDao = useCallback(
    async (payload: Payload) => {
      const result = await unauthenticatedService.logInFromDao(payload);

      setJwt(result.token);

      return result;
    },
    [setJwt]
  );

  return loginFromDao;
};

export default useLoginFromDao;
