//index.js
const {
    connect
} = require('../../vendors/weapp-redux.js')
const {
    asyncTap,
    addTodo,
    setVisibilityFilter,
    toggleTodo
} = require('../../redux/reducers/todos.js')

let pageConfig = {
    data: {
        todos: [],
        filters: [
            { key: 'SHOW_ALL', text: '全部' },
            { key: 'SHOW_ACTIVE', text: '正在进行' },
            { key: 'SHOW_COMPLETED', text: '已完成' }
        ]
    },
    handleCheck: function(e) {
        const id = parseInt(e.target.id)

        this.toggleTodo(id);
    },

    applyFilter: function(e) {
        this.setVisibilityFilter(e.target.id)
    },

    onLoad: function() {
        console.log('on load')
    },
    onUnload: function() {
        console.log('on unload')
    }
}

let filterTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

let mapStateToData = state => ({
    todos: filterTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
})

let mapDispatchToPage = dispatch => ({
    setVisibilityFilter: filter => dispatch(setVisibilityFilter(filter)),
    toggleTodo: id => dispatch(toggleTodo(id)),
    addTodo: event => {
        dispatch(addTodo(event.detail.value.todo));
    },
    asyncTap: event => {
        console.log(1);
        dispatch(asyncTap());
    }
})


pageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(pageConfig);
