import {
  CreateEmailTargetInput,
  CreateEmailTargetResult
} from '@notifi-network/notifi-core';
import { makeRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation createEmailTarget(
  $name: String!
  $value: String!
) {
  createEmailTarget(
    createTargetInput: {
      name: $name
      value: $value
    }
  ) {
    emailAddress
    id
    isConfirmed
    name
  }
}
`.trim();

const createEmailTargetImpl = makeRequest<
  CreateEmailTargetInput,
  CreateEmailTargetResult
>(MUTATION, 'createEmailTarget');

export default createEmailTargetImpl;
