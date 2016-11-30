// action
import Promise from '../../vendors/es-promise.js';
import { createActions, handleActions } from '../../vendors/redux-actions';
import { assign } from '../../libs/utils.js'

let todoId = 0;

const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: todoId++,
    text
})

const setVisibilityFilter = (filter) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
})

const asyncTap = () => {
    return (dispatch) => {
        return new Promise((resolve) => {
            setTimeout(function() {
                dispatch(addTodo('hahahha'))
            }, 2000);
        })
    }
}

// reducer
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state
            }

            return assign({}, state, { completed: !state.completed })
        default:
            return state
    }
}

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            state.push(todo(undefined, action))
            return state
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))
        default:
            return state
    }
}

module.exports = {
    // actions
    asyncTap: asyncTap,
    addTodo: addTodo,
    setVisibilityFilter: setVisibilityFilter,
    toggleTodo: toggleTodo,

    // reducers
    todos: todos
}
