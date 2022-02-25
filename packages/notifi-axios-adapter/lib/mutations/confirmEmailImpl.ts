import { ConfirmEmailInput } from '@notifi-network/notifi-core';
import { makeBooleanRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation confirmEmail(
  $email: String!
  $token: String!
) {
  confirmEmail(
    email: $email
    token: $token
  )
}
`.trim();

const confirmEmailImpl = makeBooleanRequest<ConfirmEmailInput>(
  MUTATION,
  'confirmEmail'
);

export default confirmEmailImpl;
