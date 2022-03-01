import { GetSourceGroupsResult } from '@notifi-network/notifi-core';
import collectDependencies from '../utils/collectDependencies';
import { makeParameterLessRequest } from '../utils/axiosRequest';
import {
  sourceGroupFragment,
  sourceGroupFragmentDependencies
} from '../fragments';

const DEPENDENCIES = [...sourceGroupFragmentDependencies, sourceGroupFragment];

const MUTATION = `
query getSourceGroups {
  sourceGroups {
    ...sourceGroupFragment
  }
}
`.trim();

const getSourceGroupsImpl = makeParameterLessRequest<GetSourceGroupsResult>(
  collectDependencies(...DEPENDENCIES, MUTATION),
  'sourceGroups'
);

export default getSourceGroupsImpl;
