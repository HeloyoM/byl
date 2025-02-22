const User = require('../models/User')
const mongoose = require('mongoose')

async function getProfile(email) {
    return await User.find({ email })
}

async function updateProfile() {
    return await User.findById(userId)
}

exports.module = {
    getProfile,
    updateProfile
}