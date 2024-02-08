import DashboardLayout from 'components/layouts';
import { SearchBar } from 'components/templates/searchbar';
import { Statistics } from 'components/templates/statistics';
import React from 'react';

export const Dashboard: React.FC = () => {
    return (
        <DashboardLayout>
            <Statistics />
            <SearchBar />
        </DashboardLayout>
    );
};
