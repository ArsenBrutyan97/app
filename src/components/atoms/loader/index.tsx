import React from 'react';
import { LoaderContainer } from './styled';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <LoaderContainer>
            <CircularProgress />
        </LoaderContainer>
    );
};

export default Loader;
