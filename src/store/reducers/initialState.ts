import { ApplicationState } from 'store/types';

export const initialState: ApplicationState = {
    repositories: [],
    selectedRepositories: [],
    lastYearCommitDates: [],
};
