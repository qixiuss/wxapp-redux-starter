//index.js
import { connect } from '../../vendors/weapp-redux.js';

import { fetchArticleDetail, updateArticlesDetail } from '../../redux/models/articles.js';

import WXParse from '../../components/wxParse/wxParse.js';
import Toolbar from '../../components/toolbar/index.js';
import Toaster from '../../components/toaster/index.js';

import { clone, getDeviceInfo } from '../../libs/utils.js';

let pageConfig = {
    data: {
        article: {},
        wxParseData: '',

        toasterData: Toaster.defaultData,
        toolbarData: Toolbar.defaultData
    },
    onLoad: function(params) {
        var me = this,
            { article } = me.data,
            errorCallback = Toaster.show.bind(me),
            toolbarInit = Toolbar.init.bind(me);

        wx.setNavigationBarTitle({
            title: article.title || '好奇心日报'
        });

        toolbarInit(article.praise_count, article.praise || false, true);

        me.fetchArticleDetail(article.id, function(content) {
            let deviceInfo = getDeviceInfo(wx);

            WXParse.wxParse('html', content, me, deviceInfo.windowWidth, function(wxParseData) {});

            // 再次设置，点赞数量应该以文章详情页的接口为准
            toolbarInit(article.praise_count, article.praise || false, true);
        }, errorCallback);
    },
    onShareAppMessage: function() {
        var me = this,
            id = me.data.id,
            post = me.data.postsHash[id],
            desc = post.description,
            title = post.title;

        return {
            title: title,
            desc: desc,
            path: '/pages/articles/show?id=' + id
        };
    },
    navigateTo: function(e) {
        let me = this,
            elCurrentTarget = e.currentTarget,
            url = elCurrentTarget.dataset.url;

        wx.navigateTo({
            url: url
        });
    },
}

let mapStateToData = (state, params) => {
    let id = params.id,
        postsHash = state.entities.posts,
        categoriesHash = state.entities.categories,
        tagsHash = state.entities.tags,
        usersHash = state.entities.users,
        categoryId, tagId, authorId, article;

    article = clone(postsHash[id]);

    categoryId = article.category;
    tagId = article.tag;
    authorId = article.author;

    article.category = categoriesHash[categoryId];
    if (tagId) {
        article.tag = tagId.map(function(id) {
            return clone(tagsHash[id])
        });
    }

    if (authorId) {
        article.author = usersHash[authorId];
    }

    return {
        article
    }
};


let mapDispatchToPage = dispatch => ({
    fetchArticleDetail: (id, callback, errorCallback) => dispatch(fetchArticleDetail(id, callback, errorCallback)),

    returnBack: (e) => Toolbar.returnBack(wx, '/pages/homes/index')
});


pageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(pageConfig);
