const Media = require('../models/Media');

async function getAllmedia() {
    return await Media.find().sort({ createdAt: -1 });
}

async function addmedia(mediaData) {
    const newmedia = new Media(mediaData);
    return await newmedia.save();
}

async function deletemedia(mediaId) {
    return await Media.findByIdAndDelete(mediaId);
}

module.exports = {
    getAllmedia,
    addmedia,
    deletemedia
};
