import { GetTargetGroupsResult } from '@notifi-network/notifi-core';
import { useCallback } from 'react';
import useAxiosNotifiService from './useAxiosNotifiService';

const useGetTargetGroups = (): (() => Promise<GetTargetGroupsResult>) => {
  const notifiService = useAxiosNotifiService();
  return useCallback(() => {
    return notifiService.getTargetGroups();
  }, [notifiService]);
};

export default useGetTargetGroups;
