import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = compose;

const store = createStore(
    reducers,
    composeWithDevTools(composeEnhancers(applyMiddleware(thunk)))
);

export default store;