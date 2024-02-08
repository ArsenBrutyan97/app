import { AUTH_TOKEN } from 'utils/constants';

const headers = new Headers();
headers.append('Authorization', `Bearer ${AUTH_TOKEN}`);

export const requestHeaders = (): RequestInit => ({
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    headers
}) as never;