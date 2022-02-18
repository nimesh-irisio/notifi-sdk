import { useCallback } from 'react';
import {
  CreateAlertPayload,
  CreateAlertResult
} from '@notifi-network/notifi-core';
import useAxiosNotifiService from './useAxiosNotifiService';

const useCreateAlert = (): ((
  payload: CreateAlertPayload
) => Promise<CreateAlertResult>) => {
  const notifiService = useAxiosNotifiService();
  return useCallback(
    (payload) => {
      return notifiService.createAlert(payload);
    },
    [notifiService]
  );
};

export default useCreateAlert;
