import { create } from "domain";
import { link } from "fs";

const monggoose = require('mongoose');

const resumeSchema = new monggoose.Schema({
    userId:{
        type: monggoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    thumbnailLink: {
        type: String,
    },
    template: {
        theme: String,
        colorPalette: [String],
    },
    profileInfo: {
        profilePreviewUrl: String,
        fullname: String,
        designation: String,
        summary: String,
    },
    contactInfo: {
        email: String,
        phone: String,
        location: String,
        website: String,
        linkedIn: String,
        github: String,
    },
    workExperience: [{
        companyName: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
    }],
    education: [{
        institutionName: String,
        degree: String,
        startDate: Date,
        endDate: Date,
        description: String,
    }],
    skills: [{
        name: String,
        progress: Number
    }],
    projects:[{
        title: String,
        description: String,
        link: String,
        liveDemoLink: String,
    }],
    certifications: [{
        title: String,
        issuer: String,
        issueDate: Date,
        expirationDate: Date,
        link: String,
    }],
    languages: [{
        name: String,
        proficiency: String
    }],
    interests: [String],
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

module.exports = monggoose.model('Resume', resumeSchema); 