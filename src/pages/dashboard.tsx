import React from 'react';
import { useSelector } from 'react-redux';
import { RepositoriesSelector } from '@/store/selectors';
import DashboardLayout from 'components/layouts';
import { SearchBar } from 'components/templates/searchbar';
import { Statistics } from 'components/templates/statistics';
import Loader from 'components/atoms/loader';

export const Dashboard: React.FC = () => {
    const repos = useSelector(RepositoriesSelector);

    if (repos.length > 0) {
        return (
            <DashboardLayout>
                <Statistics />
                <SearchBar />
            </DashboardLayout>
        );
    }

    return <Loader />;
};
