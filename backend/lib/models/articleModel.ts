import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ArticleSchema = new Schema({
    title: {
        type: String,
        required: "Title is a mandatory field"
    },

    author: {
        type: String,
        required: "Author's name is a mandatory field"
    },

    content: [
        {body: String}
    ],  

    date_created: {
        type: Date,
        default: Date.now
    },

    date_updated: {
        type: Date,
        default: Date.now
    }
});