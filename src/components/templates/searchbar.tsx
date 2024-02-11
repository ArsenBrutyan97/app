import React, { useState } from 'react';
import Autocomplete from 'components/atoms/autocomplete';
import {
    InitialTextStyled,
    OrgNameStyled,
    RemoveWrapperStyled,
    RepoContainerStyled,
    RepoDetailsStyled,
    RepoFullNameStyled,
    RepoNameStyled,
    RepoWrapperStyled,
    SearchBarWrapperStyled,
    SearchContainerStyled,
    UpdateStyled,
} from './styled';
import BigSearch from 'assets/big-search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { DateSelector, RepositoriesSelector } from '@/store/selectors';
import { removeCommit, setCommit } from '@/store/actions';
import { IRepositories } from '@/store/types';
import Star from 'assets/star.svg';
import { getTimeAgo } from 'utils/helpers';
import Trash from 'assets/trash.svg';

export const SearchBar = () => {
    const dispatch = useDispatch();
    const repos = useSelector(RepositoriesSelector);
    const dates = useSelector(DateSelector);
    const [repo, setRepo] = useState({
        id: 0,
        name: '',
        watchers: 0,
        date: '',
        org: '',
    });

    const onSelect = (repo: IRepositories) => {
        dispatch(setCommit(repo.owner.login, repo.name));
        setRepo({
            id: repo.id,
            name: repo.name,
            watchers: repo.watchers,
            date: repo.updated_at,
            org: repo.owner.login,
        });
    };

    const onRemove = () => {
        dispatch(removeCommit(repo.id));
    };

    const calcWatchers = (watchers: number) => {
        return watchers >= 1000
            ? Math.round(watchers / 100) / 10 + 'k'
            : watchers;
    };

    return (
        <SearchBarWrapperStyled>
            <Autocomplete
                suggestions={repos}
                onSelect={(repo) => onSelect(repo)}
            />
            {dates.length > 0 ? (
                <RepoWrapperStyled>
                    <RepoContainerStyled>
                        <RepoFullNameStyled>
                            <OrgNameStyled>{repo.org} / </OrgNameStyled>
                            <RepoNameStyled>{repo.name}</RepoNameStyled>
                        </RepoFullNameStyled>
                        <RepoDetailsStyled>
                            <Star />
                            <b> {calcWatchers(repo.watchers)}</b>
                            <UpdateStyled>
                                Updated {getTimeAgo(new Date(repo.date))}
                            </UpdateStyled>
                        </RepoDetailsStyled>
                        <RemoveWrapperStyled onClick={() => onRemove()}>
                            <Trash />
                        </RemoveWrapperStyled>
                    </RepoContainerStyled>
                </RepoWrapperStyled>
            ) : (
                <SearchContainerStyled>
                    <BigSearch />
                    <InitialTextStyled>
                        Search for a GitHub repository to populate graph
                    </InitialTextStyled>
                </SearchContainerStyled>
            )}
        </SearchBarWrapperStyled>
    );
};
