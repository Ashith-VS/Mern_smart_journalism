const UserData = require("../model/AuthenticationModel");
const { NewsData } = require("../model/NewsModel");

const getJournalistByMediaAdmin = async (req, res) => {
    try {
        const user = await UserData.find({ parent: req.id })
        const users = user.filter(item => item.status !== "deleted")
        res.status(200).json({ status: 200, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getJournalistDeleted = async (req, res) => {
    try {
        const parentId = req.id;
        const journalist = await UserData.find({ role: 'Journalist', parent: parentId, status: 'deleted' });
        res.status(200).json({ status: true, journalist })
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: "Not Found any blocked journalists" });
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

const blockJournalist = async (req, res) => {
    try {
        const { id } = req.params
        const journalist = await UserData.findById(id);
        if (!journalist) {
            return res.status(404).json({ status: false, message: "Journalist not found" });
        }
        // Toggle the block status
        const newBlockStatus = !journalist.blocked;
        await UserData.findByIdAndUpdate(id, { blocked: newBlockStatus });
        res.status(200).json({ status: true, message: `Journalist ${newBlockStatus ? 'blocked' : 'unblocked'} successfully` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "failed to block journalist" });
    }
}

const deleteJournalist = async (req, res) => {
    try {
        const { id } = req.params
        await UserData.findByIdAndUpdate(id, { status: "deleted" });
        res.status(200).json({ status: true, message: "Journalist deleted successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: false, message: "failed to delete journalist" });
    }
}

const getAllNewsByMediaAdmins = async (req, res) => {
    try {
        const users = await UserData.find({ parent: req.id })
        const filterId = users.map(item => item._id)
        const news = await NewsData.find({ author: filterId });
        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports ={getJournalistByMediaAdmin,getJournalistDeleted,isApproved,isRejected,blockJournalist,deleteJournalist,getAllNewsByMediaAdmins}