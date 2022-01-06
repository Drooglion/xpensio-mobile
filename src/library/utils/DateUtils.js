import dayjs from 'dayjs';

dayjs.locale('en');
const NOW = dayjs();
const TODAY = NOW.clone().startOf('day');
const YESTERDAY = NOW.clone().subtract(1, 'days').startOf('day');

const getSectionHeaderDate = value => {
  const date = dayjs(new Date(value));
  let headerDate = date.format('dddd, D MMM YYYY');

  if (date.isSame(TODAY, 'd')) {
    headerDate = 'Today';
  } else if (date.isSame(YESTERDAY, 'd')) {
    headerDate = 'Yesterday';
  }

  return headerDate;
};

const formatExpiry = value => {
  const date = dayjs(new Date(value));
  return date.format('MMMM D, YYYY');
};

const formatReceiptDate = value => {
  const date = dayjs(new Date(value));
  return date.format('MMMM D, YYYY h:mm A');
};

const formatNotificationDate = (date, type) => {
  let formattedDate = date;
  switch (type) {
    case 1:
      formattedDate = dayjs(new Date(date)).format('dddd, MMM. DD');
      break;
    case 2:
      // Mon, 15 October 2018, 10:00 AM
      formattedDate = dayjs(new Date(date)).format(
        'dddd, DD MMMM YYYY, hh:mm A',
      );
      break;
    case 3:
      // October 18, 2018
      formattedDate = dayjs(new Date(date)).format(' MMMM DD, YYYY ');
      break;

    case 4:
      formattedDate = dayjs(new Date(date)).fromNow();
      break;

    default:
      break;
  }
  return formattedDate;
};

const formatTime = value => dayjs(value).format('h:mm A');

export default {
  getSectionHeaderDate,
  formatReceiptDate,
  formatExpiry,
  formatNotificationDate,
  formatTime,
};
