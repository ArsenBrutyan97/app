import * as actions from './actionTypes';
import { ICommits, IRepositories } from 'store/types';

export function initialize() {
    return {
        type: actions.INITIALIZE,
    };
}

export function loadRepositories(repositories: IRepositories[] | unknown) {
    return {
        type: actions.LOAD_REPOS,
        payload: { repositories },
    };
}

export function setCommit(owner: string, repo: string) {
    return {
        type: actions.SET_COMMIT,
        payload: { owner, repo },
    };
}

export function loadCommits(commits: ICommits[]) {
    return {
        type: actions.LOAD_COMMITS,
        payload: { commits },
    };
}

export function removeCommit(id: number) {
    return {
        type: actions.REMOVE_COMMIT,
        payload: { id },
    };
}
