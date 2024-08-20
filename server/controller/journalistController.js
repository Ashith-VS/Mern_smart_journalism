const { NewsData, NewsDraft } = require("../model/NewsModel");

const getNewsByJournals = async (req, res) => {
    try {
        const news = await NewsData.find({ author: req.id });
        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDraftNews = async (req, res) => {
    try {
        const { id } = req.params
        const drafts = await NewsDraft.find({ draftedby: id });
        res.status(200).json({ status: true, drafts })
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: "Not Found any draft news" });
    }
}

const uploadMultipleImages = async (req, res) => {
    try {
        const files = req.files;
        const newImages = files.map(file => ({
            url: file.path,
            filename: file.filename
        }));
        await ImgCollection.insertMany(newImages);
        res.status(200).json({ message: "Multiple images upload successful", newImages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const newsAdded = async (req, res) => {
    try {
        const { category, location, title, images, video, content, author, newsStatus } = req.body;
        const news = new NewsData({ category, location, title, images, video, content, author, newsStatus })
        await news.save();
        res.status(200).json({ message: "News added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const isDraftNews = async (req, res) => {
    try {
        const { title, content, category, images, location, video, draftedby } = req.body.submitDatas
        const newsDraft = new NewsDraft({ title, content, category, images, location, video, draftedby });
        await newsDraft.save();
        res.status(200).json({ status: true, message: "News Drafted Successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed to adding draft news" });
    }
}

const newsUpdate = async (req, res) => {
    try {
        const { id } = req.params
        const { category, location, title, images, video, content, author, parent, newsStatus } = req.body;
        await NewsData.findByIdAndUpdate(id, { category, location, title, images, video, content, author, parent, newsStatus });
        res.status(200).json({ message: "News updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports ={getNewsByJournals,getDraftNews,uploadMultipleImages,newsAdded,isDraftNews,newsUpdate}