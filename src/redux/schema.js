import { Schema, arrayOf } from '../vendors/normalizr.min.js';


const postSchema = new Schema('posts');
const columnSchema = new Schema('columns');
const tagSchema = new Schema('tags');
const optionsSchema = new Schema('options');
const tagsSchema = new Schema('tags');
const authorsSchema = new Schema('users');
const categorySchema = new Schema('categories', {
    // 由于paper_category和article_category是独立的，下面纯粹是为了统一category
    idAttribute: function(entity) {
        return entity.id + '_' + entity.post_genre;
    }
});


postSchema.define({
    category: categorySchema,
    column: columnSchema,
    options: arrayOf(optionsSchema),
    tag: arrayOf(tagSchema),
    author: authorsSchema
});

export {
    postSchema,
    columnSchema,
    tagSchema,
    categorySchema,
    optionsSchema,
    tagsSchema,
    authorsSchema,
}
