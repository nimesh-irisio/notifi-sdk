import {
  CreateTelegramTargetPayload,
  CreateTelegramTargetResult
} from '@notifi-network/notifi-core';
import { useCallback } from 'react';
import useAxiosNotifiService from './useAxiosNotifiService';

const useCreateTelegramTarget = (): ((
  payload: CreateTelegramTargetPayload
) => Promise<CreateTelegramTargetResult>) => {
  const notifiService = useAxiosNotifiService();

  return useCallback(
    (payload) => {
      return notifiService.createTelegramTarget(payload);
    },
    [notifiService]
  );
};

export default useCreateTelegramTarget;
