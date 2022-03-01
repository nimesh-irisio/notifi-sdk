import { EmailTarget } from './EmailTarget';

export type TargetGroup = Readonly<{
  emailTargets: ReadonlyArray<EmailTarget>;
  id: string | null;
  name: string | null;
}>;
