import { SendResetPasswordEmailInput } from '@notifi-network/notifi-core';
import { makeBooleanRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation sendResetPasswordEmail(
  $email: String!
) {
  sendResetPasswordEmail(
    email: $email
  )
}
`.trim();

const sendResetPasswordEmailImpl =
  makeBooleanRequest<SendResetPasswordEmailInput>(
    MUTATION,
    'sendResetPasswordEmail'
  );

export default sendResetPasswordEmailImpl;
