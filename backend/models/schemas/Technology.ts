import * as mongoose from 'mongoose'

export const TechnologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: false,
    },
    categories: {
        type: [String],
        required: false
    }
})