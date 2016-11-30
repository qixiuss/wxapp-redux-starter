import { Provider } from './vendors/weapp-redux.js';
import { store } from './redux/store.js';


let appConfig = {
    onLaunch: function() {
        console.log("onLaunch")
    }
};

App(Provider(store())(appConfig))
