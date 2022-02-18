import {
  CreateSmsTargetPayload,
  CreateSmsTargetResult
} from '@notifi-network/notifi-core';
import { useCallback } from 'react';
import useAxiosNotifiService from './useAxiosNotifiService';

const useCreateSmsTarget = (): ((
  payload: CreateSmsTargetPayload
) => Promise<CreateSmsTargetResult>) => {
  const notifiService = useAxiosNotifiService();

  return useCallback(
    (payload) => {
      return notifiService.createSmsTarget(payload);
    },
    [notifiService]
  );
};

export default useCreateSmsTarget;
