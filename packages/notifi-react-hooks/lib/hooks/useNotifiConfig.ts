export enum BlockchainEnvironment {
  MainNetBeta,
  TestNet,
  DevNet
}

const useNotifiConfig = (env = BlockchainEnvironment.MainNetBeta) => {
  let gqlUrl = '';
  switch (env) {
    case BlockchainEnvironment.MainNetBeta:
      gqlUrl = 'https://api.notifi.network/gql';
      break;
    case BlockchainEnvironment.TestNet:
      gqlUrl = 'https://stg-api.notifi.network/gql';
      break;
    case BlockchainEnvironment.DevNet:
      gqlUrl = 'https://dev-api.notifi.network/gql';
      break;
    default:
      assertUnreachable(env);
  }

  return {
    gqlUrl
  };
};

const assertUnreachable = (_x: never): never => {
  throw new Error('This should never be reached');
};

export default useNotifiConfig;
