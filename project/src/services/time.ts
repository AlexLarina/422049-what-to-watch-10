import {
  formatDuration,
  intervalToDuration
} from 'date-fns';

import { SECONDS_IN_HOUR } from '../const';

const formateTime = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const zeroPad = (count: number) => String(count).padStart(2, '0');
  const format = seconds > SECONDS_IN_HOUR
    ? ['hours', 'minutes', 'seconds']
    : ['minutes', 'seconds'];

  return formatDuration(duration, {
    format: format,
    zero: true,
    delimiter: ':',
    locale: {
      formatDistance: (_token, count) => zeroPad(count)
    }});
};

export default formateTime;
