import { createLocalStorageStateHook } from "use-local-storage-state";

const LOCAL_STORAGE_KEY = "notifi:jwt";

const useLocalStorage = createLocalStorageStateHook<string | null>(
  LOCAL_STORAGE_KEY,
  null
);

const useNotifiJwt = (): Readonly<{
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
}> => {
  const [jwt, setJwt] = useLocalStorage();
  return { jwt, setJwt };
};

export default useNotifiJwt;
