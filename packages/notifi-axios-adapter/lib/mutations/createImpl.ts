import { CreateInput, CreateResult } from '@notifi-network/notifi-core';
import { makeRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation create(
  $email: String!
  $password: String!
  $isDirectAccessAccount: Boolean!
) {
  create(
    user: {
      email: $email
      password: $password
      isDirectAccessAccount: $isDirectAccessAccount
    }
  ) {
    email
    emailConfirmed
    token
  }
}
`.trim();

const createImpl = makeRequest<CreateInput, CreateResult>(MUTATION, 'create');

export default createImpl;
