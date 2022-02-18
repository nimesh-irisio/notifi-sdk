import { useCallback } from 'react';
import { GetSourceGroupsResult } from '@notifi-network/notifi-core';
import useAxiosNotifiService from './useAxiosNotifiService';

const useGetSourceGroups = (): (() => Promise<GetSourceGroupsResult>) => {
  const notifiService = useAxiosNotifiService();

  return useCallback(() => {
    return notifiService.getSourceGroups();
  }, [notifiService]);
};

export default useGetSourceGroups;
