//index.js
const {
    connect
} = require('../../vendors/weapp-redux.js');
const {
    fetchPapersList
} = require('../../redux/models/papers.js')

import Toaster from '../../components/toaster/index.js';


let pageConfig = {
    data: {
        lastkey: 0,
        posts: [],
        postsHash: {},
        categoriesHash: {},

        toasterData: Toaster.defaultData
    },
    onLoad: function() {
        var me = this,
            errorCallback = Toaster.show.bind(me);

        me.fetchPosts(errorCallback);
    },
    handleScroll: function() {
        var me = this,
            errorCallback = Toaster.show.bind(me);

        me.fetchPosts(errorCallback);
    },
    navigateTo: function(e) {
        let me = this,
            elCurrentTarget = e.currentTarget,
            url = elCurrentTarget.dataset.url;

        wx.navigateTo({
            url: url
        });
    },
    onShareAppMessage: function() {
        var me = this;

        return {
            title: '好奇心研究所',
            desc: '好奇心研究所页面通过问卷调查来为您的日常生活投票，同时您也可以参加并发表对日常生活的态度，想要了解更多好奇心研究所内容尽在好奇心日报官方网站。',
            path: '/pages/labs/index'
        };
    }
}

let mapStateToData = state => ({
    lastkey: state.papers.listLastkey,
    posts: state.papers.list,

    postsHash: state.entities.posts,
    categoriesHash: state.entities.categories
});


let mapDispatchToPage = dispatch => ({
    fetchPosts: (errorCallback) => dispatch(fetchPapersList(errorCallback))
});


pageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(pageConfig);
