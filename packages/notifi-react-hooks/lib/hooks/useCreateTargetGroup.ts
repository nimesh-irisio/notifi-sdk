import {
  CreateTargetGroupPayload,
  CreateTargetGroupResult
} from '@notifi-network/notifi-core';
import { useCallback } from 'react';
import useAxiosNotifiService from './useAxiosNotifiService';
const useCreateTargetGroup = (): ((
  payload: CreateTargetGroupPayload
) => Promise<CreateTargetGroupResult>) => {
  const notifiService = useAxiosNotifiService();

  return useCallback(
    (payload) => {
      return notifiService.createTargetGroup(payload);
    },
    [notifiService]
  );
};

export default useCreateTargetGroup;
