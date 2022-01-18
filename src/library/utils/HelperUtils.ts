import R from 'res/R';
import { Client } from 'bugsnag-react-native';
import Config from 'react-native-config';

const statusColor = (status: number) => {
  switch (status) {
    case 0:
      return R.colors.pending;
    case 1:
      return R.colors.success;
    case 2:
    case 3:
    case 4:
    case -1:
      return R.colors.error;
    default:
      return null;
  }
};

const verificationStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
    case 'in_progress':
      return R.colors.pending;
    case 'verified':
      return R.colors.success;
    case 'request_for_verification':
      return R.colors.error;
    default:
      return null;
  }
};

const bugsnag = new Client(Config.BUGSNAG_API);

export default {
  statusColor,
  verificationStatusColor,
  bugsnag,
};
