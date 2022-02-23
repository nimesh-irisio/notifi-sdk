import { useCallback, useRef } from 'react';
import useLocalStorageState from 'use-local-storage-state';

export const LOCAL_STORAGE_KEY = 'notifi-jwt';

const useNotifiJwt = (): Readonly<{
  jwtRef: React.MutableRefObject<string | null>;
  setJwt: (jwt: string | null) => void;
}> => {
  const [storage, setStorage] = useLocalStorageState<string | null>(
    LOCAL_STORAGE_KEY,
    { defaultValue: null }
  );
  const jwtRef = useRef<string | null>(storage);
  const setJwt = useCallback(
    (jwt: string | null): void => {
      jwtRef.current = jwt;
      setStorage(jwt);
    },
    [jwtRef, setStorage]
  );

  return { jwtRef, setJwt };
};

export default useNotifiJwt;
