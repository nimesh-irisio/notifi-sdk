import useLocalStorageState from "use-local-storage-state";

const LOCAL_STORAGE_KEY = "notifi:jwt";

const useNotifiJwt = (): [string | null, (newJwt: string | null) => void] => {
  const [jwt, setJwt] = useLocalStorageState<string | null>(
    LOCAL_STORAGE_KEY,
    null
  );
  return [jwt, setJwt];
};

export default useNotifiJwt;
