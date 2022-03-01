import {
  CreateSmsTargetInput,
  CreateSmsTargetResult
} from '@notifi-network/notifi-core';
import { makeRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation createSmsTarget(
  $name: String!
  $value: String!
) {
  createSmsTarget(
    createTargetInput: {
      name: $name
      value: $value
    }
  ) {
    id
    isConfirmed
    name
    phoneNumber
  }
}
`.trim();

const createSmsTargetImpl = makeRequest<
  CreateSmsTargetInput,
  CreateSmsTargetResult
>(MUTATION, 'createSmsTarget');

export default createSmsTargetImpl;
