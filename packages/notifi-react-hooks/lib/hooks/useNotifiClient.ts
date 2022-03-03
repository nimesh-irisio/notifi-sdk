import {
  NotifiClient,
  ClientData,
  LogInInput,
  UpdateAlertInput,
  NotifiService,
  TargetGroup,
  Filter,
  SourceGroup,
  Alert,
  EmailTarget,
  SmsTarget,
  TelegramTarget
} from '@notifi-network/notifi-core';
import useNotifiService from './useNotifiService';
import { BlockchainEnvironment } from './useNotifiConfig';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useNotifiJwt from './useNotifiJwt';

class NotifiClientError extends Error {
  constructor(public underlying: unknown) {
    super('NotifiClient encountered an error');
  }
}

type InternalData = {
  alert: Alert | null;
  filter: Filter | null;
  sourceGroup: SourceGroup | null;
  targetGroup: TargetGroup | null;
  emailTargets: EmailTarget[];
  smsTargets: SmsTarget[];
  telegramTargets: TelegramTarget[];
};

export type MessageSigner = Readonly<{
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
}>;

const firstOrNull = <T>(arr: ReadonlyArray<T>): T | null => {
  return arr.length > 0 ? arr[0] : null;
};

const fetchDataImpl = async (service: NotifiService): Promise<InternalData> => {
  const [
    alerts,
    filters,
    sourceGroups,
    targetGroups,
    emailTargets,
    smsTargets,
    telegramTargets
  ] = await Promise.all([
    service.getAlerts(),
    service.getFilters(),
    service.getSourceGroups(),
    service.getTargetGroups(),
    service.getEmailTargets(),
    service.getSmsTargets(),
    service.getTelegramTargets()
  ]);

  return {
    alert: firstOrNull(alerts),
    filter: firstOrNull(filters),
    sourceGroup: firstOrNull(sourceGroups),
    targetGroup: firstOrNull(targetGroups),
    emailTargets: [...emailTargets],
    smsTargets: [...smsTargets],
    telegramTargets: [...telegramTargets]
  };
};

type CreateFunc<T> = (service: NotifiService, value: string) => Promise<T>;
type IdentifyFunc<T> = (arg: T) => string | null;

const ensureTargetHoc = <T extends Readonly<{ id: string | null }>>(
  create: CreateFunc<T>,
  identify: IdentifyFunc<T>
): ((
  service: NotifiService,
  existing: Array<T> | undefined,
  value: string | null
) => Promise<string | null>) => {
  return async (service, existing, value) => {
    if (value === null) {
      return null;
    }

    const found = existing?.find((it) => identify(it) === value);

    if (found !== undefined) {
      return found.id;
    }

    const created = await create(service, value);
    existing?.push(created);
    return created.id;
  };
};

const ensureEmail = ensureTargetHoc(
  async (service: NotifiService, value: string) =>
    await service.createEmailTarget({
      name: value,
      value
    }),
  (arg: EmailTarget) => arg.emailAddress
);

const ensureSms = ensureTargetHoc(
  async (service: NotifiService, value: string) =>
    await service.createSmsTarget({
      name: value,
      value
    }),
  (arg: SmsTarget) => arg.phoneNumber
);

const ensureTelegram = ensureTargetHoc(
  async (service: NotifiService, value: string) =>
    await service.createTelegramTarget({
      name: value,
      value
    }),
  (arg: TelegramTarget) => arg.telegramId
);

