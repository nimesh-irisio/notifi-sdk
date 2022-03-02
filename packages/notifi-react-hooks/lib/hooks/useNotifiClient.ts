import {
  NotifiClient,
  ClientData,
  LogInInput,
  UpdateAlertInput,
  NotifiService,
  TargetGroup
} from '@notifi-network/notifi-core';
import useNotifiService from './useNotifiService';
import { BlockchainEnvironment } from './useNotifiConfig';
import { useCallback, useEffect, useState } from 'react';
import useNotifiJwt from './useNotifiJwt';

class NotifiClientError extends Error {
  constructor(public underlying: unknown) {
    super('NotifiClient encountered an error');
  }
}

export type MessageSigner = Readonly<{
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
}>;

const fetchDataImpl = async (service: NotifiService): Promise<ClientData> => {
  const [filters, sourceGroups, targetGroups] = await Promise.all([
    service.getFilters(),
    service.getSourceGroups(),
    service.getTargetGroups()
  ]);

  return {
    filter: filters.length > 0 ? filters[0] : null,
    sourceGroup: sourceGroups.length > 0 ? sourceGroups[0] : null,
    targetGroup: targetGroups.length > 0 ? targetGroups[0] : null
  };
};

const ensureEmail = async (
  service: NotifiService,
  existingTargetGroup: TargetGroup | null,
  emailAddress: string | null
): Promise<string | null> => {
  if (emailAddress === null) {
    return null;
  }

  const existing = existingTargetGroup?.emailTargets?.find(
    (it) => it.emailAddress === emailAddress
  );
  if (existing !== undefined) {
    return existing.id;
  }

  const newTarget = await service.createEmailTarget({
    name: emailAddress,
    value: emailAddress
  });
  return newTarget.id;
};

const ensureSms = async (
  service: NotifiService,
  existingTargetGroup: TargetGroup | null,
  phoneNumber: string | null
): Promise<string | null> => {
  if (phoneNumber === null) {
    return null;
  }

  const existing = existingTargetGroup?.smsTargets?.find(
    (it) => it.phoneNumber === phoneNumber
  );
  if (existing !== undefined) {
    return existing.id;
  }

  const newTarget = await service.createSmsTarget({
    name: phoneNumber,
    value: phoneNumber
  });
  return newTarget.id;
};

const ensureTelegram = async (
  service: NotifiService,
  existingTargetGroup: TargetGroup | null,
  telegramId: string | null
): Promise<string | null> => {
  if (telegramId === null) {
    return null;
  }

  const existing = existingTargetGroup?.telegramTargets?.find(
    (it) => it.telegramId === telegramId
  );
  if (existing !== undefined) {
    return existing.id;
  }

  const newTarget = await service.createTelegramTarget({
    name: telegramId,
    value: telegramId
  });
  return newTarget.id;
};

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

  const [data, setData] = useState<ClientData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDataImpl(service);
      setData(data);
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
        .then((data) => {
          setData(data);
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
        setJwt(result.token);

        const newData = await fetchDataImpl(service);
        setData(newData);

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
      const existing = data?.targetGroup ?? null;
      try {
        const [emailTargetId, smsTargetId, telegramTargetId] =
          await Promise.all([
            ensureEmail(service, existing, emailAddress),
            ensureSms(service, existing, phoneNumber),
            ensureTelegram(service, existing, telegramId)
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

        if (existing !== null && existing.id !== null) {
          const result = await service.updateTargetGroup({
            id: existing.id,
            name,
            emailTargetIds,
            smsTargetIds,
            telegramTargetIds
          });
          return result;
        } else {
          const filterId = data?.filter?.id ?? null;
          const sourceGroupId = data?.sourceGroup?.id ?? null;
          if (filterId === null || sourceGroupId === null) {
            throw new Error('Data is missing. Have you logged in?');
          }

          const result = await service.createTargetGroup({
            name,
            emailTargetIds,
            smsTargetIds,
            telegramTargetIds
          });

          const targetGroupId = result.id ?? null;
          if (targetGroupId === null) {
            throw new Error('TargetGroup creation failed');
          }

          await service.createAlert({
            sourceGroupId,
            filterId,
            targetGroupId
          });

          return result;
        }
      } catch (e: unknown) {
        setError(new NotifiClientError(e));
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [data, service]
  );

  const isAuthenticated = useCallback(() => {
    return jwtRef.current !== null;
  }, [jwtRef]);

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
