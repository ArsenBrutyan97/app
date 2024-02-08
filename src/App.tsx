import React, { useEffect } from 'react';
import { Dashboard } from 'pages/dashboard';
import store from './store';
import { initialize } from './store/actions';

const App: React.FC = () => {
    useEffect(() => {
        store.dispatch(initialize());
    });

    return <Dashboard />;
};

export default App;
