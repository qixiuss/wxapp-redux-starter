import Promise from '../../vendors/es6-promise.js';
import { normalize, arrayOf } from '../../vendors/normalizr.min.js';

import { updateObject, getAPIDomain, merge } from '../../libs/utils.js';
import { GET, POST } from '../../libs/request.js';

import { postSchema } from '../schema.js';

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PAPERS_LIST = 'UPDATE_PAPERS_LIST';
// ------------------------------------
// helpers
// ------------------------------------
function formatFeeds(feeds) {
    let posts;

    posts = feeds.map((feed) => {
        let post = feed.post,
            category = post.category;

        post.type = feed.type;
        category.post_genre = post.genre;

        return post;
    });

    return posts;
}


//判断paper是今天的，还是昨天的
function formatCount(posts){

    posts = posts.map((post) => {
        let publishTime = post.publish_time,
            nowDate, diffMinute;

        nowDate = new Date();
        diffMinute = (nowDate.getTime() / 1000 - publishTime) / 60;

        if (diffMinute <= nowDate.getHours() * 60) {
            post.today = true;
        } else {
            post.today = false;
        }

        return post;
    });

    return posts;
}

// ------------------------------------
// Actions
// ------------------------------------
export function updatePapersList(normalizeData, lastkey) {
    return {
        type: UPDATE_PAPERS_LIST,
        payload: {
            normalizeData: normalizeData,
            listLastkey: lastkey
        }
    }
}

// ------------------------------------
// Async Actions
// ------------------------------------
export const fetchPapersList = (errorCallback) => {
    return (dispatch, getState) => {
        let papers = getState().papers,
            lastkey = papers.listLastkey || 0,
            url = `${getAPIDomain()}/wxapp/papers/index/${lastkey}.json`;

        return GET(url)
            .then(function(res) {
                let feeds = res.feeds,
                    lastkey = res.last_key,
                    posts, normalizeData;

                if(feeds && feeds.length){
                    posts = formatFeeds(feeds);
                    posts = formatCount(posts);

                    normalizeData = normalize(posts, arrayOf(postSchema));

                    dispatch(updatePapersList(
                        normalizeData,
                        lastkey
                    ));
                }
            }, function(err){
                errorCallback && errorCallback(err);
            }).catch(function(err) {
                errorCallback && errorCallback();
                console.error(err);
            });
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [UPDATE_PAPERS_LIST]: (papers, action) => {
        let payload = action.payload,
            normalizeData = payload.normalizeData,
            list = papers.list.concat(normalizeData.result),
            listLastkey = payload.listLastkey;

        return updateObject(papers, {
            list,
            listLastkey
        });
    }
}
// ------------------------------------
// Reducer
// ------------------------------------
export function papersReducer(papers = {
    list: [],
    listLastkey: 0
}, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(papers, action) : papers
}
