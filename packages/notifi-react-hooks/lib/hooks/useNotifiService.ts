import { NotifiService } from '@notifi-network/notifi-core';
import { NotifiAxiosService } from '@notifi-network/notifi-axios-adapter';
import { useMemo } from 'react';
import useNotifiJwt from './useNotifiJwt';
import useNotifiConfig, { BlockchainEnvironment } from './useNotifiConfig';

const useNotifiService = (
  env = BlockchainEnvironment.MainNetBeta
): NotifiService => {
  const { jwtRef } = useNotifiJwt();
  const { gqlUrl } = useNotifiConfig(env);

  const service = useMemo(() => {
    const config = {
      gqlUrl,
      jwtContainer: jwtRef
    };
    return new NotifiAxiosService(config);
  }, [gqlUrl]);

  return service;
};

export default useNotifiService;
