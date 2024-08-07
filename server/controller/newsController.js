const UserData = require("../model/AuthenticationModel");
const { ImgCollection, NewsData } = require("../model/NewsModel");

const uploadMultipleImages = async (req, res) => {
    try {
        const files = req.files;
        // console.log('files: ', files);
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
        // console.log('req.body: ', req.body);
        const { category, location, title, images, video, content, author, parent } = req.body;
        const news = new NewsData({ category, location, title, images, video, content, author, parent })
        await news.save();
        res.status(200).json({ message: "News added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getMediaAdmins = async (req, res) => {
    try {
        const usersv = await UserData.find({ role: 'mediaAdmin' })
        res.status(200).json({ mediaAdmins: usersv });
    } catch {
        res.status(500).json({ message: error.message });
    }
}


const getJournalistByMediaAdmin = async (req, res) => {
    // console.log('req.id5555: ', req.id);
    try {
        const user = await UserData.find({ mediaAdmin: req.id })
        // console.log('user: ', user);
        res.status(200).json({ status: 200, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getJournalist = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserData.find({ mediaAdmin: id })
        res.status(200).json({ user });
    } catch {
        res.status(500).json({ message: error.message });
    }

}

const deleteJournalist = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserData.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ status: 200, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNewsByJournals = async (req, res) => {
    try {
        const news = await NewsData.find({ author: req.id });
        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getAllNewsByMediaAdmins = async (req, res) => {
    // console.log('req.id4444: ', req.id);
    try {
        const news = await NewsData.find({ parent: req.id });
        // console.log('news: ', news);
        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const isApproved = async (req, res) => {
    try {
        const { id } = req.params
        const { newsStatus } = req.body
        const news = await NewsData.findByIdAndUpdate(id, { newsStatus }, { new: true });
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({ status: 200, message: "news approve successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const isRejected = async (req, res) => {
    try {
        const { id } = req.params
        const { newsStatus } = req.body
        const news = await NewsData.findByIdAndUpdate(id, { newsStatus }, { new: true });
        if (!news) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({ status: 200, message: "news rejected" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getAllNews = async (req, res) => {
    try {
        const news = await NewsData.find();
        res.status(200).json({ status: 200, news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllMediasName = async (req, res) => {
    try {
        const medias = await UserData.find({ role: "mediaAdmin" })
        const media = medias.map(media => {
            return { name: media.name, id: media._id }
        })
        res.status(200).json({ media });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllMediasNews = async (req, res) => {
    try {
        const { id } = req.params
        const news = await NewsData.find({ parent: id });
        res.status(200).json({ news });
    } catch (error) {
        console.error(error);
    }
}

const isSavedNews = async (req, res) => {
    try {
        const { userId, newsId } = req.body
        const user = await UserData.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isSaved = user.savedNews.includes(newsId);
        if (isSaved) {
            // Remove newsId from savedNews
            user.savedNews = user.savedNews.filter(id => {
                return id.toString() !== newsId;
            });
        } else {
            user.savedNews.push(newsId);
        }
        await user.save();
        res.status(200).json({
            status: isSaved ? false : true,
            message: isSaved ? "News removed successfully" : "News saved successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSavedNews = async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserData.findById(id).populate('savedNews')
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ savedNews: user.savedNews });
    } catch (error) {
        console.error(error);
    }
}

const getAllApprovedNews = async(req,res) => {
    try {
        const news = await NewsData.find({ newsStatus: "approved" });
        res.status(200).json({ status: true, news });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { uploadMultipleImages, newsAdded, getNewsByJournals, getMediaAdmins, getAllNewsByMediaAdmins, getJournalistByMediaAdmin, deleteJournalist, isApproved, isRejected, getAllNews, getJournalist, getAllMediasName, getAllMediasNews, isSavedNews, getSavedNews, getAllApprovedNews }