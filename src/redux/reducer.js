import { combineReducers } from '../vendors/redux.min.js';
import reduceReducers from '../vendors/reduce-reducers.js';

import { updateObject, updateItemInArray } from '../libs/utils.js';

// import reducers
import {
    // action
    UPDATE_ENTITIES,
    // reducer
    entitiesReducer
} from './models/entities.js';
import {
    // action
    UPDATE_ARTICLES_DETAIL,
    UPDATE_ARTICLES_LIST,
    UPDATE_ARTICLES_BANNER_LIST,
    // reducer
    articlesReducer
} from './models/articles.js';
import {
    // action
    UPDATE_PAPERS_DETAIL,
    UPDATE_PAPERS_LIST,
    UPDATE_OPTIONS,
    RESET_OPTIONS,
    // reducer
    papersReducer
} from './models/papers.js';


// ------------------------------------
// crossReducer start
// ------------------------------------
function crossReducer(state, action) {
    switch (action.type) {
        case UPDATE_PAPERS_DETAIL:
        case UPDATE_PAPERS_LIST:
        case UPDATE_ARTICLES_DETAIL:
        case UPDATE_ARTICLES_LIST:
        case UPDATE_OPTIONS:
        case RESET_OPTIONS:
        case UPDATE_ARTICLES_BANNER_LIST:
            let payload = action.payload,
                normalizeData = payload.normalizeData;

            return updateObject(state, {
                entities: entitiesReducer(state.entities, {
                    type: UPDATE_ENTITIES,
                    payload: {
                        entities: normalizeData.entities
                    }
                })
            });
        default:
            return state;
    }
}
// ------------------------------------
// crossReducer end
// ------------------------------------

export const rootReducer = reduceReducers(
    combineReducers({
        entities: entitiesReducer,

        articles: articlesReducer,
        papers: papersReducer
    }),
    crossReducer
);
