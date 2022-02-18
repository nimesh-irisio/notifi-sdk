import {
  CreateEmailTargetPayload,
  CreateEmailTargetResult
} from '@notifi-network/notifi-core';
import useAxiosNotifiService from './useAxiosNotifiService';
import { useCallback } from 'react';

const useCreateEmailTarget = (): ((
  payload: CreateEmailTargetPayload
) => Promise<CreateEmailTargetResult>) => {
  const notifiService = useAxiosNotifiService();

  return useCallback(
    (payload) => {
      return notifiService.createEmailTarget(payload);
    },
    [notifiService]
  );
};

export default useCreateEmailTarget;
