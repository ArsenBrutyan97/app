import { Middleware, configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import logger from 'redux-logger';
import { getApplicationEpics } from './epics';
import applicationReducer from './reducers/application';

const epicMiddleware = createEpicMiddleware();

export const rootEpic = combineEpics(...getApplicationEpics());

const middleware: Middleware[] = [epicMiddleware];

if (process.env.DEBUG_MODE) {
    middleware.push(logger);
}

const store = configureStore({
    reducer: {
        application: applicationReducer(),
    },
    middleware,
});

epicMiddleware.run(rootEpic);

export default store;
