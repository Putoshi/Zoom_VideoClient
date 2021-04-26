import { getExploreName } from '../utils/platform';
import Certification from './certification.json';
export const devConfig = {
  sdkKey: Certification.sdkKey,
  sdkSecret: Certification.sdkSecret,
  topic: 'test',
  name: `${getExploreName()}-${Math.floor(Math.random() * 1000)}`,
  password: '',
  signature: '',
};
