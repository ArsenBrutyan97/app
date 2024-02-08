import { AnyAction } from 'redux';
import { initialState } from './initialState';
import { ApplicationState, ICommits } from 'store/types';
import * as actionTypes from 'store/actions/actionTypes';
import { isDateWithinLastYear } from 'utils/helpers';

export default function () {
    return function reducer(
        state = initialState,
        action: AnyAction,
    ): ApplicationState {
        switch (action.type) {
            case actionTypes.LOAD_REPOS: {
                const { repositories } = action.payload;

                return {
                    ...state,
                    repositories,
                };
            }
            case actionTypes.LOAD_COMMITS: {
                const { commits } = action.payload;
                const lastYearCommits: ICommits[] = commits.filter(
                    (commit: ICommits) =>
                        isDateWithinLastYear(commit.commit.committer.date),
                );
                const filteredDates: string[] = [];

                if (lastYearCommits.length) {
                    lastYearCommits.forEach((commit) =>
                        filteredDates.push(commit.commit.committer.date),
                    );
                }

                return {
                    ...state,
                    lastYearCommitDates: filteredDates,
                };
            }
            case actionTypes.REMOVE_COMMIT: {
                const { id } = action.payload;
                const filteredRepos = state.repositories.filter(
                    (repo) => repo.id !== id,
                );

                return {
                    ...state,
                    repositories: filteredRepos,
                    lastYearCommitDates: [],
                };
            }
            default:
                return state;
        }
    };
}
