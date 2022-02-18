import {
  UpdateTargetGroupPayload,
  UpdateTargetGroupResult
} from '@notifi-network/notifi-core';
import { useCallback } from 'react';
import useAxiosNotifiService from './useAxiosNotifiService';
const useUpdateTargetGroup = (): ((
  payload: UpdateTargetGroupPayload
) => Promise<UpdateTargetGroupResult>) => {
  const notifiService = useAxiosNotifiService();
  return useCallback(
    (payload) => {
      return notifiService.updateTargetGroup(payload);
    },
    [notifiService]
  );
};

export default useUpdateTargetGroup;
