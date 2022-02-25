import {
  CreateAlertInput,
  CreateAlertResult
} from '@notifi-network/notifi-core';
import { makeRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation createAlert(
  $sourceGroupId: String!
  $filterId: String!
  $targetGroupId: String!
) {
  createAlert(
    alertInput: {
      sourceGroupId: $sourceGroupId
      filterId: $filterId
      targetGroupId: $targetGroupId
    }
  ) {
    id
    name
    filter {
      id
      name
    }
    sourceGroup {
      id
      name
    }
    targetGroup {
      id
      name
    }
  }
}
`.trim();

const createAlertImpl = makeRequest<CreateAlertInput, CreateAlertResult>(
  MUTATION,
  'createAlert'
);

export default createAlertImpl;
