const UserData = require("../model/AuthenticationModel");
const { ImgCollection, NewsData } = require("../model/NewsModel");

const uploadMultipleImages=async(req,res)=>{
    try {
        const files = req.files;
        console.log('files: ', files);
        const newImages = files.map(file => ({
          url: file.path,
          filename: file.filename
        }));
        await ImgCollection.insertMany(newImages);
        res.status(200).json({ message: "Multiple images upload successful",newImages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const newsAdded=async(req,res)=>{
    try {
        // console.log('req.body: ', req.body);
        const {category,location,title,images,video,content,author} = req.body;

       const news=new NewsData({category,location,title,images,video,content,author})
        await news.save();
        res.status(200).json({ message: "News added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNews=async(req,res)=>{
    console.log('req45: ', typeof req.id);
    try {
        const users=await UserData.find({_id:req.id});
        console.log('users: ', users);
        const news=await NewsData.find({author:req.id});
        console.log('new77s: ', news);
        res.status(200).json({ news });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMediaAdmins=async(req,res)=>{
    try{
        const usersv=await UserData.find({role:'mediaAdmin'})
        res.status(200).json({ mediaAdmins:usersv });
    }catch{
        res.status(500).json({ message: error.message });
    }
}


module.exports={uploadMultipleImages,newsAdded,getNews,getMediaAdmins};