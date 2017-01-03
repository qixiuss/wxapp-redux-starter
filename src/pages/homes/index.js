//index.js
import { connect } from '../../vendors/weapp-redux.js';

import { fetchArticlesList } from '../../redux/models/articles.js';

import Toaster from '../../components/toaster/index.js';


let pageConfig = {
    data: {
        posts: [],
        banners: [],
        toasterData: Toaster.defaultData
    },
    onLoad: function() {
        var me = this,
            errorCallback = Toaster.show.bind(me);

        me.fetchPosts(errorCallback);
    },
    handleScroll: function() {
        let me = this,
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
            title: '好奇心日报',
            desc: '好奇心日报以商业视角观察生活并启发你的好奇心，囊括商业报道、科技新闻、生活方式等各个领域，致力成为这个时代最好的媒体，为用户提供最好的新闻资讯。',
            path: '/pages/homes/index'
        };
    }
}

let mapStateToData = state => {
    let { list, bannerList } = state.articles,
        postsHash = state.entities.posts,
        categoriesHash = state.entities.categories,
        posts = [], banners = [];

    posts = list.map(function(id) {
        try {
            let post = postsHash[id],
                categoryId = post.category,
                category = categoriesHash[categoryId];

            return {
                id: id,

                type: post.type,
                datatype: post.datatype,
                category: category.title,

                title: post.title,
                description: post.description,
                image: post.image,
                publish_time_formated: post.publish_time_formated,
                genre: post.genre,

                today: post.today,
                record_count: post.record_count
            }
        } catch (err) {
            console.log(err);
            return {};
        }
    });

    banners = bannerList.map(function(id) {
        try {
            let banner = postsHash[id],
                categoryId = banner.category,
                category = categoriesHash[categoryId];

            return {
                id: id,

                type: banner.type,
                datatype: banner.datatype,
                category: category.title,

                title: banner.title,
                description: banner.description,
                image: banner.image,
                publish_time_formated: banner.publish_time_formated,
                genre: banner.genre,

                today: banner.today,
                record_count: banner.record_count
            }
        } catch (err) {
            console.log(err);
            return {};
        }
    });

    return {
        posts,
        banners
    }
};


let mapDispatchToPage = dispatch => ({
    fetchPosts: (errorCallback) => dispatch(fetchArticlesList(errorCallback))
});


pageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(pageConfig);
