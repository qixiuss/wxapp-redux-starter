const { Provider } = require('./vendors/weapp-redux.js');
const store = require('./redux/store.js');

App(Provider(store())({
    onLaunch: function() {
        console.log("onLaunch")
    }
}))
