import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers';
import { thunk } from 'redux-thunk';

const store = createStore((state) => state,
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

export default store;