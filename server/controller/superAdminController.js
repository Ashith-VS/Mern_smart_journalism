const UserData = require("../model/AuthenticationModel");
const { NewsData } = require("../model/NewsModel");

const getMediaAdmins = async (req, res) => {
    try {
        const usersv = await UserData.find({ role: 'mediaAdmin' })
        const user = usersv.filter(users => users.status !== 'deleted')
        res.status(200).json({ mediaAdmins: user });
    } catch {
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

const getJournalist = async (req, res) => {
    try {
        const { id } = req.params
        const users = await UserData.find({ parent: id })
        const user = users.filter(item => item.status!== "deleted")
        res.status(200).json({ user });
    } catch {
        res.status(500).json({ message: error.message });
    }
}

const getDeletedJournalist = async (req, res) => {
    try {
        const { id } = req.params
        const users = await UserData.find({ parent: id })
        const user = users.filter(item => item.status === "deleted")
        res.status(200).json({ user });
    } catch {
        res.status(500).json({ message: error.message });
    }
}

const getMediaAdminDeleted =async(req,res)=>{
    try {
        const mediaAdmins = await UserData.find({ role: 'mediaAdmin', status: 'deleted' });
        res.status(200).json({ status: true, mediaAdmins })
    } catch (error) {
        console.error(error);
        res.status(404).json({ status: "Not Found any media admins" });
    }
}

const blockMediaAdmins = async (req, res) => {
    try {
        const { id } = req.params
        const mediaAdmin = await UserData.findById(id);
        if (!mediaAdmin) {
            return res.status(404).json({ status: false, message: "Media admin not found" });
        }
        //  Toggle the block status
        const newBlockStatus = !mediaAdmin.blocked;
        // Block the MediaAdmin
        await UserData.findByIdAndUpdate(id, { blocked: newBlockStatus });
        // Block all associated Journalists
        await UserData.updateMany(
            { role: 'Journalist', parent: id },
            { $set: { blocked: newBlockStatus } }
        );
        res.status(200).json({ status: true, message: "Media admin and associated journalists blocked successfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed to block media admin and associated journalists" });
    }
}

const deleteMediaAdmin = async (req, res) => {
    try {
        const { id } = req.params
         // Find and update the MediaAdmin status to "deleted"
     await UserData.findByIdAndUpdate(id, { status: "deleted" });
      // Find and update associated Journalists' status to "deleted"
      await UserData.updateMany(
        { role: 'Journalist', parent: id },
        { status: "deleted" }
    );
        res.status(200).json({ status: true, message: "Media admin and associated journalists deleted successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: false, message: "Failed to delete media admin and associated journalists" });
    }
}
module.exports= { getMediaAdmins, getAllNews,getJournalist,getDeletedJournalist,getMediaAdminDeleted,blockMediaAdmins,deleteMediaAdmin}