import {Schema, model} from "mongoose";

const placesSchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title : {
        type: String,  
    },
    address: {
        type: String
    },
    photos: {
        type: [String]
    },
    
    placeDescription: {
        type: String
    }
    ,
    perks: {
        type: [String]
    },
    extrainfo: {
        type: String
    },
    checkin: {
        type: Number
    },
    checkout: {
        type: Number
    },
    maxGuests: {
        type: Number
    },
    price: {
        type: Number
    }
})

const Places = model("place", placesSchema)
export default Places