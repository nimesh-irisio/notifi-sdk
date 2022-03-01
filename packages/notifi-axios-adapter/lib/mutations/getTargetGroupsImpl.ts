import { GetTargetGroupsResult } from '@notifi-network/notifi-core';
import collectDependencies from '../utils/collectDependencies';
import { makeParameterLessRequest } from '../utils/axiosRequest';
import {
  targetGroupFragment,
  targetGroupFragmentDependencies
} from '../fragments';

const DEPENDENCIES = [...targetGroupFragmentDependencies, targetGroupFragment];

const MUTATION = `
query getTargetGroups {
  targetGroups {
    ...targetGroupFragment
  }
}
`.trim();

const getTargetGroupsImpl = makeParameterLessRequest<GetTargetGroupsResult>(
  collectDependencies(...DEPENDENCIES, MUTATION),
  'targetGroups'
);

export default getTargetGroupsImpl;
