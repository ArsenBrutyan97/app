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
                    lastYearCommitDates: [
                        ...state.lastYearCommitDates,
                        filteredDates,
                    ],
                };
            }
            case actionTypes.SELECT_REPO: {
                const { repo } = action.payload;

                return {
                    ...state,
                    selectedRepositories: [...state.selectedRepositories, repo],
                };
            }
            case actionTypes.UNSELECT_REPO: {
                const { repoId } = action.payload;

                const index = state.selectedRepositories
                    .map((repo) => repo.id)
                    .indexOf(repoId);

                return {
                    ...state,
                    selectedRepositories: state.selectedRepositories.filter(
                        (repo) => repo.id !== repoId,
                    ),
                    lastYearCommitDates: [
                        ...state.lastYearCommitDates.slice(0, index),
                        ...state.lastYearCommitDates.slice(index + 1),
                    ],
                };
            }
            default:
                return state;
        }
    };
}
