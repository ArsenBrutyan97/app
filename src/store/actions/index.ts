import * as actions from './actionTypes';
import { ICommits, IRepositories, ISelectedRepos } from 'store/types';

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

export function selectRepo(repo: ISelectedRepos) {
    return {
        type: actions.SELECT_REPO,
        payload: { repo },
    };
}

export function unselectRepo(repoId: number) {
    return {
        type: actions.UNSELECT_REPO,
        payload: { repoId },
    };
}

export function loadCommits(commits: ICommits[]) {
    return {
        type: actions.LOAD_COMMITS,
        payload: { commits },
    };
}
