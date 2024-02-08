import React, { useState } from 'react';
import Autocomplete from 'components/atoms/autocomplete';
import {
    InitialTextStyled,
    RemoveWrapperStyled,
    RepoContainerStyled,
    RepoDetailsStyled,
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
    });

    const onSelect = (repo: IRepositories) => {
        dispatch(setCommit(repo.owner.login, repo.name));
        setRepo({
            id: repo.id,
            name: repo.name,
            watchers: repo.watchers,
            date: repo.updated_at,
        });
    };

    const onRemove = () => {
        dispatch(removeCommit(repo.id));
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
                        <RepoNameStyled>{repo.name}</RepoNameStyled>
                        <RepoDetailsStyled>
                            <Star />
                            <span>{repo.watchers}</span>
                            <UpdateStyled>
                                {getTimeAgo(new Date(repo.date))}
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