const useNotifiClient = (
  env = BlockchainEnvironment.MainNetBeta,
  signer: MessageSigner
): NotifiClient &
  Readonly<{
    data: ClientData | null;
    error: Error | null;
    loading: boolean;
    isAuthenticated: () => boolean;
  }> => {
  const { jwtRef, setJwt } = useNotifiJwt();
  const service = useNotifiService(env);

  const [internalData, setInternalData] = useState<InternalData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const newData = await fetchDataImpl(service);
      setInternalData(newData);
      return data;
    } catch (e: unknown) {
      setError(new NotifiClientError(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    // Initial load
    if (jwtRef.current !== null) {
      setLoading(true);
      fetchDataImpl(service)
        .then((newData) => {
          setInternalData(newData);
          setLoading(false);
        })
        .catch((_e: unknown) => {
          // Sign out
          setJwt(null);
          setLoading(false);
        });
    }
  }, []);

  const logIn = useCallback(
    async (input: LogInInput) => {
      if (signer == null) {
        throw new Error('Signer cannot be null');
      }

      const { walletPublicKey, daoAddress } = input;
      const timestamp = Math.round(Date.now() / 1000);

      setLoading(true);
      try {
        const messageBuffer = new TextEncoder().encode(
          `${walletPublicKey}${daoAddress}${timestamp.toString()}`
        );
        const signedBuffer = await signer.signMessage(messageBuffer);
        const binaryString = String.fromCharCode(...signedBuffer);
        const signature = btoa(binaryString);
        const result = await service.logInFromDao({
          walletPublicKey,
          daoAddress,
          timestamp,
          signature
        });

        jwtRef.current = result.token;
        service.setJwt(result.token);
        setJwt(result.token);

        const newData = await fetchDataImpl(service);
        setInternalData(newData);

        return result;
      } catch (e: unknown) {
        setError(new NotifiClientError(e));
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [service, signer]
  );

  const updateAlert = useCallback(
    async (input: UpdateAlertInput) => {
      const { name, emailAddress, phoneNumber, telegramId } = input;

      setLoading(true);
      try {
        const newData = await fetchDataImpl(service);
        const [emailTargetId, smsTargetId, telegramTargetId] =
          await Promise.all([
            ensureEmail(service, newData?.emailTargets, emailAddress),
            ensureSms(service, newData?.smsTargets, phoneNumber),
            ensureTelegram(service, newData?.telegramTargets, telegramId)
          ]);

        const emailTargetIds = [];
        if (emailTargetId !== null) {
          emailTargetIds.push(emailTargetId);
        }

        const smsTargetIds = [];
        if (smsTargetId !== null) {
          smsTargetIds.push(smsTargetId);
        }

        const telegramTargetIds = [];
        if (telegramTargetId !== null) {
          telegramTargetIds.push(telegramTargetId);
        }

        const existingAlert = newData.alert;
        if (existingAlert !== null && existingAlert.targetGroup.id !== null) {
          const result = await service.updateTargetGroup({
            id: existingAlert.targetGroup.id,
            name,
            emailTargetIds,
            smsTargetIds,
            telegramTargetIds
          });

          newData.targetGroup = result;
          setInternalData(newData);
          return result;
        } else {
          const filterId = newData?.filter?.id ?? null;
          const sourceGroupId = newData?.sourceGroup?.id ?? null;
          if (filterId === null || sourceGroupId === null) {
            throw new Error('Data is missing. Have you logged in?');
          }

          const result = await service.createTargetGroup({
            name,
            emailTargetIds,
            smsTargetIds,
            telegramTargetIds
          });
          newData.targetGroup = result;

          const targetGroupId = result.id ?? null;
          if (targetGroupId === null) {
            throw new Error('TargetGroup creation failed');
          }

          const alert = await service.createAlert({
            sourceGroupId,
            filterId,
            targetGroupId
          });
          newData.alert = alert;
          setInternalData(newData);
          return result;
        }
      } catch (e: unknown) {
        setError(new NotifiClientError(e));
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [service]
  );

  const isAuthenticated = useCallback(() => {
    return jwtRef.current !== null;
  }, [jwtRef]);

  const data = useMemo(() => {
    return {
      targetGroup: internalData?.targetGroup ?? null
    };
  }, [internalData?.targetGroup]);

  return {
    data,
    error,
    fetchData,
    isAuthenticated,
    logIn,
    loading,
    updateAlert
  };
};

export default useNotifiClient;
