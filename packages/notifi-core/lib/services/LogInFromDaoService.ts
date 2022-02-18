export type LogInFromDaoPayload = Readonly<{
  walletPublicKey: string;
  tokenAddress: string;
  timestamp: number;
  signature: string;
}>;

export type LogInFromDaoResult = Readonly<{
  email: string | null;
  emailConfirmed: boolean;
  token: string | null;
}>;

export type LogInFromDaoService = Readonly<{
  logInFromDao(payload: LogInFromDaoPayload): Promise<LogInFromDaoResult>;
}>;
