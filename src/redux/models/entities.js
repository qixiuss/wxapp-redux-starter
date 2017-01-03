import { updateObject } from '../../libs/utils.js';


// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_ENTITIES = 'UPDATE_ENTITIES'


// ------------------------------------
// Actions
// ------------------------------------
export function updateEntities(entities) {
    return {
        type: UPDATE_ENTITIES,
        payload: {
            entities
        }
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [UPDATE_ENTITIES]: (entities, action) => {
        if (action.payload && action.payload.entities) {
            return updateObject(entities, action.payload.entities);
        }

        return entities;
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
export function entitiesReducer(entities = {}, action) {
    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(entities, action) : entities
}
