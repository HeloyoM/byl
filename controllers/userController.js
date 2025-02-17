const User = require('../models/User')

async function getProfile(userId) {
    return await User.findById(userId)
}

async function updateProfile() {
    return await User.findById(userId)
}

exports.module = {
    getProfile,
    updateProfile
}