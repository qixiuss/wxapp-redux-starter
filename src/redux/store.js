import {
    createStore,
    compose,
    applyMiddleware
} from '../vendors/redux.js';
import thunkMiddleware from '../vendors/redux-thunk.js';
// const devTools = require('./libs/remote-redux-devtools.js').default;
const reducer = require('./reducer.js')

function store() {
    return createStore(reducer, applyMiddleware(
        thunkMiddleware
    ));
}
// function store() {
//   return createStore(reducer, compose(devTools({
//     hostname: 'localhost',
//     port: 5678,
//     secure: false
//   })));
// }

module.exports = store;
