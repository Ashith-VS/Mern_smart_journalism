const UserData = require("../model/AuthenticationModel");
const { NewsData } = require("../model/NewsModel");

const getAllApprovedNews = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortOrder = "asc" } = req.query
        const skip = (page - 1) * limit;
        const sortDirection = sortOrder === 'desc' || sortOrder === "descTitle" ? -1 : 1;
        const sort = {}
        if (sortOrder === 'asc' || sortOrder === 'desc') {
            sort.publicationDate = sortDirection
        } else if (sortOrder === 'ascTitle' || sortOrder === 'descTitle') {
            sort.title = sortDirection
        }
        // Fetch users who are not deleted or blocked
        const users = await UserData.find({
            status: { $ne: 'deleted' },
            blocked: { $ne: true }
        });
        const filterId = users.map(item => item.id);
        // Fetch the news data with pagination and sorting
        const news = await NewsData.find({
            newsStatus: 'approved',
            author: { $in: filterId } // Filter news by the IDs of active and unblocked users
        })
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .sort(sort);
        // Count the total number of news items
        const totalNews = await NewsData.countDocuments({ newsStatus: "approved", author: filterId });
        // Calculate total pages
        const totalPages = Math.ceil(totalNews / parseInt(limit));
        res.status(200).json({ status: true, news, Pagination: { currentpage: parseInt(page), totalPages, totalItems: totalNews, itemsPerPage: parseInt(limit) } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching approved news' });
    }
}

const getAllMediasNews = async (req, res) => {
    try {
        const { id } = req.params
        const { page = 1, limit = 10 } = req.query
        const skip = (page - 1) * limit;
        const user = await UserData.find({ parent: id, status: { $ne: 'deleted' }, blocked: { $ne: true } })
        const filterId = user.map(item => item.id)

        // Get the total count of approved news items
        const totalNewsCount = await NewsData.countDocuments({
            author: { $in: filterId },
            newsStatus: "approved"
        });
        // Fetch the news items for the current page
        const news = await NewsData.find({ author: filterId, newsStatus: "approved" })
            .skip(parseInt(skip))
            .limit(parseInt(limit))

        // Calculate total pages
        const totalPages = Math.ceil(totalNewsCount / parseInt(limit));
        res.status(200).json({ news, pagination: { currentpage: parseInt(page), totalPages, totalItems: totalNewsCount, itemsPerPage: parseInt(limit) } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching news' });
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

const isSavedNews = async (req, res) => {
    try {
        const { userId, newsId } = req.body
        const user = await UserData.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
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
        res.status(500).json({ status: false, message: error.message });
    }
}



module.exports = { getAllApprovedNews, getAllMediasName, getAllMediasNews, getSavedNews, isSavedNews }