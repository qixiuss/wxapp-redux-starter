import {
    createStore,
    compose,
    applyMiddleware,
    combineReducers
} from '../vendors/redux.js';
import thunkMiddleware from '../vendors/redux-thunk.js';

// import reducers
import { todos } from './reducers/todos.js';
import { visibilityFilter } from './reducers/visibilityFilter.js';


export const store = function() {
    return createStore(
        combineReducers({
            todos,
            visibilityFilter
        }),
        applyMiddleware(
            thunkMiddleware
        )
    );
}
