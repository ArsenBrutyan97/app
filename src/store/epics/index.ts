import { initEpics } from './init-epics';

export const getApplicationEpics = () => {
    return [...initEpics];
};
