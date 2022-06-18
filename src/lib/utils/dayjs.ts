import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

export function timeAgo(time: Date) {
	return dayjs(time).fromNow();
}

export default dayjs;
