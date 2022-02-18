import { useCallback } from 'react';
import useNotifiJwt from './useNotifiJwt';
import useAxiosNotifiService from './useAxiosNotifiService';
import {
  LogInFromDaoPayload,
  LogInFromDaoResult
} from '@notifi-network/notifi-core';

const useLoginFromDao = (): ((
  payload: LogInFromDaoPayload
) => Promise<LogInFromDaoResult>) => {
  const { setJwt } = useNotifiJwt();
  const notifiService = useAxiosNotifiService();

  return useCallback(
    async (payload) => {
      const result = await notifiService.logInFromDao(payload);

      setJwt(result.token);

      return result;
    },
    [setJwt]
  );
};

export default useLoginFromDao;
