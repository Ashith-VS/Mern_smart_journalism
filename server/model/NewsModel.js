const mongoose = require('mongoose');

const ImgSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true },
})

const NewsSchema = new mongoose.Schema({
    category: { type: String, required: true },
    location: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [ImgSchema],
    video: { type: String },
    author: { type: String, required: true },
    newsStatus: { type: String, default: "pending" },
    publicationDate: { type: Date, default: new Date }
})

const DraftSchema = new mongoose.Schema({
    category: { type: String },
    location: { type: String},
    title: { type: String},
    content: { type: String},
    images: [ImgSchema],
    video: { type: String },
    draftedby: { type: String,required: true},
    newsStatus: { type: String, default: "draft" },
    publicationDate: { type: Date, default: new Date }
})

const ImgCollection = mongoose.model('Image', ImgSchema)
const NewsData = mongoose.model('News', NewsSchema);
const NewsDraft = mongoose.model('Draft', DraftSchema)


module.exports = { NewsData, ImgCollection, NewsDraft };