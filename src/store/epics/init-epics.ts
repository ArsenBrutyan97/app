import { Epic, ofType } from 'redux-observable';
import { mergeMap, of } from 'rxjs';
import * as actionsTypes from 'store/actions/actionTypes';
import { loadCommits, loadRepositories } from 'store/actions';
import { requestHeaders } from 'store/utils';
import { BASE_URL, PER_PAGE } from 'utils/constants';
import { IInfos } from 'store/types';

export const initEpics: Epic[] = [
    (action$) =>
        action$.pipe(
            ofType(actionsTypes.INITIALIZE),
            mergeMap(async () => {
                try {
                    const orgs = (
                        await fetch(`${BASE_URL}/search/users?q=type:org`, {
                            method: 'GET',
                            ...requestHeaders(),
                        }).then((res) => res.json())
                    ).items.map((item: IInfos) => item.login);

                    return [].concat.apply(
                        [],
                        (
                            await Promise.all(
                                orgs.map((org: string) =>
                                    fetch(
                                        `${BASE_URL}/orgs/${org}/repos?per_page=${PER_PAGE}`,
                                        {
                                            method: 'GET',
                                            ...requestHeaders(),
                                        },
                                    ).then((res) => res.json()),
                                ),
                            )
                        ).filter((res) => Array.isArray(res)),
                    );
                } catch (err) {
                    return err;
                }
            }),
            mergeMap((result) => {
                return of(loadRepositories(result));
            }),
        ),

    (action$) =>
        action$.pipe(
            ofType(actionsTypes.SET_COMMIT),
            mergeMap(async (action) => {
                try {
                    const { owner, repo } = action.payload;

                    const commitResponse = await fetch(
                        `${BASE_URL}/repos/${owner}/${repo}/commits`,
                        {
                            method: 'GET',
                            ...requestHeaders(),
                        },
                    );

                    return await commitResponse.json();
                } catch (err) {
                    return err;
                }
            }),
            mergeMap((result) => {
                return of(loadCommits(result));
            }),
        ),
];
