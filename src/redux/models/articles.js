import Promise from '../../vendors/es6-promise.js';
import { normalize, arrayOf } from '../../vendors/normalizr.min.js';

import { updateObject, getAPIDomain, smartDate, merge } from '../../libs/utils.js';
import { GET, POST } from '../../libs/request.js';

import { postSchema } from '../schema.js';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_ARTICLES_DETAIL = 'UPDATE_ARTICLES_DETAIL';
export const UPDATE_ARTICLES_LIST = 'UPDATE_ARTICLES_LIST';
export const UPDATE_ARTICLES_BANNER_LIST = 'UPDATE_ARTICLES_BANNER_LIST';



// ------------------------------------
// helpers
// ------------------------------------
function formatFeeds(feeds) {
    let posts;

    posts = feeds.map((feed) => {
        let post = feed.post,
            category = post.category;

        post.image = feed.image;
        post.type = feed.type;
        category.post_genre = post.genre;

        return post;
    });

    return posts;
}

function formatSmartDate(posts) {
    posts = posts.map((post) => {
        let publishTime;

        publishTime = post.publish_time;
        post.publish_time_formated = smartDate(publishTime);

        return post;
    });

    return posts;
}

// ------------------------------------
// Actions
// ------------------------------------
export function updateArticlesDetail(normalizeData) {
    return {
        type: UPDATE_ARTICLES_DETAIL,
        payload: {
            normalizeData: normalizeData
        }
    }
}
export function updateArticlesList(normalizeData, lastkey) {
    return {
        type: UPDATE_ARTICLES_LIST,
        payload: {
            normalizeData: normalizeData,
            listLastkey: lastkey
        }
    }
}
export function updateArticlesBannerList(normalizeData) {
    return {
        type: UPDATE_ARTICLES_BANNER_LIST,
        payload: {
            normalizeData: normalizeData
        }
    }
}



// ------------------------------------
// Async Actions
// ------------------------------------
export const fetchArticleDetail = (id, callback, errorCallback) => {
    return (dispatch, getState) => {
        let url = `${getAPIDomain()}/wxapp/articles/info/${id}.json`;

        return GET(url).then(function(res) {
            let post = res.post,
                author = res.author,
                related = post.related || [],
                normalizeData = {},
                relatedData = {};

            if (related.length) {
                related = formatFeeds(related);
                related = formatSmartDate(related);
                relatedData = normalize(related, arrayOf(postSchema));
                post.related = relatedData.result;
            }

            post.author = author;
            post.excerpt = post.description;
            post.category.post_genre = post.genre;
            normalizeData = normalize(post, postSchema);

            dispatch(updateArticlesDetail(
                merge(normalizeData, relatedData, 'concat')
            ));
            callback && callback(post.content);
        }, function(err) {
            errorCallback && errorCallback(err);
        }).catch(function(err) {
            console.error(err);
        })
    }
}

export const fetchArticlesList = (errorCallback) => {
    return (dispatch, getState) => {
        let articles = getState().articles,
            lastkey = articles.listLastkey || 0,
            url = `${getAPIDomain()}/wxapp/homes/index/${lastkey}.json`;

        return GET(url).then(function(res) {
            let feeds = res.feeds,
                banners = res.banners,
                lastkey = res.last_key,
                posts, normalizeData;

            if (feeds && feeds.length) {
                posts = formatFeeds(feeds);
                posts = formatSmartDate(posts);
                normalizeData = normalize(posts, arrayOf(postSchema));

                dispatch(updateArticlesList(
                    normalizeData,
                    lastkey
                ));
            }

            if (banners.length) {
                posts = formatFeeds(banners);
                posts = formatSmartDate(posts);
                normalizeData = normalize(posts, arrayOf(postSchema));

                dispatch(updateArticlesBannerList(
                    normalizeData
                ));
            }
        }, function(err) {
            errorCallback && errorCallback(err);
        }).catch(function(err) {
            console.error(err);
        });
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [UPDATE_ARTICLES_DETAIL]: (articles, action) => articles,
    [UPDATE_ARTICLES_LIST]: (articles, action) => {
        let payload = action.payload,
            normalizeData = payload.normalizeData,
            list = articles.list.concat(normalizeData.result),
            listLastkey = payload.listLastkey;

        return updateObject(articles, {
            list,
            listLastkey
        });
    },
    [UPDATE_ARTICLES_BANNER_LIST]: (articles, action) => {
        let payload = action.payload,
            normalizeData = payload.normalizeData,
            bannerList = normalizeData.result;

        return updateObject(articles, {
            bannerList
        });
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function articlesReducer(articles = {
    list: [],
    listLastkey: 0,

    bannerList: []
}, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(articles, action) : articles
}
