import {
  CreateTelegramTargetInput,
  CreateTelegramTargetResult
} from '@notifi-network/notifi-core';
import { makeRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation createTelegramTarget(
  $name: String!
  $value: String!
) {
  createTelegramTarget(
    createTargetInput: {
      name: $name
      value: $value
    }
  ) {
    id
    isConfirmed
    name
    telegramId
  }
}
`.trim();

const createTelegramTargetImpl = makeRequest<
  CreateTelegramTargetInput,
  CreateTelegramTargetResult
>(MUTATION, 'createTelegramTarget');

export default createTelegramTargetImpl;
