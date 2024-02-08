import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/types';

export const RepositoriesSelector = createSelector(
    (state: RootState) => state.application,
    (application) => application.repositories,
);

export const DateSelector = createSelector(
    (state: RootState) => state.application,
    (application) => application.lastYearCommitDates,
);
