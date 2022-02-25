import { GenerateEmailConfirmationTokenInput } from '@notifi-network/notifi-core';
import { makeBooleanRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation generateEmailConfirmationToken(
  $email: String!
) {
  generateEmailConfirmationToken(
    email: $email
  )
}
`.trim();

const generateEmailConfirmationTokenImpl =
  makeBooleanRequest<GenerateEmailConfirmationTokenInput>(
    MUTATION,
    'generateEmailConfirmationToken'
  );

export default generateEmailConfirmationTokenImpl;
