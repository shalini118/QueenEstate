const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    regularPrice : {
        type: Number,
        required: true
    },
    discountPrice : {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    bedRoom : {
        type: Number,
        required: true
    },
    bathRoom: {
        type: Number,
        required: true
    },
    parking: {
        type: Boolean,
        required: true
    },
    furnished: {
        type: Boolean,
        required: true
    },
    offer: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })

exports.Property = mongoose.model('property', propertySchema)