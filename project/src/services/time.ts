import {
  formatDuration,
  intervalToDuration
} from 'date-fns';

import { Hour } from '../const';

const formateTime = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const zeroPad = (count: number) => String(count).padStart(2, '0');
  const format = seconds > Hour.Seconds
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
