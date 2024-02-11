import React from 'react';
import Autocomplete from 'components/atoms/autocomplete';
import {
    InitialTextStyled,
    OrgNameStyled,
    RemoveWrapperStyled,
    RepoContainerStyled,
    RepoDetailsStyled,
    RepoFullNameStyled,
    RepoNameStyled,
    ReposWrapperStyled,
    RepoWrapperStyled,
    SearchBarWrapperStyled,
    SearchContainerStyled,
    UpdateStyled,
} from './styled';
import BigSearch from 'assets/big-search.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
    RepositoriesSelector,
    SelectedRepositoriesSelector,
} from '@/store/selectors';
import { setCommit, selectRepo, unselectRepo } from '@/store/actions';
import { IRepositories } from '@/store/types';
import Star from 'assets/star.svg';
import { getTimeAgo, getColor } from 'utils/helpers';
import Trash from 'assets/trash.svg';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const repos = useSelector(RepositoriesSelector);
    const selectedRepos = useSelector(SelectedRepositoriesSelector);

    const onSelectRepo = (repo: IRepositories) => {
        const repoData = {
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            watchers: repo.watchers,
            date: repo.updated_at,
            org: repo.owner.login,
        };
        dispatch(selectRepo(repoData));
        dispatch(setCommit(repo.owner.login, repo.name));
    };

    const onRemoveRepo = (repoId: number) => {
        dispatch(unselectRepo(repoId));
    };

    const renderWatchers = (watchers: number) => {
        return watchers >= 1000
            ? Math.round(watchers / 100) / 10 + 'k'
            : watchers;
    };

    const repoSuggestions = repos.filter(
        (repo) =>
            !selectedRepos.some((selectedRepo) => selectedRepo.id === repo.id),
    );

    return (
        <SearchBarWrapperStyled>
            <Autocomplete
                suggestions={repoSuggestions}
                onSelect={(repo) => onSelectRepo(repo)}
            />
            <ReposWrapperStyled>
                {selectedRepos.length > 0 ? (
                    selectedRepos.map((repo, key) => (
                        <RepoWrapperStyled
                            key={repo.id}
                            style={{ backgroundColor: getColor(key) }}>
                            <RepoContainerStyled>
                                <RepoFullNameStyled>
                                    <OrgNameStyled>{repo.org} / </OrgNameStyled>
                                    <RepoNameStyled>{repo.name}</RepoNameStyled>
                                </RepoFullNameStyled>
                                <RepoDetailsStyled>
                                    <Star />
                                    <b> {renderWatchers(repo.watchers)}</b>
                                    <UpdateStyled>
                                        Updated{' '}
                                        {getTimeAgo(new Date(repo.date))}
                                    </UpdateStyled>
                                </RepoDetailsStyled>
                                <RemoveWrapperStyled
                                    onClick={() => onRemoveRepo(repo.id)}>
                                    <Trash />
                                </RemoveWrapperStyled>
                            </RepoContainerStyled>
                        </RepoWrapperStyled>
                    ))
                ) : (
                    <SearchContainerStyled>
                        <BigSearch />
                        <InitialTextStyled>
                            Search for a GitHub repository to populate graph
                        </InitialTextStyled>
                    </SearchContainerStyled>
                )}
            </ReposWrapperStyled>
        </SearchBarWrapperStyled>
    );
};
