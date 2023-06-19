import { Schema, model } from 'mongoose'

const bookingSchema = new Schema({
    place:{
        type: Schema.Types.ObjectId,
        ref: 'place',
        required: true
    },
    client:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkin:{
        type: Date,
        required: true
    },
    checkout:{
        type: Date,
        required: true
    },
    guestsNumber:{
        type: Number,
        required: true
    },
    clientName:{
        type: String,
        required: true
    },
    clientdni:{
        type: String,
        
    },
    clientEmail:{
        type: String,
        required: true
    },
    payMethod:{
        type: String,
        required: true
    },
    clientPhoneNumber:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Bookings = model("book", bookingSchema)
export default Bookings



/*placeid ,checkin, checkout, guestsNumber, 
        clientName, clientid, clientEmail, payMethod, 
        clientPhoneNumber */