import { NotifiService } from '@notifi-network/notifi-core';
import { NotifiAxiosService } from '@notifi-network/notifi-axios-adapter';
import { useCallback, useMemo } from 'react';
import { useNotifiJwt } from '.';
import useNotifiConfig, { BlockchainEnvironment } from './useNotifiConfig';

const useNotifiService = (
  env = BlockchainEnvironment.MainNetBeta
): NotifiService => {
  const { jwtRef } = useNotifiJwt();
  const { gqlUrl } = useNotifiConfig(env);
  const getJwt = useCallback(() => {
    return jwtRef.current ?? undefined;
  }, [jwtRef]);

  const service = useMemo(() => {
    const config = {
      gqlUrl,
      getJwt
    };
    return new NotifiAxiosService(config);
  }, [gqlUrl, getJwt]);

  return service;
};

export default useNotifiService;
