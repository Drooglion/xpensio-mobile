import { chunk } from 'lodash';

const getInitials = text => {
  let initials = text.match(/\b\w/g) || [];
  initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

  return initials.charAt(0);
};

const formatVerificationStatus = status => {
  const list = {
    pending: 'Pending',
    request_for_verification: 'Not Verified',
    in_progress: 'In progress',
    verified: 'Verified',
  };
  return list[status];
};

const formatStatus = status => {
  const list = {
    0: 'PENDING',
    1: 'APPROVED',
    2: 'DENIED',
    3: 'EXPIRED',
    4: 'UNSETTLED',
    '-1': 'CANCELLED',
  };
  return list[status];
};

const formatExpense = expense => {
  const list = {
    0: 'SINGLE PURCHASE',
    1: 'SUBSCRIPTION',
  };
  return list[expense];
};

const formatSubscription = subscription => {
  const list = {
    0: 'MONTHLY',
    1: 'YEARLY',
  };
  return list[subscription];
};

const roles = role => {
  const list = {
    0: 'USER',
    1: 'ADMIN',
    2: 'BOOKKEEPER',
  };
  return list[role];
};

const teamRoles = teamRole => {
  const list = {
    0: 'MEMBER',
    1: 'MANAGER',
    2: 'APPROVER',
  };

  return list[teamRole];
};

const cardStatus = (value: number) => {
  let status = '';
  switch (value) {
    case 0:
      status = 'LOCKED';
      break;
    case 1:
      status = 'UNLOCKED';
      break;
    case -1:
      status = 'FOR_ACTIVATION';
      break;
    default:
      status = '';
  }

  return status;
};

const cardRequestStatus = status => {
  const list = {
    0: 'PENDING',
    1: 'APPROVED',
    2: 'PENDING_ADMIN_APPROVAL',
    '-1': 'REJECTED',
    '-2': 'CANCELLED',
  };
  return list[status];
};

const paymentStatus = status => {
  const list = {
    0: 'DISAPPROVED',
    1: 'APPROVED',
    '-1': 'DENIED',
  };
  return list[status];
};

const cardNumberHidden = (last4: string) => `•••• •••• •••• ${last4}`;

const cardNumberShown = (cardNumber: string) => {
  const chunked = chunk(cardNumber.split(''), 4);
  return `${chunked[0].join('')} ${chunked[1].join('')} ${chunked[2].join(
    '',
  )} ${chunked[3].join('')}`;
};

export default {
  cardStatus,
  roles,
  teamRoles,
  getInitials,
  formatStatus,
  formatExpense,
  formatSubscription,
  formatVerificationStatus,
  cardRequestStatus,
  cardNumberHidden,
  cardNumberShown,
  paymentStatus,
};
