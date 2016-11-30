const Redux = require('../vendors/redux.js')
const combineReducers = Redux.combineReducers
const { todos } = require('./reducers/todos.js')
const visibilityFilter = require('./reducers/visibilityFilter.js')

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

module.exports = todoApp