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

const ImgCollection = mongoose.model('Image', ImgSchema)
const NewsData = mongoose.model('News', NewsSchema);

module.exports = { NewsData, ImgCollection };