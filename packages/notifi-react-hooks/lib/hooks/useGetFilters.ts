import { GetFiltersResult } from '@notifi-network/notifi-core';
import { useCallback } from 'react';
import useAxiosNotifiService from './useAxiosNotifiService';

const useGetFilters = (): (() => Promise<GetFiltersResult>) => {
  const notifiService = useAxiosNotifiService();
  return useCallback(() => {
    return notifiService.getFilters();
  }, [notifiService]);
};

export default useGetFilters;
