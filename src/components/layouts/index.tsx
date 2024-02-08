import React from 'react';
import { LayoutWrapperStyled } from './styled';

interface IDashboardLayout {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayout> = ({ children }) => {
    return <LayoutWrapperStyled>{children}</LayoutWrapperStyled>;
};

export default DashboardLayout;
