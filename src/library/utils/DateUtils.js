import moment from 'moment';

moment.locale('en');
const NOW = moment();
const TODAY = NOW.clone().startOf('day');
const YESTERDAY = NOW.clone().subtract(1, 'days').startOf('day');

const getSectionHeaderDate = (value) => {
  const date = moment(new Date(value));
  let headerDate = date.format('dddd, D MMM YYYY');

  if (date.isSame(TODAY, 'd')) {
    headerDate = 'Today';
  } else if (date.isSame(YESTERDAY, 'd')) {
    headerDate = 'Yesterday';
  }

  return headerDate;
};

const formatExpiry = (value) => {
  const date = moment(new Date(value));
  return date.format('MMMM D, YYYY');
};

const formatReceiptDate = (value) => {
  const date = moment(new Date(value));
  return date.format('MMMM D, YYYY h:mm A');
};

const formatNotificationDate = (date, type) => {
  let formattedDate = date;
  switch (type) {
    case 1:
      formattedDate = moment(new Date(date)).format('dddd, MMM. DD');
      break;
    case 2:
      // Mon, 15 October 2018, 10:00 AM
      formattedDate = moment(new Date(date)).format('dddd, DD MMMM YYYY, hh:mm A');
      break;
    case 3:
      // October 18, 2018
      formattedDate = moment(new Date(date)).format(' MMMM DD, YYYY ');
      break;

    case 4:
      formattedDate = moment(new Date(date)).fromNow();
      break;

    default:
      break;
  }
  return formattedDate;
};

const formatTime = value => moment(value).format('h:mm A');

export default {
  getSectionHeaderDate,
  formatReceiptDate,
  formatExpiry,
  formatNotificationDate,
  formatTime,
};
