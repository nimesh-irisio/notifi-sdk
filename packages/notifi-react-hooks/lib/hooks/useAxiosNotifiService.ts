import { AxiosNotifiService } from '@notifi-network/notifi-axios-adapter';
import axios from 'notifi-axios-adapter/node_modules/axios';
import { useCallback, useMemo } from 'react';
import { useNotifiJwt } from '.';

const useAxiosNotifiService = (): AxiosNotifiService => {
  const { jwtRef } = useNotifiJwt();
  const getJwt = useCallback(() => {
    return jwtRef.current;
  }, [jwtRef]);

  const notifiService = useMemo(() => {
    return new AxiosNotifiService(axios, getJwt);
  }, [getJwt]);

  return notifiService;
};

export default useAxiosNotifiService;
