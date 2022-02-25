import { LogInInput, LogInResult } from '@notifi-network/notifi-core';
import { makeRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation logIn(
  $email: String!
  $password: String!
) {
  logIn(
    email: $email
    password: $password
  ) {
    email
    emailConfirmed
    token
  }
}
`.trim();

const logInImpl = makeRequest<LogInInput, LogInResult>(MUTATION, 'logIn');

export default logInImpl;
