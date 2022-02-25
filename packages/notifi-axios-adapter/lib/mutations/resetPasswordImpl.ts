import { ResetPasswordInput } from '@notifi-network/notifi-core';
import { makeBooleanRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation resetPassword(
  $email: String!
  $password: String!
  $tfaCode: String!
) {
  resetPassword(
    email: $email
    password: $password
    tfaCode: $tfaCode
  )
}
`.trim();

const resetPasswordImpl = makeBooleanRequest<ResetPasswordInput>(
  MUTATION,
  'resetPassword'
);

export default resetPasswordImpl;
