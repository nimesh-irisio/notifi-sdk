import { TargetGroup, User } from './models';

export type Config = Readonly<{
  storedJwt: string | undefined;
  onJwtChanged: (newJwt: string) => void;
}>;

export type ClientData = Readonly<{
  targetGroup: TargetGroup | null;
}>;

export type LogInInput = Readonly<{
  walletPublicKey: string;
  daoAddress: string;
}>;

export type GetSignatureMessageInput = Readonly<{
  walletPublicKey: string;
  daoAddress: string;
}>;

export type UpdateAlertInput = Readonly<{
  name: string;
  emailAddress: string | null;
  phoneNumber: string | null;
  telegramId: string | null;
}>;

export type NotifiClient = Readonly<{
  fetchData: () => Promise<ClientData>;
  logIn: (input: LogInInput) => Promise<User>;
  updateAlert: (input: UpdateAlertInput) => Promise<TargetGroup>;
}>;
