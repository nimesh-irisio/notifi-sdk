import { LogOutInput } from '@notifi-network/notifi-core';
import { makeBooleanRequest } from '../utils/axiosRequest';

const MUTATION = `
mutation logOut {
  logOut
}
`.trim();

const logOutImpl = makeBooleanRequest<LogOutInput>(MUTATION, 'logOut');

export default logOutImpl;
