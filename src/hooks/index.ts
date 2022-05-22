import type { HandleError, GetSession } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import redis from './redis';

export const handle = sequence(redis);
export const getSession: GetSession = (req) => ({ ...req.locals });
export const handleError: HandleError = ({ error, event }) => {
	console.log('handleError', { error, event });
	return { status: 400 };
};
